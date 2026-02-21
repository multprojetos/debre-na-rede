import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Vote as VoteIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const candidates = [
  { id: 10, name: 'Gabriel Lima', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaUvFWvDATp_ynKqOMtEuH-n1qdb8Q55yTr-H4nJBCP1RMCE4XaRRDCB0DsSPnviq3k5OB30E1X5GdGvhMZS5s-7gOoFVAyWMn9rNeRcQco6nZ_vLfvliLBtDOPqKB3_GR3MHeGsq8UD8CWNWxdx98N5a25MXvq5AyhfR-xnQG-hQCfCZs23CpUpD_Qu08ldEQKs5B2Nzzr0DgR3Jx22QEfeVbyJL4ErdrGQq7r_8io0ife9lMXIP65zK4mePIV_BDCrz4JSMyfKDd' },
  { id: 7, name: 'Thiago Silva', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALzAFgJKoEEs5KuzLh_i3NOp5mEx6ZyyLSS2uQuPshCLtdX115JU5oi0t1BTk7_tIQpRKv8EVWbJQ6qxOU57laRB06G3sBfqlE1CCkHQY-ntPdT_5hsK_3HYoYsw5TLiwNin1Wg6-dSZXiIaqtYuGrokYShJCmjfyZZYj4fOqihNNmV15ggy2AB83FdKXw_-9hgadpgmsrnlOUpN3-4SUU5Kk6yD_LeZowtyNZbmnVsy6pT1UKf6pvvvvYTNKfSc-7AMT57C_32FRe' },
  { id: 22, name: 'Lucas Rocha', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYpObgLAymniOTEKJSHoAVqRMxhhek-Dvc0zWXte6EnZO6bhp0-KPB5YTypD_Kw9VkvK3bNs_XC8rTnKGAoqmZHV0crTtxQw3imu1_7dVntPYbvUJ_m74W_RvsQtb51ukKtTPjJjca2fFSxjwQnvEywUheCHGp7oorhg3koixEqmtsAN05-Ru6YxX_MpAuVCwfpuD10uqao-8Yty4nar1tx7c45FAOIGeH3XnQsHK77XnNDSY59UWX3SEfNNZ2NyITlsQwIhhJfeoU' },
  { id: 1, name: 'Digo Nunes', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhk_pRacb2Jc44Fsd_LnMnAa-1YHfL68lQqMZPvtKHn-1W6k4H_Sxc7T0tbSvza8Pz0M_nci2waHdC8xJ9fZRP_mnJ1mGfVJKYxhIBeUeP5xRgxhIiEG4hhhFxgHhr-b7vlp1amiB82LvjqMKXUmfJvlzBCLAEYOvCKX7wuyB4aPqNDk8kyCtFIUXDS26RIgKCu4LMe1IFYFNf7pEX-2kUyVxO7dOghgZTXQYhw68xxYEt8Znb9-mCjbQ0kjLNWoO_x0gdxx3Tcu4f' },
  { id: 5, name: 'Enzo Ferrari', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhfSATTjdC24XGm8ElHvqDNPbvSURauoeEOE_If_akTwDOcTpznYiqUU0-B7HFedcfx-1bu0y_jgNx1NU2WalgyxEUHAOSBh_g1R8JS4t4i5N_qrvhOrKnncfGUas3Lndy5PxIwvlSZlpHu7apoMX6bAZMVsgl1JjeBRePf0W3DrIqwx8HXQCr8yfPd60roxukEDmSbWtrpB60r9bN6FB1adlR5_h2-Q6Gec_RuDa0E7VhK1uSSCoGS3qm79j4T1on6YUzdDdroSpP' },
  { id: 11, name: 'Rafa M.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcSD456oKmWOyTfK1yyrqnJdnsPJA7AuAnJZsSjpNpp6C9J-bdBwH_ReSwWQCYYobY53xmKm4P38DifiQHk-1-sl9qrdOZUTGEfCOfE2G4ajs-H2geb1M_aUoo0QrpbsWbjLNzdm91JMm4sYAKdheVtcJ5-7E5QPeOCl0QGwLe8IhDg5JsNrmpJcZ-VV_x2-e-eLWfk2rTYVD2zJyTyPyh5RzQMo7-kQbXYIJV4_I9gQqkctc641yqsfZgpFEYf3J2R74KnDS_TUF_' },
];

export const Voting = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState<number | null>(10);

  return (
    <div className="bg-[#fdfaf1] font-['Lexend'] text-slate-900 antialiased min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#fdfaf1]/80 backdrop-blur-md border-b border-[#0d1b3f]/10 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-[#0d1b3f]">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold tracking-tight text-[#0d1b3f] uppercase">Voto do Torcedor</h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="p-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#0d1b3f]/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#c5a059] tracking-widest mb-1">Última Partida</span>
              <h2 className="text-sm font-bold text-[#0d1b3f]">Debre na Rede vs FC Taurus</h2>
              <p className="text-xs text-slate-500">Arena Debre • 14 Out 2023</p>
            </div>
            <div className="bg-[#0d1b3f] text-white px-3 py-1 rounded-lg text-lg font-black italic">
              2 - 1
            </div>
          </div>
        </div>

        <div className="px-4 py-2 text-center">
          <h3 className="text-xl font-bold text-[#0d1b3f]">Quem foi o Craque do Jogo?</h3>
          <p className="text-sm text-slate-500 mt-1 italic">Escolha o jogador que mais se destacou nesta vitória</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 mt-2">
          {candidates.map(player => (
            <button 
              key={player.id} 
              onClick={() => setSelected(player.id)}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="relative">
                <div className={cn(
                  "w-24 h-24 rounded-full overflow-hidden transition-all duration-300",
                  selected === player.id 
                    ? "border-3 border-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)] ring-4 ring-[#c5a059] ring-offset-2 ring-offset-[#fdfaf1]" 
                    : "border-2 border-[#0d1b3f]/10 bg-slate-200 grayscale opacity-80"
                )}>
                  <img 
                    alt={player.name} 
                    className="w-full h-full object-cover" 
                    src={player.img}
                    referrerPolicy="no-referrer"
                  />
                </div>
                {selected === player.id && (
                  <div className="absolute -bottom-1 -right-1 bg-[#c5a059] text-white rounded-full p-1 border-2 border-[#fdfaf1]">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-xs font-bold uppercase tracking-tighter",
                  selected === player.id ? "text-[#c5a059]" : "text-slate-400"
                )}>#{player.id.toString().padStart(2, '0')}</p>
                <p className={cn(
                  "text-sm font-bold",
                  selected === player.id ? "text-[#0d1b3f]" : "text-slate-500"
                )}>{player.name}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#fdfaf1]/90 backdrop-blur-md border-t border-[#0d1b3f]/5">
        <button className="w-full bg-[#0d1b3f] hover:bg-[#0d1b3f]/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2">
          Confirmar Voto
          <VoteIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
