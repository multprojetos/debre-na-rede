import { useState, useContext, useEffect } from 'react';
import { Trophy, Zap, ArrowLeft, Star, Check } from 'lucide-react';
import { ToastCtx } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { useUltimaPartida } from '../hooks/useNoticias';
import { useVotos } from '../hooks/useVotos';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

function formatPartida(p: { adversario: string; gols_debre: number; gols_adversario: number; data_hora: string; campeonato: string | null }) {
    const d = new Date(p.data_hora);
    const day = d.getDate();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return {
        placar: `Debrê ${p.gols_debre} × ${p.gols_adversario} ${p.adversario}`,
        data: `${day} ${months[d.getMonth()]} ${d.getFullYear()} · ${p.campeonato ?? ''}`,
    };
}

export default function VotoScreen() {
    const navigate = useNavigate();
    const showToast = useContext(ToastCtx);
    const { user, isLoggedIn } = useAuth();
    const { partida, loading: loadingPartida } = useUltimaPartida();
    const { jogadores, gols, votosJogador, votosGol, meuVotoCraque, meuVotoGol,
        totalVotosCraque, loading, loadMeusVotos, votarCraque, votarGol } = useVotos(partida?.id ?? null);

    const [tab, setTab] = useState<'craque' | 'gol'>('craque');

    useEffect(() => {
        if (partida && user) loadMeusVotos(user.id);
    }, [partida, user, loadMeusVotos]);

    const handleVoteCraque = async (jogadorId: number) => {
        if (!isLoggedIn) { showToast('Faça login para votar! 🔐'); navigate('/login'); return; }
        if (meuVotoCraque) return;
        const ok = await votarCraque(user!.id, jogadorId);
        if (ok) showToast('É gol! Voto registrado, mermão! 🏆');
        else showToast('Erro ao registrar voto. Tente novamente.');
    };

    const handleVoteGol = async (golId: number) => {
        if (!isLoggedIn) { showToast('Faça login para votar! 🔐'); navigate('/login'); return; }
        if (meuVotoGol) return;
        const ok = await votarGol(user!.id, golId);
        if (ok) showToast('Voto no Gol Mais Bonito registrado! 🎯');
        else showToast('Erro ao registrar voto. Tente novamente.');
    };

    return (
        <div className="bg-[#FAF9F6] font-['Lexend'] text-slate-900 antialiased min-h-screen flex flex-col pb-24">
            <header className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#0d1b3f]/5 px-4 py-4 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="text-[#0d1b3f] hover:bg-slate-100 p-2 rounded-full -ml-2 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#C9A227]" />
                    <h1 className="text-lg font-bold tracking-tight text-[#0d1b3f] uppercase font-['Barlow_Condensed']">Voto do Torcedor</h1>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto">
                <div className="p-4">
                    {loadingPartida ? (
                        <div className="h-24 bg-slate-200 animate-pulse rounded-xl w-full"></div>
                    ) : partida ? (() => {
                        const { placar, data } = formatPartida(partida);
                        return (
                            <div className="bg-gradient-to-br from-[#1E3370] to-[#0D1B3E] rounded-xl p-5 shadow-lg shadow-[#0D1B3E]/10 border border-[#C9A227]/20 flex flex-col relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 size-24 bg-[#C9A227]/10 rounded-full blur-xl"></div>
                                <div className="flex items-center gap-2 mb-2 z-10">
                                    <span className="bg-[#E84040]/20 text-[#E84040] border border-[#E84040]/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                        <Zap className="w-3 h-3 fill-current" /> Ativo
                                    </span>
                                    <span className="text-[10px] text-slate-300 font-medium">Votação aberta</span>
                                </div>
                                <h2 className="text-lg font-bold text-white font-['Barlow_Condensed'] z-10">{placar}</h2>
                                <p className="text-xs text-slate-300 mt-1 z-10">{data}</p>
                            </div>
                        );
                    })() : null}
                </div>

                {/* TABS */}
                <div className="px-4 mb-4 flex gap-2">
                    <button
                        onClick={() => setTab('craque')}
                        className={cn(
                            "flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 font-['Barlow_Condensed'] uppercase tracking-wide",
                            tab === 'craque' ? "bg-[#0D1B3E] text-[#C9A227]" : "bg-white border border-slate-100 text-slate-500"
                        )}>
                        <Star className={cn("w-4 h-4", tab === 'craque' && "fill-current")} /> Craque do Jogo
                    </button>
                    <button
                        onClick={() => setTab('gol')}
                        className={cn(
                            "flex-1 py-3 px-2 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 font-['Barlow_Condensed'] uppercase tracking-wide",
                            tab === 'gol' ? "bg-[#0D1B3E] text-[#C9A227]" : "bg-white border border-slate-100 text-slate-500"
                        )}>
                        <Zap className={cn("w-4 h-4", tab === 'gol' && "fill-current")} /> Gol Mais Bonito
                    </button>
                </div>

                <div className="px-4 py-2 text-center">
                    <h3 className="text-lg font-bold text-[#0d1b3f] font-['Barlow_Condensed'] uppercase">
                        {tab === 'craque' ? 'Quem foi o Craque do Jogo?' : 'Qual foi o golaço da partida?'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        {tab === 'craque' ? 'Escolha o jogador que mais se destacou nesta vitória' : 'Vote no lance que mais levantou a torcida'}
                    </p>
                </div>

                {/* CRAQUE VOTING */}
                {tab === 'craque' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 mt-2">
                        {meuVotoCraque && (
                            <div className="col-span-full mb-2 bg-[#27AE60]/10 border border-[#27AE60]/20 rounded-xl p-3 text-center text-[#27AE60] font-bold text-sm flex items-center justify-center gap-2 shadow-sm font-['Barlow_Condensed'] tracking-wide">
                                <Check className="w-4 h-4" /> Voto computado! Obrigado, torcedor!
                            </div>
                        )}
                        {loading ? Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-xl w-full"></div>
                        )) : jogadores.map((j) => {
                            const totalVotos = votosJogador[j.id] ?? 0;
                            const pct = totalVotosCraque > 0 ? Math.round((totalVotos / totalVotosCraque) * 100) : 0;
                            const isVoted = meuVotoCraque === j.id;

                            return (
                                <button
                                    key={j.id}
                                    onClick={() => handleVoteCraque(j.id)}
                                    disabled={!!meuVotoCraque}
                                    className="flex flex-col items-center gap-3 group bg-white p-4 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden"
                                >
                                    <div className="relative">
                                        <div className={cn(
                                            "w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center font-bold text-xl text-white transition-all duration-300 uppercase",
                                            isVoted
                                                ? "border-[3px] border-[#C9A227] bg-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.3)] ring-4 ring-[#C9A227]/20"
                                                : "bg-[#0D1B3E] opacity-90 group-hover:bg-[#1E3370]"
                                        )}>
                                            {j.initials}
                                        </div>
                                        {isVoted && (
                                            <div className="absolute -bottom-1 -right-1 bg-[#0D1B3E] text-[#C9A227] rounded-full p-1 border-2 border-white">
                                                <Check className="w-3 h-3 font-bold" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center w-full">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">#{j.number}</p>
                                        <p className={cn(
                                            "text-sm font-bold font-['Barlow_Condensed'] tracking-wide truncate w-full",
                                            isVoted ? "text-[#C9A227]" : "text-[#0d1b3f]"
                                        )}>{j.name}</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">{j.gols > 0 ? `${j.gols} gol(s)` : 'Destaque'}</p>

                                        {meuVotoCraque && (
                                            <div className="w-full mt-3">
                                                <div className="flex justify-between text-[10px] mb-1 font-bold">
                                                    <span className="text-slate-400">{totalVotos} vts</span>
                                                    <span className={isVoted ? "text-[#C9A227]" : "text-slate-500"}>{pct}%</span>
                                                </div>
                                                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full rounded-full transition-all duration-1000", isVoted ? "bg-[#C9A227]" : "bg-slate-300")}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* GOL MAIS BONITO */}
                {tab === 'gol' && (
                    <div className="flex flex-col gap-3 p-4 mt-2">
                        {meuVotoGol && (
                            <div className="mb-2 bg-[#27AE60]/10 border border-[#27AE60]/20 rounded-xl p-3 text-center text-[#27AE60] font-bold text-sm flex items-center justify-center gap-2 shadow-sm font-['Barlow_Condensed'] tracking-wide">
                                <Check className="w-4 h-4" /> Voto no gol mais bonito computado!
                            </div>
                        )}
                        {loading ? Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-20 bg-slate-200 animate-pulse rounded-xl w-full"></div>
                        )) : gols.map((g) => {
                            const isVoted = meuVotoGol === g.id;
                            const totalVotos = votosGol[g.id] ?? 0;

                            return (
                                <button
                                    key={g.id}
                                    onClick={() => handleVoteGol(g.id)}
                                    disabled={!!meuVotoGol}
                                    className={cn(
                                        "flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border transition-all text-left",
                                        isVoted ? "border-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.1)]" : "border-slate-100"
                                    )}
                                >
                                    <div className="text-3xl bg-slate-50 w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                                        {g.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn(
                                            "font-['Barlow_Condensed'] font-bold text-base",
                                            isVoted ? "text-[#C9A227]" : "text-[#0d1b3f]"
                                        )}>
                                            Gol de {g.jogador_nome} — {g.minuto}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">{g.descricao}</p>
                                        {meuVotoGol && (
                                            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{totalVotos} votos registrados</p>
                                        )}
                                    </div>
                                    {isVoted ? (
                                        <div className="bg-[#C9A227] text-white p-1.5 rounded-full shadow-sm">
                                            <Check className="w-4 h-4 font-bold" />
                                        </div>
                                    ) : !meuVotoGol && (
                                        <div className="bg-slate-50 border border-slate-200 text-slate-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest hidden sm:block">
                                            Votar
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                        {!loading && gols.length === 0 && (
                            <div className="text-center p-10 text-slate-400 flex flex-col items-center">
                                <span className="text-4xl mb-3">⚽</span>
                                <p className="text-sm">Nenhum gol registrado ainda</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
