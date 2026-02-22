import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Comentario = Database['public']['Tables']['resenha']['Row']
type Gol = Database['public']['Tables']['gols']['Row']
type Jogador = Database['public']['Tables']['jogadores']['Row']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any

// -----------------------------------------------
// Resenha (comentários de uma partida)
// -----------------------------------------------
export function useResenha(partidaId: number | null) {
    const [comentarios, setComentarios] = useState<Comentario[]>([])
    const [loading, setLoading] = useState(true)

    const fetch = useCallback(() => {
        if (!partidaId) return
        db.from('resenha')
            .select('*')
            .eq('partida_id', partidaId)
            .order('created_at', { ascending: false })
            .then(({ data }: { data: Comentario[] | null }) => {
                setComentarios(data ?? [])
                setLoading(false)
            })
    }, [partidaId])

    useEffect(() => { fetch() }, [fetch])

    // Inserir comentário
    const enviarComentario = async (texto: string, userId: string | null, userName: string) => {
        if (!partidaId) return false
        const { error } = await db.from('resenha').insert({
            partida_id: partidaId,
            user_id: userId,
            user_name: userName,
            texto,
        })
        if (!error) fetch()
        return !error
    }

    // Toggle like (via resenha_likes table)
    const toggleLike = async (comentarioId: number, userId: string) => {
        // Verifica se já curtiu
        const { data: existing } = await db
            .from('resenha_likes')
            .select('*')
            .eq('user_id', userId)
            .eq('comentario_id', comentarioId)
            .single()

        if (existing) {
            // Remove like
            await db.from('resenha_likes').delete().eq('user_id', userId).eq('comentario_id', comentarioId)
            const currentLikes = comentarios.find(c => c.id === comentarioId)?.likes ?? 1
            await db.from('resenha').update({ likes: Math.max(0, currentLikes - 1) }).eq('id', comentarioId)
        } else {
            // Adiciona like
            await db.from('resenha_likes').insert({ user_id: userId, comentario_id: comentarioId })
            const currentLikes = comentarios.find(c => c.id === comentarioId)?.likes ?? 0
            await db.from('resenha').update({ likes: currentLikes + 1 }).eq('id', comentarioId)
        }
        fetch()
        return !existing
    }

    // Verificar likes do usuário
    const getUserLikes = async (userId: string): Promise<Set<number>> => {
        const { data } = await db.from('resenha_likes').select('comentario_id').eq('user_id', userId)
        return new Set((data ?? []).map((r: { comentario_id: number }) => r.comentario_id))
    }

    return { comentarios, loading, enviarComentario, toggleLike, getUserLikes }
}

// -----------------------------------------------
// Votos do torcedor (craque e gol mais bonito)
// -----------------------------------------------
export function useVotos(partidaId: number | null) {
    const [jogadores, setJogadores] = useState<Jogador[]>([])
    const [gols, setGols] = useState<Gol[]>([])
    const [votosJogador, setVotosJogador] = useState<Record<number, number>>({})
    const [votosGol, setVotosGol] = useState<Record<number, number>>({})
    const [meuVotoCraque, setMeuVotoCraque] = useState<number | null>(null)
    const [meuVotoGol, setMeuVotoGol] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    const load = useCallback(async () => {
        if (!partidaId) return

        // Jogadores que atuaram na partida (Aberto por padrão)
        const { data: js } = await db
            .from('jogadores')
            .select('*')
            .eq('categoria', 'Aberto')
            .eq('is_active', true)
            .order('gols', { ascending: false })
            .limit(8)

        // Gols da partida
        const { data: gs } = await db.from('gols').select('*').eq('partida_id', partidaId)

        // Contagem de votos craque via RPC
        const { data: vc } = await db.rpc('votos_craque_count', { p_partida_id: partidaId })
        // Contagem de votos gol via RPC
        const { data: vg } = await db.rpc('votos_gol_count', { p_partida_id: partidaId })

        setJogadores((js as Jogador[]) ?? [])
        setGols((gs as Gol[]) ?? [])

        const vcMap: Record<number, number> = {}
            ; ((vc ?? []) as { jogador_id: number; total: number }[]).forEach(r => { vcMap[r.jogador_id] = r.total })
        setVotosJogador(vcMap)

        const vgMap: Record<number, number> = {}
            ; ((vg ?? []) as { gol_id: number; total: number }[]).forEach(r => { vgMap[r.gol_id] = r.total })
        setVotosGol(vgMap)

        setLoading(false)
    }, [partidaId])

    useEffect(() => { load() }, [load])

    // Carregar meus votos
    const loadMeusVotos = useCallback(async (userId: string) => {
        if (!partidaId) return

        const { data: vc } = await db
            .from('votos_craque')
            .select('jogador_id')
            .eq('partida_id', partidaId)
            .eq('user_id', userId)
            .single()

        const { data: vg } = await db
            .from('votos_gol_bonito')
            .select('gol_id')
            .eq('partida_id', partidaId)
            .eq('user_id', userId)
            .single()

        if (vc) setMeuVotoCraque((vc as { jogador_id: number }).jogador_id)
        if (vg) setMeuVotoGol((vg as { gol_id: number }).gol_id)
    }, [partidaId])

    const votarCraque = async (userId: string, jogadorId: number) => {
        if (!partidaId || meuVotoCraque) return false
        const { error } = await db.from('votos_craque').insert({
            partida_id: partidaId,
            user_id: userId,
            jogador_id: jogadorId,
        })
        if (!error) {
            setMeuVotoCraque(jogadorId)
            setVotosJogador(prev => ({ ...prev, [jogadorId]: (prev[jogadorId] ?? 0) + 1 }))
        }
        return !error
    }

    const votarGol = async (userId: string, golId: number) => {
        if (!partidaId || meuVotoGol) return false
        const { error } = await db.from('votos_gol_bonito').insert({
            partida_id: partidaId,
            user_id: userId,
            gol_id: golId,
        })
        if (!error) {
            setMeuVotoGol(golId)
            setVotosGol(prev => ({ ...prev, [golId]: (prev[golId] ?? 0) + 1 }))
        }
        return !error
    }

    const totalVotosCraque = Object.values(votosJogador).reduce((a, b) => a + b, 0)

    return {
        jogadores, gols, votosJogador, votosGol,
        meuVotoCraque, meuVotoGol,
        totalVotosCraque, loading,
        loadMeusVotos, votarCraque, votarGol,
    }
}
