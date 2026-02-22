import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react'
import DebreBadge from '../components/DebreBadge'
import { ToastCtx } from '../App'
import { useAuth } from '../contexts/AuthContext'
import '../styles/Login.css'

export default function LoginScreen() {
    const navigate = useNavigate()
    const showToast = useContext(ToastCtx)
    const { login, register, loginWithGoogle } = useAuth()

    const [tab, setTab] = useState<'login' | 'cadastro'>('login')
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAuth = async () => {
        if (!email.trim() || !pass.trim()) {
            showToast('Preenche e-mail e senha, cara! 😅')
            return
        }
        if (tab === 'cadastro' && !name.trim()) {
            showToast('Coloca seu nome, torcedor!')
            return
        }
        setLoading(true)
        try {
            if (tab === 'login') {
                const ok = await login(email.trim(), pass)
                if (ok) {
                    showToast('Bem-vindo de volta! 💙🦅')
                    navigate('/home')
                } else {
                    showToast('E-mail ou senha incorretos. Confirme seu e-mail se acabou de se cadastrar.')
                }
            } else {
                const ok = await register(name.trim(), email.trim(), pass)
                if (ok) {
                    showToast('Conta criada! Tente fazer login agora.')
                    setTab('login')
                } else {
                    showToast('Erro no cadastro. E-mail já usado?')
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const handleGoogle = async () => {
        setLoading(true)
        const ok = await loginWithGoogle()
        if (!ok) showToast('Erro ao entrar com Google 😬')
        setLoading(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleAuth()
    }

    return (
        <div className="login-screen" style={{
            minHeight: '100vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(180deg, #1B2A4A 0%, #0a152e 100%)',
            padding: '20px 16px', position: 'relative', overflow: 'hidden'
        }}>
            {/* Background effects */}
            <div style={{
                position: 'absolute', width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 70%)',
                top: -50, right: -80, pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute', width: 250, height: 250, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(30,51,112,0.3) 0%, transparent 70%)',
                bottom: -60, left: -60, pointerEvents: 'none'
            }} />

            {/* Badge & Title */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32,
                animation: 'scaleIn 0.4s ease both', position: 'relative', zIndex: 1
            }}>
                <DebreBadge size={72} />
                <div>
                    <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#FAF9F6', lineHeight: 1, letterSpacing: '0.06em' }}>DEBRE</p>
                    <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', color: '#C9A227', lineHeight: 1, letterSpacing: '0.06em' }}>NA REDE</p>
                </div>
            </div>

            {/* Card */}
            <div style={{
                background: 'rgba(13,27,62,0.95)', borderRadius: 20, padding: '24px 20px',
                width: '100%', maxWidth: 380, border: '1px solid rgba(201,162,39,0.15)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative', zIndex: 1,
                animation: 'fadeInUp 0.5s ease 0.15s both'
            }}>
                {/* Tabs */}
                <div className="pill-tabs" style={{ marginBottom: 22 }}>
                    <button className={`pill-tab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>
                        Entrar
                    </button>
                    <button className={`pill-tab ${tab === 'cadastro' ? 'active' : ''}`} onClick={() => setTab('cadastro')}>
                        Cadastrar
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {tab === 'cadastro' && (
                        <div className="form-group">
                            <label className="form-label">Nome</label>
                            <input
                                className="form-input"
                                placeholder="Seu nome, torcedor!"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete="name"
                                style={{ background: 'rgba(255,255,255,0.06)', color: '#FAF9F6' }}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input
                            className="form-input"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="email"
                            style={{ background: 'rgba(255,255,255,0.06)', color: '#FAF9F6' }}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Senha</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className="form-input"
                                type={showPass ? 'text' : 'password'}
                                placeholder="••••••••"
                                style={{ width: '100%', paddingRight: 48, background: 'rgba(255,255,255,0.06)', color: '#FAF9F6' }}
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                                onKeyDown={handleKeyDown}
                                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                            />
                            <button
                                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {tab === 'login' && (
                        <button style={{
                            color: '#C9A227', textAlign: 'right', opacity: 0.8, fontSize: '0.72rem',
                            background: 'none', border: 'none', cursor: 'pointer'
                        }} onClick={() => showToast('Verifique seu e-mail para redefinir a senha')}>
                            Esqueci minha senha
                        </button>
                    )}

                    <button
                        className={`btn btn-primary btn-full btn-lg ${loading ? 'loading' : ''}`}
                        onClick={handleAuth}
                        disabled={loading}
                        style={{ marginTop: 4, gap: 10 }}
                    >
                        {loading
                            ? <span className="btn-spinner" />
                            : tab === 'login'
                                ? <><LogIn size={18} /> Entrar</>
                                : <><UserPlus size={18} /> Criar minha conta</>
                        }
                    </button>

                    <div style={{ position: 'relative', textAlign: 'center', margin: '4px 0' }}>
                        <div className="divider" />
                        <span style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            background: 'rgba(13,27,62,0.95)', padding: '0 10px',
                            fontSize: '0.72rem', color: '#64748b'
                        }}>
                            ou entre com
                        </span>
                    </div>

                    <button
                        className="btn btn-ghost btn-full"
                        style={{ gap: 10, border: '1px solid rgba(255,255,255,0.12)', color: '#FAF9F6' }}
                        onClick={handleGoogle}
                        disabled={loading}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continuar com Google
                    </button>
                </div>
            </div>

            <p style={{
                fontSize: '0.68rem', color: '#64748b', textAlign: 'center',
                margin: '20px 16px 12px', lineHeight: 1.5, position: 'relative', zIndex: 1
            }}>
                Ao entrar, você concorda com os Termos de Uso do Debre na Rede.
            </p>
        </div>
    )
}
