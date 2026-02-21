import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Store as StoreIcon, Newspaper, Users, User, ShoppingCart, Shield } from 'lucide-react';

const products = [
  { id: 1, name: 'Manto Reserva "Debre"', price: 'R$ 299,90', tag: 'Temporada 23/24', desc: 'Tecido tecnológico Dry-Fit com escudo bordado em alta definição.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvcI7soVCBAsDLBVsowOUPtEZD84nmcboHn-s1fx4_eObBUxUzG_aSIeVlAfO5srqrJFe9Lc0qr-gW-dhvrJtIg_pJhb20gD2XgFKtSrRTTHEzeesv0UKZ4QWs5ad35At9MwJ9Rc-TNxpaCIGFasqwRS3kuw6u6_86QQpHKFBYeYLftQGAedby9HHR-HLDNHmp69WiGgSXWH27GEIDZ1Fb3VHMJ0igp0wN6HMvDkxT6SJRLPNV1w_Ay6SKDVQ2IdauRXb0-SpSuvC3' },
  { id: 2, name: 'Manto de Gala (Black)', price: 'R$ 349,90', tag: 'Edição Limitada', desc: 'Versão exclusiva comemorativa com detalhes em dourado fosco.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVEBLkbTPLmnGC2K97GC2ZJq5iQG_eyxkfbgmWxLZ3tmu-e9EsrhvDmGujCXmt5_WhGNfgX48GbnjqFCWAqSEJ9uNw3RFXbtVdwgiUBle_g1qYYaez9nMClEtkqXFEf41h3WwAhYdlgV3AA1rLblNVjDCKDPoF-9xR0vueiMO10lwA1u5EQLwON-pMhixGBPrOwT6qf8vLEVRZI9la_SZspy_gGcseEyC8PYgPQ98OKWTh9Au-dFMB0FitTvm58wjIifrqVmoD2fse' },
  { id: 3, name: 'Manto Retrô Especial', price: 'R$ 219,90', tag: 'Retrô 1994', desc: 'Reedição oficial do primeiro uniforme histórico do clube.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Rvf2IQhxAqZhCFoE3wtONAXCcZH-HBdb_qlKNXRePO3IrV1914u8KvJW-j26ejmHWPE3Wn102-PPPuUbZm54Pl8bz6GRHvtNv_cKBUOw7SqQIYE6hZ7vsmt23QvDLeHX4YvsK_QwjNCXGTBeu-d7qvoSIDGmuYvYolmLpAqljMo5Q75e6IatFJRltuFqDHMgYUlMB6BqZtEcKxEZ3k7iuz8uOQuBq0x0hMBj_Qx7U2rNbBAsO_l4Po51x0B7BfSU_kgPpHwiUeAN' },
];

export const Store = () => {
  return (
    <div className="bg-[#FDFCF7] font-['Lexend'] text-[#0d1b3f] antialiased min-h-screen pb-24">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#FDFCF7]/80 backdrop-blur-md px-5 py-4 border-b border-[#0d1b3f]/5">
        <div className="flex items-center gap-3">
          <div className="bg-[#0d1b3f] rounded-lg p-1.5 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#C5A059]" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">Manto Sagrado</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#0d1b3f]/60 font-medium">Debre na Rede FC</p>
          </div>
        </div>
        <button className="relative p-2 text-[#0d1b3f]">
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A059] text-[10px] font-bold text-[#0d1b3f]">2</span>
        </button>
      </header>

      <div className="flex gap-3 px-5 py-6 overflow-x-auto no-scrollbar">
        {['Todos', 'Titular', 'Reserva', 'Retrô', 'Treino'].map((cat, i) => (
          <button key={cat} className={cn(
            "flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm font-semibold transition-all",
            i === 0 ? "bg-[#0d1b3f] text-white shadow-lg shadow-[#0d1b3f]/20" : "bg-white border border-[#0d1b3f]/10 text-[#0d1b3f]"
          )}>
            {cat}
          </button>
        ))}
      </div>

      <section className="px-5 mb-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#0d1b3f] aspect-[16/10] flex items-center justify-between p-6 group">
          <div className="z-10 w-1/2">
            <span className="inline-block bg-[#C5A059]/20 text-[#C5A059] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded mb-2">Lançamento</span>
            <h2 className="text-white text-2xl font-bold leading-tight mb-2">Manto Titular 2024</h2>
            <p className="text-slate-300 text-xs mb-4">A tradição renovada com detalhes em ouro.</p>
            <button className="bg-[#C5A059] hover:bg-[#C5A059]/90 text-[#0d1b3f] font-bold py-2 px-5 rounded-lg text-sm transition-colors">
              Ver Detalhes
            </button>
          </div>
          <div 
            className="absolute right-[-10%] top-0 h-full w-2/3 rotate-12 bg-center bg-no-repeat bg-contain" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwdfeF-w1U-OUAxtU8KCd-NaMikvwDYXA-f1UshkJPr9Rgd66oe8_20Oj_zOBHvoDwIJn-61RT78aSUYvZRwZz0OvHD4E-Ryn1mba-roDI1nElrEH5uiktfYk2ThE29qgSKFFo7WMFtOOsMnmCw1lFDftW3crWiLFoSKK5xf7RrCq8JC5lq03q1oniJDiypL1Hm04IUb7P9rLmJqpXZNF4qzUg1tIPxPZGprau8qMsvpDgVMHtGMmufKfFHGLQn63vq0nTHWRxXw-Y')" }}
          ></div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 px-5 pb-24">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[#0d1b3f]/40">Coleção Completa</h3>
        {products.map(product => (
          <div key={product.id} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm border border-[#0d1b3f]/5">
            <div className="relative aspect-square overflow-hidden bg-slate-50">
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-[#0d1b3f] uppercase tracking-tighter">{product.tag}</span>
              </div>
              <div 
                className="h-full w-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url('${product.img}')` }}
              ></div>
            </div>
            <div className="flex flex-col p-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-base font-bold text-[#0d1b3f]">{product.name}</h4>
                <span className="text-lg font-bold text-[#0d1b3f]">{product.price}</span>
              </div>
              <p className="text-xs text-[#0d1b3f]/60 mb-4 leading-relaxed">{product.desc}</p>
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#C5A059] py-3 text-sm font-bold text-[#0d1b3f] transition-all active:scale-[0.98] hover:shadow-lg hover:shadow-[#C5A059]/20">
                <ShoppingCart className="w-4 h-4" />
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
