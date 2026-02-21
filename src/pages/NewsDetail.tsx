import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Share2 } from 'lucide-react'
import { useNoticia } from '../hooks/useNoticias'

function formatDate(iso: string): string {
    const d = new Date(iso)
    const day = d.getDate()
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
    const year = d.getFullYear()
    const h = String(d.getHours()).padStart(2, '0')
    const m = String(d.getMinutes()).padStart(2, '0')
    return `${day} de ${months[d.getMonth()]} de ${year} · ${h}:${m}`
}

export default function NewsDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { noticia: n, loading } = useNoticia(id ?? '0')

    if (loading) {
        return (
            <div>
                <header className="page-header">
                    <button className="page-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
                    <h2 style={{ flex: 1 }}>Carregando...</h2>
                </header>
                <div style={{ padding: 16 }}>
                    <div className="skeleton" style={{ height: 180, borderRadius: 12, marginBottom: 16 }} />
                    <div className="skeleton" style={{ height: 20, width: '70%', borderRadius: 4, marginBottom: 10 }} />
                    <div className="skeleton" style={{ height: 14, width: '90%', borderRadius: 4, marginBottom: 6 }} />
                    <div className="skeleton" style={{ height: 14, width: '80%', borderRadius: 4 }} />
                </div>
            </div>
        )
    }

    if (!n) {
        return (
            <div>
                <header className="page-header">
                    <button className="page-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
                    <h2 style={{ flex: 1 }}>Notícia não encontrada</h2>
                </header>
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '3rem' }}>📰</p>
                    <p style={{ marginTop: 12 }}>Conteúdo não encontrado</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1 }}>Notícia</h2>
                <button
                    className="page-back-btn"
                    onClick={() => navigator.share?.({ title: n.titulo, text: n.descricao })}
                >
                    <Share2 size={18} />
                </button>
            </header>

            <article style={{ padding: '0 0 32px' }}>
                {/* THUMB / BANNER */}
                <div style={{
                    height: 180,
                    background: 'linear-gradient(135deg, rgba(30,51,112,0.8), rgba(13,27,62,0.95))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '5rem', marginBottom: 0,
                }}>
                    {n.thumb_emoji || '📰'}
                </div>

                <div style={{ padding: '16px 16px 0' }}>
                    {/* META */}
                    <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                        <span className="badge badge-navy" style={{ fontSize: '0.62rem' }}>{n.categoria}</span>
                        {n.is_hot && <span className="badge badge-live" style={{ fontSize: '0.62rem' }}>🔥 Hot</span>}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', fontSize: '0.72rem', marginLeft: 'auto' }}>
                            <Calendar size={11} />
                            {formatDate(n.created_at)}
                        </div>
                    </div>

                    {/* TITLE */}
                    <h1 style={{
                        fontFamily: 'Barlow Condensed', fontSize: '1.4rem', fontWeight: 800,
                        lineHeight: 1.25, color: 'var(--text-primary)', marginBottom: 12,
                    }}>
                        {n.titulo}
                    </h1>

                    {/* LEAD */}
                    <p style={{
                        fontSize: '0.95rem', color: 'var(--gold)', fontWeight: 600,
                        lineHeight: 1.6, marginBottom: 16,
                        paddingBottom: 16, borderBottom: '1px solid rgba(0,0,0,0.06)',
                    }}>
                        {n.descricao}
                    </p>

                    {/* CONTENT */}
                    {n.conteudo ? (
                        <div style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                            {n.conteudo.split('\n').map((p, i) => (
                                <p key={i} style={{ marginBottom: 12 }}>{p}</p>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)' }}>
                            <p className="text-sm">Conteúdo completo em breve, parceiro! 📋</p>
                        </div>
                    )}
                </div>
            </article>
        </div>
    )
}
