import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Search } from 'lucide-react'
import { useNoticias } from '../hooks/useNoticias'

const categories = ['Todas', 'Notícias', 'Resultados', 'Elenco', 'Manto', 'Agenda', 'Parceiros']

function timeAgo(iso: string): string {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000
    if (diff < 3600) return `${Math.floor(diff / 60)}min`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d atrás`
    return `${Math.floor(diff / 604800)}s atrás`
}

function catEmoji(cat: string) {
    if (cat === 'Manto') return '👕'
    if (cat === 'Elenco') return '⚽'
    if (cat === 'Resultados') return '🏆'
    if (cat === 'Agenda') return '📅'
    if (cat === 'Parceiros') return '🤝'
    return '📰'
}

export default function NewsScreen() {
    const navigate = useNavigate()
    const { noticias, loading } = useNoticias()
    const [active, setActive] = useState('Todas')
    const [search, setSearch] = useState('')
    const catScrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const handleScroll = () => {
        const el = catScrollRef.current
        if (!el) return
        setCanScrollLeft(el.scrollLeft > 4)
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    }

    const scroll = (dir: 'left' | 'right') => {
        catScrollRef.current?.scrollBy({ left: dir === 'right' ? 130 : -130, behavior: 'smooth' })
    }

    const filtered = noticias.filter(n =>
        (active === 'Todas' || n.categoria === active) &&
        (search === '' || n.titulo.toLowerCase().includes(search.toLowerCase()))
    )

    const arrowStyle = (visible: boolean, side: 'left' | 'right'): React.CSSProperties => ({
        position: 'absolute',
        [side]: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 3,
        width: 28,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: side === 'right' ? 'flex-end' : 'flex-start',
        paddingInline: 2,
        background: side === 'right'
            ? 'linear-gradient(to right, transparent, rgba(13,27,62,0.92) 65%)'
            : 'linear-gradient(to left,  transparent, rgba(13,27,62,0.92) 65%)',
        color: 'rgba(201,162,39,0.7)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transition: 'opacity 0.25s ease',
        cursor: 'pointer',
        border: 'none',
        padding: 0,
    })

    return (
        <div>
            <header className="page-header">
                <div style={{ flex: 1 }}>
                    <h2>Fique por Dentro</h2>
                </div>
            </header>

            {/* SEARCH */}
            <div style={{ padding: '12px 16px 8px' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        className="form-input"
                        style={{ paddingLeft: 42, width: '100%' }}
                        placeholder="Pesquisar notícias..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* CATEGORY PILLS */}
            <div style={{ position: 'relative', padding: '6px 0 10px' }}>
                <button style={arrowStyle(canScrollLeft, 'left')} onClick={() => scroll('left')} aria-label="Rolar para esquerda">
                    <ChevronRight size={14} style={{ transform: 'rotate(180deg)', flexShrink: 0 }} />
                </button>
                <div ref={catScrollRef} className="scroll-row" style={{ padding: '4px 20px', gap: 8 }} onScroll={handleScroll}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`badge ${active === cat ? 'badge-gold' : 'badge-navy'} `}
                            style={{ flexShrink: 0, padding: '7px 14px', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                            onClick={() => setActive(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <button style={arrowStyle(canScrollRight, 'right')} onClick={() => scroll('right')} aria-label="Rolar para direita">
                    <ChevronRight size={14} style={{ flexShrink: 0 }} />
                </button>
            </div>

            {/* NEWS LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '0 16px 16px' }}>
                {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="card" style={{ padding: 16, marginBottom: 10, height: 100 }}>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <div className="skeleton" style={{ width: 72, height: 72, borderRadius: 10, flexShrink: 0 }} />
                                <div style={{ flex: 1 }}>
                                    <div className="skeleton" style={{ height: 10, width: '40%', borderRadius: 4, marginBottom: 8 }} />
                                    <div className="skeleton" style={{ height: 12, width: '90%', borderRadius: 4, marginBottom: 4 }} />
                                    <div className="skeleton" style={{ height: 12, width: '70%', borderRadius: 4 }} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : filtered.map((n, i) => (
                    <button
                        key={n.id}
                        className={`card animate-fade-up delay-${Math.min(i + 1, 6)}`}
                        style={{ padding: '16px', marginBottom: 10, textAlign: 'left', cursor: 'pointer', width: '100%' }}
                        onClick={() => navigate(`/news/${n.id}`)}
                    >
                        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                            <div style={{
                                width: 72, height: 72, borderRadius: 10, flexShrink: 0,
                                background: 'linear-gradient(135deg, rgba(201,162,39,0.2), rgba(30,51,112,0.6))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem'
                            }}>
                                {n.thumb_emoji || catEmoji(n.categoria)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                                    <span className="badge badge-navy" style={{ fontSize: '0.62rem' }}>{n.categoria}</span>
                                    {n.is_hot && <span className="badge badge-live" style={{ fontSize: '0.62rem' }}>🔥</span>}
                                </div>
                                <p style={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.35, color: 'var(--cream)' }}>{n.titulo}</p>
                                <p className="text-xs text-muted" style={{ marginTop: 4 }}>{n.descricao.slice(0, 60)}...</p>
                                <p className="text-xs text-muted" style={{ marginTop: 4 }}>{timeAgo(n.created_at)}</p>
                            </div>
                            <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                        </div>
                    </button>
                ))}
                {!loading && filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '2rem' }}>🔍</p>
                        <p style={{ marginTop: 8 }}>Nada encontrado, parceiro!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
