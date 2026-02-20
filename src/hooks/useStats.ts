import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type TeamStats = Database['public']['Tables']['team_stats']['Row']
type Classificacao = Database['public']['Tables']['classificacao']['Row']
type ArtilhariaRow = Database['public']['Views']['artilharia']['Row']
type AssistenciasRow = Database['public']['Views']['assistencias_view']['Row']

const TEMPORADA_ATUAL = '2026'

export function useTeamStats(categoria: 'Aberto' | 'Master') {
    const [stats, setStats] = useState<TeamStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('team_stats')
            .select('*')
            .eq('temporada', TEMPORADA_ATUAL)
            .eq('categoria', categoria)
            .single()
            .then(({ data }) => {
                setStats(data)
                setLoading(false)
            })
    }, [categoria])

    return { stats, loading }
}

export function useClassificacao(categoria: 'Aberto' | 'Master') {
    const [tabela, setTabela] = useState<Classificacao[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('classificacao')
            .select('*')
            .eq('temporada', TEMPORADA_ATUAL)
            .eq('categoria', categoria)
            .order('posicao', { ascending: true })
            .then(({ data }) => {
                setTabela(data ?? [])
                setLoading(false)
            })
    }, [categoria])

    return { tabela, loading }
}

export function useArtilharia(categoria: 'Aberto' | 'Master') {
    const [artilheiros, setArtilheiros] = useState<ArtilhariaRow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('artilharia')
            .select('*')
            .eq('categoria', categoria)
            .order('rank', { ascending: true })
            .limit(10)
            .then(({ data }) => {
                setArtilheiros((data as ArtilhariaRow[]) ?? [])
                setLoading(false)
            })
    }, [categoria])

    return { artilheiros, loading }
}

export function useAssistencias(categoria: 'Aberto' | 'Master') {
    const [assistencias, setAssistencias] = useState<AssistenciasRow[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('assistencias_view')
            .select('*')
            .eq('categoria', categoria)
            .order('rank', { ascending: true })
            .limit(10)
            .then(({ data }) => {
                setAssistencias((data as AssistenciasRow[]) ?? [])
                setLoading(false)
            })
    }, [categoria])

    return { assistencias, loading }
}
