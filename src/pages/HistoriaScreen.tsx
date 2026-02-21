import { ArrowLeft, Star, ArrowRight, Flag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const timeline = [
    {
        year: '2009', icon: '🦅', color: '#C9A227', side: 'right',
        title: 'Fundação do Debreceni FC',
        desc: 'Um grupo de amigos apaixonados pelo futebol funda o clube no bairro, em Carmo-RJ. O nome é uma homenagem à cidade húngara de Debrecen, terra de um dos fundadores.',
    },
    {
        year: '2011', icon: '🏆', color: '#C9A227', side: 'left',
        title: 'Primeiro Título Amador',
        desc: 'O Debrê conquista seu primeiro campeonato municipal, entrando de vez para o mapa do esporte carmense com uma vitória heroica nos pênaltis.',
    },
    {
        year: '2015', icon: '⚽', color: '#1E3370', side: 'right',
        title: 'A Nova Era',
        desc: 'Expansão do quadro de sócios, profissionalização da diretoria e lançamento do novo escudo (que usamos até hoje).',
    },
    {
        year: '2018', icon: '🏟️', color: '#27AE60', side: 'left',
        title: 'Invencibilidade Histórica',
        desc: 'Uma temporada dos sonhos! Foram 14 partidas sem nenhuma derrota, um recorde que até hoje causa orgulho na nossa torcida.',
    },
    {
        year: '2022', icon: '📱', color: '#E87A40', side: 'right',
        title: 'Debre na Rede',
        desc: 'Nasce o Debre na Rede, o app oficial para aproximar os torcedores, com placares ao vivo, galeria e resenhas pós-jogo.',
    },
];

export default function HistoriaScreen() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#FAF9F6] text-[#0d1b3f] min-h-screen pb-24 font-['Lexend'] relative shadow-lg">
            <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#0d1b3f]/5 px-4 py-4 flex items-center justify-between shadow-sm">
                <button onClick={() => navigate(-1)} className="text-[#0d1b3f] hover:bg-slate-100 p-2 rounded-full -ml-2 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-bold tracking-tight text-[#0d1b3f] uppercase font-['Barlow_Condensed'] leading-none">Nossa História</h1>
                    <span className="text-[10px] uppercase tracking-widest text-[#C9A227] font-bold">Debre na Rede</span>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="relative px-4 py-10 max-w-lg mx-auto overflow-x-hidden">
                {/* Linha vertical central */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C9A227]/50 via-[#C9A227]/20 to-transparent"></div>

                {timeline.map((item, i) => (
                    <div
                        key={item.year}
                        className={`relative mb-16 flex w-full ${item.side === 'right' ? 'justify-end' : 'justify-start'} animate-fade-up`}
                        style={{ animationDelay: `${i * 0.15}s` }}
                    >
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10 flex items-center justify-center">
                            <div className="size-8 rounded-full bg-white border-2 border-[#C9A227] shadow-[0_0_10px_rgba(201,162,39,0.3)] flex items-center justify-center text-sm z-10 relative">
                                {item.icon}
                            </div>
                        </div>

                        <div className={`w-[45%] bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden relative group`}>
                            <div className="bg-slate-100 p-4 relative overflow-hidden flex items-center justify-center aspect-square md:aspect-video text-6xl opacity-80 mix-blend-multiply filter grayscale transition-all group-hover:grayscale-0">
                                {item.icon}
                            </div>
                            <div className="p-4 bg-white relative z-10">
                                <span className="text-[#C9A227] font-black text-sm mb-1 block font-['Barlow_Condensed'] text-lg">{item.year}</span>
                                <h3 className="font-bold text-sm text-[#0D1B3E] leading-tight mb-2 uppercase">{item.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-4">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="relative mb-10 flex flex-col items-center w-full animate-fade-up delay-700">
                    <div className="relative z-10 size-10 rounded-full bg-[#0D1B3E] flex items-center justify-center text-[#C9A227] mb-4 border-2 border-[#C9A227] shadow-[0_0_15px_rgba(201,162,39,0.4)]">
                        <Star className="w-5 h-5 fill-current" />
                    </div>
                    <div className="w-full bg-gradient-to-br from-[#1E3370] to-[#0D1B3E] text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
                            <Flag className="w-[200px] h-[200px]" />
                        </div>
                        <div className="relative z-10">
                            <span className="text-[#C9A227] font-black text-xl block mb-1 font-['Barlow_Condensed']">PRESENTE</span>
                            <h2 className="text-2xl font-bold mb-3 font-['Barlow_Condensed'] uppercase tracking-wide">Legado em Construção</h2>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                A cada partida escrevemos um novo capítulo. Continuamos nossa jornada rumo à excelência, honrando as cores, o escudo e cada gota de suor deixada em campo. Somos Debreceni!
                            </p>
                            <button onClick={() => navigate('/elenco')} className="mt-6 flex items-center gap-2 bg-[#C9A227] hover:bg-white text-[#0D1B3E] font-bold py-3 px-6 rounded-full text-sm font-['Barlow_Condensed'] uppercase tracking-wider transition-colors shadow-lg active:scale-95">
                                Ver Elenco Atual
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
