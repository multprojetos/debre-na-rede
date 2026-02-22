import { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Plus, Edit, Trash2, Calendar, Users, Newspaper, Shirt, X, Save, Upload, Image as ImageIcon, BarChart2, MapPin, Trophy, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { ToastCtx } from '../App'

type TabType = 'partidas' | 'jogadores' | 'noticias' | 'mantos' | 'team_stats' | 'classificacao' | 'parceiros' | 'historia' | 'galeria'

const tabConfig: { key: TabType; label: string; icon: any }[] = [
    { key: 'partidas', label: 'Partidas', icon: Calendar },
    { key: 'jogadores', label: 'Elenco', icon: Users },
    { key: 'noticias', label: 'Notícias', icon: Newspaper },
    { key: 'mantos', label: 'Mantos', icon: Shirt },
    { key: 'team_stats', label: 'Stats', icon: BarChart2 },
    { key: 'classificacao', label: 'Tabela', icon: Trophy },
    { key: 'parceiros', label: 'Parceiros', icon: MapPin },
    { key: 'historia', label: 'História', icon: Clock },
    { key: 'galeria', label: 'Galeria', icon: ImageIcon },
]

// Field definitions for each table
const fieldDefs: Record<TabType, { key: string; label: string; type: 'text' | 'number' | 'textarea' | 'boolean' | 'datetime' | 'select' | 'file'; options?: string[] }[]> = {
    partidas: [
        { key: 'adversario', label: 'Adversário', type: 'text' },
        { key: 'adversario_iniciais', label: 'Iniciais', type: 'text' },
        { key: 'data_hora', label: 'Data/Hora', type: 'datetime' },
        { key: 'local', label: 'Local', type: 'text' },
        { key: 'categoria', label: 'Categoria', type: 'select', options: ['Aberto', 'Master'] },
        { key: 'campeonato', label: 'Campeonato', type: 'text' },
        { key: 'gols_debre', label: 'Gols Debre', type: 'number' },
        { key: 'gols_adversario', label: 'Gols Adversário', type: 'number' },
        { key: 'is_finalizada', label: 'Finalizada?', type: 'boolean' },
    ],
    jogadores: [
        { key: 'name', label: 'Nome', type: 'text' },
        { key: 'number', label: 'Camisa', type: 'number' },
        { key: 'pos', label: 'Posição', type: 'select', options: ['GL', 'ZG', 'LD', 'LE', 'VOL', 'MC', 'ALE', 'ALD', 'CA'] },
        { key: 'categoria', label: 'Categoria', type: 'select', options: ['Aberto', 'Master'] },
        { key: 'initials', label: 'Iniciais', type: 'text' },
        { key: 'gols', label: 'Gols', type: 'number' },
        { key: 'jogos', label: 'Jogos', type: 'number' },
        { key: 'assists', label: 'Assistências', type: 'number' },
        { key: 'bio', label: 'Bio', type: 'textarea' },
        { key: 'avatar_url', label: 'Foto do Jogador', type: 'file' },
        { key: 'is_active', label: 'Ativo?', type: 'boolean' },
    ],
    noticias: [
        { key: 'titulo', label: 'Título', type: 'text' },
        { key: 'descricao', label: 'Descrição', type: 'textarea' },
        { key: 'conteudo', label: 'Conteúdo Completo', type: 'textarea' },
        { key: 'categoria', label: 'Categoria', type: 'select', options: ['Notícias', 'Resultados', 'Elenco', 'Manto', 'Agenda', 'Parceiros'] },
        { key: 'is_hot', label: 'Destaque?', type: 'boolean' },
        { key: 'thumb_emoji', label: 'Emoji Thumb', type: 'text' },
        { key: 'image_url', label: 'Imagem', type: 'file' },
    ],
    mantos: [
        { key: 'ano', label: 'Ano', type: 'text' },
        { key: 'tipo', label: 'Tipo', type: 'select', options: ['Jogo', 'Treino', 'Especial'] },
        { key: 'cor', label: 'Cor (hex)', type: 'text' },
        { key: 'cor_nome', label: 'Nome da Cor', type: 'text' },
        { key: 'preco', label: 'Preço', type: 'number' },
        { key: 'preco_original', label: 'Preço Original', type: 'number' },
        { key: 'is_new', label: 'Novo?', type: 'boolean' },
        { key: 'esgotado', label: 'Esgotado?', type: 'boolean' },
        { key: 'descricao', label: 'Descrição', type: 'textarea' },
        { key: 'emoji', label: 'Emoji', type: 'text' },
        { key: 'image_url', label: 'Imagem', type: 'file' },
    ],
    team_stats: [
        { key: 'temporada', label: 'Temporada', type: 'text' },
        { key: 'categoria', label: 'Categoria', type: 'select', options: ['Aberto', 'Master'] },
        { key: 'jogos', label: 'Jogos', type: 'number' },
        { key: 'vitorias', label: 'Vitórias', type: 'number' },
        { key: 'empates', label: 'Empates', type: 'number' },
        { key: 'derrotas', label: 'Derrotas', type: 'number' },
        { key: 'gols_pro', label: 'Gols Pró', type: 'number' },
        { key: 'gols_contra', label: 'Gols Contra', type: 'number' },
    ],
    classificacao: [
        { key: 'temporada', label: 'Temporada', type: 'text' },
        { key: 'categoria', label: 'Categoria', type: 'select', options: ['Aberto', 'Master'] },
        { key: 'posicao', label: 'Posição', type: 'number' },
        { key: 'nome_time', label: 'Time', type: 'text' },
        { key: 'pontos', label: 'Pontos', type: 'number' },
        { key: 'jogos', label: 'Jogos', type: 'number' },
        { key: 'vitorias', label: 'Vitórias', type: 'number' },
        { key: 'empates', label: 'Empates', type: 'number' },
        { key: 'derrotas', label: 'Derrotas', type: 'number' },
        { key: 'saldo_gols', label: 'Saldo', type: 'text' },
    ],
    parceiros: [
        { key: 'name', label: 'Nome', type: 'text' },
        { key: 'categoria', label: 'Categoria', type: 'select', options: ['Saúde', 'Supermercado', 'Automotivo', 'Alimentação', 'Serviços', 'Outros'] },
        { key: 'emoji', label: 'Emoji', type: 'text' },
        { key: 'descricao', label: 'Descrição', type: 'textarea' },
        { key: 'endereco', label: 'Endereço', type: 'text' },
        { key: 'telefone', label: 'Telefone', type: 'text' },
        { key: 'whatsapp', label: 'WhatsApp', type: 'text' },
        { key: 'cor', label: 'Cor (hex)', type: 'text' },
        { key: 'logo_url', label: 'Logo', type: 'file' },
        { key: 'is_active', label: 'Ativo?', type: 'boolean' },
    ],
    historia: [
        { key: 'ano', label: 'Ano', type: 'text' },
        { key: 'titulo', label: 'Título', type: 'text' },
        { key: 'descricao', label: 'Descrição', type: 'textarea' },
        { key: 'emoji', label: 'Emoji', type: 'text' },
        { key: 'is_featured', label: 'Destaque?', type: 'boolean' },
        { key: 'ordem', label: 'Ordem', type: 'number' },
    ],
    galeria: [
        { key: 'titulo', label: 'Título', type: 'text' },
        { key: 'descricao', label: 'Descrição', type: 'textarea' },
        { key: 'image_url', label: 'Imagem', type: 'file' },
        { key: 'categoria', label: 'Categoria', type: 'text' },
        { key: 'is_featured', label: 'Destaque?', type: 'boolean' },
    ],
}

function getDisplayText(item: any, tab: TabType): { title: string; subtitle: string } {
    switch (tab) {
        case 'partidas': return { title: `${item.adversario} (${item.categoria})`, subtitle: new Date(item.data_hora).toLocaleDateString() }
        case 'jogadores': return { title: `${item.name} (${item.pos})`, subtitle: `Camisa ${item.number} · ${item.categoria}` }
        case 'noticias': return { title: item.titulo, subtitle: new Date(item.created_at).toLocaleDateString() }
        case 'mantos': return { title: `Manto ${item.ano} - ${item.tipo}`, subtitle: item.preco ? `R$ ${item.preco}` : 'Sem preço' }
        case 'team_stats': return { title: `${item.temporada} · ${item.categoria}`, subtitle: `${item.jogos}J ${item.vitorias}V ${item.empates}E ${item.derrotas}D` }
        case 'classificacao': return { title: `${item.posicao}º ${item.nome_time}`, subtitle: `${item.pontos} pts · ${item.temporada}` }
        case 'parceiros': return { title: item.name, subtitle: item.categoria }
        case 'historia': return { title: `${item.ano} · ${item.titulo}`, subtitle: item.descricao?.slice(0, 50) + '...' }
        case 'galeria': return { title: item.titulo, subtitle: item.categoria || 'Geral' }
        default: return { title: 'Item', subtitle: '' }
    }
}

export default function AdminScreen() {
    const navigate = useNavigate()
    const { isAdmin, loading: authLoading } = useAuth()
    const showToast = useContext(ToastCtx)
    const [activeTab, setActiveTab] = useState<TabType>('partidas')
    const [items, setItems] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [editingItem, setEditingItem] = useState<any>(null)
    const [formData, setFormData] = useState<Record<string, any>>({})
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [currentFileField, setCurrentFileField] = useState<string>('')

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
        const { data } = await supabase.from(tab).select('*').order('id', { ascending: false })
        setItems(data || [])
        setLoading(false)
    }

    const handleDelete = async (id: number) => {
        if (window.confirm(`Tem certeza que deseja deletar este item?`)) {
            await supabase.from(activeTab).delete().eq('id', id)
            showToast('Item deletado! 🗑️')
            loadData(activeTab)
        }
    }

    const openCreateForm = () => {
        setEditingItem(null)
        const defaults: Record<string, any> = {}
        fieldDefs[activeTab].forEach(f => {
            if (f.type === 'boolean') defaults[f.key] = false
            else if (f.type === 'number') defaults[f.key] = 0
            else if (f.type === 'select') defaults[f.key] = f.options?.[0] ?? ''
            else defaults[f.key] = ''
        })
        setFormData(defaults)
        setShowForm(true)
    }

    const openEditForm = (item: any) => {
        setEditingItem(item)
        const data: Record<string, any> = {}
        fieldDefs[activeTab].forEach(f => {
            data[f.key] = item[f.key] ?? (f.type === 'boolean' ? false : f.type === 'number' ? 0 : '')
        })
        setFormData(data)
        setShowForm(true)
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        try {
            const fileExt = file.name.split('.').pop()
            const filePath = `${activeTab}/${Date.now()}.${fileExt}`
            const { error: uploadError } = await supabase.storage.from('debre-assets').upload(filePath, file, { upsert: true })
            if (uploadError) {
                // Try to create bucket first if it doesn't exist
                showToast('Erro ao fazer upload. Verifique o bucket de storage.')
                setUploading(false)
                return
            }
            const { data: { publicUrl } } = supabase.storage.from('debre-assets').getPublicUrl(filePath)
            setFormData(prev => ({ ...prev, [currentFileField]: publicUrl }))
            showToast('Upload feito com sucesso! 📸')
        } catch {
            showToast('Erro no upload 😬')
        } finally {
            setUploading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            // Clean data — remove file fields that are empty, convert numbers
            const cleanData: Record<string, any> = {}
            fieldDefs[activeTab].forEach(f => {
                const val = formData[f.key]
                if (f.type === 'file') {
                    // Only include if there's a URL value
                    if (val && typeof val === 'string' && val.length > 0) {
                        cleanData[f.key] = val
                    }
                } else if (f.type === 'number') {
                    cleanData[f.key] = val !== '' && val !== null ? Number(val) : 0
                } else if (f.type === 'boolean') {
                    cleanData[f.key] = Boolean(val)
                } else if (f.type === 'datetime') {
                    cleanData[f.key] = val || new Date().toISOString()
                } else {
                    cleanData[f.key] = val ?? ''
                }
            })

            if (editingItem) {
                const { error } = await (supabase.from(activeTab) as any).update(cleanData).eq('id', editingItem.id)
                if (error) throw error
                showToast('Atualizado com sucesso! ✅')
            } else {
                const { error } = await (supabase.from(activeTab) as any).insert(cleanData)
                if (error) throw error
                showToast('Criado com sucesso! 🎉')
            }
            setShowForm(false)
            loadData(activeTab)
        } catch (err: any) {
            showToast(`Erro: ${err.message ?? 'Algo deu errado'} 😬`)
        } finally {
            setSaving(false)
        }
    }

    if (authLoading || !isAdmin) return <div style={{ padding: 20, textAlign: 'center' }}>Carregando...</div>

    return (
        <div style={{ minHeight: '100vh', background: '#FAF9F6', paddingBottom: 90 }}>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate('/menu')}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Shield size={20} color="var(--gold)" />
                    Painel Admin
                </h2>
            </header>

            <div style={{ padding: '12px 16px 8px' }}>
                {/* TABS — Scrollable */}
                <div style={{ overflowX: 'auto', marginBottom: 16, paddingBottom: 4, display: 'flex', gap: 6 }} className="no-scrollbar">
                    {tabConfig.map(t => {
                        const Icon = t.icon
                        return (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                style={{
                                    whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
                                    padding: '8px 14px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700,
                                    fontFamily: 'Barlow Condensed, sans-serif', letterSpacing: '0.04em',
                                    textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0,
                                    background: activeTab === t.key ? 'linear-gradient(135deg, #C9A227, #A07D12)' : '#1B2A4A',
                                    color: activeTab === t.key ? '#1B2A4A' : '#F5EDD6',
                                    border: activeTab === t.key ? 'none' : '1px solid rgba(245,237,214,0.2)',
                                    boxShadow: activeTab === t.key ? '0 2px 12px rgba(201,162,39,0.4)' : 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Icon size={13} /> {t.label}
                            </button>
                        )
                    })}
                </div>

                {/* Header + Create */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div>
                        <h3 style={{ textTransform: 'capitalize', color: 'var(--navy)', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '1.1rem' }}>{activeTab}</h3>
                        <p style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{items.length} itens</p>
                    </div>
                    <button onClick={openCreateForm} style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 10,
                        background: 'linear-gradient(135deg, #C9A227, #A07D12)', color: '#1B2A4A',
                        fontWeight: 700, fontSize: '0.8rem', fontFamily: 'Barlow Condensed, sans-serif',
                        border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(201,162,39,0.3)'
                    }}>
                        <Plus size={14} /> Novo
                    </button>
                </div>

                {/* Items List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: 20 }}>
                        <span className="btn-spinner" style={{ borderColor: 'var(--gold) transparent var(--gold) transparent' }} />
                    </div>
                ) : items.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                        <p style={{ fontSize: '2rem', marginBottom: 8 }}>📭</p>
                        <p>Nenhum item cadastrado.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {items.map(item => {
                            const { title, subtitle } = getDisplayText(item, activeTab)
                            return (
                                <div key={item.id} className="card" style={{
                                    padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <div style={{ flex: 1, minWidth: 0, paddingRight: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
                                        {/* Show thumbnail if avatar_url or image_url exists */}
                                        {(item.avatar_url || item.image_url || item.logo_url) && (
                                            <div style={{
                                                width: 40, height: 40, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
                                                background: '#f1f5f9'
                                            }}>
                                                <img src={item.avatar_url || item.image_url || item.logo_url} alt=""
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                            </div>
                                        )}
                                        <div style={{ minWidth: 0 }}>
                                            <p style={{
                                                fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap',
                                                overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.88rem'
                                            }}>{title}</p>
                                            <p style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{subtitle}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                        <button onClick={() => openEditForm(item)} style={{
                                            padding: 8, color: 'var(--navy)', background: 'rgba(13,27,62,0.08)',
                                            borderRadius: 8, border: 'none', cursor: 'pointer'
                                        }}>
                                            <Edit size={15} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} style={{
                                            padding: 8, color: 'var(--danger)', background: 'rgba(232,64,64,0.08)',
                                            borderRadius: 8, border: 'none', cursor: 'pointer'
                                        }}>
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Hidden file input */}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />

            {/* ============= CREATE/EDIT FORM MODAL ============= */}
            {showForm && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease'
                }} onClick={(e) => e.target === e.currentTarget && setShowForm(false)}>
                    <div style={{
                        background: 'white', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 430,
                        padding: '20px 20px 32px', maxHeight: '85vh', overflowY: 'auto',
                        animation: 'fadeInUp 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Barlow Condensed, sans-serif', textTransform: 'uppercase' }}>
                                {editingItem ? 'Editar' : 'Novo'} — {activeTab}
                            </h3>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                                <X style={{ width: 20, height: 20, color: '#94a3b8' }} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {fieldDefs[activeTab].map(field => (
                                <div key={field.key}>
                                    <label style={{
                                        fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase',
                                        letterSpacing: '0.06em', color: '#94a3b8', display: 'block', marginBottom: 6
                                    }}>
                                        {field.label}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            className="form-input"
                                            value={formData[field.key] ?? ''}
                                            onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            rows={3}
                                            style={{ width: '100%', resize: 'vertical' }}
                                        />
                                    ) : field.type === 'boolean' ? (
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                                            <div onClick={() => setFormData(prev => ({ ...prev, [field.key]: !prev[field.key] }))} style={{
                                                width: 44, height: 24, borderRadius: 12, cursor: 'pointer',
                                                background: formData[field.key] ? '#C9A227' : '#e2e8f0',
                                                transition: 'background 0.2s', position: 'relative'
                                            }}>
                                                <div style={{
                                                    width: 20, height: 20, borderRadius: '50%', background: 'white',
                                                    position: 'absolute', top: 2,
                                                    left: formData[field.key] ? 22 : 2,
                                                    transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                                }} />
                                            </div>
                                            <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                                                {formData[field.key] ? 'Sim' : 'Não'}
                                            </span>
                                        </label>
                                    ) : field.type === 'select' ? (
                                        <select
                                            className="form-input"
                                            value={formData[field.key] ?? ''}
                                            onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            style={{ width: '100%' }}
                                        >
                                            {field.options?.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : field.type === 'file' ? (
                                        <div>
                                            {formData[field.key] && (
                                                <div style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                                                    <img src={formData[field.key]} alt="Preview" style={{
                                                        width: 60, height: 60, borderRadius: 8, objectFit: 'cover',
                                                        border: '1px solid rgba(0,0,0,0.1)'
                                                    }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                                    <span style={{ fontSize: '0.68rem', color: '#27AE60' }}>✓ Imagem carregada</span>
                                                </div>
                                            )}
                                            <button onClick={() => {
                                                setCurrentFileField(field.key)
                                                fileInputRef.current?.click()
                                            }} disabled={uploading} style={{
                                                display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
                                                borderRadius: 10, border: '1.5px dashed rgba(201,162,39,0.3)',
                                                background: 'rgba(201,162,39,0.05)', color: '#C9A227',
                                                fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', width: '100%',
                                                justifyContent: 'center'
                                            }}>
                                                <Upload size={16} />
                                                {uploading ? 'Enviando...' : 'Enviar Imagem'}
                                            </button>
                                            {/* Or paste URL directly */}
                                            <input
                                                className="form-input"
                                                value={formData[field.key] ?? ''}
                                                onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                                placeholder="Ou cole a URL da imagem"
                                                style={{ width: '100%', marginTop: 6, fontSize: '0.78rem' }}
                                            />
                                        </div>
                                    ) : field.type === 'datetime' ? (
                                        <input
                                            className="form-input"
                                            type="datetime-local"
                                            value={formData[field.key] ? new Date(formData[field.key]).toISOString().slice(0, 16) : ''}
                                            onChange={e => setFormData(prev => ({ ...prev, [field.key]: new Date(e.target.value).toISOString() }))}
                                            style={{ width: '100%' }}
                                        />
                                    ) : (
                                        <input
                                            className="form-input"
                                            type={field.type === 'number' ? 'number' : 'text'}
                                            value={formData[field.key] ?? ''}
                                            onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                                            style={{ width: '100%' }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={saving}
                            style={{
                                width: '100%', padding: '14px', borderRadius: 14, marginTop: 20,
                                background: 'linear-gradient(135deg, #C9A227, #A07D12)', color: '#1B2A4A',
                                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '1rem',
                                letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(201,162,39,0.35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                opacity: saving ? 0.7 : 1
                            }}
                        >
                            <Save style={{ width: 18, height: 18 }} />
                            {saving ? 'Salvando...' : editingItem ? 'Salvar Alterações' : 'Criar Item'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
