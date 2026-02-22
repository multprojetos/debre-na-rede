import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Edit3 } from 'lucide-react'
import { useJogadores } from '../hooks/useJogadores'
import { useAuth } from '../contexts/AuthContext'

const positions: Record<string, string> = {
    GL: 'Goleiro', ZG: 'Zagueiro', LD: 'Lat. Dir.', LE: 'Lat. Esq.',
    VOL: 'Volante', MC: 'Meia', ALE: 'Ala Esq.', ALD: 'Ala Dir.', CA: 'Centro-Av.'
}

const posColors: Record<string, string> = {
    GL: '#E84040', ZG: '#2980B9', LD: '#27AE60', LE: '#27AE60',
    VOL: '#E87A40', MC: '#C9A227', ALE: '#9B59B6', ALD: '#9B59B6', CA: '#E84040',
}

export default function ElencoScreen() {
    const navigate = useNavigate()
    const { isAdmin } = useAuth()
    const [cat, setCat] = useState<'Aberto' | 'Master'>('Aberto')
    const [search, setSearch] = useState('')

    const { jogadores, loading } = useJogadores(cat)

    const filtered = jogadores.filter(p =>
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.pos.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div style={{ minHeight: '100vh', paddingBottom: 90, background: '#FAF9F6' }}>
            <header className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ flex: 1 }}>Elenco 2026</h2>
                {isAdmin && (
                    <button onClick={() => navigate('/admin')} style={{
                        padding: '6px 12px', borderRadius: 8, background: 'rgba(201,162,39,0.1)',
                        color: '#C9A227', border: '1px solid rgba(201,162,39,0.2)', fontSize: '0.68rem',
                        fontWeight: 700, fontFamily: 'Barlow Condensed, sans-serif', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 4
                    }}>
                        <Edit3 size={12} /> Gerenciar
                    </button>
                )}
            </header>

            <div style={{ padding: '14px 16px' }}>
                {/* TABS */}
                <div className="pill-tabs" style={{ marginBottom: 14 }}>
                    <button className={`pill-tab ${cat === 'Aberto' ? 'active' : ''}`} onClick={() => setCat('Aberto')}>
                        ⚽ Aberto
                    </button>
                    <button className={`pill-tab ${cat === 'Master' ? 'active' : ''}`} onClick={() => setCat('Master')}>
                        🏅 Master
                    </button>
                </div>

                {/* SEARCH */}
                <div style={{ position: 'relative', marginBottom: 14 }}>
                    <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input className="form-input" style={{ paddingLeft: 42, width: '100%' }}
                        placeholder="Buscar jogador..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>

                {/* COUNT */}
                {!loading && (
                    <p className="text-xs text-muted" style={{ marginBottom: 12 }}>
                        {filtered.length} jogador{filtered.length !== 1 ? 'es' : ''} · Categoria {cat}
                    </p>
                )}

                {/* PLAYER GRID */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="card skeleton" style={{ height: 160, borderRadius: 12 }} />
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {filtered.map((p, i) => (
                            <button
                                key={p.id}
                                className={`card animate-fade-up delay-${Math.min(i + 1, 6)}`}
                                style={{ padding: '16px 12px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}
                                onClick={() => navigate(`/elenco/${p.id}`)}
                            >
                                {/* Number badge */}
                                <div style={{
                                    position: 'absolute', top: 8, right: 8,
                                    width: 28, height: 28, borderRadius: '50%',
                                    background: 'rgba(201,162,39,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'Bebas Neue', fontSize: '0.9rem', color: 'var(--gold)',
                                }}>
                                    {p.number}
                                </div>

                                {/* Avatar — shows photo if available */}
                                <div className="avatar" style={{
                                    width: 68, height: 68, fontSize: '1.3rem', margin: '0 auto 10px',
                                    background: p.avatar_url
                                        ? 'transparent'
                                        : `linear-gradient(135deg, ${posColors[p.pos] ?? '#C9A227'}22, rgba(13,27,62,0.8))`,
                                    border: `2.5px solid ${posColors[p.pos] ?? '#C9A227'}60`,
                                }}>
                                    {p.avatar_url ? (
                                        <img src={p.avatar_url} alt={p.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).parentElement!.textContent = p.initials;
                                            }}
                                        />
                                    ) : (
                                        p.initials
                                    )}
                                </div>

                                <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>
                                    {p.name}
                                </p>
                                <span style={{
                                    display: 'inline-block', padding: '3px 8px', borderRadius: 20,
                                    background: `${posColors[p.pos] ?? '#C9A227'}20`, color: posColors[p.pos] ?? '#C9A227',
                                    border: `1px solid ${posColors[p.pos] ?? '#C9A227'}40`,
                                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em',
                                }}>
                                    {p.pos} · {positions[p.pos] ?? p.pos}
                                </span>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 10 }}>
                                    <div className="stat-box" style={{ flex: 1 }}>
                                        <span className="stat-value" style={{ fontSize: '1.1rem' }}>{p.gols}</span>
                                        <span className="stat-label">Gols</span>
                                    </div>
                                    <div className="stat-box" style={{ flex: 1 }}>
                                        <span className="stat-value" style={{ fontSize: '1.1rem' }}>{p.jogos}</span>
                                        <span className="stat-label">Jogos</span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
