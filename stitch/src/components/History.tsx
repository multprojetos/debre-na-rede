import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Share, Trophy, Star, Scroll, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const events = [
  { year: '2009', title: 'A Fundação', desc: 'O nascimento de um sonho em Debre na Rede, movido pela paixão local.', img: 'https://picsum.photos/seed/found/400/400', side: 'right' },
  { year: '2012', title: 'A Ascensão', desc: 'Entrada triunfante nas ligas amadoras e as primeiras vitórias expressivas.', img: 'https://picsum.photos/seed/rise/400/300', side: 'left' },
  { year: '2015', title: 'Primeiro Título', desc: 'A conquista inesquecível da taça regional. O grito de campeão ecoou.', img: 'https://picsum.photos/seed/trophy/400/300', side: 'right', icon: Trophy },
  { year: '2019', title: 'Nova Sede', desc: 'Inauguração do centro de treinamento premium, elevando nosso patamar.', img: 'https://picsum.photos/seed/hq/400/400', side: 'left' },
];

export const History = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF9F6] text-[#0D1B3E] font-['Noto_Serif'] min-h-screen pb-24">
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#0D1B3E]/5 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-[#0D1B3E]/5 transition-colors">
          <ChevronLeft className="w-6 h-6 text-[#0D1B3E]" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="text-[#0D1B3E] font-bold text-lg leading-none">Nossa História</h1>
          <span className="text-[10px] uppercase tracking-widest text-[#c8a328] font-bold">Debre na Rede</span>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full hover:bg-[#0D1B3E]/5 transition-colors">
          <Share className="w-6 h-6 text-[#0D1B3E]" />
        </button>
      </header>

      <main className="relative px-4 py-10 max-w-lg mx-auto overflow-x-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#0D1B3E] opacity-20"></div>

        {events.map((event, i) => (
          <motion.div 
            key={event.year}
            initial={{ opacity: 0, x: event.side === 'right' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative mb-16 flex w-full ${event.side === 'right' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
              {event.icon ? (
                <div className="size-6 rounded-md bg-[#c8a328] flex items-center justify-center text-white shadow-xl rotate-45 border-2 border-[#0D1B3E]">
                  <event.icon className="w-3.5 h-3.5 -rotate-45" />
                </div>
              ) : (
                <div className="size-4 rounded-full bg-[#c8a328] border-4 border-[#FAF9F6] shadow-[0_0_0_2px_#0D1B3E]"></div>
              )}
            </div>

            <div className="w-[45%] bg-white rounded-lg p-3 shadow-lg border border-[#0D1B3E]/5">
              <span className="text-[#0D1B3E] font-black text-sm mb-1 block">{event.year}</span>
              <div className={`rounded-md mb-2 overflow-hidden bg-zinc-200 ${event.side === 'right' ? 'aspect-square' : 'aspect-video'}`}>
                <img 
                  alt={event.title} 
                  className="w-full h-full object-cover grayscale opacity-80" 
                  src={event.img}
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-bold text-sm text-[#0D1B3E] leading-tight">{event.title}</h3>
              <p className="text-[11px] text-[#0D1B3E]/70 mt-1 leading-relaxed">{event.desc}</p>
            </div>
          </motion.div>
        ))}

        <div className="relative mb-10 flex flex-col items-center w-full">
          <div className="relative z-10 size-8 rounded-full bg-[#0D1B3E] flex items-center justify-center text-[#c8a328] mb-4 border-2 border-[#c8a328]">
            <Star className="w-4.5 h-4.5 fill-current" />
          </div>
          <div className="w-full bg-[#0D1B3E] text-white rounded-xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
              <Scroll className="w-[200px] h-[200px]" />
            </div>
            <div className="relative z-10">
              <span className="text-[#c8a328] font-black text-lg block mb-1">2024</span>
              <h2 className="text-2xl font-bold mb-3 italic">Legado em Construção</h2>
              <p className="text-sm opacity-80 leading-relaxed max-w-[80%]">
                O futuro é escrito a cada partida. Continuamos nossa jornada rumo à excelência, honrando cada gota de suor deixada em campo.
              </p>
              <button className="mt-6 flex items-center gap-2 bg-[#c8a328] text-[#0D1B3E] font-bold py-2 px-5 rounded-full text-sm">
                <span>Ver Elenco Atual</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
