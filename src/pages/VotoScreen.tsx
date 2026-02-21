import { useState, useContext, useEffect } from 'react'
import { Star, Trophy, Zap } from 'lucide-react'
import { ToastCtx } from '../App'
import { useAuth } from '../contexts/AuthContext'
import { useUltimaPartida } from '../hooks/useNoticias'
import { useVotos } from '../hooks/useVotos'
import { useNavigate } from 'react-router-dom'

function formatPartida(p: { adversario: string; gols_debre: number; gols_adversario: number; data_hora: string; campeonato: string | null }) {
    const d = new Date(p.data_hora)
    const day = d.getDate()
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    return {
        placar: `Debrê ${p.gols_debre} × ${p.gols_adversario} ${p.adversario}`,
        data: `${day} ${months[d.getMonth()]} ${d.getFullYear()} · ${p.campeonato ?? ''}`,
    }
}

export default function VotoScreen() {
    const navigate = useNavigate()
    const showToast = useContext(ToastCtx)
    const { user, isLoggedIn } = useAuth()
    const { partida, loading: loadingPartida } = useUltimaPartida()
    const { jogadores, gols, votosJogador, votosGol, meuVotoCraque, meuVotoGol,
        totalVotosCraque, loading, loadMeusVotos, votarCraque, votarGol } = useVotos(partida?.id ?? null)

    const [tab, setTab] = useState<'craque' | 'gol'>('craque')

    useEffect(() => {
        if (partida && user) loadMeusVotos(user.id)
    }, [partida, user, loadMeusVotos])

    const handleVoteCraque = async (jogadorId: number) => {
        if (!isLoggedIn) { showToast('Faça login para votar! 🔐'); navigate('/login'); return }
        if (meuVotoCraque) return
        const ok = await votarCraque(user!.id, jogadorId)
        if (ok) showToast('É gol! Voto registrado, mermão! 🏆')
        else showToast('Erro ao registrar voto. Tente novamente.')
    }

    const handleVoteGol = async (golId: number) => {
        if (!isLoggedIn) { showToast('Faça login para votar! 🔐'); navigate('/login'); return }
        if (meuVotoGol) return
        const ok = await votarGol(user!.id, golId)
        if (ok) showToast('Voto no Gol Mais Bonito registrado! 🎯')
        else showToast('Erro ao registrar voto. Tente novamente.')
    }

    return (
        <div>
            <header className="page-header">
                <Trophy size={20} color="var(--gold)" />
                <h2 style={{ flex: 1 }}>Voto do Torcedor</h2>
            </header>

            <div style={{ padding: '12px 16px 0' }}>
                {/* MATCH LABEL */}
                {loadingPartida ? (
                    <div className="skeleton" style={{ height: 70, borderRadius: 12, marginBottom: 14 }} />
                ) : partida ? (() => {
                    const { placar, data } = formatPartida(partida)
                    return (
                        <div className="card" style={{
                            padding: '14px', marginBottom: 14,
                            background: 'linear-gradient(135deg, rgba(30,51,112,0.9), rgba(13,27,62,0.95))',
                            border: '1px solid rgba(201,162,39,0.3)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span className="badge badge-live"><Zap size={10} fill="currentColor" /> Ativo</span>
                                <span className="text-xs text-muted">Votação aberta</span>
                            </div>
                            <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1.1rem' }}>{placar}</p>
                            <p className="text-xs text-muted" style={{ marginTop: 2 }}>{data}</p>
                        </div>
                    )
                })() : null}

                {/* TABS */}
                <div className="pill-tabs" style={{ marginBottom: 16 }}>
                    <button className={`pill-tab ${tab === 'craque' ? 'active' : ''}`} onClick={() => setTab('craque')}>
                        ⭐ Craque do Jogo
                    </button>
                    <button className={`pill-tab ${tab === 'gol' ? 'active' : ''}`} onClick={() => setTab('gol')}>
                        🎯 Gol Mais Bonito
                    </button>
                </div>

                {/* CRAQUE VOTING */}
                {tab === 'craque' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {meuVotoCraque && (
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 'var(--radius-md)', marginBottom: 4 }}>
                                <p style={{ color: '#27AE60', fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
                                    ✅ Voto computado! Obrigado, torcedor!
                                </p>
                            </div>
                        )}
                        {loading ? Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: 72, borderRadius: 12 }} />
                        )) : jogadores.map((j, i) => {
                            const totalVotos = votosJogador[j.id] ?? 0
                            const pct = totalVotosCraque > 0 ? Math.round((totalVotos / totalVotosCraque) * 100) : 0
                            const isVoted = meuVotoCraque === j.id
                            return (
                                <button
                                    key={j.id}
                                    className={`card animate-fade-up delay-${i + 1}`}
                                    style={{
                                        padding: '14px 16px', textAlign: 'left', cursor: meuVotoCraque ? 'default' : 'pointer',
                                        border: isVoted ? '1.5px solid var(--gold)' : undefined,
                                        boxShadow: isVoted ? 'var(--shadow-gold)' : undefined,
                                    }}
                                    onClick={() => handleVoteCraque(j.id)}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: meuVotoCraque ? 10 : 0 }}>
                                        <div className="avatar" style={{ width: 46, height: 46, fontSize: '1rem', background: isVoted ? 'rgba(201,162,39,0.2)' : 'rgba(30,51,112,0.8)', border: isVoted ? '2px solid var(--gold)' : '' }}>
                                            {j.initials}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem' }}>{j.name}</p>
                                            <p className="text-xs text-muted">#{j.number} · {j.gols > 0 ? `${j.gols} gol(s)` : 'Destaque no jogo'}</p>
                                        </div>
                                        {isVoted
                                            ? <Star size={22} color="var(--gold)" fill="var(--gold)" />
                                            : meuVotoCraque ? <span className="text-xs text-muted">{pct}%</span>
                                                : <div className="btn btn-outline btn-sm" style={{ pointerEvents: 'none', padding: '6px 12px' }}>Votar</div>
                                        }
                                    </div>
                                    {meuVotoCraque && (
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span className="text-xs text-muted">{totalVotos} votos</span>
                                                <span className="text-xs" style={{ color: isVoted ? 'var(--gold)' : 'var(--text-muted)' }}>{pct}%</span>
                                            </div>
                                            <div style={{ height: 6, background: 'rgba(0,0,0,0.08)', borderRadius: 3 }}>
                                                <div style={{
                                                    height: '100%', width: `${pct}%`,
                                                    background: isVoted ? 'linear-gradient(90deg, var(--gold-dark), var(--gold))' : 'rgba(0,0,0,0.15)',
                                                    borderRadius: 3, transition: 'width 0.8s ease',
                                                }} />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                )}

                {/* GOL MAIS BONITO */}
                {tab === 'gol' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {meuVotoGol && (
                            <div style={{ textAlign: 'center', padding: '12px', background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.3)', borderRadius: 'var(--radius-md)', marginBottom: 4 }}>
                                <p style={{ color: '#27AE60', fontFamily: 'Barlow Condensed', fontWeight: 700 }}>✅ Voto no gol mais bonito computado!</p>
                            </div>
                        )}
                        {loading ? Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: 80, borderRadius: 12 }} />
                        )) : gols.map((g, i) => {
                            const isVoted = meuVotoGol === g.id
                            const totalVotos = votosGol[g.id] ?? 0
                            return (
                                <button
                                    key={g.id}
                                    className={`card animate-fade-up delay-${i + 1}`}
                                    style={{
                                        padding: '16px', textAlign: 'left', cursor: meuVotoGol ? 'default' : 'pointer',
                                        border: isVoted ? '1.5px solid var(--gold)' : undefined,
                                        boxShadow: isVoted ? 'var(--shadow-gold)' : undefined,
                                    }}
                                    onClick={() => handleVoteGol(g.id)}
                                >
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <div style={{ fontSize: '2.5rem', width: 56, textAlign: 'center' }}>{g.emoji}</div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1.05rem', color: isVoted ? 'var(--gold)' : 'var(--text-primary)' }}>
                                                Gol de {g.jogador_nome} — {g.minuto}
                                            </p>
                                            <p className="text-xs text-muted" style={{ marginTop: 3 }}>{g.descricao}</p>
                                            {meuVotoGol && <p style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: 4 }}>{totalVotos} votos</p>}
                                        </div>
                                        {!meuVotoGol && <div className="btn btn-outline btn-sm" style={{ pointerEvents: 'none', flexShrink: 0 }}>Votar</div>}
                                        {isVoted && <Star size={22} color="var(--gold)" fill="var(--gold)" />}
                                    </div>
                                </button>
                            )
                        })}
                        {!loading && gols.length === 0 && (
                            <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                                <p style={{ fontSize: '2rem' }}>⚽</p>
                                <p style={{ marginTop: 8 }}>Nenhum gol registrado ainda</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
