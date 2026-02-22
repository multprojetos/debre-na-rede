import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Vote, Shirt, Star, Flame, Calendar, ChevronRight, Trophy } from 'lucide-react';
import { useNoticias, useProximaPartida } from '../hooks/useNoticias';
import DebreBadge from '../components/DebreBadge';

function formatDate(iso: string) {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return { date: `${day} ${months[d.getMonth()]}`, time: `${hours}:${minutes}` };
}

function timeAgo(iso: string): string {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d atrás`;
    return `${Math.floor(diff / 604800)}s atrás`;
}

export default function HomeScreen() {
    const navigate = useNavigate();
    const { noticias, loading: loadingNews } = useNoticias();
    const { partida: proximaPartida, loading: loadingPartida } = useProximaPartida();

    const ultimasNoticias = noticias.slice(0, 3);

    return (
        <div style={{ background: '#FAF9F6', color: '#1E293B', fontFamily: 'Lexend, sans-serif', minHeight: '100vh', paddingBottom: 90 }}>
            {/* HEADER */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'rgba(250,249,246,0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(13,27,63,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <DebreBadge size={38} />
                    <div>
                        <p style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(13,27,63,0.5)', fontWeight: 600 }}>Debreceni FC</p>
                        <h1 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1, color: '#1B2A4A', textTransform: 'uppercase', fontFamily: 'Barlow Condensed, sans-serif' }}>DEBRE NA REDE</h1>
                    </div>
                </div>
                <button style={{
                    width: 40, height: 40, borderRadius: '50%', background: 'rgba(13,27,63,0.05)',
                    color: '#1B2A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                    border: 'none', cursor: 'pointer'
                }}>
                    <Bell style={{ width: 20, height: 20 }} />
                    <span style={{
                        position: 'absolute', top: 8, right: 8, width: 8, height: 8,
                        borderRadius: '50%', background: '#E84040', border: '2px solid #FAF9F6'
                    }} />
                </button>
            </header>

            <main style={{ flex: 1 }}>
                {/* PRÓXIMA PARTIDA */}
                <section style={{ padding: '16px' }}>
                    <div style={{
                        position: 'relative', overflow: 'hidden', borderRadius: 16,
                        background: '#1B2A4A', padding: '20px', color: 'white',
                        boxShadow: '0 8px 30px rgba(13,27,62,0.2)'
                    }}>
                        <div style={{
                            position: 'absolute', right: -40, top: -40, width: 160, height: 160,
                            borderRadius: '50%', background: 'rgba(201,162,39,0.1)', filter: 'blur(40px)'
                        }} />
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                <span style={{
                                    borderRadius: 20, background: 'rgba(201,162,39,0.2)',
                                    padding: '4px 12px', fontSize: '0.6rem', fontWeight: 700,
                                    textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C9A227',
                                    border: '1px solid rgba(201,162,39,0.3)'
                                }}>
                                    Próxima Partida
                                </span>
                            </div>

                            {loadingPartida ? (
                                <div style={{ textAlign: 'center', padding: 16, fontSize: '0.85rem', color: '#94a3b8' }}>Carregando...</div>
                            ) : proximaPartida ? (() => {
                                const { date, time } = formatDate(proximaPartida.data_hora);
                                return (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 16, marginBottom: 20 }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
                                                <DebreBadge size={52} />
                                                <p style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Barlow Condensed, sans-serif' }}>Debre</p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#C9A227', marginBottom: 4, fontFamily: 'Barlow Condensed, sans-serif' }}>VS</span>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: 4,
                                                    fontSize: '0.6rem', color: '#cbd5e1',
                                                    background: 'rgba(255,255,255,0.1)', padding: '3px 8px',
                                                    borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)'
                                                }}>
                                                    <Calendar size={10} />
                                                    {date} • {time}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
                                                <div style={{
                                                    width: 52, height: 52, borderRadius: '50%',
                                                    background: 'rgba(255,255,255,0.1)', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    fontSize: '1rem', fontWeight: 700,
                                                    backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.2)'
                                                }}>
                                                    {proximaPartida.adversario_iniciais}
                                                </div>
                                                <p style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'Barlow Condensed, sans-serif' }}>
                                                    {proximaPartida.adversario.split(' ')[0]}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.75rem', color: '#cbd5e1', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
                                            <MapPin style={{ width: 16, height: 16, color: '#C9A227' }} />
                                            <span>{proximaPartida.local}</span>
                                        </div>
                                    </>
                                );
                            })() : (
                                <div style={{ textAlign: 'center', padding: 16, fontSize: '0.85rem', color: '#94a3b8' }}>Nenhuma partida agendada</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ATALHOS */}
                <section style={{ padding: '4px 16px 8px' }}>
                    <h2 style={{ marginBottom: 12, fontSize: '0.95rem', fontWeight: 700, color: '#1E293B' }}>Acesso Rápido</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[
                            { path: '/voto', icon: Vote, label: 'Voto do Torcedor', color: '#E84040', bg: 'rgba(232,64,64,0.1)' },
                            { path: '/manto', icon: Shirt, label: 'Manto Sagrado', color: '#C9A227', bg: 'rgba(201,162,39,0.1)' },
                            { path: '/stats', icon: Star, label: 'Debre Stats', color: '#27AE60', bg: 'rgba(39,174,96,0.1)' },
                            { path: '/resenha', icon: Flame, label: 'Resenha do Debre', color: '#E87A40', bg: 'rgba(232,122,64,0.1)' },
                        ].map(item => (
                            <button key={item.path} onClick={() => navigate(item.path)} style={{
                                display: 'flex', flexDirection: 'column', gap: 10, borderRadius: 14,
                                background: 'white', padding: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                border: '1px solid rgba(0,0,0,0.04)', textAlign: 'left', cursor: 'pointer',
                                transition: 'transform 0.15s'
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10, background: item.bg,
                                    color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <item.icon style={{ width: 20, height: 20 }} />
                                </div>
                                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', fontFamily: 'Barlow Condensed, sans-serif' }}>{item.label}</p>
                            </button>
                        ))}
                    </div>
                </section>

                {/* ÚLTIMAS DO Debre */}
                <section style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                        <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1E293B' }}>Últimas do Debre</h2>
                        <button onClick={() => navigate('/news')} style={{
                            fontSize: '0.72rem', fontWeight: 600, color: '#C9A227',
                            textDecoration: 'underline', textUnderlineOffset: 4, background: 'none', border: 'none', cursor: 'pointer'
                        }}>Ver todas</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {loadingNews ? (
                            <div style={{ textAlign: 'center', padding: 16, fontSize: '0.85rem', color: '#94a3b8' }}>Carregando notícias...</div>
                        ) : ultimasNoticias.map((n) => (
                            <button key={n.id} onClick={() => navigate(`/news/${n.id}`)} style={{
                                display: 'flex', gap: 12, borderRadius: 14, background: 'white',
                                padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                                border: '1px solid rgba(0,0,0,0.04)', textAlign: 'left', cursor: 'pointer',
                                transition: 'transform 0.15s', width: '100%'
                            }}>
                                <div style={{
                                    width: 72, height: 72, flexShrink: 0, borderRadius: 10,
                                    background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{ color: '#94a3b8', fontSize: '0.7rem', fontFamily: 'Lexend, sans-serif' }}>Sem Img</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#C9A227', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>{n.categoria}</span>
                                        {n.is_hot && <span style={{ background: 'rgba(232,64,64,0.1)', color: '#E84040', fontSize: '0.5rem', fontWeight: 700, padding: '2px 6px', borderRadius: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hot</span>}
                                    </div>
                                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.3, color: '#1E293B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>{n.titulo}</h3>
                                    <p style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{timeAgo(n.created_at)}</p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ChevronRight style={{ width: 16, height: 16, color: '#cbd5e1' }} />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* BANNER HISTÓRIA — Redesigned & Centered */}
                <section style={{ padding: '0 16px 24px' }}>
                    <button onClick={() => navigate('/historia')} style={{
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', padding: '24px 20px',
                        background: 'linear-gradient(135deg, #1E3370, #1B2A4A)', borderRadius: 16,
                        border: '1px solid rgba(201,162,39,0.3)',
                        boxShadow: '0 8px 30px rgba(13,27,62,0.15)',
                        cursor: 'pointer', transition: 'transform 0.15s', textAlign: 'center',
                        gap: 12, position: 'relative', overflow: 'hidden'
                    }}>
                        {/* Decorative glow */}
                        <div style={{
                            position: 'absolute', top: -30, right: -30, width: 120, height: 120,
                            borderRadius: '50%', background: 'rgba(201,162,39,0.08)', filter: 'blur(30px)'
                        }} />
                        <div style={{
                            position: 'absolute', bottom: -20, left: -20, width: 100, height: 100,
                            borderRadius: '50%', background: 'rgba(201,162,39,0.05)', filter: 'blur(25px)'
                        }} />

                        {/* Trophy icon centered at top */}
                        <div style={{
                            background: 'rgba(201,162,39,0.15)', width: 52, height: 52, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(201,162,39,0.25)', position: 'relative', zIndex: 1
                        }}>
                            <Trophy style={{ width: 24, height: 24, color: '#C9A227' }} />
                        </div>

                        {/* Centered text */}
                        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                            <p style={{
                                fontSize: '0.65rem', color: '#C9A227', textTransform: 'uppercase',
                                letterSpacing: '0.25em', fontWeight: 700, marginBottom: 4
                            }}>Desde 2009</p>
                            <h3 style={{
                                fontSize: '1.3rem', color: 'white', fontFamily: 'Barlow Condensed, sans-serif',
                                fontWeight: 700, lineHeight: 1.2
                            }}>História do Debreceni F.C.</h3>
                            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: 4 }}>
                                A linha do tempo de um clube de paixão
                            </p>
                        </div>

                        {/* Arrow hint */}
                        <ChevronRight style={{ width: 18, height: 18, color: 'rgba(201,162,39,0.5)', position: 'relative', zIndex: 1 }} />
                    </button>
                </section>
            </main>
        </div>
    );
}
