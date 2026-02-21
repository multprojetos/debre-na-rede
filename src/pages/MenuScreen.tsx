import { useNavigate } from 'react-router-dom';
import {
    ChevronRight, Image as ImageIcon, LogOut, MapPin, Mic, Settings, Shield, Trophy, Clock, Search, Stars, Newspaper, ShieldCheck
} from 'lucide-react';

import DebreBadge from '../components/DebreBadge';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

export default function MenuScreen() {
    const navigate = useNavigate();
    const { user, isAdmin, logout } = useAuth();

    return (
        <div className="bg-[#FAF9F6] text-[#0d1b3f] min-h-screen flex flex-col font-['Lexend'] pb-24">
            <header className="sticky top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-[#0d1b3f]/5">
                <div className="flex items-center gap-2">
                    <DebreBadge size={32} />
                    <h1 className="text-xl font-bold tracking-tight text-[#0d1b3f] font-['Barlow_Condensed'] uppercase tracking-wider">Menu</h1>
                </div>
                <button className="p-2 rounded-full hover:bg-[#0d1b3f]/5 text-[#C9A227]">
                    <Search className="w-5 h-5" />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
                {/* Profile Card */}
                <div className="bg-white rounded-xl p-5 mb-8 shadow-sm border border-slate-100 flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C9A227]/5 to-transparent rounded-bl-full pointer-events-none"></div>
                    <div className="relative">
                        <div className="flex size-16 rounded-full bg-[#0D1B3E] overflow-hidden border-2 border-[#C9A227] text-white items-center justify-center text-xl font-bold">
                            {user ? user.name.slice(0, 2).toUpperCase() : 'TF'}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 z-10">
                        <h2 className="text-lg font-bold text-[#0d1b3f] leading-tight font-['Barlow_Condensed']">{user ? user.name : 'Torcedor Fiel'}</h2>
                        <div className="inline-flex items-center bg-[#C9A227]/10 px-2 py-0.5 rounded border border-[#C9A227]/20 self-start">
                            <Stars className="w-3 h-3 text-[#C9A227] mr-1 fill-current" />
                            <span className="text-[#C9A227] text-[10px] font-bold uppercase tracking-wider">{isAdmin ? 'Diretoria' : 'Torcedor Registrado'}</span>
                        </div>
                        <p className="text-slate-400 text-xs font-medium mt-1">{user ? user.email : 'Faça login para salvar votos e histórico'}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Clube e Conteúdo */}
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">Clube e Conteúdo</h3>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            {[
                                { icon: ImageIcon, label: 'Galeria de Fotos', path: '/galeria', color: 'text-purple-600', bg: 'bg-purple-100' },
                                { icon: Clock, label: 'História do Debreceni', path: '/historia', color: 'text-blue-600', bg: 'bg-blue-100' },
                                { icon: Newspaper, label: 'Notícias', path: '/news', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                                { icon: Shield, label: 'Loja Sagrada', path: '/manto', color: 'text-[#C9A227]', bg: 'bg-[#C9A227]/10' },
                            ].map((item, idx, arr) => (
                                <button key={item.path} onClick={() => navigate(item.path)} className={cn("w-full flex items-center justify-between px-4 py-4 active:bg-slate-50 transition-colors", idx !== arr.length - 1 && "border-b border-slate-50")}>
                                    <div className="flex items-center gap-4">
                                        <div className={cn("size-10 rounded-lg flex items-center justify-center", item.bg, item.color)}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-[#0D1B3E] font-['Barlow_Condensed']">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Interação do Torcedor */}
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">Interação do Torcedor</h3>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            {[
                                { icon: Mic, label: 'Resenha do Debre', path: '/resenha', color: 'text-[#E87A40]', bg: 'bg-[#E87A40]/10' },
                                { icon: Trophy, label: 'Votação Fanático', path: '/voto', color: 'text-[#E84040]', bg: 'bg-[#E84040]/10' },
                                { icon: MapPin, label: 'Parceiros de Desconto', path: '/parceiros', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10' },
                            ].map((item, idx, arr) => (
                                <button key={item.path} onClick={() => navigate(item.path)} className={cn("w-full flex items-center justify-between px-4 py-4 active:bg-slate-50 transition-colors", idx !== arr.length - 1 && "border-b border-slate-50")}>
                                    <div className="flex items-center gap-4">
                                        <div className={cn("size-10 rounded-lg flex items-center justify-center", item.bg, item.color)}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold text-[#0D1B3E] font-['Barlow_Condensed']">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Administração */}
                    <div>
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-3">Administração e Conta</h3>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100">
                            {isAdmin && (
                                <button onClick={() => navigate('/admin')} className="w-full flex items-center justify-between px-4 py-4 active:bg-slate-50 border-b border-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="size-10 rounded-lg bg-[#0D1B3E] text-[#C9A227] flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-[#0D1B3E] font-['Barlow_Condensed']">Painel Diretoria</p>
                                            <p className="text-[10px] text-slate-400">Restrito a administradores</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300" />
                                </button>
                            )}
                            <button className="w-full flex items-center justify-between px-4 py-4 active:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                                        <Settings className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-bold text-[#0D1B3E] font-['Barlow_Condensed']">Configurações</span>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </button>
                        </div>
                    </div>

                    <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center justify-center gap-2 py-4 text-red-600 font-bold bg-white rounded-xl border border-red-100 active:scale-[0.98] transition-all shadow-sm">
                        <LogOut className="w-4 h-4" />
                        Sair da Conta
                    </button>
                </div>

                <div className="mt-12 mb-8 text-center opacity-70">
                    <DebreBadge size={40} className="mx-auto grayscale opacity-50 mb-4" />
                    <div className="text-xs font-bold uppercase tracking-widest mb-1 font-['Barlow_Condensed']">Debre na Rede v2.5.0</div>
                    <div className="text-[10px] font-medium text-slate-400">Designed with Passion in Carmo-RJ</div>
                </div>
            </main>
        </div>
    );
}
