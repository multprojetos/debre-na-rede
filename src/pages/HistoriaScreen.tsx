import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DebreBadge from '../components/DebreBadge'

const timeline = [
    {
        year: '2009', icon: '🦅', color: '#C9A227',
        title: 'Fundação do Debreceni FC',
        desc: 'Um grupo de amigos apaixonados pelo futebol funda o clube no bairro, em Carmo-RJ. O nome é uma homenagem à cidade húngara de Debrecen, terra de um dos fundadores.',
    },
    {
        year: '2011', icon: '🏆', color: '#C9A227',
        title: 'Primeiro Título Municipal',
        desc: 'Com time invicto na fase de grupos, o Debrê conquista pela primeira vez o campeonato municipal de Carmo. A festa tomou a cidade!',
    },
    {
        year: '2014', icon: '👕', color: '#2980B9',
        title: 'Primeiro Manto Oficial',
        desc: 'O clube estreia o primeiro uniforme oficial com as cores azul marinho e creme, que se tornam a identidade permanente do Debrê.',
    },
    {
        year: '2017', icon: '⭐', color: '#E84040',
        title: 'Criação da Categoria Master',
        desc: 'O clube expande criando a categoria Master, garantindo que os veteranos fundadores continuem jogando. Ideia genial do presidente Carlão!',
    },
    {
        year: '2020', icon: '🔵', color: '#2980B9',
        title: 'Registro Oficial na Federação',
        desc: 'O Debreceni FC passa a ser registrado oficialmente, garantindo participação em competições regionais do estado do Rio de Janeiro.',
    },
    {
        year: '2023', icon: '📱', color: '#9B59B6',
        title: 'Debrê nas Redes Sociais',
        desc: 'O perfil @debrefc no Instagram é criado e rapidamente conquista a torcida de Carmo com fotos, vídeos e a resenha do interior!',
    },
    {
        year: '2026', icon: '🚀', color: '#27AE60',
        title: 'Debre na Rede — O App!',
        desc: 'O clube lança seu aplicativo oficial, conectando torcedores, jogadores e parceiros de toda a região em um só lugar. Coé, Debrê!',
    },
]

export default function HistoriaScreen() {
    const navigate = useNavigate()

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1 }}>História do Debreceni F. C</h2>
            </header>

            {/* HERO */}
            <div style={{
                padding: '28px 20px',
                background: 'linear-gradient(170deg, #1E3370 0%, #0D1B3E 100%)',
                borderBottom: '1px solid rgba(201,162,39,0.2)',
                textAlign: 'center',
            }}>
                <DebreBadge size={80} className="animate-float" />
                <h1 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.8rem', fontWeight: 800, marginTop: 14, lineHeight: 1.1 }}>
                    Debreceni FC
                </h1>
                <p className="text-sm text-muted" style={{ marginTop: 6 }}>Fundado em 2009 · Carmo-RJ · Futebol amador com paixão profissional</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                    <div className="stat-box" style={{ minWidth: 70 }}><span className="stat-value">15+</span><span className="stat-label">Anos</span></div>
                    <div className="stat-box" style={{ minWidth: 70 }}><span className="stat-value">3</span><span className="stat-label">Títulos</span></div>
                    <div className="stat-box" style={{ minWidth: 70 }}><span className="stat-value">40+</span><span className="stat-label">Jogadores</span></div>
                </div>
            </div>

            {/* TIMELINE */}
            <div style={{ padding: '20px 16px' }}>
                <p className="section-title" style={{ marginBottom: 20 }}>Linha do Tempo</p>

                <div style={{ position: 'relative' }}>
                    {/* Vertical line */}
                    <div style={{
                        position: 'absolute', left: 28, top: 0, bottom: 0, width: 2,
                        background: 'linear-gradient(180deg, var(--gold) 0%, rgba(201,162,39,0.1) 100%)',
                    }} />

                    {timeline.map((item, i) => (
                        <div key={item.year} className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}
                            style={{ display: 'flex', gap: 16, marginBottom: 24, position: 'relative' }}>
                            {/* Icon circle */}
                            <div style={{
                                width: 58, height: 58, borderRadius: '50%', flexShrink: 0,
                                background: `${item.color}18`, border: `2px solid ${item.color}50`,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                zIndex: 1, boxShadow: '0 0 0 4px #0D1B3E',
                                fontSize: '1.4rem',
                            }}>
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div className="card" style={{ flex: 1, padding: '14px 16px', marginTop: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{
                                        fontFamily: 'Bebas Neue', fontSize: '1.1rem',
                                        padding: '2px 10px', borderRadius: 20,
                                        background: `${item.color}20`, color: item.color,
                                        border: `1px solid ${item.color}40`, letterSpacing: '0.06em',
                                    }}>{item.year}</span>
                                </div>
                                <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem', marginBottom: 6, color: 'var(--text-primary)' }}>
                                    {item.title}
                                </p>
                                <p style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--text-muted)' }}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing message */}
                <div className="card card-glow" style={{ padding: '20px', textAlign: 'center', marginTop: 4 }}>
                    <p style={{ fontSize: '2rem', marginBottom: 8 }}>🦅</p>
                    <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 800, fontSize: '1.3rem', color: 'var(--gold)', marginBottom: 6 }}>
                        A história continua sendo escrita!
                    </p>
                    <p className="text-sm text-muted" style={{ lineHeight: 1.6 }}>
                        Cada jogo, cada gol, cada torcedor faz parte dessa história. Obrigado, Carmo!
                    </p>
                </div>
            </div>
        </div>
    )
}
