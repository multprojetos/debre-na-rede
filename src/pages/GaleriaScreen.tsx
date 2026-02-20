import { ArrowLeft, Image, Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const albums = [
    { id: 1, title: 'Debrê 4×1 Vila Nova FC', date: '22 Fev', count: 28, type: 'Fotos', emoji: '📸' },
    { id: 2, title: 'Treino da Semana', date: '18 Fev', count: 12, type: 'Fotos', emoji: '⚽' },
    { id: 3, title: 'Gols da Rodada', date: '15 Fev', count: 4, type: 'Vídeos', emoji: '🎬' },
    { id: 4, title: 'Entrega dos Mantos 2026', date: '10 Fev', count: 18, type: 'Fotos', emoji: '👕' },
    { id: 5, title: 'Concentração pré-jogo', date: '08 Fev', count: 9, type: 'Fotos', emoji: '💪' },
]

const colors = ['#1E3370', '#0D2B50', '#1A2C5A', '#162848', '#1C3168']

export default function GaleriaScreen() {
    const navigate = useNavigate()

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1 }}>Galeria do Debrê</h2>
            </header>

            {/* FEATURED */}
            <div style={{ padding: '14px 16px 8px' }}>
                <div className="card card-glow" style={{
                    height: 200, marginBottom: 14,
                    background: 'linear-gradient(135deg, #1E3370, #0D1B3E)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12,
                    border: '1px solid rgba(201,162,39,0.3)', overflow: 'hidden', position: 'relative',
                }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,162,39,0.06), transparent)' }} />
                    <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>📸</div>
                    <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1.1rem', textAlign: 'center' }}>
                        Último Jogo · Debrê 4×1 Vila Nova
                    </p>
                    <span className="badge badge-gold">28 fotos</span>
                </div>

                {/* INSTAGRAM FEED CTA */}
                <div className="card" style={{
                    padding: '14px 16px', marginBottom: 14,
                    background: 'linear-gradient(90deg, rgba(200,55,175,0.1), rgba(253,149,45,0.1))',
                    border: '1px solid rgba(200,55,175,0.2)',
                    display: 'flex', alignItems: 'center', gap: 12,
                }}>
                    <div style={{ fontSize: '2rem' }}>📱</div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem' }}>Siga no Instagram</p>
                        <p className="text-xs text-muted">@debrefc · Conteúdo exclusivo toda semana</p>
                    </div>
                    <button className="btn btn-outline btn-sm" style={{ borderColor: 'rgba(200,55,175,0.4)', color: '#E040FB', flexShrink: 0 }}>
                        Seguir
                    </button>
                </div>

                {/* ALBUMS */}
                <p className="section-title" style={{ marginBottom: 12 }}>Álbuns</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {albums.map((a, i) => (
                        <button key={a.id} className={`card animate-fade-up delay-${Math.min(i + 1, 6)}`}
                            style={{ padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                            {/* Thumb grid */}
                            <div style={{
                                width: 70, height: 70, borderRadius: 10, flexShrink: 0,
                                background: colors[i % colors.length],
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '2rem', border: '1px solid rgba(201,162,39,0.15)', position: 'relative',
                            }}>
                                <span>{a.emoji}</span>
                                {a.type === 'Vídeos' && (
                                    <div style={{
                                        position: 'absolute', bottom: 4, right: 4,
                                        background: 'rgba(0,0,0,0.7)', borderRadius: '50%',
                                        width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Play size={10} fill="white" color="white" />
                                    </div>
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem', marginBottom: 2 }}>{a.title}</p>
                                <p className="text-xs text-muted">{a.date} · {a.count} {a.type}</p>
                            </div>
                            <Image size={18} color="var(--text-muted)" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
