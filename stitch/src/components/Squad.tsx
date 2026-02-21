import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, SlidersHorizontal, ChevronRight, Star, Verified } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const players = [
  { id: 1, name: 'M. KOVÁCS', number: '#1', role: 'Titular Absoluto', category: 'Goleiros', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBikWG5YoF-Jj7QQ1YUADIZcvnpSuUFW-x6Ho3SBclVGmUTIMwwXTZY1oK9EqqsNyb-H4NWQsNQnquJiiV0-f01R96vP2UOICWyXnNlrdH9kQVXGtHLgUUNrNJsoD6ld-7svGrf0BW-S5Abdu-QDB9fm4ecIxHwmRyGfDYME2x1wReVla9ocI52WTVKGjJIwG3KOp1TyUlozgEXu_nSycrzdCk-2IKdcCNxpBNq54DrVYX_Iq2HCRuiS4SO5h6j9CyHuzKUJNV5VWef' },
  { id: 12, name: 'P. SZABÓ', number: '#12', role: 'Reserva', category: 'Goleiros', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6BRCWf8g1HueVcRDL31z5PPoPnFMTVkNEb5ecXwfbwWAhPmzKauglCbddvhE2BBArpq6CSNhcvWp1ZXkSTg8vi6qA1G1SctGghcD7UA8wKNC7u5GOgDj3c2EVE27Wlnu7RRnYGp3rXJbyMMRSCIlQTjrDZLPiY9j83Z4ueHrV_gZ_gjFlMahJgSrfvK66oYyehSl-GIc4G9uDRkHA1brYQ5VcC30ZCN-jVfGu1HDw6cNJaIlUkIVM89qKhT50I_P1PKyOPfwwVDVf' },
  { id: 3, name: 'L. NAGY', number: '#3', role: 'Zagueiro Central (Capitão)', category: 'Defensores', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSL1RuIzcAoE6t3bO0lANYU_KdWiilp2tmNpMCalxfV1x3F98AqHOoymMc27RuR4J1SFrOLOklrbgmCplK2Ody52rRDm0zaYv_Dekfjan61dNQEOG76f-NcHTIWAUvg1bjGXvjQPXtulcWWqlji5gFmIwcVyOjPQj2cahENNZGD7NMolFfu7dNcphFycJJea_5NTQYBHmSHo0HTnTsl217bXMLSRELoqjLkkddxbE4wdbe2TOnS2f4ZdwfyAn4DV_znmKPYqD3HosV' },
  { id: 4, name: 'B. FARKAS', number: '#4', role: 'Zagueiro', category: 'Defensores', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNsBkv6WOtk72a1n9HztvBWcdHSfJW6E3mLbgv-3txySHOCYFk0BSqKEvLyQGStKzIhrTTfFAB9Ip-panye359rYqwRBhJQSajBep8gUhOhozAOPho_Lyl5i1joztjZi7FDh6Uk-CdtToyiaNPLEj_Q1x5ZG2w2gbCdRsZCJ9a4W_abKcCPCLwYR7yRS6cVq7LUrYbYdgSG2lI7CmvmW-6HPHqXH9OGWnszaE3LU-oUYF-fWJnM1wqQadbVxvALKSK20Ll74e5ke01' },
  { id: 10, name: 'A. VARGA', number: '#10', role: 'Meia Atacante', category: 'Meio-Campistas', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP2rgXSHl_Z_G4ZAjAVnNUERF-iTBYbIOiQZ_rYkWR4buoU6o1SacBJsbo8hYPMvGYjmb6f8UFIWHDzO3TAj1RVRmyHaDNowxAnXprzGSmNuTakZ9a821C7NJwd2qZj8wbDQ3KtZ1bPbDHI2gTlJehPu8nfY1JuxM093q4OkAs2XxDVFPf-uAzaJpka4d8w4TpofvZ3J_wgnV2Yx5XdvKM2VqRVzkj3babUidGBspeAEqDYSJ-TdcKO2F7Ov0KvCK5CpLWhl1Kerly' },
];

export const Squad = () => {
  const navigate = useNavigate();
  const categories = ['Todos', 'Goleiros', 'Defensores', 'Meias', 'Atacantes'];

  return (
    <div className="font-['Lexend'] text-[#0d1b3f] bg-[#fdfaf1] antialiased min-h-screen pb-24">
      <header className="sticky top-0 z-50 bg-[#fdfaf1]/80 backdrop-blur-md border-b border-[#0d1b3f]/10">
        <div className="flex items-center justify-between px-4 py-4 pt-12">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold tracking-tight uppercase">ELENCO</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#0d1b3f]/5 transition-colors">
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#0d1b3f]/5 transition-colors">
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto no-scrollbar px-4 pb-2 gap-6 items-center">
          {categories.map((cat, i) => (
            <button key={cat} className={cn(
              "flex flex-col items-center gap-1 border-b-2 pb-2 shrink-0",
              i === 0 ? "border-[#c5a059]" : "border-transparent opacity-50"
            )}>
              <span className="text-sm font-bold">{cat}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 space-y-8">
        {['Goleiros', 'Defensores', 'Meio-Campistas'].map(cat => (
          <section key={cat}>
            <div className="flex items-center justify-between mb-4 border-l-4 border-[#c5a059] pl-3">
              <h2 className="text-lg font-bold uppercase tracking-wide">{cat}</h2>
              <span className="text-xs font-semibold text-[#c5a059] bg-[#0d1b3f] px-2 py-1 rounded">
                {players.filter(p => p.category === cat || (cat === 'Meio-Campistas' && p.category === 'Meio-Campistas')).length} ATLETAS
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {players.filter(p => p.category === cat || (cat === 'Meio-Campistas' && p.category === 'Meio-Campistas')).map(player => (
                <Link 
                  key={player.id}
                  to={`/player/${player.id}`}
                  className="flex items-center bg-white p-3 rounded-xl shadow-sm border border-[#0d1b3f]/5 active:scale-[0.98] transition-transform"
                >
                  <div className="relative w-20 h-20 bg-[#fdfaf1] rounded-lg overflow-hidden border border-[#c5a059]/30">
                    <img 
                      className="w-full h-full object-cover" 
                      src={player.img}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <p className="text-xs font-bold text-[#c5a059] uppercase tracking-tighter">{player.number}</p>
                    <h3 className="text-lg font-bold text-[#0d1b3f] leading-tight">{player.name}</h3>
                    <p className="text-xs text-[#0d1b3f]/60 font-medium">{player.role}</p>
                  </div>
                  <div className="pr-2">
                    {player.id === 3 ? <Star className="w-5 h-5 text-[#c5a059] fill-current" /> : 
                     player.id === 10 ? <Verified className="w-5 h-5 text-[#c5a059] fill-current" /> :
                     <ChevronRight className="w-5 h-5 text-[#0d1b3f]/20" />}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

import { cn } from '../lib/utils';
