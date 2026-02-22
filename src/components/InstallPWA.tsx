/**
 * PWA Install Button
 * Aparece automaticamente quando o browser dispara o evento beforeinstallprompt (Chrome/Edge/Android)
 * e mostra instruções para iOS Safari (que não tem o evento)
 */

import { useState, useEffect } from 'react'
import { Download, X, Share } from 'lucide-react'

type Platform = 'chrome' | 'ios' | null

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
    const [platform, setPlatform] = useState<Platform>(null)
    const [dismissed, setDismissed] = useState(false)
    const [showIOSGuide, setShowIOSGuide] = useState(false)
    const [installed, setInstalled] = useState(false)

    useEffect(() => {
        // Já está instalado como PWA?
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setInstalled(true)
            return
        }

        // Sessão já dispensou o banner?
        if (sessionStorage.getItem('pwa-dismissed')) {
            setDismissed(true)
            return
        }

        // Detectar iOS
        const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent)
        const isSafari = /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent)

        if (isIOS && isSafari) {
            // iOS Safari: mostrar banner manual depois de 5s
            setTimeout(() => setPlatform('ios'), 5000)
        }

        // Chrome/Edge/Android: aguardar evento
        const handler = (e: Event) => {
            e.preventDefault()
            setDeferredPrompt(e as BeforeInstallPromptEvent)
            setPlatform('chrome')
        }

        window.addEventListener('beforeinstallprompt', handler)
        window.addEventListener('appinstalled', () => setInstalled(true))

        return () => {
            window.removeEventListener('beforeinstallprompt', handler)
        }
    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === 'accepted') {
            setInstalled(true)
        }
        setDeferredPrompt(null)
        setPlatform(null)
    }

    const handleDismiss = () => {
        setDismissed(true)
        setPlatform(null)
        sessionStorage.setItem('pwa-dismissed', '1')
    }

    if (installed || dismissed || !platform) return null

    return (
        <>
            {/* CHROME / ANDROID */}
            {platform === 'chrome' && (
                <div style={{
                    position: 'fixed',
                    bottom: 80,
                    left: 16,
                    right: 16,
                    zIndex: 1000,
                    background: 'linear-gradient(135deg, rgba(13,27,62,0.98), rgba(30,51,112,0.98))',
                    border: '1px solid rgba(201,162,39,0.4)',
                    borderRadius: 16,
                    padding: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    animation: 'slideUp 0.4s ease',
                }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                        background: 'rgba(201,162,39,0.15)',
                        border: '1px solid rgba(201,162,39,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.6rem',
                    }}>
                        🦅
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                            Instalar Debre na Rede
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                            Acesse o app direto da sua tela inicial!
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button
                            onClick={handleInstall}
                            style={{
                                background: 'var(--gold)', color: '#1B2A4A', border: 'none',
                                borderRadius: 10, padding: '8px 14px', fontFamily: 'Barlow Condensed',
                                fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 6,
                            }}
                        >
                            <Download size={14} /> Instalar
                        </button>
                        <button
                            onClick={handleDismiss}
                            style={{
                                background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: 10, padding: '8px', cursor: 'pointer', color: 'var(--text-muted)',
                                display: 'flex', alignItems: 'center',
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* iOS SAFARI — instruções manuais */}
            {platform === 'ios' && !showIOSGuide && (
                <div style={{
                    position: 'fixed',
                    bottom: 80,
                    left: 16,
                    right: 16,
                    zIndex: 1000,
                    background: 'linear-gradient(135deg, rgba(13,27,62,0.98), rgba(30,51,112,0.98))',
                    border: '1px solid rgba(201,162,39,0.4)',
                    borderRadius: 16,
                    padding: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    animation: 'slideUp 0.4s ease',
                }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                        background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem',
                    }}>
                        🦅
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                            Adicionar à tela inicial
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                            Instale o app no iPhone em 2 passos!
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <button
                            onClick={() => setShowIOSGuide(true)}
                            style={{
                                background: 'var(--gold)', color: '#1B2A4A', border: 'none',
                                borderRadius: 10, padding: '8px 14px', fontFamily: 'Barlow Condensed',
                                fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: 6,
                            }}
                        >
                            <Share size={14} /> Como?
                        </button>
                        <button
                            onClick={handleDismiss}
                            style={{
                                background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.1)',
                                borderRadius: 10, padding: '8px', cursor: 'pointer', color: 'var(--text-muted)',
                                display: 'flex', alignItems: 'center',
                            }}
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* iOS GUIDE modal */}
            {platform === 'ios' && showIOSGuide && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 2000,
                    background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
                    display: 'flex', alignItems: 'flex-end',
                }}
                    onClick={() => { setShowIOSGuide(false); handleDismiss() }}
                >
                    <div
                        style={{
                            width: '100%',
                            background: 'linear-gradient(180deg, rgba(30,51,112,0.99), rgba(13,27,62,1))',
                            borderRadius: '20px 20px 0 0', padding: '24px 24px 40px',
                            border: '1px solid rgba(201,162,39,0.3)',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            <p style={{ fontSize: '2rem', marginBottom: 8 }}>🦅</p>
                            <h3 style={{ fontFamily: 'Barlow Condensed', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                                Instalar no iPhone / iPad
                            </h3>
                        </div>

                        {[
                            { icon: '1️⃣', text: 'Toque no ícone de compartilhar (□↑) na barra do Safari' },
                            { icon: '2️⃣', text: 'Role para baixo e toque em "Adicionar à Tela de Início"' },
                            { icon: '3️⃣', text: 'Toque em "Adicionar" no canto superior direito' },
                        ].map(step => (
                            <div key={step.icon} style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '14px', marginBottom: 10,
                                background: 'rgba(0,0,0,0.05)', borderRadius: 12,
                                border: '1px solid rgba(0,0,0,0.08)',
                            }}>
                                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{step.icon}</span>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>{step.text}</p>
                            </div>
                        ))}

                        <button
                            onClick={() => { setShowIOSGuide(false); handleDismiss() }}
                            style={{
                                width: '100%', marginTop: 16, padding: '14px',
                                background: 'rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.12)',
                                borderRadius: 12, color: 'var(--text-muted)', fontFamily: 'Barlow Condensed',
                                fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                            }}
                        >
                            Entendi, fechar
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
        </>
    )
}
