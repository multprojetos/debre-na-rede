import { useState, useContext } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToastCtx } from '../App';
import { useMantos } from '../hooks/useConteudo';
import { cn } from '../lib/utils';

export default function MantoScreen() {
    const navigate = useNavigate();
    const showToast = useContext(ToastCtx);
    const { mantos, loading } = useMantos();
    const [selectedCat, setSelectedCat] = useState('Todos');

    const novosMantos = mantos.filter(m => m.is_new);
    const destaque = novosMantos[0] ?? mantos[0];

    return (
        <div className="bg-[#FAF9F6] font-['Lexend'] text-[#0d1b3f] antialiased min-h-screen pb-24">
            <header className="sticky top-0 z-50 flex items-center gap-3 bg-[#FAF9F6]/80 backdrop-blur-md px-5 py-4 border-b border-[#0d1b3f]/5">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-[#0d1b3f] active:scale-95 transition-transform">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex-1">
                    <h1 className="text-lg font-bold leading-none tracking-tight">Manto Sagrado</h1>
                    <p className="text-[10px] uppercase tracking-widest text-[#0d1b3f]/60 font-medium">Debre na Rede FC</p>
                </div>
            </header>

            <div className="flex gap-3 px-5 py-6 overflow-x-auto no-scrollbar">
                {['Todos', 'Titular', 'Reserva', 'Retrô', 'Treino'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCat(cat)}
                        className={cn(
                            "flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all",
                            selectedCat === cat ? "bg-[#0d1b3f] text-white shadow-lg shadow-[#0d1b3f]/20" : "bg-white border border-[#0d1b3f]/10 text-[#0d1b3f]"
                        )}>
                        {cat}
                    </button>
                ))}
            </div>

            {!loading && destaque && (
                <section className="px-5 mb-8">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1E3370] to-[#0D1B3E] shadow-xl shadow-[#0D1B3E]/10 aspect-[16/10] flex items-center justify-between p-6">
                        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#C9A227]/10 blur-3xl"></div>
                        <div className="z-10 w-[60%]">
                            {destaque.is_new && <span className="inline-block bg-[#C9A227]/20 text-[#C9A227] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-2">NOVO</span>}
                            <h2 className="text-white text-2xl font-bold leading-tight mb-2 font-['Barlow_Condensed'] uppercase">{destaque.tipo} {destaque.ano}</h2>
                            <p className="text-slate-300 text-xs mb-4">{destaque.descricao ?? `${destaque.cor_nome}. Garanta o seu!`}</p>
                            <p className="text-[#C9A227] font-['Bebas_Neue'] text-2xl mb-4 tracking-wider">
                                R$ {destaque.preco?.toFixed(2)}
                            </p>
                            <button onClick={() => showToast('Reserva feita! Entraremos em contato! 📦')} className="bg-[#C9A227] hover:bg-[#C9A227]/90 text-[#0d1b3f] font-bold py-2 px-5 rounded-lg text-sm transition-colors active:scale-95 shadow-lg shadow-[#C9A227]/20">
                                Reservar
                            </button>
                        </div>
                        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[45%] h-[120%] flex items-center justify-center opacity-70">
                            <span className="text-8xl drop-shadow-2xl">{destaque.emoji || '👕'}</span>
                        </div>
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 gap-6 px-5 pb-24">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0d1b3f]/40">História dos Mantos</h3>
                {loading ? (
                    <div className="flex flex-col gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-2xl w-full"></div>
                        ))}
                    </div>
                ) : mantos.map(manto => (
                    <div key={manto.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100">
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50 flex items-center justify-center">
                            <div className="absolute top-3 left-3 z-10 flex gap-2">
                                <span className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-[#0d1b3f] uppercase tracking-tighter shadow-sm">{manto.tipo} {manto.ano}</span>
                                {manto.is_new && <span className="bg-[#E84040]/10 text-[#E84040] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Novo</span>}
                            </div>
                            <span className={cn("text-8xl transition-transform duration-500 group-hover:scale-110 drop-shadow-xl", manto.esgotado && "grayscale opacity-50")}>
                                {manto.emoji || '👕'}
                            </span>
                        </div>
                        <div className="flex flex-col p-4 border-t border-slate-50">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="text-base font-bold text-[#0d1b3f]">{manto.cor_nome || 'Uniforme'}</h4>
                                <span className={cn("text-lg font-bold font-['Barlow_Condensed'] tracking-wider", manto.esgotado ? "text-slate-400" : "text-[#C9A227]")}>
                                    {manto.esgotado ? 'Esgotado' : manto.preco ? `R$ ${manto.preco.toFixed(2)}` : '—'}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">{manto.descricao || 'Camisa oficial do clube com alto padrão e qualidade.'}</p>
                            {!manto.esgotado ? (
                                <button onClick={() => showToast('Reserva feita! 🏆')} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C9A227]/10 border border-[#C9A227]/20 py-3 text-sm font-bold text-[#0d1b3f] transition-all active:scale-[0.98] hover:bg-[#C9A227] hover:text-[#0d1b3f]">
                                    <ShoppingCart className="w-4 h-4" />
                                    Comprar
                                </button>
                            ) : (
                                <button disabled className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-400 cursor-not-allowed">
                                    Esgotado
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
