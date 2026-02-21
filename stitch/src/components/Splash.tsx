import React from 'react';
import { motion } from 'motion/react';

export const Splash = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-between bg-[#0d1b3f] overflow-hidden select-none font-['Lexend']">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[150%] aspect-square rounded-full opacity-60 bg-[radial-gradient(circle,_rgba(201,162,39,0.25)_0%,_rgba(13,27,63,0)_70%)]"></div>
      </div>
      <div className="h-16 w-full"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center justify-center px-8"
      >
        <div className="relative group">
          <div className="absolute -inset-4 rounded-full border border-[#C9A227]/10 scale-110"></div>
          <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
            <img 
              alt="Debreceni F.C. Club Crest" 
              className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(201,162,39,0.3)]" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANnHY6BjdHGsYD4gFU6i3pHpN-n3pIbzOYm6jPF0sFps28520wiE5N1F0EXxw7PIeNAVU8VosRhWiAZzPnsLDOgpUJxOEK37HR8yXDFckI91-0Qi9EMfha6lparnKEFHaxojhdVmRadyiWvkyPUu4hFLf0QLSx_wjfMYnCY-Xu-NENgj4FyxjuGvF1o2_uaQCEjfzBojdEPads43shqzI79TVxKwVamHgav5lRVPvWF79Zx7ixXmWPI7OfeDN94p-ti_1-88x_yjQd"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold tracking-widest text-[#F5F5DC] uppercase">Debre na Rede</h1>
          <p className="text-[#C9A227]/80 text-sm mt-2 font-light tracking-[0.3em] uppercase">Debreceni F. C.</p>
        </div>
      </motion.div>
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center pb-12 gap-8">
        <div className="w-full flex flex-col gap-3 px-6">
          <div className="flex justify-between items-end">
            <span className="text-[#F5F5DC]/40 text-[10px] font-medium uppercase tracking-widest">Initializing Pitch</span>
            <span className="text-[#C9A227] text-xs font-semibold">{progress}%</span>
          </div>
          <div className="h-[2px] w-full bg-[#F5F5DC]/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C9A227] rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[#C9A227]/40 text-[10px] font-medium tracking-[0.4em] uppercase">Est. 1902</p>
          <div className="h-1 w-8 bg-[#C9A227]/20 rounded-full mt-2"></div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none"></div>
    </div>
  );
};
