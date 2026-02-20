import { useNavigate } from 'react-router-dom'
import {
    ChevronRight, Image, LogOut, MapPin, Mic, Settings, Shield, Trophy, Clock,
} from 'lucide-react'

import DebreBadge from '../components/DebreBadge'
import { useAuth } from '../contexts/AuthContext'

const menuItems = [
    { icon: Image, label: 'Galeria', sub: 'Fotos e vídeos do Debrê', path: '/galeria', color: '#9B59B6' },
    { icon: Shield, label: 'Manto Sagrado', sub: 'Uniformes e pré-venda', path: '/manto', color: '#C9A227' },
    { icon: Mic, label: 'Resenha do Interior', sub: 'Comentários pós-jogo', path: '/resenha', color: '#E87A40' },
    { icon: MapPin, label: 'Parceiros do Debrê', sub: 'Descontos e benefícios locais', path: '/parceiros', color: '#27AE60' },
    { icon: Trophy, label: 'Voto do Torcedor', sub: 'Craque do jogo e gol mais bonito', path: '/voto', color: '#E84040' },
    { icon: Clock, label: 'História do Debrê', sub: 'Linha do tempo desde 2009', path: '/historia', color: '#2980B9' },
    { icon: Settings, label: 'Configurações', sub: 'Notificações e preferências', path: '/home', color: 'var(--text-muted)' },
]

export default function MenuScreen() {
    const navigate = useNavigate()
    const { user, isAdmin, logout } = useAuth()

    return (
        <div>
            <header className="page-header">
                <h2 style={{ flex: 1 }}>Mais do Debrê</h2>
            </header>

            {/* Profile card */}
            <div style={{ padding: '16px 16px 8px' }}>
                <div className="card" style={{
                    padding: '16px', marginBottom: 16,
                    background: 'linear-gradient(135deg, rgba(30,51,112,0.9), rgba(13,27,62,0.95))',
                    border: '1px solid rgba(201,162,39,0.25)',
                    display: 'flex', gap: 14, alignItems: 'center',
                }}>
                    <div className="avatar" style={{ width: 52, height: 52, fontSize: '1.1rem', background: 'rgba(201,162,39,0.15)', border: '2px solid rgba(201,162,39,0.4)' }}>
                        {user ? user.name.slice(0, 2).toUpperCase() : 'TF'}
                    </div>
                    <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1.1rem', color: 'var(--gold)' }}>{user ? user.name : 'Torcedor Fiel'}</p>
                        <p className="text-xs text-muted">{user ? user.email : 'torcedor@debrefc.com'}</p>
                        <span className="badge badge-gold" style={{ marginTop: 4, fontSize: '0.6rem' }}>🦅 {isAdmin ? 'Diretoria' : 'Torcedor Registrado'}</span>
                    </div>
                    <DebreBadge size={40} />
                </div>

                {/* Menu items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {isAdmin && (
                        <button
                            className="card animate-fade-up"
                            style={{ padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', textAlign: 'left', width: '100%', borderColor: 'var(--gold)' }}
                            onClick={() => navigate('/admin')}
                        >
                            <div style={{
                                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                                background: 'rgba(201, 162, 39, 0.1)', border: '1px solid rgba(201, 162, 39, 0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'var(--gold)',
                            }}>
                                <Shield size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem', color: 'var(--gold)' }}>Painel Admin</p>
                                <p className="text-xs text-muted">Acesso restrito à diretoria</p>
                            </div>
                            <ChevronRight size={16} color="var(--text-muted)" />
                        </button>
                    )}
                    {menuItems.map(({ icon: Icon, label, sub, path, color }, i) => (
                        <button
                            key={path + label}
                            className={`card animate-fade-up delay-${Math.min(i + 1, 6)}`}
                            style={{ padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'center', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                            onClick={() => navigate(path)}
                        >
                            <div style={{
                                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                                background: `${color}18`, border: `1px solid ${color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color,
                            }}>
                                <Icon size={20} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.95rem' }}>{label}</p>
                                <p className="text-xs text-muted">{sub}</p>
                            </div>
                            <ChevronRight size={16} color="var(--text-muted)" />
                        </button>
                    ))}
                </div>

                {/* Logout */}
                <button
                    className="btn btn-ghost btn-full"
                    style={{ marginTop: 16, gap: 10, border: '1px solid rgba(232,64,64,0.2)', color: 'var(--danger)' }}
                    onClick={() => {
                        logout()
                        navigate('/')
                    }}
                >
                    <LogOut size={16} /> Sair da conta
                </button>

                {/* Footer */}
                <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
                    <DebreBadge size={40} />
                    <p className="text-xs text-muted" style={{ marginTop: 8 }}>Debre na Rede v1.0.0</p>
                    <p className="text-xs text-muted">Debreceni FC · Carmo-RJ · Since 2009</p>
                    <p className="text-xs" style={{ color: 'var(--gold)', marginTop: 4, opacity: 0.7 }}>Feito com 💙 pela torcida</p>
                </div>
            </div>
        </div>
    )
}
