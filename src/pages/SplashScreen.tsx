import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DebreBadge from '../components/DebreBadge'
import '../styles/Splash.css'

export default function SplashScreen() {
    const navigate = useNavigate()

    useEffect(() => {
        const t = setTimeout(() => navigate('/home'), 3200)
        return () => clearTimeout(t)
    }, [navigate])

    return (
        <div className="splash-screen" onClick={() => navigate('/home')}>
            {/* Background geometric shapes */}
            <div className="splash-bg">
                <div className="splash-circle splash-circle-1" />
                <div className="splash-circle splash-circle-2" />
                <div className="splash-glow" />
            </div>

            {/* Content */}
            <div className="splash-content">
                <div className="splash-badge animate-scale">
                    <DebreBadge size={160} />
                </div>

                <div className="splash-text animate-fade-up delay-2">
                    <p className="splash-titulo font-display text-glow">DEBRE</p>
                    <p className="splash-subtitulo font-display text-glow">NA REDE</p>
                    <div className="gold-line" style={{ margin: '10px auto', maxWidth: 180 }} />
                    <p className="splash-clube text-muted">DEBRECENI FC · CARMO-RJ</p>
                </div>

                <div className="splash-bottom animate-fade delay-5">
                    <p className="text-xs text-muted" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Paixão que não tem fim
                    </p>
                    <div className="splash-dots">
                        <span /><span /><span />
                    </div>
                </div>
            </div>
        </div>
    )
}
