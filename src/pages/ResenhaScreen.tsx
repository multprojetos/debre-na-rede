import { useState, useContext, useEffect } from 'react'
import { ArrowLeft, Mic, MicOff, Send, ThumbsUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ToastCtx } from '../App'
import { useAuth } from '../contexts/AuthContext'
import { useUltimaPartida } from '../hooks/useNoticias'
import { useResenha } from '../hooks/useVotos'

function timeAgo(iso: string): string {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000
    if (diff < 120) return 'agora'
    if (diff < 3600) return `${Math.floor(diff / 60)}min`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d atrás`
}

export default function ResenhaScreen() {
    const navigate = useNavigate()
    const showToast = useContext(ToastCtx)
    const { user, isLoggedIn } = useAuth()
    const { partida, loading: loadingPartida } = useUltimaPartida()
    const { comentarios, loading, enviarComentario, toggleLike, getUserLikes } = useResenha(partida?.id ?? null)

    const [texto, setTexto] = useState('')
    const [recording, setRecording] = useState(false)
    const [likedSet, setLikedSet] = useState<Set<number>>(new Set())

    useEffect(() => {
        if (user && comentarios.length > 0) {
            getUserLikes(user.id).then(setLikedSet)
        }
    }, [user, comentarios.length, getUserLikes])

    const handleSend = async () => {
        if (!texto.trim()) { showToast('Escreve alguma coisa, cara!'); return }
        if (!isLoggedIn) { showToast('Faça login para comentar! 🔐'); navigate('/login'); return }

        const ok = await enviarComentario(texto, user!.id, user!.name)
        if (ok) {
            setTexto('')
            showToast('Resenha enviada! 🎙️')
        } else {
            showToast('Erro ao enviar. Tente novamente!')
        }
    }

    const handleLike = async (comentarioId: number) => {
        if (!isLoggedIn) { showToast('Faça login para curtir! 🔐'); return }
        const curtido = await toggleLike(comentarioId, user!.id)
        setLikedSet(prev => {
            const next = new Set(prev)
            if (curtido) next.add(comentarioId)
            else next.delete(comentarioId)
            return next
        })
    }

    const toggleRecording = () => {
        setRecording(r => !r)
        if (!recording) {
            setTimeout(() => { setRecording(false); showToast('Áudio gravado! (demo) 🎤') }, 3000)
        }
    }

    return (
        <div>
            <header className="page-header">
                <button className="page-back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} />
                </button>
                <h2 style={{ flex: 1 }}>Resenha do Debre</h2>
            </header>

            {/* MATCH LABEL */}
            <div style={{ padding: '12px 16px' }}>
                {loadingPartida ? (
                    <div className="skeleton" style={{ height: 60, borderRadius: 12, marginBottom: 16 }} />
                ) : partida ? (
                    <div className="card" style={{ padding: '12px 16px', marginBottom: 16, background: 'linear-gradient(135deg, rgba(30,51,112,0.8), rgba(13,27,62,0.9))', border: '1px solid rgba(201,162,39,0.25)' }}>
                        <p className="text-xs text-muted" style={{ marginBottom: 2 }}>Resenha pós-jogo</p>
                        <p style={{ fontFamily: 'Barlow Condensed', fontWeight: 700 }}>
                            Debrê {partida.gols_debre} × {partida.gols_adversario} {partida.adversario}
                        </p>
                        <p className="text-xs text-muted">{comentarios.length} comentários</p>
                    </div>
                ) : null}

                {/* INPUT AREA */}
                <div className="card" style={{ padding: '16px', marginBottom: 16 }}>
                    <p className="text-xs text-muted" style={{ marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        Minha resenha
                    </p>
                    <textarea
                        className="form-input"
                        style={{ width: '100%', resize: 'none', minHeight: 80, fontSize: '0.9rem' }}
                        placeholder="Cê viu o jogo? Cola sua resenha aqui, mermão!"
                        value={texto}
                        onChange={e => setTexto(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                        <button
                            className={`btn ${recording ? 'btn-danger' : 'btn-outline'}`}
                            style={{ gap: 8, flex: 'none', padding: '10px 16px' }}
                            onClick={toggleRecording}
                        >
                            {recording ? <><MicOff size={16} /> Parar</> : <><Mic size={16} /> Áudio</>}
                        </button>
                        {recording && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--danger)', fontSize: '0.8rem' }}>
                                <span className="badge badge-live">● Gravando</span>
                            </div>
                        )}
                        <button className="btn btn-primary" style={{ flex: 1, gap: 8 }} onClick={handleSend}>
                            <Send size={16} /> Minha Resenha
                        </button>
                    </div>
                </div>

                {/* COMMENTS */}
                <p className="section-title" style={{ marginBottom: 12 }}>O que a galera falou</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: 80, borderRadius: 12 }} />
                        ))
                    ) : comentarios.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                            <p style={{ fontSize: '2rem' }}>💬</p>
                            <p style={{ marginTop: 8 }}>Seja o primeiro a resenhar!</p>
                        </div>
                    ) : comentarios.map((c, i) => (
                        <div key={c.id} className={`card animate-fade-up delay-${Math.min(i + 1, 6)}`} style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                <div className="avatar" style={{ width: 36, height: 36, fontSize: '0.75rem', background: 'rgba(30,51,112,0.8)', flexShrink: 0 }}>
                                    {c.user_name.slice(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontFamily: 'Barlow Condensed', fontWeight: 700, fontSize: '0.9rem' }}>{c.user_name}</span>
                                        <span className="text-xs text-muted">{timeAgo(c.created_at)}</span>
                                    </div>
                                    <p style={{ fontSize: '0.88rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>{c.texto}</p>
                                    <button
                                        style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 8, color: likedSet.has(c.id) ? 'var(--gold)' : 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600 }}
                                        onClick={() => handleLike(c.id)}
                                    >
                                        <ThumbsUp size={14} fill={likedSet.has(c.id) ? 'currentColor' : 'none'} />
                                        {c.likes}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
