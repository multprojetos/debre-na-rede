import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'

type Manto = Database['public']['Tables']['mantos']['Row']
type Parceiro = Database['public']['Tables']['parceiros']['Row']
type Galeria = Database['public']['Tables']['galeria']['Row']
type Historia = Database['public']['Tables']['historia']['Row']

// -----------------------------------------------
// Mantos
// -----------------------------------------------
export function useMantos() {
    const [mantos, setMantos] = useState<Manto[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('mantos')
            .select('*')
            .order('ano', { ascending: false })
            .then(({ data }) => {
                setMantos(data ?? [])
                setLoading(false)
            })
    }, [])

    return { mantos, loading }
}

// -----------------------------------------------
// Parceiros
// -----------------------------------------------
export function useParceiros(categoria?: string) {
    const [parceiros, setParceiros] = useState<Parceiro[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let query = supabase
            .from('parceiros')
            .select('*')
            .eq('is_active', true)
            .order('name', { ascending: true })

        if (categoria && categoria !== 'Todos') {
            query = query.eq('categoria', categoria as Parceiro['categoria'])
        }

        query.then(({ data }) => {
            setParceiros(data ?? [])
            setLoading(false)
        })
    }, [categoria])

    return { parceiros, loading }
}

// -----------------------------------------------
// Galeria
// -----------------------------------------------
export function useGaleria(categoriaFiltro?: string) {
    const [fotos, setFotos] = useState<Galeria[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let query = supabase
            .from('galeria')
            .select('*')
            .order('created_at', { ascending: false })

        if (categoriaFiltro && categoriaFiltro !== 'Todas') {
            query = query.eq('categoria', categoriaFiltro)
        }

        query.then(({ data }) => {
            setFotos(data ?? [])
            setLoading(false)
        })
    }, [categoriaFiltro])

    return { fotos, loading }
}

// -----------------------------------------------
// História
// -----------------------------------------------
export function useHistoria() {
    const [historia, setHistoria] = useState<Historia[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase
            .from('historia')
            .select('*')
            .order('ordem', { ascending: true })
            .then(({ data }) => {
                setHistoria(data ?? [])
                setLoading(false)
            })
    }, [])

    return { historia, loading }
}
