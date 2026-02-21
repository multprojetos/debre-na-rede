import React from 'react';
import { motion } from 'motion/react';
import { Bell, MapPin, Vote, Shirt, CreditCard, LayoutGrid, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="bg-[#FDFBF7] text-slate-900 font-['Lexend'] min-h-screen pb-24">
      <header className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#0d1b3f]/5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full border-2 border-[#C5A059] p-0.5 overflow-hidden bg-white shadow-sm">
            <img 
              alt="Debreceni FC Club Badge Logo" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQLP3crswjH5777Bl_qvy0THIms69rPy53T5Y5h3CD98JX-64dUJI_rUaJJJw57PmKbeQ5K2omLrKedOndoOBKPfs7kZZEFYSp9xYYPXn3Rh_MgSPEwrRiIHTCAbjwPb0S_mIKxf4B0ADlAhDKiIhVdyPgCGOIQaoobNriaLt6HTjqFjxEIkkMUU5eN7UtEQw8GpqeMQp7XHFxXzAta4jdfFCb7-c9tlDT5f8uWd17uUfPggg6cQeOzTqw9hpzqjPg5yCga07LOhTE"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#0d1b3f]/60 font-semibold">Bem-vindo</p>
            <h1 className="text-lg font-bold leading-none text-[#0d1b3f]">Olá, Torcedor</h1>
          </div>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full bg-[#0d1b3f]/5 text-[#0d1b3f]">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      <main className="flex-1">
        <section className="p-5">
          <div className="relative overflow-hidden rounded-xl bg-[#0d1b3f] p-6 text-white shadow-xl shadow-[#0d1b3f]/20">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-[#C5A059]/10 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-full bg-[#C5A059]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C5A059] border border-[#C5A059]/30">Próxima Partida</span>
                <span className="text-xs font-medium text-slate-300">Dom, 22 Out • 16:00</span>
              </div>
              <div className="flex items-center justify-around gap-4 mb-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="size-14 rounded-full bg-white/10 p-2 backdrop-blur-sm border border-white/20">
                    <img 
                      alt="Debre na Rede Club Logo" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbcE04QE4siTlsl65WNKfPGQcVGKEH8UWpIDierdy4EKZWFXycYhKHG6FvC1Qc_niadjTMUm_GTq0jOQJZNdBYXctGMqekbtv1bDGOGEWBzjKqHaeC8ROFXP3yvnrpy1pe_Qm-NRVgwA8zwV6kvO0TeFKgr2EVDMFW0bdKdtAmzhRnzSN4OYXzHLoOfjyoAlyJrWekT42ZXj128b8z616Mdi7RH2gt3drmRLywLHEaLr5Hybwmrmsx5pB3XHFlAUeFKtySpA_0oYbZ"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-sm font-bold">Debrê</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-[#C5A059]">VS</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="size-14 rounded-full bg-white/10 p-2 backdrop-blur-sm border border-white/20">
                    <img 
                      alt="FC Porto Logo" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyGGHbOKst9G0_NEu8z_rOA862hA_96A8rwQpwcRGPyqWxQP2qBrwJTAIAecvAG1JHvUA1cqNH2DkrNn4qGbO92ByYulG3JzZE2Dn4ZClZjOHXcIGzr0NJv568HNQ4KCNN2DM_3fSoTBiBLVRU2y28Xn0AGKYa81DPUh4guxZhEu5zlvXq5H3_lq2ybMOI2mBvyyZB2e5J8TM4oUhxKu1ycMmyecmYm-g96fVUf6_7raE8oJANj1yj-LlmfLfHyGtPU_0F8G6I2U6G"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="text-sm font-bold">FC Porto</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Estádio Municipal de Debrecen</span>
                </div>
                <button className="w-full rounded-lg bg-[#C5A059] py-3 text-sm font-bold text-[#0d1b3f] shadow-lg shadow-black/10 transition-transform active:scale-95">
                  Garantir Ingresso
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-2">
          <h2 className="mb-4 text-base font-bold text-[#0d1b3f]">Acesso Rápido</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/voting" className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-[#0d1b3f]/5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#0d1b3f]/5 text-[#0d1b3f] group-hover:bg-[#0d1b3f] group-hover:text-white transition-colors">
                <Vote className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-[#0d1b3f]">Voto do Torcedor</p>
            </Link>
            <Link to="/store" className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-[#0d1b3f]/5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#0d1b3f]/5 text-[#0d1b3f] group-hover:bg-[#0d1b3f] group-hover:text-white transition-colors">
                <Shirt className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-[#0d1b3f]">Manto Sagrado</p>
            </Link>
            <Link to="/menu" className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-[#0d1b3f]/5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#0d1b3f]/5 text-[#0d1b3f] group-hover:bg-[#0d1b3f] group-hover:text-white transition-colors">
                <CreditCard className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-[#0d1b3f]">Sócio Debrê</p>
            </Link>
            <Link to="/squad" className="group flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm border border-[#0d1b3f]/5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#0d1b3f]/5 text-[#0d1b3f] group-hover:bg-[#0d1b3f] group-hover:text-white transition-colors">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-[#0d1b3f]">Tabela e Jogos</p>
            </Link>
          </div>
        </section>

        <section className="px-5 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-[#0d1b3f]">Últimas do Debrê</h2>
            <a className="text-xs font-semibold text-[#C5A059] underline underline-offset-4" href="#">Ver todas</a>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 rounded-xl bg-white p-3 shadow-sm border border-[#0d1b3f]/5">
              <div className="size-20 shrink-0 overflow-hidden rounded-lg">
                <img 
                  alt="Training session" 
                  className="h-full w-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8KP5YH9zqjd94fOW1IgdQl7UpvETqmXtaTguZkU7NF6bsg3ypVquQQj30EUqmOrTGn4HGP8lt5gkivb0zsuw4_JFHKqC_dcJkwEOuHZbc7lfcLq6XzQ0eLqwm3hknlnBBy6OM9LYXwjvuuOKyF1Q_3XiHNUazNTAxjgVbN4TXGkkof12I_Zn3WOkKYqepcJ1WhyMPL2M0j2xhtktuvIEtQPHHg5SAOfLldF0nksS_vVLMi8HLzpMdWymkU6V-CAk69VUF3WEX9-y7"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-tighter">Treinamento</span>
                <h3 className="line-clamp-2 text-sm font-bold leading-tight text-[#0d1b3f]">Elenco inicia preparação intensiva para o Derby de Domingo</h3>
                <p className="text-[10px] text-slate-500">Há 2 horas</p>
              </div>
            </div>
            <div className="flex gap-4 rounded-xl bg-white p-3 shadow-sm border border-[#0d1b3f]/5">
              <div className="size-20 shrink-0 overflow-hidden rounded-lg">
                <img 
                  alt="New jersey reveal" 
                  className="h-full w-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNnEQrWOeCrBYJ1JZHDF9UIIZABp_361DdOjz6GAan2IHKQbCFwqOM5P37OsTS6WBpVVszN7qxdVK65_5ENI6A92a196ElmUdLf2lj-qlHJRb43l0DXhXjULtlYBHDU2qiuprBgfSdkSuqnuS2ZYX2vZKo11O3uhNUl9kbBNRInU23PZnHUkvxoDKGRI4z-aiW5GN9rbjX9nl7RTKZGT9hULV1AS9Lfv9NgaF_NfZnfCglMMjvg4vfvgnyWWm7SbpAUKUfs3NoPgnE"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-tighter">Loja Oficial</span>
                <h3 className="line-clamp-2 text-sm font-bold leading-tight text-[#0d1b3f]">Novo Manto Sagrado "Edição Ouro" já está disponível</h3>
                <p className="text-[10px] text-slate-500">Há 5 horas</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-4">
          <h2 className="px-5 mb-4 text-xs font-bold uppercase tracking-widest text-[#0d1b3f]/40">Nossos Parceiros</h2>
          <div className="flex gap-6 overflow-x-auto px-5 pb-4 no-scrollbar">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex h-12 w-24 shrink-0 items-center justify-center grayscale opacity-50">
                <img 
                  alt={`Partner ${i}`} 
                  src={`https://picsum.photos/seed/partner${i}/200/100`}
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
