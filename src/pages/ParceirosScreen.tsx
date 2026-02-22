import { useState } from 'react'
import { ArrowLeft, MapPin, Phone, MessageCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useParceiros } from '../hooks/useConteudo'
import type { Database } from '../lib/database.types'

type ParceiroCat = Database['public']['Enums']['parceiro_cat']

const CATS: ('Todos' | ParceiroCat)[] = ['Todos', 'Saúde', 'Supermercado', 'Automotivo', 'Alimentação', 'Serviços', 'Outros']

const catEmojis: Record<string, string> = {
    Todos: '🌟', Saúde: '🏥', Supermercado: '🛒', Automotivo: '🚗', Alimentação: '🍕', Serviços: '🔧', Outros: '🤝'
}

export default function ParceirosScreen() {
    const navigate = useNavigate()
    const [cat, setCat] = useState<string>('Todos')

    const { parceiros, loading } = useParceiros(cat)

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1 }}>Parceiros do Debre</h2>
            </header>

            <div style={{ padding: '14px 16px' }}>
                {/* HERO */}
                <div className="card card-glow" style={{ padding: '18px', marginBottom: 18, textAlign: 'center', background: 'linear-gradient(135deg, rgba(30,51,112,0.9), rgba(13,27,62,0.95))' }}>
                    <p style={{ fontSize: '2.4rem', marginBottom: 8 }}>🤝</p>
                    <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.3rem', fontWeight: 800, marginBottom: 4 }}>
                        Parceiros que acreditam no Debre!
                    </h3>
                    <p className="text-sm text-muted">
                        Valorize quem apoia o nosso futebol, mermão!
                    </p>
                </div>

                {/* CATEGORIA PILLS */}
                <div className="scroll-row" style={{ marginBottom: 16, padding: '4px 0' }}>
                    {CATS.map(c => (
                        <button
                            key={c}
                            className={`badge ${cat === c ? 'badge-gold' : 'badge-navy'}`}
                            style={{ flexShrink: 0, padding: '7px 14px', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                            onClick={() => setCat(c)}
                        >
                            {catEmojis[c]} {c}
                        </button>
                    ))}
                </div>

                {/* PARTNER CARDS */}
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: 120, borderRadius: 12 }} />
                        ))}
                    </div>
                ) : parceiros.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                        <p style={{ fontSize: '2rem' }}>🤷</p>
                        <p style={{ marginTop: 8 }}>Nenhum parceiro aqui ainda!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {parceiros.map((p, i) => (
                            <div key={p.id} className={`card animate-fade-up delay-${Math.min(i + 1, 6)}`} style={{
                                padding: '16px',
                                borderLeft: `4px solid ${p.cor}`,
                            }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{
                                        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                                        background: `${p.cor}18`, border: `1px solid ${p.cor}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
                                    }}>
                                        {p.emoji}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1.05rem' }}>{p.name}</p>
                                        <span className="badge badge-navy" style={{ fontSize: '0.62rem', marginTop: 4 }}>{p.categoria}</span>
                                        <p className="text-xs text-muted" style={{ marginTop: 6, lineHeight: 1.5 }}>{p.descricao}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {p.endereco && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.75rem', color: 'var(--text-muted)', flex: 1 }}>
                                            <MapPin size={12} />
                                            {p.endereco}
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        {p.telefone && (
                                            <a href={`tel:${p.telefone}`} className="btn btn-outline btn-sm" style={{ gap: 6, textDecoration: 'none' }}>
                                                <Phone size={13} /> Ligar
                                            </a>
                                        )}
                                        {p.whatsapp && (
                                            <a
                                                href={`https://wa.me/${p.whatsapp.replace(/\D/g, '')}`}
                                                target="_blank" rel="noreferrer"
                                                className="btn btn-sm"
                                                style={{ gap: 6, background: '#25D366', color: '#fff', border: 'none', textDecoration: 'none', borderRadius: 'var(--debre-radius-md)', padding: '8px 14px', display: 'flex', alignItems: 'center', fontSize: '0.8rem', fontWeight: 700 }}
                                            >
                                                <MessageCircle size={13} /> WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
