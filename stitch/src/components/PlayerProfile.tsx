import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share, UserPlus, Mail, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export const PlayerProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="bg-[#f9f7f2] text-slate-900 font-['Lexend'] min-h-screen pb-24">
      <div className="sticky top-0 z-50 bg-[#f9f7f2]/80 backdrop-blur-md flex items-center p-4 justify-between border-b border-[#0d1b3f]/10">
        <button onClick={() => navigate(-1)} className="text-[#0d1b3f] flex size-10 items-center justify-center rounded-full hover:bg-[#0d1b3f]/5">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[#0d1b3f] text-lg font-bold tracking-tight">Player Profile</h1>
        <button className="text-[#0d1b3f] flex size-10 items-center justify-center rounded-full hover:bg-[#0d1b3f]/5">
          <Share className="w-6 h-6" />
        </button>
      </div>

      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <div className="absolute inset-0 bg-[#0d1b3f]/10">
          <img 
            alt="Player action shot" 
            className="w-full h-full object-cover object-top" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmYmK8VbUgnZbVqHoNxL-wtTlFiaFULsS9UmSiiq50dVlQEqvQ2m0cxX6ZdwfxNZyY7Vqk_bZd975m0sgPl3B-Y4w6TpUmWp3N7IaiE2K0EodCxFZtiQD6CVQWYX7uzoyIr0kOfyQQQEYSgbdPOj3Guh2F5anerQJWYwRbkElqwvXDQYoc8Yz7hSTbt8LzhVip7LnAT1iO3RM_4OEYAgzcKU2BlHOI1-iHgY_KZl58g32wftKF5hM6fyVi0lZLBcJF9pmgXrtutju7"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f9f7f2] via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col items-center">
          <div className="mb-4 inline-flex items-center justify-center bg-[#0d1b3f] text-[#d4af37] px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase border border-[#d4af37]/30">
            Star Forward
          </div>
          <h2 className="text-[#0d1b3f] text-4xl font-bold text-center leading-none">Kovács Balázs</h2>
          <p className="text-[#0d1b3f]/60 text-lg font-medium mt-1">Debreceni F.C. • #10</p>
          <div className="flex gap-3 mt-6 w-full max-w-sm">
            <button className="flex-1 bg-[#0d1b3f] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#0d1b3f]/20 flex items-center justify-center gap-2">
              <UserPlus className="w-5 h-5 text-[#d4af37]" />
              Follow
            </button>
            <button className="flex-1 bg-white border-2 border-[#0d1b3f] text-[#0d1b3f] font-bold py-3 rounded-xl flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Inquiry
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Goals', val: '12', trend: '+2' },
            { label: 'Assists', val: '08', trend: '+1' },
            { label: 'Matches', val: '24', trend: "Season '24" }
          ].map(stat => (
            <div key={stat.label} className="bg-white p-5 rounded-2xl border border-[#0d1b3f]/5 shadow-sm flex flex-col items-center text-center">
              <span className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</span>
              <span className="text-[#0d1b3f] text-3xl font-bold">{stat.val}</span>
              <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold mt-1">
                {stat.trend.startsWith('+') && <TrendingUp className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-[#0d1b3f] text-xl font-bold">Season Performance</h3>
          <a className="text-[#d4af37] text-sm font-bold flex items-center gap-1" href="#">
            Details <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl border border-[#0d1b3f]/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#0d1b3f]/70 text-sm font-medium">Shot Accuracy</span>
              <span className="text-[#0d1b3f] font-bold">84%</span>
            </div>
            <div className="w-full bg-[#0d1b3f]/10 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] rounded-full" style={{ width: '84%' }}></div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-[#0d1b3f]/5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[#0d1b3f]/70 text-sm font-medium">Pass Completion</span>
              <span className="text-[#0d1b3f] font-bold">91%</span>
            </div>
            <div className="w-full bg-[#0d1b3f]/10 h-2 rounded-full overflow-hidden">
              <div className="h-full bg-[#0d1b3f] rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-10">
        <h3 className="text-[#0d1b3f] text-xl font-bold mb-4 px-1">Biography</h3>
        <div className="bg-[#0d1b3f] text-white p-6 rounded-2xl shadow-xl">
          <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-white/10">
            {[
              { label: 'Height', val: '188 cm' },
              { label: 'Preferred Foot', val: 'Right' },
              { label: 'Age', val: '26 Yrs' },
              { label: 'Born', val: 'Debrecen, HU' }
            ].map(item => (
              <div key={item.label} className="flex flex-col">
                <span className="text-[#d4af37] text-[10px] uppercase font-bold tracking-widest mb-1">{item.label}</span>
                <span className="text-lg font-bold">{item.val}</span>
              </div>
            ))}
          </div>
          <p className="text-white/80 text-sm leading-relaxed">
            Kovács is a versatile forward known for his clinical finishing and exceptional vision. Joining Debreceni F.C. in 2021, he has become the cornerstone of the club's offensive strategy.
          </p>
        </div>
      </div>

      <div className="px-4 mt-10 mb-8">
        <h3 className="text-[#0d1b3f] text-xl font-bold mb-4 px-1">Recent Form</h3>
        <div className="flex gap-2">
          {['W', 'W', 'D', 'W', 'L'].map((res, i) => (
            <div key={i} className={cn(
              "flex-1 aspect-square rounded-lg flex items-center justify-center text-white font-bold text-lg",
              res === 'W' ? "bg-emerald-500" : res === 'D' ? "bg-amber-500" : "bg-rose-500"
            )}>
              {res}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import { cn } from '../lib/utils';
