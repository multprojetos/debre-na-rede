import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BarChart2 } from 'lucide-react'
import { useJogador } from '../hooks/useJogadores'

const positions: Record<string, string> = {
    GL: 'Goleiro', ZG: 'Zagueiro', LD: 'Lat. Dir.', LE: 'Lat. Esq.',
    VOL: 'Volante', MC: 'Meia', ALE: 'Ala Esq.', ALD: 'Ala Dir.', CA: 'Centro-Av.'
}

const posColors: Record<string, string> = {
    GL: '#E84040', ZG: '#2980B9', LD: '#27AE60', LE: '#27AE60',
    VOL: '#E87A40', MC: '#C9A227', ALE: '#9B59B6', ALD: '#9B59B6', CA: '#E84040',
}

export default function PlayerProfile() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { jogador: p, loading } = useJogador(id ?? '0')

    if (loading) {
        return (
            <div>
                <header className="page-header">
                    <button className="page-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
                    <h2 style={{ flex: 1 }}>Carregando...</h2>
                </header>
                <div style={{ padding: 16 }}>
                    <div className="skeleton" style={{ height: 200, borderRadius: 12, marginBottom: 16 }} />
                    <div className="skeleton" style={{ height: 100, borderRadius: 12 }} />
                </div>
            </div>
        )
    }

    if (!p) {
        return (
            <div>
                <header className="page-header">
                    <button className="page-back-btn" onClick={() => navigate(-1)}><ArrowLeft size={18} /></button>
                    <h2 style={{ flex: 1 }}>Jogador não encontrado</h2>
                </header>
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                    <p style={{ fontSize: '3rem' }}>🤷</p>
                    <p style={{ marginTop: 12 }}>Jogador não encontrado</p>
                </div>
            </div>
        )
    }

    const color = posColors[p.pos] ?? '#C9A227'
    const aproveitamento = p.jogos > 0 ? Math.round((p.gols / Math.max(p.jogos, 1)) * 100) : 0

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1 }}>Perfil do Jogador</h2>
            </header>

            <div style={{ padding: '16px' }}>
                {/* HERO CARD */}
                <div className="card card-glow" style={{
                    padding: '24px 20px', marginBottom: 16, textAlign: 'center',
                    background: `linear-gradient(135deg, rgba(30,51,112,0.95), rgba(13,27,62,0.98))`,
                    border: `1px solid ${color}30`, position: 'relative', overflow: 'hidden',
                }}>
                    {/* Número de fundo */}
                    <div style={{
                        position: 'absolute', top: -10, right: -10,
                        fontFamily: 'Bebas Neue', fontSize: '8rem', color: `${color}08`, lineHeight: 1,
                        userSelect: 'none',
                    }}>
                        {p.number}
                    </div>

                    {/* Avatar */}
                    <div className="avatar" style={{
                        width: 80, height: 80, fontSize: '1.8rem', margin: '0 auto 14px',
                        background: `linear-gradient(135deg, ${color}30, rgba(13,27,62,0.9))`,
                        border: `3px solid ${color}60`, boxShadow: `0 0 20px ${color}30`,
                    }}>
                        {p.initials}
                    </div>

                    <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.6rem', fontWeight: 800, marginBottom: 4 }}>
                        {p.name}
                    </h2>

                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 4 }}>
                        <span style={{
                            padding: '4px 12px', borderRadius: 20,
                            background: `${color}20`, color, border: `1px solid ${color}40`,
                            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em',
                        }}>
                            #{p.number} · {p.pos} · {positions[p.pos] ?? p.pos}
                        </span>
                    </div>

                    <p className="text-xs text-muted">{p.categoria}</p>
                </div>

                {/* STATS GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
                    {[
                        { label: 'Gols', value: p.gols, icon: '⚽' },
                        { label: 'Jogos', value: p.jogos, icon: '🏟️' },
                        { label: 'Assists', value: p.assists, icon: '🎯' },
                    ].map(s => (
                        <div key={s.label} className="stat-box animate-scale">
                            <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* PERFORMANCE */}
                <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                        <BarChart2 size={16} color="var(--gold)" />
                        <p className="section-title" style={{ background: 'none' }}>Desempenho</p>
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span className="text-xs text-muted">Gols / Jogo</span>
                            <span className="text-xs" style={{ color: 'var(--gold)' }}>{p.jogos > 0 ? (p.gols / p.jogos).toFixed(2) : '0.00'}</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 3 }}>
                            <div style={{
                                height: '100%', width: `${Math.min(aproveitamento * 3, 100)}%`,
                                background: `linear-gradient(90deg, ${color}80, ${color})`,
                                borderRadius: 3, transition: 'width 0.8s ease',
                            }} />
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                            <span className="text-xs text-muted">Assists / Jogo</span>
                            <span className="text-xs" style={{ color: '#27AE60' }}>{p.jogos > 0 ? (p.assists / p.jogos).toFixed(2) : '0.00'}</span>
                        </div>
                        <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 3 }}>
                            <div style={{
                                height: '100%', width: `${Math.min((p.assists / Math.max(p.jogos, 1)) * 100 * 3, 100)}%`,
                                background: 'linear-gradient(90deg, #27AE6080, #27AE60)',
                                borderRadius: 3, transition: 'width 0.8s ease',
                            }} />
                        </div>
                    </div>
                </div>

                {/* BIO */}
                {p.bio && (
                    <div className="card" style={{ padding: '16px' }}>
                        <p className="section-title" style={{ background: 'none', marginBottom: 8 }}>Sobre o Jogador</p>
                        <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>{p.bio}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
