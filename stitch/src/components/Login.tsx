import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Lock, Eye } from 'lucide-react';

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  return (
    <div className="bg-[#FAF9F6] text-slate-900 min-h-screen flex flex-col font-['Lexend']">
      <div className="h-12 w-full"></div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center px-6 pt-8 pb-4"
      >
        <div className="w-20 h-20 bg-[#0d1b3f] rounded-xl flex items-center justify-center mb-4 shadow-[0_4px_12px_rgba(13,27,63,0.05)]">
          <span className="material-symbols-outlined text-[#C5A059] text-5xl">sports_soccer</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0d1b3f] tracking-tight">Debre na Rede</h1>
        <p className="text-sm text-slate-500 font-light mt-1 uppercase tracking-widest">Debreceni F.C. Elite</p>
      </motion.div>

      <div className="px-6 py-6">
        <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-200/50 p-1">
          <button className="flex h-full grow items-center justify-center rounded-lg px-2 bg-white shadow-sm text-[#0d1b3f] text-sm font-semibold">
            Entrar
          </button>
          <button className="flex h-full grow items-center justify-center rounded-lg px-2 text-slate-500 text-sm font-semibold">
            Criar Conta
          </button>
        </div>
      </div>

      <div className="px-6 mb-6">
        <h2 className="text-3xl font-bold text-[#0d1b3f]">Bem-vindo</h2>
        <p className="text-slate-500 mt-1">Acesse sua conta para gerenciar seus treinos e partidas.</p>
      </div>

      <div className="px-6 flex-1">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0d1b3f] ml-1">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-4 h-14 bg-white border border-slate-100 rounded-xl shadow-[0_4px_12px_rgba(13,27,63,0.05)] focus:border-[#C5A059] focus:ring-0 transition-colors placeholder:text-slate-300 text-[#0d1b3f]" 
                placeholder="seu@email.com" 
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#0d1b3f] ml-1">Senha</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                className="w-full pl-12 pr-12 h-14 bg-white border border-slate-100 rounded-xl shadow-[0_4px_12px_rgba(13,27,63,0.05)] focus:border-[#C5A059] focus:ring-0 transition-colors placeholder:text-slate-300 text-[#0d1b3f]" 
                placeholder="••••••••" 
                type="password"
              />
              <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 cursor-pointer" />
            </div>
          </div>

          <div className="flex justify-end">
            <a className="text-sm font-medium text-[#C5A059] hover:text-[#0d1b3f] transition-colors" href="#">Esqueceu a senha?</a>
          </div>

          <button 
            onClick={onLogin}
            className="w-full h-14 bg-[#0d1b3f] text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(13,27,63,0.05)] hover:bg-[#0d1b3f]/90 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Entrar no Clube</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 my-8">
          <div className="h-[1px] bg-slate-200 flex-1"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ou continue com</span>
          <div className="h-[1px] bg-slate-200 flex-1"></div>
        </div>

        <button className="w-full h-14 bg-transparent border-2 border-[#0d1b3f] text-[#0d1b3f] font-bold rounded-xl hover:bg-[#0d1b3f]/5 transition-all flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
          </svg>
          <span>Google</span>
        </button>
      </div>

      <div className="h-8 w-full bg-white flex justify-center items-center pb-2 mt-auto">
        <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
      </div>
    </div>
  );
};
