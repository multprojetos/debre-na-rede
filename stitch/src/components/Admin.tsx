import React from 'react';
import { motion } from 'motion/react';
import { Shield, Settings, Edit, Trash2, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Admin = () => {
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('Partidas');

  return (
    <div className="bg-[#fdfbf7] text-slate-900 font-['Lexend'] min-h-screen pb-32">
      <header className="sticky top-0 z-30 bg-[#0d1b3f] text-white px-4 pt-12 pb-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-[#0d1b3f] font-bold shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Painel Admin</h1>
              <p className="text-xs text-[#d4af37] font-medium uppercase tracking-widest">Debre na Rede FC</p>
            </div>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main>
        <div className="px-4 py-6">
          <div className="flex h-12 items-center justify-between rounded-xl bg-slate-200/50 p-1">
            {['Partidas', 'Elenco', 'Notícias'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex h-full grow items-center justify-center rounded-lg px-2 text-sm font-semibold transition-all",
                  tab === t ? "bg-white shadow-sm text-[#0d1b3f]" : "text-slate-500"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-[#0d1b3f] uppercase tracking-wider">Gerenciar {tab}</h2>
            <span className="text-xs font-medium text-slate-400">12 itens</span>
          </div>

          {[
            { date: 'OUT 15', title: 'vs. Debrecen Eagles', sub: 'Arena Local • 20:00' },
            { date: 'OUT 22', title: 'vs. Lions FC', sub: 'Campo B • 18:30' },
            { date: 'NOV 05', title: 'Copa Regional', sub: 'Estádio Municipal • 15:00' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex flex-col items-center justify-center border border-slate-100">
                  <span className="text-[10px] font-bold text-[#d4af37] uppercase">{item.date.split(' ')[0]}</span>
                  <span className="text-lg font-bold text-[#0d1b3f] leading-none">{item.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-50 text-slate-600 hover:bg-[#0d1b3f] hover:text-white transition-all">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-6 border-t border-slate-200 mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#0d1b3f] uppercase tracking-wider">Destaque do Elenco</h2>
            </div>
            <div className="flex items-center gap-4 bg-[#0d1b3f] text-white p-4 rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <User className="w-32 h-32" />
              </div>
              <img 
                className="w-14 h-14 rounded-full border-2 border-[#d4af37] object-cover" 
                src="https://picsum.photos/seed/ricardo/100/100"
                referrerPolicy="no-referrer"
              />
              <div className="z-10">
                <p className="text-xs text-[#d4af37] font-bold uppercase tracking-widest">Capitão</p>
                <h3 className="text-lg font-bold">Ricardo Silva</h3>
                <p className="text-xs opacity-70">Meio-Campo • Camisa 10</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <button className="fixed bottom-24 right-6 w-16 h-16 bg-[#d4af37] text-[#0d1b3f] rounded-full shadow-2xl flex items-center justify-center z-40 border-4 border-white active:scale-95 transition-transform">
        <Plus className="w-10 h-10 font-bold" />
      </button>
    </div>
  );
};
