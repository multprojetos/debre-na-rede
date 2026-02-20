import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Jogador = Database['public']['Tables']['jogadores']['Row']

export function useJogadores(categoria?: 'Aberto' | 'Master') {
    const [jogadores, setJogadores] = useState<Jogador[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let query = supabase
            .from('jogadores')
            .select('*')
            .eq('is_active', true)
            .order('number', { ascending: true })

        if (categoria) {
            query = query.eq('categoria', categoria)
        }

        query.then(({ data, error }) => {
            if (error) setError(error.message)
            else setJogadores(data ?? [])
            setLoading(false)
        })
    }, [categoria])

    return { jogadores, loading, error }
}

export function useJogador(id: number | string) {
    const [jogador, setJogador] = useState<Jogador | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('jogadores')
            .select('*')
            .eq('id', Number(id))
            .single()
            .then(({ data }) => {
                setJogador(data)
                setLoading(false)
            })
    }, [id])

    return { jogador, loading }
}
