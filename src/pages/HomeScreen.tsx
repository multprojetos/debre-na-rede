import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, Vote, Shirt, Star, Flame, Calendar, ChevronRight, Trophy } from 'lucide-react';
import { useNoticias, useProximaPartida } from '../hooks/useNoticias';
import DebreBadge from '../components/DebreBadge';

function formatDate(iso: string) {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return { date: `${day} ${months[d.getMonth()]}`, time: `${hours}:${minutes}` };
}

function timeAgo(iso: string): string {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}min`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d atrás`;
    return `${Math.floor(diff / 604800)}s atrás`;
}

export default function HomeScreen() {
    const navigate = useNavigate();
    const { noticias, loading: loadingNews } = useNoticias();
    const { partida: proximaPartida, loading: loadingPartida } = useProximaPartida();

    const ultimasNoticias = noticias.slice(0, 3);

    return (
        <div className="bg-[#FAF9F6] text-slate-900 font-['Lexend'] min-h-screen pb-24">
            <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-[#0d1b3f]/5">
                <div className="flex items-center gap-3">
                    <DebreBadge size={40} />
                    <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#0d1b3f]/60 font-semibold">Debreceni FC</p>
                        <h1 className="text-lg font-bold leading-none text-[#0d1b3f] uppercase font-['Barlow_Condensed']">DEBRE NA REDE</h1>
                    </div>
                </div>
                <button className="flex size-10 items-center justify-center rounded-full bg-[#0d1b3f]/5 text-[#0d1b3f] relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E84040] border-2 border-[#FAF9F6]" />
                </button>
            </header>

            <main className="flex-1">
                {/* PRÓXIMA PARTIDA */}
                <section className="p-5">
                    <div className="relative overflow-hidden rounded-xl bg-[#0D1B3E] p-6 text-white shadow-xl shadow-[#0D1B3E]/20">
                        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#C9A227]/10 blur-3xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <span className="rounded-full bg-[#C9A227]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C9A227] border border-[#C9A227]/30">
                                    Próxima Partida
                                </span>
                            </div>

                            {loadingPartida ? (
                                <div className="text-center py-4 text-sm text-slate-400">Carregando...</div>
                            ) : proximaPartida ? (() => {
                                const { date, time } = formatDate(proximaPartida.data_hora);
                                return (
                                    <>
                                        <div className="flex items-center justify-around gap-4 mb-6">
                                            <div className="flex flex-col items-center gap-2 flex-1">
                                                <DebreBadge size={56} />
                                                <p className="text-sm font-bold font-['Barlow_Condensed'] text-white">DEBRÊ</p>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <span className="text-2xl font-black text-[#C9A227] mb-1 font-['Barlow_Condensed']">VS</span>
                                                <div className="flex items-center gap-1 text-[10px] text-slate-300 bg-white/10 px-2 py-1 rounded-full border border-white/10">
                                                    <Calendar size={10} />
                                                    {date} • {time}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 flex-1">
                                                <div className="size-[56px] flex items-center justify-center rounded-full bg-white/10 text-xl font-bold backdrop-blur-sm border border-white/20">
                                                    {proximaPartida.adversario_iniciais}
                                                </div>
                                                <p className="text-sm font-bold font-['Barlow_Condensed'] text-white">
                                                    {proximaPartida.adversario.split(' ')[0]}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-center gap-2 text-xs text-slate-300 border-t border-white/10 pt-4">
                                                <MapPin className="w-4 h-4 text-[#C9A227]" />
                                                <span>{proximaPartida.local}</span>
                                            </div>
                                        </div>
                                    </>
                                );
                            })() : (
                                <div className="text-center py-4 text-sm text-slate-400">Nenhuma partida agendada</div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ATALHOS */}
                <section className="px-5 py-2">
                    <h2 className="mb-4 text-base font-bold text-[#1E293B]">Acesso Rápido</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => navigate('/voto')} className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 items-start text-left active:scale-[0.98] transition-transform">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-[#E84040]/10 text-[#E84040] group-hover:bg-[#E84040] group-hover:text-white transition-colors">
                                <Vote className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-[#1E293B] font-['Barlow_Condensed']">Voto do Torcedor</p>
                        </button>
                        <button onClick={() => navigate('/manto')} className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 items-start text-left active:scale-[0.98] transition-transform">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-[#C9A227]/10 text-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-white transition-colors">
                                <Shirt className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-[#1E293B] font-['Barlow_Condensed']">Manto Sagrado</p>
                        </button>
                        <button onClick={() => navigate('/stats')} className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 items-start text-left active:scale-[0.98] transition-transform">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-[#27AE60]/10 text-[#27AE60] group-hover:bg-[#27AE60] group-hover:text-white transition-colors">
                                <Star className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-[#1E293B] font-['Barlow_Condensed']">Debre Stats</p>
                        </button>
                        <button onClick={() => navigate('/resenha')} className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-slate-100 items-start text-left active:scale-[0.98] transition-transform">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-[#E87A40]/10 text-[#E87A40] group-hover:bg-[#E87A40] group-hover:text-white transition-colors">
                                <Flame className="w-5 h-5" />
                            </div>
                            <p className="text-sm font-bold text-[#1E293B] font-['Barlow_Condensed']">Resenha do Debre</p>
                        </button>
                    </div>
                </section>

                {/* ÚLTIMAS DO DEBRÊ */}
                <section className="px-5 py-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-base font-bold text-[#1E293B]">Últimas do Debrê</h2>
                        <button onClick={() => navigate('/news')} className="text-xs font-semibold text-[#C9A227] underline underline-offset-4">Ver todas</button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {loadingNews ? (
                            <div className="text-center py-4 text-sm text-slate-400">Carregando notícias...</div>
                        ) : ultimasNoticias.map((n) => (
                            <button key={n.id} onClick={() => navigate(`/news/${n.id}`)} className="flex gap-4 rounded-xl bg-white p-3 shadow-sm border border-slate-100 text-left active:scale-[0.98] transition-transform">
                                <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 flex items-center justify-center">
                                    <span className="text-slate-400 font-['Lexend'] text-xs">Sem Img</span>
                                </div>
                                <div className="flex flex-col justify-center gap-1 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-[#C9A227] uppercase tracking-tighter">{n.categoria}</span>
                                        {n.is_hot && <span className="bg-[#E84040]/10 text-[#E84040] text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">Hot</span>}
                                    </div>
                                    <h3 className="line-clamp-2 text-sm font-bold leading-tight text-[#1E293B]">{n.titulo}</h3>
                                    <p className="text-[10px] text-slate-500">{timeAgo(n.created_at)}</p>
                                </div>
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* BANNER HISTORIA */}
                <section className="px-5 mb-6">
                    <button onClick={() => navigate('/historia')} className="w-full flex items-center justify-between p-5 bg-gradient-to-br from-[#1E3370] to-[#0D1B3E] rounded-xl border border-[#C9A227]/30 shadow-lg shadow-[#0D1B3E]/10 active:scale-[0.98] transition-transform">
                        <div className="text-left">
                            <p className="text-[10px] text-[#C9A227] uppercase tracking-widest font-bold mb-1">Desde 2009</p>
                            <h3 className="text-xl text-white font-['Barlow_Condensed'] font-bold">História do Debreceni F. C</h3>
                            <p className="text-xs text-slate-300 mt-1">A linha do tempo de um clube de paixão</p>
                        </div>
                        <div className="bg-[#C9A227]/20 p-3 rounded-full shrink-0 ml-4">
                            <Trophy className="w-6 h-6 text-[#C9A227]" />
                        </div>
                    </button>
                </section>

                {/* PARCEIROS */}
                <section className="py-4">
                    <div className="px-5 mb-4 flex items-center justify-between">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Nossos Parceiros</h2>
                        <button onClick={() => navigate('/parceiros')} className="text-[10px] font-semibold text-[#C9A227] uppercase">Ver todos</button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto px-5 pb-4 no-scrollbar">
                        {['Farmácia Central', 'Mercadão Carmo', 'Auto Peças Silva', 'Sorveteria Gelé'].map((nome, i) => (
                            <div key={i} className="flex h-12 px-4 shrink-0 items-center justify-center bg-white border border-slate-100 rounded-lg shadow-sm">
                                <span className="text-xs font-bold text-slate-400 font-['Barlow_Condensed'] uppercase">{nome}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
