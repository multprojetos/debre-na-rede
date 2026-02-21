import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Users, Play, Mic, PlusCircle, StickyNote, Heart, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Chat = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F7F2] font-['Lexend'] text-[#0d1b3f] h-screen flex flex-col overflow-hidden max-w-[480px] mx-auto shadow-2xl">
      <header className="sticky top-0 z-20 bg-[#0d1b3f] text-white p-4 pb-3 shadow-md">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center p-1 rounded-full hover:bg-white/10 transition-colors">
            <ChevronLeft className="w-7 h-7" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-bold leading-tight tracking-tight uppercase">Resenha do Debre</h1>
            <p className="text-[10px] text-[#C5A059] font-medium tracking-[0.1em]">DEBRECENI F.C. OFFICIAL</p>
          </div>
          <button className="p-1 rounded-full hover:bg-white/10 transition-colors">
            <Users className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-3 bg-white/5 rounded-lg py-2 px-4 flex items-center justify-between border border-white/10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-300 font-semibold tracking-wider">Post-Match Chat</span>
            <span className="text-sm font-medium">Debre na Rede <span className="text-[#C5A059]">3 - 1</span> Rivals</span>
          </div>
          <div className="flex -space-x-2">
            {[1, 2].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0d1b3f] bg-slate-300 overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/50/50`} referrerPolicy="no-referrer" />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-[#0d1b3f] bg-slate-400 overflow-hidden text-[8px] flex items-center justify-center font-bold">
              +12
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 bg-[#F9F7F2]/50 no-scrollbar">
        <div className="flex justify-center">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-white/80 px-3 py-1 rounded-full shadow-sm">Today • 21:45</span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white shadow-sm overflow-hidden bg-slate-200">
            <img src="https://picsum.photos/seed/lucas/100/100" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col gap-1 max-w-[75%]">
            <span className="text-[12px] font-bold text-[#0d1b3f]/70 ml-1">Lucas Oliveira</span>
            <div className="relative bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm border border-slate-100">
              <p className="text-sm leading-relaxed text-slate-800">Jogão hoje rapaziada! Aquele segundo gol foi pintura pura. ⚽️🔥</p>
              <div className="absolute -bottom-3 -right-2 bg-white flex items-center gap-1 px-1.5 py-0.5 rounded-full shadow-md border border-slate-50 cursor-pointer">
                <ThumbsUp className="w-3 h-3 text-[#C5A059] fill-current" />
                <span className="text-[10px] font-bold text-[#C5A059]">8</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 ml-1">21:46</span>
          </div>
        </div>

        <div className="flex flex-row-reverse items-start gap-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white shadow-sm overflow-hidden bg-[#0d1b3f]">
            <img src="https://picsum.photos/seed/me/100/100" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col items-end gap-1 max-w-[75%]">
            <div className="relative bg-[#E8EAF0] p-3 rounded-tl-xl rounded-bl-xl rounded-br-xl shadow-sm border border-[#0d1b3f]/5">
              <p className="text-sm leading-relaxed text-[#0d1b3f] font-medium">Valeu! O cruzamento do Mateus foi perfeito, só tive o trabalho de empurrar pra rede.</p>
              <div className="absolute -bottom-3 -left-2 bg-white flex items-center gap-1 px-1.5 py-0.5 rounded-full shadow-md border border-slate-50">
                <Heart className="w-3 h-3 text-[#C5A059] fill-current" />
                <span className="text-[10px] font-bold text-[#C5A059]">12</span>
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 mr-1">21:48 • Visualizado</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 border-2 border-white shadow-sm overflow-hidden bg-slate-200">
            <img src="https://picsum.photos/seed/mateus/100/100" referrerPolicy="no-referrer" />
          </div>
          <div className="flex flex-col gap-1 max-w-[75%] w-full">
            <span className="text-[12px] font-bold text-[#0d1b3f]/70 ml-1">Mateus Silva</span>
            <div className="bg-white p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm border border-slate-100 flex items-center gap-3">
              <button className="w-8 h-8 flex items-center justify-center bg-[#C5A059] rounded-full text-white">
                <Play className="w-5 h-5 fill-current" />
              </button>
              <div className="flex-1 flex items-end gap-0.5 h-6">
                {[3, 5, 4, 6, 3, 5, 4, 2, 4, 2].map((h, i) => (
                  <div key={i} className={`w-1 h-${h} bg-[#C5A059] rounded-full`} style={{ opacity: (10 - i) / 10 }}></div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-slate-400">0:14</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 ml-1">21:50</span>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 p-4 pb-8">
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-[#0d1b3f] transition-colors">
            <PlusCircle className="w-7 h-7" />
          </button>
          <div className="flex-1 relative flex items-center">
            <input 
              className="w-full bg-slate-100 border-none rounded-full py-2.5 px-4 text-sm focus:ring-2 focus:ring-[#C5A059] placeholder-slate-400" 
              placeholder="Escreva na resenha..." 
              type="text"
            />
            <button className="absolute right-2 text-slate-400">
              <StickyNote className="w-5 h-5" />
            </button>
          </div>
          <button className="w-11 h-11 flex items-center justify-center bg-[#C5A059] text-white rounded-full shadow-lg shadow-[#C5A059]/30 active:scale-95 transition-transform">
            <Mic className="w-6 h-6 fill-current" />
          </button>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
      </footer>
    </div>
  );
};
