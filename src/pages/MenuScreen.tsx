import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight, Image as ImageIcon, LogOut, MapPin, Mic, Shield, Trophy,
    Clock, Stars, Newspaper, ShieldCheck, Bell, BellRing, User, Edit3, X, Save, Camera
} from 'lucide-react';

import DebreBadge from '../components/DebreBadge';
import { useAuth } from '../contexts/AuthContext';
import { ToastCtx } from '../App';
import { supabase } from '../lib/supabase';

export default function MenuScreen() {
    const navigate = useNavigate();
    const { user, isAdmin, logout } = useAuth();
    const showToast = useContext(ToastCtx);

    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [editName, setEditName] = useState(user?.name ?? '');
    const [saving, setSaving] = useState(false);

    // Mock notifications — in production, fetch from supabase
    const notifications = [
        { id: 1, title: 'Próximo jogo em 3 dias!', body: 'Debre vs Vila Nova FC — Campo do Debre', time: '2h atrás', icon: '⚽', read: false },
        { id: 2, title: 'Novo manto disponível', body: 'O manto 2026 acabou de chegar na loja.', time: '1d atrás', icon: '👕', read: true },
        { id: 3, title: 'Votação aberta!', body: 'Vote no craque da última partida.', time: '2d atrás', icon: '🏆', read: true },
    ];
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleSaveProfile = async () => {
        if (!editName.trim() || !user) return;
        setSaving(true);
        try {
            const { error } = await (supabase
                .from('profiles') as any)
                .update({ name: editName.trim() })
                .eq('id', user.id);
            if (error) throw error;
            showToast('Nome atualizado! 🎉');
            setShowEditProfile(false);
            // Reload to get updated name
            window.location.reload();
        } catch {
            showToast('Erro ao salvar. Tenta de novo! 😬');
        } finally {
            setSaving(false);
        }
    };

    const menuSections = [
        {
            title: 'Clube e Conteúdo',
            items: [
                { icon: ImageIcon, label: 'Galeria de Fotos', desc: 'Fotos dos jogos e eventos', path: '/galeria', color: '#9B59B6', bg: 'rgba(155,89,182,0.1)' },
                { icon: Clock, label: 'História do Debreceni', desc: 'Desde 2009 fazendo história', path: '/historia', color: '#2980B9', bg: 'rgba(41,128,185,0.1)' },
                { icon: Newspaper, label: 'Notícias', desc: 'Fique por dentro de tudo', path: '/news', color: '#27AE60', bg: 'rgba(39,174,96,0.1)' },
                { icon: Shield, label: 'Loja Sagrada', desc: 'Mantos e merchandising', path: '/manto', color: '#C9A227', bg: 'rgba(201,162,39,0.1)' },
            ]
        },
        {
            title: 'Interação do Torcedor',
            items: [
                { icon: Mic, label: 'Resenha do Debre', desc: 'Comente e opine nos jogos', path: '/resenha', color: '#E87A40', bg: 'rgba(232,122,64,0.1)' },
                { icon: Trophy, label: 'Votação Fanático', desc: 'Escolha o craque da partida', path: '/voto', color: '#E84040', bg: 'rgba(232,64,64,0.1)' },
                { icon: MapPin, label: 'Parceiros de Desconto', desc: 'Benefícios para torcedores', path: '/parceiros', color: '#27AE60', bg: 'rgba(39,174,96,0.1)' },
            ]
        }
    ];

    return (
        <div style={{ background: '#FAF9F6', color: '#1B2A4A', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Lexend, sans-serif', paddingBottom: 90 }}>
            {/* HEADER */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(250,249,246,0.8)', backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(13,27,63,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <DebreBadge size={30} />
                    <h1 style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#1B2A4A', fontFamily: 'Barlow Condensed, sans-serif' }}>Menu</h1>
                </div>
                <button onClick={() => setShowNotifications(true)} style={{
                    padding: 8, borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer',
                    color: '#C9A227', position: 'relative'
                }}>
                    <Bell style={{ width: 22, height: 22 }} />
                    {unreadCount > 0 && (
                        <span style={{
                            position: 'absolute', top: 4, right: 4, width: 8, height: 8,
                            borderRadius: '50%', background: '#E84040', border: '2px solid #FAF9F6'
                        }} />
                    )}
                </button>
            </header>

            <main style={{ flex: 1, overflowY: 'auto', padding: '16px', WebkitOverflowScrolling: 'touch' }}>
                {/* Profile Card — Bigger */}
                <div style={{
                    background: 'white', borderRadius: 16, padding: '24px 20px', marginBottom: 24,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)',
                    position: 'relative', overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute', top: 0, right: 0, width: 120, height: 120,
                        background: 'linear-gradient(135deg, rgba(201,162,39,0.06), transparent)',
                        borderRadius: '0 0 0 100%', pointerEvents: 'none'
                    }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: 72, height: 72, borderRadius: '50%', background: '#1B2A4A',
                                border: '3px solid #C9A227', color: 'white', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 700,
                                overflow: 'hidden'
                            }}>
                                {user?.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    user ? user.name.slice(0, 2).toUpperCase() : 'TF'
                                )}
                            </div>
                            <button onClick={() => setShowEditProfile(true)} style={{
                                position: 'absolute', bottom: -2, right: -2, width: 28, height: 28,
                                borderRadius: '50%', background: '#C9A227', border: '2px solid white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                color: '#1B2A4A'
                            }}>
                                <Edit3 style={{ width: 12, height: 12 }} />
                            </button>
                        </div>

                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1B2A4A', lineHeight: 1.2, fontFamily: 'Barlow Condensed, sans-serif' }}>
                                {user ? user.name : 'Torcedor Fiel'}
                            </h2>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', background: 'rgba(201,162,39,0.1)',
                                padding: '3px 10px', borderRadius: 6, border: '1px solid rgba(201,162,39,0.2)',
                                marginTop: 4
                            }}>
                                <Stars style={{ width: 12, height: 12, color: '#C9A227', marginRight: 4 }} />
                                <span style={{ color: '#C9A227', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {isAdmin ? 'Diretoria' : 'Torcedor Registrado'}
                                </span>
                            </div>
                            <p style={{ color: '#94a3b8', fontSize: '0.72rem', fontWeight: 500, marginTop: 4 }}>
                                {user ? user.email : 'Faça login para salvar votos e histórico'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {menuSections.map(section => (
                        <div key={section.title}>
                            <h3 style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', paddingLeft: 8, marginBottom: 10 }}>
                                {section.title}
                            </h3>
                            <div style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                {section.items.map((item, idx) => (
                                    <button key={item.path} onClick={() => navigate(item.path)} style={{
                                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '14px 16px', cursor: 'pointer', background: 'none', border: 'none',
                                        borderBottom: idx < section.items.length - 1 ? '1px solid rgba(0,0,0,0.03)' : 'none',
                                        transition: 'background 0.15s'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{
                                                width: 44, height: 44, borderRadius: 12, background: item.bg,
                                                color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <item.icon style={{ width: 22, height: 22 }} />
                                            </div>
                                            <div style={{ textAlign: 'left' }}>
                                                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B2A4A', fontFamily: 'Barlow Condensed, sans-serif' }}>{item.label}</p>
                                                <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: 1 }}>{item.desc}</p>
                                            </div>
                                        </div>
                                        <ChevronRight style={{ width: 18, height: 18, color: '#cbd5e1' }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Admin & Account */}
                    <div>
                        <h3 style={{ fontSize: '0.6rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', paddingLeft: 8, marginBottom: 10 }}>
                            Administração e Conta
                        </h3>
                        <div style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                            {isAdmin && (
                                <button onClick={() => navigate('/admin')} style={{
                                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '14px 16px', cursor: 'pointer', background: 'none', border: 'none',
                                    borderBottom: '1px solid rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12, background: '#1B2A4A',
                                            color: '#C9A227', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <ShieldCheck style={{ width: 22, height: 22 }} />
                                        </div>
                                        <div style={{ textAlign: 'left' }}>
                                            <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B2A4A', fontFamily: 'Barlow Condensed, sans-serif' }}>Painel Diretoria</p>
                                            <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: 1 }}>Gerenciar todo conteúdo do app</p>
                                        </div>
                                    </div>
                                    <ChevronRight style={{ width: 18, height: 18, color: '#cbd5e1' }} />
                                </button>
                            )}

                            {/* Edit Profile */}
                            <button onClick={() => setShowEditProfile(true)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 16px', cursor: 'pointer', background: 'none', border: 'none',
                                borderBottom: '1px solid rgba(0,0,0,0.03)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12, background: 'rgba(41,128,185,0.1)',
                                        color: '#2980B9', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <User style={{ width: 22, height: 22 }} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B2A4A', fontFamily: 'Barlow Condensed, sans-serif' }}>Editar Perfil</p>
                                        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: 1 }}>Alterar nome e foto</p>
                                    </div>
                                </div>
                                <ChevronRight style={{ width: 18, height: 18, color: '#cbd5e1' }} />
                            </button>

                            {/* Notifications */}
                            <button onClick={() => setShowNotifications(true)} style={{
                                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '14px 16px', cursor: 'pointer', background: 'none', border: 'none'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12, background: 'rgba(232,64,64,0.1)',
                                        color: '#E84040', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        position: 'relative'
                                    }}>
                                        <BellRing style={{ width: 22, height: 22 }} />
                                        {unreadCount > 0 && (
                                            <span style={{
                                                position: 'absolute', top: 2, right: 2, width: 8, height: 8,
                                                borderRadius: '50%', background: '#E84040'
                                            }} />
                                        )}
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1B2A4A', fontFamily: 'Barlow Condensed, sans-serif' }}>Notificações</p>
                                        <p style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: 1 }}>
                                            {unreadCount > 0 ? `${unreadCount} nova${unreadCount > 1 ? 's' : ''}` : 'Tudo lido'}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight style={{ width: 18, height: 18, color: '#cbd5e1' }} />
                            </button>
                        </div>
                    </div>

                    {/* Logout */}
                    <button onClick={() => { logout(); navigate('/'); }} style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: 8, padding: '16px', color: '#E84040', fontWeight: 700, background: 'white',
                        borderRadius: 14, border: '1px solid rgba(232,64,64,0.15)', cursor: 'pointer',
                        fontSize: '0.95rem', fontFamily: 'Barlow Condensed, sans-serif',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.15s'
                    }}>
                        <LogOut style={{ width: 18, height: 18 }} />
                        Sair da Conta
                    </button>
                </div>

                {/* Footer */}
                <div style={{ marginTop: 40, marginBottom: 20, textAlign: 'center', opacity: 0.6 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                        <DebreBadge size={36} />
                    </div>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Barlow Condensed, sans-serif', marginBottom: 4 }}>
                        Debre na Rede v2.5.0
                    </div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 500, color: '#94a3b8' }}>
                        Designed with Passion in Carmo-RJ
                    </div>
                </div>
            </main>

            {/* ============= EDIT PROFILE MODAL ============= */}
            {showEditProfile && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease'
                }} onClick={(e) => e.target === e.currentTarget && setShowEditProfile(false)}>
                    <div style={{
                        background: 'white', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 430,
                        padding: '20px 20px 32px', animation: 'fadeInUp 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Barlow Condensed, sans-serif', textTransform: 'uppercase' }}>Editar Perfil</h3>
                            <button onClick={() => setShowEditProfile(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                                <X style={{ width: 20, height: 20, color: '#94a3b8' }} />
                            </button>
                        </div>

                        {/* Avatar */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: '50%', background: '#1B2A4A',
                                    border: '3px solid #C9A227', color: 'white', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700
                                }}>
                                    {user ? user.name.slice(0, 2).toUpperCase() : 'TF'}
                                </div>
                                <div style={{
                                    position: 'absolute', bottom: 0, right: 0, width: 28, height: 28,
                                    borderRadius: '50%', background: '#C9A227', border: '2px solid white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1B2A4A'
                                }}>
                                    <Camera style={{ width: 12, height: 12 }} />
                                </div>
                            </div>
                        </div>

                        {/* Name Field */}
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                                Seu Nome
                            </label>
                            <input
                                className="form-input"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                                placeholder="Como você quer ser chamado?"
                                style={{ width: '100%' }}
                            />
                        </div>

                        {/* Email (readonly) */}
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                                E-mail
                            </label>
                            <input
                                className="form-input"
                                value={user?.email ?? ''}
                                readOnly
                                style={{ width: '100%', opacity: 0.6, cursor: 'not-allowed' }}
                            />
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            style={{
                                width: '100%', padding: '14px', borderRadius: 14,
                                background: 'linear-gradient(135deg, #C9A227, #A07D12)', color: '#1B2A4A',
                                fontFamily: 'Barlow Condensed, sans-serif', fontWeight: 700, fontSize: '1rem',
                                letterSpacing: '0.04em', border: 'none', cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(201,162,39,0.35)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                opacity: saving ? 0.7 : 1
                            }}
                        >
                            <Save style={{ width: 18, height: 18 }} />
                            {saving ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                    </div>
                </div>
            )}

            {/* ============= NOTIFICATIONS MODAL ============= */}
            {showNotifications && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.5)', animation: 'fadeIn 0.2s ease'
                }} onClick={(e) => e.target === e.currentTarget && setShowNotifications(false)}>
                    <div style={{
                        background: 'white', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 430,
                        padding: '20px 20px 32px', maxHeight: '70vh', overflowY: 'auto',
                        animation: 'fadeInUp 0.3s ease'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Barlow Condensed, sans-serif', textTransform: 'uppercase' }}>Notificações</h3>
                            <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                                <X style={{ width: 20, height: 20, color: '#94a3b8' }} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {notifications.map(n => (
                                <div key={n.id} style={{
                                    display: 'flex', gap: 14, padding: '14px', borderRadius: 12,
                                    background: n.read ? '#f8fafc' : 'rgba(201,162,39,0.05)',
                                    border: n.read ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(201,162,39,0.15)'
                                }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12, background: 'rgba(201,162,39,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.2rem', flexShrink: 0
                                    }}>
                                        {n.icon}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1B2A4A', fontFamily: 'Barlow Condensed, sans-serif' }}>{n.title}</p>
                                            {!n.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E84040', flexShrink: 0 }} />}
                                        </div>
                                        <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: 2 }}>{n.body}</p>
                                        <p style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: 4 }}>{n.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
