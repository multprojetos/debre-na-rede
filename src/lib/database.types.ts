export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    name: string
                    avatar_url: string | null
                    role: 'admin' | 'torcedor'
                    created_at: string
                }
                Insert: {
                    id: string
                    name: string
                    avatar_url?: string | null
                    role?: 'admin' | 'torcedor'
                    created_at?: string
                }
                Update: {
                    name?: string
                    avatar_url?: string | null
                    role?: 'admin' | 'torcedor'
                }
            }
            partidas: {
                Row: {
                    id: number
                    adversario: string
                    adversario_iniciais: string
                    data_hora: string
                    local: string
                    categoria: 'Aberto' | 'Master'
                    gols_debre: number
                    gols_adversario: number
                    is_finalizada: boolean
                    campeonato: string | null
                    created_at: string
                }
                Insert: {
                    adversario: string
                    adversario_iniciais: string
                    data_hora: string
                    local: string
                    categoria?: 'Aberto' | 'Master'
                    gols_debre?: number
                    gols_adversario?: number
                    is_finalizada?: boolean
                    campeonato?: string | null
                }
                Update: {
                    gols_debre?: number
                    gols_adversario?: number
                    is_finalizada?: boolean
                }
            }
            jogadores: {
                Row: {
                    id: number
                    name: string
                    number: number
                    pos: 'GL' | 'ZG' | 'LD' | 'LE' | 'VOL' | 'MC' | 'ALE' | 'ALD' | 'CA'
                    categoria: 'Aberto' | 'Master'
                    gols: number
                    jogos: number
                    assists: number
                    initials: string
                    bio: string | null
                    avatar_url: string | null
                    is_active: boolean
                    created_at: string
                }
                Insert: {
                    name: string
                    number: number
                    pos: 'GL' | 'ZG' | 'LD' | 'LE' | 'VOL' | 'MC' | 'ALE' | 'ALD' | 'CA'
                    categoria: 'Aberto' | 'Master'
                    gols?: number
                    jogos?: number
                    assists?: number
                    initials: string
                    bio?: string | null
                    avatar_url?: string | null
                    is_active?: boolean
                }
                Update: {
                    gols?: number
                    jogos?: number
                    assists?: number
                    bio?: string | null
                    avatar_url?: string | null
                    is_active?: boolean
                }
            }
            gols: {
                Row: {
                    id: number
                    partida_id: number
                    jogador_id: number | null
                    jogador_nome: string
                    minuto: string | null
                    descricao: string | null
                    emoji: string
                    created_at: string
                }
                Insert: {
                    partida_id: number
                    jogador_id?: number | null
                    jogador_nome: string
                    minuto?: string | null
                    descricao?: string | null
                    emoji?: string
                }
                Update: Record<string, never>
            }
            team_stats: {
                Row: {
                    id: number
                    temporada: string
                    categoria: 'Aberto' | 'Master'
                    jogos: number
                    vitorias: number
                    empates: number
                    derrotas: number
                    gols_pro: number
                    gols_contra: number
                    updated_at: string
                }
                Insert: {
                    temporada: string
                    categoria: 'Aberto' | 'Master'
                    jogos?: number
                    vitorias?: number
                    empates?: number
                    derrotas?: number
                    gols_pro?: number
                    gols_contra?: number
                }
                Update: {
                    jogos?: number
                    vitorias?: number
                    empates?: number
                    derrotas?: number
                    gols_pro?: number
                    gols_contra?: number
                }
            }
            classificacao: {
                Row: {
                    id: number
                    temporada: string
                    categoria: 'Aberto' | 'Master'
                    posicao: number
                    nome_time: string
                    pontos: number
                    jogos: number
                    vitorias: number
                    empates: number
                    derrotas: number
                    saldo_gols: string
                    updated_at: string
                }
                Insert: {
                    temporada: string
                    categoria: 'Aberto' | 'Master'
                    posicao: number
                    nome_time: string
                    pontos?: number
                    jogos?: number
                    vitorias?: number
                    empates?: number
                    derrotas?: number
                    saldo_gols?: string
                }
                Update: {
                    pontos?: number
                    jogos?: number
                    vitorias?: number
                    empates?: number
                    derrotas?: number
                    saldo_gols?: string
                }
            }
            noticias: {
                Row: {
                    id: number
                    titulo: string
                    descricao: string
                    conteudo: string | null
                    categoria: string
                    is_hot: boolean
                    thumb_emoji: string
                    image_url: string | null
                    autor_id: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    titulo: string
                    descricao: string
                    conteudo?: string | null
                    categoria?: string
                    is_hot?: boolean
                    thumb_emoji?: string
                    image_url?: string | null
                    autor_id?: string | null
                }
                Update: {
                    titulo?: string
                    descricao?: string
                    conteudo?: string | null
                    categoria?: string
                    is_hot?: boolean
                    image_url?: string | null
                }
            }
            resenha: {
                Row: {
                    id: number
                    partida_id: number
                    user_id: string | null
                    user_name: string
                    texto: string
                    tipo: string
                    audio_url: string | null
                    likes: number
                    created_at: string
                }
                Insert: {
                    partida_id: number
                    user_id?: string | null
                    user_name: string
                    texto: string
                    tipo?: string
                    audio_url?: string | null
                }
                Update: {
                    likes?: number
                }
            }
            resenha_likes: {
                Row: {
                    user_id: string
                    comentario_id: number
                }
                Insert: {
                    user_id: string
                    comentario_id: number
                }
                Update: Record<string, never>
            }
            votos_craque: {
                Row: {
                    id: number
                    partida_id: number
                    user_id: string
                    jogador_id: number
                    created_at: string
                }
                Insert: {
                    partida_id: number
                    user_id: string
                    jogador_id: number
                }
                Update: Record<string, never>
            }
            votos_gol_bonito: {
                Row: {
                    id: number
                    partida_id: number
                    user_id: string
                    gol_id: number
                    created_at: string
                }
                Insert: {
                    partida_id: number
                    user_id: string
                    gol_id: number
                }
                Update: Record<string, never>
            }
            mantos: {
                Row: {
                    id: number
                    ano: string
                    tipo: 'Jogo' | 'Treino' | 'Especial'
                    cor: string
                    cor_nome: string
                    preco: number | null
                    preco_original: number | null
                    is_new: boolean
                    esgotado: boolean
                    descricao: string | null
                    emoji: string
                    image_url: string | null
                    created_at: string
                }
                Insert: {
                    ano: string
                    tipo?: 'Jogo' | 'Treino' | 'Especial'
                    cor: string
                    cor_nome: string
                    preco?: number | null
                    preco_original?: number | null
                    is_new?: boolean
                    esgotado?: boolean
                    descricao?: string | null
                    emoji?: string
                    image_url?: string | null
                }
                Update: {
                    preco?: number | null
                    is_new?: boolean
                    esgotado?: boolean
                    descricao?: string | null
                    image_url?: string | null
                }
            }
            parceiros: {
                Row: {
                    id: number
                    name: string
                    categoria: 'Saúde' | 'Supermercado' | 'Automotivo' | 'Alimentação' | 'Serviços' | 'Outros'
                    emoji: string
                    descricao: string
                    endereco: string | null
                    telefone: string | null
                    whatsapp: string | null
                    cor: string
                    logo_url: string | null
                    is_active: boolean
                    created_at: string
                }
                Insert: {
                    name: string
                    categoria: 'Saúde' | 'Supermercado' | 'Automotivo' | 'Alimentação' | 'Serviços' | 'Outros'
                    emoji?: string
                    descricao: string
                    endereco?: string | null
                    telefone?: string | null
                    whatsapp?: string | null
                    cor?: string
                    logo_url?: string | null
                    is_active?: boolean
                }
                Update: {
                    is_active?: boolean
                    descricao?: string
                    endereco?: string | null
                    telefone?: string | null
                }
            }
            galeria: {
                Row: {
                    id: number
                    titulo: string
                    descricao: string | null
                    image_url: string
                    categoria: string
                    partida_id: number | null
                    is_featured: boolean
                    created_at: string
                }
                Insert: {
                    titulo: string
                    descricao?: string | null
                    image_url: string
                    categoria?: string
                    partida_id?: number | null
                    is_featured?: boolean
                }
                Update: {
                    is_featured?: boolean
                }
            }
            historia: {
                Row: {
                    id: number
                    ano: string
                    titulo: string
                    descricao: string
                    emoji: string
                    is_featured: boolean
                    ordem: number
                    created_at: string
                }
                Insert: {
                    ano: string
                    titulo: string
                    descricao: string
                    emoji?: string
                    is_featured?: boolean
                    ordem?: number
                }
                Update: {
                    titulo?: string
                    descricao?: string
                    is_featured?: boolean
                    ordem?: number
                }
            }
        }
        Views: {
            artilharia: {
                Row: {
                    id: number
                    name: string
                    number: number
                    categoria: 'Aberto' | 'Master'
                    gols: number
                    initials: string
                    rank: number
                }
            }
            assistencias_view: {
                Row: {
                    id: number
                    name: string
                    number: number
                    categoria: 'Aberto' | 'Master'
                    assists: number
                    initials: string
                    rank: number
                }
            }
        }
        Functions: {
            votos_craque_count: {
                Args: { p_partida_id: number }
                Returns: { jogador_id: number; total: number }[]
            }
            votos_gol_count: {
                Args: { p_partida_id: number }
                Returns: { gol_id: number; total: number }[]
            }
        }
        Enums: {
            categoria: 'Aberto' | 'Master'
            posicao: 'GL' | 'ZG' | 'LD' | 'LE' | 'VOL' | 'MC' | 'ALE' | 'ALD' | 'CA'
            user_role: 'admin' | 'torcedor'
            manto_tipo: 'Jogo' | 'Treino' | 'Especial'
            parceiro_cat: 'Saúde' | 'Supermercado' | 'Automotivo' | 'Alimentação' | 'Serviços' | 'Outros'
        }
    }
}
