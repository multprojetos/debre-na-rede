import { useState, useContext } from 'react'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ToastCtx } from '../App'
import { useMantos } from '../hooks/useConteudo'

export default function MantoScreen() {
    const navigate = useNavigate()
    const showToast = useContext(ToastCtx)
    const { mantos, loading } = useMantos()
    const [selected, setSelected] = useState<number | null>(null)

    const novosMantos = mantos.filter(m => m.is_new)
    const destaque = novosMantos[0] ?? mantos[0]

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1 }}>Manto Sagrado</h2>
            </header>

            <div style={{ padding: '16px' }}>
                {/* NEW MANTO HIGHLIGHT */}
                {!loading && destaque && (
                    <div className="card card-glow" style={{
                        padding: '20px', marginBottom: 20,
                        background: 'linear-gradient(135deg, #1E3370, #0D1B3E)',
                        position: 'relative', overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', top: -30, right: -30, fontSize: '8rem', opacity: 0.08 }}>👕</div>
                        {destaque.is_new && <span className="badge badge-live" style={{ marginBottom: 10 }}>🆕 Novo Manto</span>}
                        <h2 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.5rem', fontWeight: 800, marginBottom: 4 }}>
                            Uniforme {destaque.ano} — {destaque.tipo}
                        </h2>
                        <p className="text-sm text-muted" style={{ marginBottom: 14, lineHeight: 1.5 }}>
                            {destaque.descricao ?? `${destaque.cor_nome}. Garanta o seu, mermão!`}
                        </p>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
                            {destaque.preco ? (
                                <>
                                    <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.6rem', color: 'var(--gold)' }}>
                                        R$ {destaque.preco.toFixed(2)}
                                    </span>
                                    {destaque.preco_original && (
                                        <>
                                            <span className="text-xs text-muted" style={{ textDecoration: 'line-through' }}>
                                                R$ {destaque.preco_original.toFixed(2)}
                                            </span>
                                            <span className="badge badge-green">
                                                -{Math.round((1 - destaque.preco / destaque.preco_original) * 100)}%
                                            </span>
                                        </>
                                    )}
                                </>
                            ) : (
                                <span style={{ fontFamily: 'Bebas Neue', fontSize: '1.4rem', color: 'var(--text-muted)' }}>Esgotado</span>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button className="btn btn-primary" style={{ flex: 1, gap: 8 }}
                                onClick={() => showToast('Reserva feita! Entraremos em contato! 📦')}>
                                <ShoppingBag size={16} /> Ver o Manto!
                            </button>
                            <button className="btn btn-outline" style={{ flex: 1 }}
                                onClick={() => showToast('Pré-venda registrada! 🦅')}>
                                Pré-venda
                            </button>
                        </div>
                    </div>
                )}

                {loading && <div className="skeleton" style={{ height: 200, borderRadius: 12, marginBottom: 20 }} />}

                {/* GALLERY GRID */}
                <p className="section-title" style={{ marginBottom: 14 }}>História dos Mantos</p>
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: 160, borderRadius: 12 }} />
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {mantos.map((u, i) => (
                            <button
                                key={u.id}
                                className={`card animate-fade-up delay-${Math.min(i + 1, 6)}`}
                                style={{
                                    padding: '16px', textAlign: 'center', position: 'relative',
                                    border: selected === u.id ? '1.5px solid var(--gold)' : undefined,
                                    cursor: 'pointer',
                                }}
                                onClick={() => setSelected(selected === u.id ? null : u.id)}
                            >
                                {u.is_new && <span className="badge badge-live" style={{ position: 'absolute', top: 8, right: 8, fontSize: '0.58rem', padding: '2px 6px' }}>NOVO</span>}
                                <div style={{
                                    fontSize: '4rem', marginBottom: 10, height: 72,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    filter: u.esgotado ? 'grayscale(0.7) opacity(0.6)' : 'none',
                                }}>
                                    {u.emoji}
                                </div>
                                <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem' }}>
                                    {u.tipo} {u.ano}
                                </p>
                                <p className="text-xs text-muted" style={{ marginTop: 2 }}>{u.cor_nome}</p>
                                <p style={{
                                    marginTop: 8, fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.9rem',
                                    color: u.esgotado ? 'var(--text-muted)' : 'var(--gold)',
                                }}>
                                    {u.esgotado ? 'Esgotado' : u.preco ? `R$ ${u.preco.toFixed(2)}` : '—'}
                                </p>
                                {selected === u.id && !u.esgotado && (
                                    <button
                                        className="btn btn-primary btn-sm btn-full"
                                        style={{ marginTop: 10 }}
                                        onClick={(e) => { e.stopPropagation(); showToast('Reserva feita! 🏆') }}
                                    >
                                        Reservar
                                    </button>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                <div className="card" style={{ padding: '14px 16px', marginTop: 14 }}>
                    <p className="text-xs text-muted" style={{ lineHeight: 1.6, textAlign: 'center' }}>
                        📦 Entrega para Carmo-RJ e região · 📲 Pedidos pelo app · ✉️ contato@debrefc.com.br
                    </p>
                </div>
            </div>
        </div>
    )
}
