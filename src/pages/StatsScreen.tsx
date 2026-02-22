import { useState } from 'react'
import { BarChart2 } from 'lucide-react'
import { useTeamStats, useClassificacao, useArtilharia, useAssistencias } from '../hooks/useStats'

const rankColors = ['#C9A227', '#9E9E9E', '#CD7F32']

export default function StatsScreen() {
    const [cat, setCat] = useState<'Aberto' | 'Master'>('Aberto')
    const [section, setSection] = useState<'time' | 'artilharia' | 'assists'>('time')

    const { stats, loading: loadingStats } = useTeamStats(cat)
    const { tabela, loading: loadingTabela } = useClassificacao(cat)
    const { artilheiros, loading: loadingArt } = useArtilharia(cat)
    const { assistencias, loading: loadingAss } = useAssistencias(cat)

    const aproveitamento = stats
        ? Math.round((stats.vitorias / Math.max(stats.jogos, 1)) * 100)
        : 0

    return (
        <div style={{ minHeight: '100dvh', paddingBottom: 80, background: '#FAF9F6' }}>
            <header className="page-header">
                <BarChart2 size={20} color="var(--gold)" />
                <h2 style={{ flex: 1 }}>Debre-Stats Carmense</h2>
            </header>

            <div style={{ padding: '14px 16px' }}>
                {/* CATEGORY TABS */}
                <div className="pill-tabs" style={{ marginBottom: 16 }}>
                    <button className={`pill-tab ${cat === 'Aberto' ? 'active' : ''}`} onClick={() => setCat('Aberto')}>⚽ Aberto</button>
                    <button className={`pill-tab ${cat === 'Master' ? 'active' : ''}`} onClick={() => setCat('Master')}>🏅 Master</button>
                </div>

                {/* SECTION PILLS */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    {[
                        { key: 'time', label: 'Time' },
                        { key: 'artilharia', label: 'Artilharia' },
                        { key: 'assists', label: 'Assistências' },
                    ].map(s => (
                        <button
                            key={s.key}
                            className={`badge ${section === s.key ? 'badge-gold' : 'badge-navy'}`}
                            style={{ cursor: 'pointer', padding: '8px 14px', fontSize: '0.75rem' }}
                            onClick={() => setSection(s.key as typeof section)}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* TIME STATS */}
                {section === 'time' && (
                    <div className="animate-fade-up">
                        {loadingStats ? (
                            <div className="skeleton" style={{ height: 160, borderRadius: 12, marginBottom: 14 }} />
                        ) : stats ? (
                            <>
                                <div className="card card-glow" style={{ padding: '18px', marginBottom: 14 }}>
                                    <p className="text-xs" style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
                                        Campeonato Municipal 2026 · {cat}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', color: '#27AE60', lineHeight: 1 }}>{stats.vitorias}</p>
                                            <p className="text-xs text-muted">Vitórias</p>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', color: 'var(--gold)', lineHeight: 1 }}>{stats.empates}</p>
                                            <p className="text-xs text-muted">Empates</p>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontFamily: 'Bebas Neue', fontSize: '3rem', color: 'var(--danger)', lineHeight: 1 }}>{stats.derrotas}</p>
                                            <p className="text-xs text-muted">Derrotas</p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 14 }}>
                                        <div style={{ display: 'flex', gap: 3, height: 10, borderRadius: 5, overflow: 'hidden' }}>
                                            <div style={{ flex: stats.vitorias, background: '#27AE60', borderRadius: '5px 0 0 5px' }} />
                                            <div style={{ flex: stats.empates, background: 'var(--gold)' }} />
                                            <div style={{ flex: stats.derrotas, background: 'var(--danger)', borderRadius: '0 5px 5px 0' }} />
                                        </div>
                                        <p className="text-xs text-muted" style={{ textAlign: 'center', marginTop: 4 }}>{aproveitamento}% aproveitamento</p>
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
                                    {[
                                        { label: 'Jogos', value: stats.jogos, icon: '⚽' },
                                        { label: 'Vitórias', value: stats.vitorias, icon: '🏆' },
                                        { label: 'Empates', value: stats.empates, icon: '🤝' },
                                        { label: 'Derrotas', value: stats.derrotas, icon: '❌' },
                                        { label: 'Gols Pró', value: stats.gols_pro, icon: '⬆️' },
                                        { label: 'Gols Contra', value: stats.gols_contra, icon: '⬇️' },
                                    ].map(s => (
                                        <div key={s.label} className="stat-box animate-scale">
                                            <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                                            <span className="stat-value">{s.value}</span>
                                            <span className="stat-label">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : null}

                        {/* TABELA */}
                        {loadingTabela ? (
                            <div className="skeleton" style={{ height: 160, borderRadius: 12 }} />
                        ) : (
                            <div className="card" style={{ overflow: 'hidden' }}>
                                <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(201,162,39,0.15)' }}>
                                    <p className="section-title" style={{ background: 'none' }}>Tabela de Classificação</p>
                                </div>
                                {tabela.map(row => (
                                    <div key={row.id} style={{
                                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
                                        borderBottom: '1px solid rgba(0,0,0,0.04)',
                                        background: row.posicao === 1 ? 'rgba(201,162,39,0.06)' : 'transparent',
                                    }}>
                                        <span style={{
                                            width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'Bebas Neue', fontSize: '0.85rem',
                                            background: row.posicao <= 3 ? `${rankColors[row.posicao - 1]}25` : 'transparent',
                                            color: row.posicao <= 3 ? rankColors[row.posicao - 1] : 'var(--text-muted)',
                                            border: row.posicao <= 3 ? `1px solid ${rankColors[row.posicao - 1]}50` : 'none',
                                        }}>{row.posicao}</span>
                                        <span style={{ flex: 1, fontFamily: 'Barlow Condensed', fontWeight: row.posicao === 1 ? 700 : 400, fontSize: '0.88rem', color: row.posicao === 1 ? 'var(--text-primary)' : 'var(--text-muted)' }}>{row.nome_time}</span>
                                        <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.1rem', color: row.posicao === 1 ? 'var(--gold)' : 'var(--text-primary)' }}>{row.pontos}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ARTILHARIA */}
                {section === 'artilharia' && (
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <p className="text-xs text-muted" style={{ marginBottom: 4 }}>Categoria {cat} · Temporada 2026</p>
                        {loadingArt ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: 60, borderRadius: 12 }} />
                            ))
                        ) : artilheiros.length > 0 ? artilheiros.map((a, i) => (
                            <div key={a.id} className={`card animate-fade-up delay-${i + 1}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'Bebas Neue', fontSize: '1rem', flexShrink: 0,
                                    background: i < 3 ? `${rankColors[i]}20` : 'rgba(0,0,0,0.06)',
                                    color: i < 3 ? rankColors[i] : 'var(--text-muted)',
                                    border: i < 3 ? `1px solid ${rankColors[i]}40` : 'none',
                                }}>
                                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : a.rank}
                                </div>
                                <div className="avatar" style={{ width: 40, height: 40, fontSize: '0.85rem', background: 'rgba(30,51,112,0.8)' }}>
                                    {a.initials}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem' }}>{a.name}</p>
                                    <p className="text-xs text-muted">#{a.number}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: 'var(--gold)', lineHeight: 1 }}>{a.gols}</span>
                                    <span className="text-xs text-muted">gols</span>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
                                <p style={{ fontSize: '2rem' }}>📊</p>
                                <p style={{ marginTop: 8 }}>Dados em breve, parceiro!</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ASSISTÊNCIAS */}
                {section === 'assists' && (
                    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <p className="text-xs text-muted" style={{ marginBottom: 4 }}>Categoria {cat} · Temporada 2026</p>
                        {loadingAss ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="skeleton" style={{ height: 60, borderRadius: 12 }} />
                            ))
                        ) : assistencias.length > 0 ? assistencias.map((a, i) => (
                            <div key={a.id} className={`card animate-fade-up delay-${i + 1}`} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'Bebas Neue', fontSize: '1rem', flexShrink: 0,
                                    background: i < 3 ? `${rankColors[i]}20` : 'rgba(0,0,0,0.06)',
                                    color: i < 3 ? rankColors[i] : 'var(--text-muted)',
                                }}>
                                    {i < 3 ? ['🥇', '🥈', '🥉'][i] : a.rank}
                                </div>
                                <div className="avatar" style={{ width: 40, height: 40, fontSize: '0.85rem', background: 'rgba(30,51,112,0.8)' }}>
                                    {a.initials}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem' }}>{a.name}</p>
                                    <p className="text-xs text-muted">#{a.number}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem', color: '#27AE60', lineHeight: 1 }}>{a.assists}</span>
                                    <span className="text-xs text-muted">assist.</span>
                                </div>
                            </div>
                        )) : (
                            <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
                                <p style={{ fontSize: '2rem' }}>📊</p>
                                <p style={{ marginTop: 8 }}>Dados em breve, parceiro!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
