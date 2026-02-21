import { useState, useContext, useEffect } from 'react';
import { ChevronLeft, Users, Play, Mic, Send, ThumbsUp, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastCtx } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { useUltimaPartida } from '../hooks/useNoticias';
import { useResenha } from '../hooks/useVotos';
import { cn } from '../lib/utils';

function timeAgo(iso: string): string {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 120) return 'agora';
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d atrás`;
}

export default function ResenhaScreen() {
    const navigate = useNavigate();
    const showToast = useContext(ToastCtx);
    const { user, isLoggedIn } = useAuth();
    const { partida, loading: loadingPartida } = useUltimaPartida();
    const { comentarios, loading, enviarComentario, toggleLike, getUserLikes } = useResenha(partida?.id ?? null);

    const [texto, setTexto] = useState('');
    const [recording, setRecording] = useState(false);
    const [likedSet, setLikedSet] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (user && comentarios.length > 0) {
            getUserLikes(user.id).then(setLikedSet);
        }
    }, [user, comentarios.length, getUserLikes]);

    const handleSend = async () => {
        if (!texto.trim()) { showToast('Escreve alguma coisa, cara!'); return; }
        if (!isLoggedIn) { showToast('Faça login para comentar! 🔐'); navigate('/login'); return; }

        const ok = await enviarComentario(texto, user!.id, user!.name);
        if (ok) {
            setTexto('');
            showToast('Resenha enviada! 🎙️');
        } else {
            showToast('Erro ao enviar. Tente novamente!');
        }
    };

    const handleLike = async (comentarioId: number) => {
        if (!isLoggedIn) { showToast('Faça login para curtir! 🔐'); return; }
        const curtido = await toggleLike(comentarioId, user!.id);
        setLikedSet(prev => {
            const next = new Set(prev);
            if (curtido) next.add(comentarioId);
            else next.delete(comentarioId);
            return next;
        });
    };

    const toggleRecording = () => {
        setRecording(r => !r);
        if (!recording) {
            setTimeout(() => { setRecording(false); showToast('Áudio gravado! (demo) 🎤'); }, 3000);
        }
    };

    return (
        <div className="bg-[#FAF9F6] font-['Lexend'] text-[#0d1b3f] flex flex-col h-screen overflow-hidden">
            <header className="flex-shrink-0 sticky top-0 z-20 bg-[#0D1B3E] text-white p-4 pb-3 shadow-md">
                <div className="flex items-center justify-between gap-3">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-7 h-7" />
                    </button>
                    <div className="flex-1 text-center">
                        <h1 className="text-lg font-bold leading-tight tracking-tight uppercase font-['Barlow_Condensed']">Resenha do Debre</h1>
                        <p className="text-[10px] text-[#C9A227] font-medium tracking-[0.1em]">DEBRECENI F.C. OFICIAL</p>
                    </div>
                    <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
                        <Users className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-3 bg-white/5 rounded-lg py-2 px-4 flex items-center justify-between border border-white/10">
                    {loadingPartida ? (
                        <div className="text-white/50 text-xs">Buscando partida...</div>
                    ) : partida ? (
                        <>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-slate-300 font-semibold tracking-wider">Pós-Jogo</span>
                                <span className="text-sm font-medium font-['Barlow_Condensed'] text-white">Debrê <span className="text-[#C9A227]">{partida.gols_debre} - {partida.gols_adversario}</span> {partida.adversario}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-1 rounded-full border border-white/10">
                                    {comentarios.length} msgs
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="text-white/50 text-xs">Nenhuma partida registrada</div>
                    )}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
                {loading ? (
                    <div className="flex flex-col gap-6 items-center pt-10">
                        <div className="h-6 w-24 bg-slate-200 animate-pulse rounded-full"></div>
                        <div className="h-20 w-full bg-slate-200 animate-pulse rounded-2xl max-w-[85%] self-start"></div>
                        <div className="h-20 w-full bg-slate-200 animate-pulse rounded-2xl max-w-[85%] self-end"></div>
                    </div>
                ) : comentarios.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-70">
                        <span className="text-5xl mb-4">💬</span>
                        <p className="text-sm">Seja o primeiro a resenhar!</p>
                    </div>
                ) : (
                    comentarios.map((c, i) => {
                        const isMe = isLoggedIn && user?.id === c.user_id;
                        return (
                            <div key={c.id} className={cn("flex items-start gap-3", isMe && "flex-row-reverse")}>
                                <div className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white shadow-sm overflow-hidden bg-[#0D1B3E] text-white flex items-center justify-center font-bold text-sm">
                                    {c.user_name.slice(0, 2).toUpperCase()}
                                </div>
                                <div className={cn("flex flex-col gap-1 max-w-[75%]", isMe && "items-end")}>
                                    {!isMe && <span className="text-[12px] font-bold text-[#0D1B3E]/70 ml-1">{c.user_name}</span>}
                                    <div className="relative">
                                        <div className={cn(
                                            "p-3 shadow-sm border",
                                            isMe
                                                ? "bg-gradient-to-br from-[#1E3370] to-[#0D1B3E] text-white rounded-tl-xl rounded-bl-xl rounded-br-xl border-[#0D1B3E]/5"
                                                : "bg-white text-slate-800 rounded-tr-xl rounded-br-xl rounded-bl-xl border-slate-100"
                                        )}>
                                            <p className="text-sm leading-relaxed">{c.texto}</p>
                                        </div>
                                        <button
                                            onClick={() => handleLike(c.id)}
                                            className={cn(
                                                "absolute -bottom-3 flex items-center gap-1 px-1.5 py-0.5 rounded-full shadow-md border border-slate-50 cursor-pointer active:scale-95 transition-transform",
                                                isMe ? "-left-2 bg-white" : "-right-2 bg-white"
                                            )}
                                        >
                                            <ThumbsUp className={cn("w-3 h-3", likedSet.has(c.id) ? "text-[#C9A227] fill-current" : "text-slate-400")} />
                                            <span className="text-[10px] font-bold text-[#C9A227]">{c.likes > 0 ? c.likes : ''}</span>
                                        </button>
                                    </div>
                                    <span className={cn("text-[10px] text-slate-400 mt-2", isMe ? "mr-1" : "ml-1")}>{timeAgo(c.created_at)}</span>
                                </div>
                            </div>
                        );
                    })
                )}
            </main>

            <footer className="bg-white border-t border-slate-100 p-4 pb-8 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleRecording}
                        className={cn(
                            "w-11 h-11 flex items-center justify-center rounded-full active:scale-95 transition-all text-white shadow-lg",
                            recording ? "bg-[#E84040] animate-pulse" : "bg-[#1E3370]"
                        )}>
                        {recording ? <MicOff className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5 fill-current" />}
                    </button>

                    <div className="flex-1 relative flex items-center">
                        <input
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="w-full bg-slate-100 border-none rounded-full py-3 px-4 text-sm focus:ring-2 focus:ring-[#C9A227] placeholder-slate-400 outline-none"
                            placeholder="Sua resenha..."
                            type="text"
                        />
                    </div>

                    <button
                        onClick={handleSend}
                        className="w-11 h-11 flex items-center justify-center bg-[#C9A227] text-white rounded-full shadow-lg shadow-[#C9A227]/30 active:scale-95 transition-transform">
                        <Send className="w-5 h-5 ml-1" />
                    </button>
                </div>
                {recording && <p className="text-center text-[#E84040] text-[10px] font-bold uppercase mt-2">Gravando áudio...</p>}
            </footer>
        </div>
    );
}
