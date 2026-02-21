import React from 'react';
import { motion } from 'motion/react';
import { Menu as MenuIcon, Search, Edit3, Stars, Image as ImageIcon, History as HistoryIcon, Newspaper, ShieldCheck, Settings, LogOut, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fdfaf1] text-[#0d1b3f] min-h-screen flex flex-col font-['Lexend'] pb-24">
      <header className="sticky top-0 z-50 bg-[#fdfaf1]/80 backdrop-blur-md px-4 pt-12 pb-2 flex items-center justify-between border-b border-[#0d1b3f]/5">
        <div className="flex items-center gap-2">
          <MenuIcon className="w-6 h-6 text-[#0d1b3f]" />
          <h1 className="text-xl font-bold tracking-tight text-[#0d1b3f]">Menu</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-[#0d1b3f]/5">
          <Search className="w-6 h-6 text-[#0d1b3f]" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="bg-white rounded-xl p-5 mb-8 shadow-sm border border-[#0d1b3f]/5 flex items-center gap-4">
          <div className="relative">
            <div className="size-20 rounded-full bg-[#0d1b3f]/10 overflow-hidden border-2 border-[#c5a059]/30">
              <img 
                alt="User profile picture" 
                src="https://picsum.photos/seed/userprofile/200/200"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-[#0d1b3f] leading-tight">João Silva</h2>
            <div className="inline-flex items-center bg-[#c5a059]/15 px-2.5 py-0.5 rounded-lg border border-[#c5a059]/20 self-start">
              <Stars className="w-4 h-4 text-[#c5a059] mr-1 fill-current" />
              <span className="text-[#c5a059] text-xs font-bold uppercase tracking-wider">Torcedor Registrado</span>
            </div>
            <p className="text-[#0d1b3f]/60 text-sm font-medium mt-1">Membro desde Mar 2023</p>
          </div>
          <button className="ml-auto p-2 bg-[#0d1b3f]/5 rounded-full">
            <Edit3 className="w-5 h-5 text-[#0d1b3f]" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold text-[#0d1b3f]/40 uppercase tracking-[0.15em] px-2 mb-3">Clube e Conteúdo</h3>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#0d1b3f]/5">
              <Link to="#" className="flex items-center justify-between px-4 py-4 active:bg-[#0d1b3f]/5 border-b border-[#0d1b3f]/5 group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-[#0d1b3f]/5 flex items-center justify-center text-[#0d1b3f]">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-base font-semibold">Galeria</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0d1b3f]/30" />
              </Link>
              <Link to="/history" className="flex items-center justify-between px-4 py-4 active:bg-[#0d1b3f]/5 border-b border-[#0d1b3f]/5 group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-[#0d1b3f]/5 flex items-center justify-center text-[#0d1b3f]">
                    <HistoryIcon className="w-5 h-5" />
                  </div>
                  <span className="text-base font-semibold">História</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0d1b3f]/30" />
              </Link>
              <Link to="/chat" className="flex items-center justify-between px-4 py-4 active:bg-[#0d1b3f]/5 group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-[#0d1b3f]/5 flex items-center justify-center text-[#0d1b3f]">
                    <Newspaper className="w-5 h-5" />
                  </div>
                  <span className="text-base font-semibold">Notícias</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0d1b3f]/30" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#0d1b3f]/40 uppercase tracking-[0.15em] px-2 mb-3">Administração</h3>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#0d1b3f]/5">
              <Link to="/admin" className="flex items-center justify-between px-4 py-4 active:bg-[#0d1b3f]/5 border-b border-[#0d1b3f]/5 group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-[#c5a059]/10 flex items-center justify-center text-[#c5a059]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-base font-semibold">Painel Admin</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0d1b3f]/30" />
              </Link>
              <Link to="#" className="flex items-center justify-between px-4 py-4 active:bg-[#0d1b3f]/5 group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-lg bg-[#0d1b3f]/5 flex items-center justify-center text-[#0d1b3f]">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-base font-semibold">Configurações</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#0d1b3f]/30" />
              </Link>
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 py-4 text-red-600 font-bold bg-red-50 rounded-xl border border-red-100 active:scale-[0.98] transition-all">
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </button>
        </div>

        <div className="mt-12 mb-8 text-center opacity-40">
          <div className="text-xs font-bold uppercase tracking-[0.2em] mb-1">Debre na Rede v2.4.0</div>
          <div className="text-[10px] font-medium">Design by Debreceni F.C. Official</div>
        </div>
      </main>
    </div>
  );
};
