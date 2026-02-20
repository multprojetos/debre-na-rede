import { useNavigate } from 'react-router-dom'
import { Bell, Calendar, ChevronRight, Flame, MapPin, Shield, Star, Trophy, Zap } from 'lucide-react'
import DebreBadge from '../components/DebreBadge'
import { useNoticias, useProximaPartida } from '../hooks/useNoticias'
import '../styles/Home.css'

const quickLinks = [
    { icon: Trophy, label: 'Voto do\nTorcedor', path: '/voto', color: '#E84040' },
    { icon: Shield, label: 'Manto\nSagrado', path: '/manto', color: '#C9A227' },
    { icon: Star, label: 'Debre\nStats', path: '/stats', color: '#27AE60' },
    { icon: Flame, label: 'Resenha\ndo Interior', path: '/resenha', color: '#E87A40' },
]

function formatDate(iso: string) {
    const d = new Date(iso)
    const day = d.getDate()
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return { date: `${day} ${months[d.getMonth()]}`, time: `${hours}:${minutes}` }
}

function timeAgo(iso: string): string {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000
    if (diff < 3600) return `${Math.floor(diff / 60)}min`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d atrás`
    return `${Math.floor(diff / 604800)}s atrás`
}

const MOCK_PARCEIROS = ['Farmácia Central', 'Mercadão Carmo', 'Auto Peças Silva', 'Sorveteria Gelé']

export default function HomeScreen() {
    const navigate = useNavigate()
    const { noticias, loading: loadingNews } = useNoticias()
    const { partida: proximaPartida, loading: loadingPartida } = useProximaPartida()

    const ultimasNoticias = noticias.slice(0, 3)

    return (
        <div className="home-screen">
            {/* TOP BAR */}
            <header className="home-header">
                <DebreBadge size={36} />
                <div className="home-header-title">
                    <span className="font-condensed" style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
                        Debreceni FC
                    </span>
                    <span className="font-display" style={{ fontSize: '1.4rem', color: 'var(--cream)', lineHeight: 1 }}>
                        DEBRE NA REDE
                    </span>
                </div>
                <button className="home-notif-btn" onClick={() => { }}>
                    <Bell size={20} />
                    <span className="notif-dot" />
                </button>
            </header>

            {/* NEXT MATCH HERO */}
            <section className="match-hero animate-fade-up">
                <div className="match-hero-label">
                    <Zap size={12} fill="currentColor" />
                    Próxima Partida
                </div>
                {loadingPartida ? (
                    <div className="match-teams" style={{ justifyContent: 'center', padding: '12px 0' }}>
                        <p className="text-sm text-muted">Carregando...</p>
                    </div>
                ) : proximaPartida ? (() => {
                    const { date, time } = formatDate(proximaPartida.data_hora)
                    return (
                        <>
                            <div className="match-teams">
                                <div className="match-team">
                                    <DebreBadge size={52} />
                                    <span className="font-condensed" style={{ fontWeight: 700, fontSize: '0.9rem' }}>DEBRÊ</span>
                                </div>
                                <div className="match-vs">
                                    <span className="font-display" style={{ fontSize: '2rem', color: 'var(--gold)' }}>VS</span>
                                    <div className="match-time">
                                        <Calendar size={12} />
                                        {date} · {time}
                                    </div>
                                </div>
                                <div className="match-team">
                                    <div className="avatar" style={{ width: 52, height: 52, fontSize: '1.1rem', background: 'rgba(255,255,255,0.08)', border: '2px solid rgba(255,255,255,0.15)' }}>
                                        {proximaPartida.adversario_iniciais}
                                    </div>
                                    <span className="font-condensed" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{proximaPartida.adversario.split(' ')[0]}</span>
                                </div>
                            </div>
                            <div className="match-local">
                                <MapPin size={12} />
                                {proximaPartida.local}
                            </div>
                        </>
                    )
                })() : (
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                        <p className="text-sm text-muted">Nenhuma partida agendada</p>
                    </div>
                )}
            </section>

            {/* QUICK LINKS */}
            <section className="home-section animate-fade-up delay-1">
                <div className="section-header">
                    <span className="section-title">Atalhos</span>
                </div>
                <div className="quick-links-grid">
                    {quickLinks.map(({ icon: Icon, label, path, color }) => (
                        <button key={path} className="quick-link-btn card" onClick={() => navigate(path)}>
                            <div className="quick-icon" style={{ color, background: `${color}18`, borderColor: `${color}30` }}>
                                <Icon size={22} />
                            </div>
                            <span className="font-condensed" style={{ fontSize: '0.78rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.2 }}>
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* LATEST NEWS */}
            <section className="home-section animate-fade-up delay-2">
                <div className="section-header">
                    <span className="section-title">Últimas do Debrê</span>
                    <button className="section-link" onClick={() => navigate('/news')}>Ver tudo</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {loadingNews ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="card news-card-home" style={{ height: 72 }}>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                    <div className="news-thumb-home skeleton" />
                                    <div style={{ flex: 1 }}>
                                        <div className="skeleton" style={{ height: 12, width: '60%', borderRadius: 4, marginBottom: 6 }} />
                                        <div className="skeleton" style={{ height: 10, width: '90%', borderRadius: 4 }} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : ultimasNoticias.map((n, i) => (
                        <button
                            key={n.id}
                            className={`card news-card-home animate-fade-up delay-${i + 2}`}
                            onClick={() => navigate(`/news/${n.id}`)}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                <div className="news-thumb-home skeleton" />
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4 }}>
                                        <span className="badge badge-navy" style={{ fontSize: '0.62rem', padding: '2px 7px' }}>{n.categoria}</span>
                                        {n.is_hot && <span className="badge badge-live" style={{ fontSize: '0.62rem', padding: '2px 7px' }}>🔥 Hot</span>}
                                    </div>
                                    <p style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.35, color: 'var(--cream)' }}>{n.titulo}</p>
                                    <p className="text-xs text-muted" style={{ marginTop: 4 }}>{timeAgo(n.created_at)}</p>
                                </div>
                                <ChevronRight size={16} className="text-muted" style={{ flexShrink: 0, marginTop: 2 }} />
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* BANNER HISTORIA */}
            <section className="home-section animate-fade-up delay-3">
                <button className="historia-banner card card-glow" onClick={() => navigate('/historia')}>
                    <div>
                        <p className="text-xs" style={{ color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                            Desde 2009
                        </p>
                        <h3 style={{ fontSize: '1.3rem', fontFamily: 'var(--font-condensed)' }}>História do Debrê</h3>
                        <p className="text-sm text-muted" style={{ marginTop: 4 }}>
                            A linha do tempo de um clube de paixão
                        </p>
                    </div>
                    <div style={{ background: 'rgba(201,162,39,0.12)', borderRadius: '50%', padding: 12 }}>
                        <Trophy size={28} color="var(--gold)" />
                    </div>
                </button>
            </section>

            {/* PATROCINADORES MINI */}
            <section className="home-section animate-fade-up delay-4" style={{ paddingBottom: 8 }}>
                <div className="section-header">
                    <span className="section-title">Parceiros do Debrê</span>
                    <button className="section-link" onClick={() => navigate('/parceiros')}>Ver todos</button>
                </div>
                <div className="scroll-row">
                    {MOCK_PARCEIROS.map((name) => (
                        <div key={name} className="card sponsor-mini">
                            <span className="font-condensed" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold)', textAlign: 'center' }}>{name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
