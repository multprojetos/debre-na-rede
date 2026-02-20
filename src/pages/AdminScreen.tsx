import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Plus, Edit, Trash2, Calendar, Users, Newspaper, Shirt } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

type TabType = 'partidas' | 'jogadores' | 'noticias' | 'mantos'

export default function AdminScreen() {
    const navigate = useNavigate()
    const { isAdmin, loading: authLoading } = useAuth()
    const [activeTab, setActiveTab] = useState<TabType>('partidas')
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            navigate('/home')
        }
    }, [isAdmin, authLoading, navigate])

    useEffect(() => {
        if (!isAdmin) return
        loadData(activeTab)
    }, [activeTab, isAdmin])

    const loadData = async (tab: TabType) => {
        setLoading(true)
        const { data } = await supabase.from(tab).select('*').order('created_at', { ascending: false })
        setItems(data || [])
        setLoading(false)
    }

    const handleDelete = async (id: number) => {
        if (window.confirm(`Tem certeza que deseja deletar este item?`)) {
            await supabase.from(activeTab).delete().eq('id', id)
            loadData(activeTab)
        }
    }

    if (authLoading || !isAdmin) return <div style={{ padding: 20, textAlign: 'center' }}>Carregando...</div>

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate('/menu')}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Shield size={20} color="var(--gold)" />
                    Painel Admin
                </h2>
            </header>

            <div style={{ padding: '16px 16px 8px' }}>
                <div className="pill-tabs" style={{ marginBottom: 16, overflowX: 'auto' }}>
                    <button className={`pill-tab ${activeTab === 'partidas' ? 'active' : ''}`} onClick={() => setActiveTab('partidas')} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <Calendar size={14} /> Partidas
                    </button>
                    <button className={`pill-tab ${activeTab === 'jogadores' ? 'active' : ''}`} onClick={() => setActiveTab('jogadores')} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <Users size={14} /> Elenco
                    </button>
                    <button className={`pill-tab ${activeTab === 'noticias' ? 'active' : ''}`} onClick={() => setActiveTab('noticias')} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <Newspaper size={14} /> Notícias
                    </button>
                    <button className={`pill-tab ${activeTab === 'mantos' ? 'active' : ''}`} onClick={() => setActiveTab('mantos')} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <Shirt size={14} /> Mantos
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ textTransform: 'capitalize', color: 'var(--navy)' }}>{activeTab}</h3>
                    <button className="btn btn-primary btn-sm" style={{ padding: '6px 12px' }}>
                        <Plus size={14} /> Novo
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: 20 }}>
                        <span className="btn-spinner" style={{ borderColor: 'var(--gold) transparent var(--gold) transparent' }} />
                    </div>
                ) : items.length === 0 ? (
                    <p className="text-muted" style={{ textAlign: 'center', padding: 20 }}>Nenhum item cadastrado.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {items.map(item => (
                            <div key={item.id} className="card" style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ flex: 1, minWidth: 0, paddingRight: 10 }}>
                                    <p style={{ fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {activeTab === 'partidas' ? `${item.adversario} (${item.categoria})` :
                                            activeTab === 'jogadores' ? `${item.name} (${item.pos})` :
                                                activeTab === 'noticias' ? item.titulo :
                                                    activeTab === 'mantos' ? `Manto ${item.ano} - ${item.tipo}` : ''}
                                    </p>
                                    <p className="text-xs text-muted">
                                        {activeTab === 'partidas' ? new Date(item.data_hora).toLocaleDateString() :
                                            activeTab === 'jogadores' ? `Camisa ${item.number} · ${item.categoria}` :
                                                activeTab === 'noticias' ? new Date(item.created_at).toLocaleDateString() :
                                                    activeTab === 'mantos' ? `R$ ${item.preco}` : ''}
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button style={{ padding: 6, color: 'var(--navy)', background: 'rgba(13,27,62,0.1)', borderRadius: 6 }}>
                                        <Edit size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} style={{ padding: 6, color: 'var(--danger)', background: 'rgba(232,64,64,0.1)', borderRadius: 6 }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
