import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, LogIn } from 'lucide-react'
import DebreBadge from '../components/DebreBadge'
import { ToastCtx } from '../App'
import '../styles/Login.css'

export default function LoginScreen() {
    const navigate = useNavigate()
    const showToast = useContext(ToastCtx)
    const [tab, setTab] = useState<'login' | 'cadastro'>('login')
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleAuth = () => {
        if (!email || !pass) { showToast('Preenche os campos, cara!'); return }
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            showToast(tab === 'login' ? 'Bem-vindo de volta, torcedor! 💙' : 'Cadastro feito! Debrê na Rede! 🦅')
            navigate('/home')
        }, 1200)
    }

    return (
        <div className="login-screen">
            {/* Background */}
            <div className="login-bg">
                <div className="login-bg-circle-1" />
                <div className="login-bg-circle-2" />
            </div>

            {/* Back button */}
            <button className="login-back" onClick={() => navigate('/')}>
                <ArrowLeft size={18} />
            </button>

            {/* Badge + title */}
            <div className="login-header animate-scale">
                <DebreBadge size={80} />
                <div>
                    <p className="font-display" style={{ fontSize: '2rem', color: 'var(--cream)', lineHeight: 1 }}>DEBRE</p>
                    <p className="font-display" style={{ fontSize: '2rem', color: 'var(--gold)', lineHeight: 1 }}>NA REDE</p>
                </div>
            </div>

            {/* Card */}
            <div className="login-card animate-fade-up delay-1">
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
                            <input className="form-input" placeholder="Seu nome, torcedor!" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">E-mail</label>
                        <input className="form-input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Senha</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                className="form-input"
                                type={showPass ? 'text' : 'password'}
                                placeholder="••••••••"
                                style={{ width: '100%', paddingRight: 48 }}
                                value={pass}
                                onChange={e => setPass(e.target.value)}
                            />
                            <button
                                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                                onClick={() => setShowPass(!showPass)}
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {tab === 'login' && (
                        <button className="text-xs" style={{ color: 'var(--gold)', textAlign: 'right', opacity: 0.8 }}>
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
                            : <><LogIn size={18} /> {tab === 'login' ? 'Entrar no Debrê!' : 'Criar minha conta'}</>
                        }
                    </button>

                    {/* Social */}
                    <div style={{ position: 'relative', textAlign: 'center', margin: '4px 0' }}>
                        <div className="divider" />
                        <span className="text-xs text-muted" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(13,27,62,0.95)', padding: '0 10px' }}>
                            ou entre com
                        </span>
                    </div>

                    <button className="btn btn-ghost btn-full" style={{ gap: 10, border: '1px solid rgba(255,255,255,0.12)' }}>
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

            <p className="text-xs text-muted" style={{ textAlign: 'center', margin: '20px 16px 12px', lineHeight: 1.5 }}>
                Ao entrar, você concorda com os Termos de Uso e a Política de Privacidade do Debre na Rede.
            </p>
        </div>
    )
}
