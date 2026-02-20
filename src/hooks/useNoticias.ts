import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Noticia = Database['public']['Tables']['noticias']['Row']
type Partida = Database['public']['Tables']['partidas']['Row']

// -----------------------------------------------
// Notícias
// -----------------------------------------------
export function useNoticias() {
    const [noticias, setNoticias] = useState<Noticia[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        supabase
            .from('noticias')
            .select('*')
            .order('created_at', { ascending: false })
            .then(({ data, error }) => {
                if (error) setError(error.message)
                else setNoticias(data ?? [])
                setLoading(false)
            })
    }, [])

    return { noticias, loading, error }
}

export function useNoticia(id: number | string) {
    const [noticia, setNoticia] = useState<Noticia | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('noticias')
            .select('*')
            .eq('id', Number(id))
            .single()
            .then(({ data }) => {
                setNoticia(data)
                setLoading(false)
            })
    }, [id])

    return { noticia, loading }
}

// -----------------------------------------------
// Próxima partida (não finalizada, mais próxima)
// -----------------------------------------------
export function useProximaPartida() {
    const [partida, setPartida] = useState<Partida | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('partidas')
            .select('*')
            .eq('is_finalizada', false)
            .gte('data_hora', new Date().toISOString())
            .order('data_hora', { ascending: true })
            .limit(1)
            .single()
            .then(({ data }) => {
                setPartida(data)
                setLoading(false)
            })
    }, [])

    return { partida, loading }
}

// Última partida finalizada (para resenha e votos)
export function useUltimaPartida() {
    const [partida, setPartida] = useState<Partida | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('partidas')
            .select('*')
            .eq('is_finalizada', true)
            .order('data_hora', { ascending: false })
            .limit(1)
            .single()
            .then(({ data }) => {
                setPartida(data)
                setLoading(false)
            })
    }, [])

    return { partida, loading }
}
