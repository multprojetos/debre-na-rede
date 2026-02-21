import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DebreBadge from '../components/DebreBadge';

export default function SplashScreen() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => navigate('/home'), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);
        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-between bg-[#0D1B3E] overflow-hidden select-none font-['Lexend']" onClick={() => navigate('/home')}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[150%] aspect-square rounded-full opacity-60 bg-[radial-gradient(circle,_rgba(201,162,39,0.25)_0%,_rgba(13,27,62,0)_70%)]"></div>
            </div>

            <div className="h-16 w-full"></div>

            <div className="relative z-10 flex flex-col items-center justify-center px-8 animate-fade-up">
                <div className="relative group">
                    <div className="absolute -inset-4 rounded-full border border-[#C9A227]/10 scale-110"></div>
                    <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center filter drop-shadow-[0_0_30px_rgba(201,162,39,0.4)]">
                        <DebreBadge size={220} />
                    </div>
                </div>
                <div className="mt-8 text-center" style={{ animation: 'fade-up 0.8s ease-out 0.3s both' }}>
                    <h1 className="text-3xl font-bold tracking-widest text-[#FAF9F6] uppercase font-['Barlow_Condensed']">Debre na Rede</h1>
                    <p className="text-[#C9A227]/80 text-sm mt-2 font-bold tracking-[0.3em] uppercase">Debreceni F. C.</p>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-xs flex flex-col items-center pb-12 gap-8" style={{ animation: 'fade-up 1s ease-out 0.6s both' }}>
                <div className="w-full flex flex-col gap-3 px-6">
                    <div className="flex justify-between items-end">
                        <span className="text-[#FAF9F6]/50 text-[10px] font-bold uppercase tracking-widest">Carregando Arena...</span>
                        <span className="text-[#C9A227] text-xs font-bold">{progress}%</span>
                    </div>
                    <div className="h-[3px] w-full bg-[#FAF9F6]/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#C9A227] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(201,162,39,0.8)]"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-[#C9A227]/50 text-[10px] font-bold tracking-[0.4em] uppercase">Est. 2009</p>
                    <div className="h-1 w-8 bg-[#C9A227]/30 rounded-full mt-2"></div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>
        </div>
    );
}
