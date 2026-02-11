import Image from "next/image";

const LogoScroller = () => {
  const logos = [
    { name: "FedEx", url: "/fedex.jpeg" },
    { name: "DHL", url: "/dhl.webp" },
    { name: "Ethiopian cargo", url: "/ethiopan.jpeg" },
    { name: "Express Air cargo", url: "/expressaircargo.jpeg" },
    { name: "Emirates sky cargo", url: "/emirateaircargo.webp" },
    { name: "Alibaba", url: "/alibaba.jpeg" },
  ];

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full overflow-hidden bg-white border-y border-slate-200 py-12">
        {/* Titre de section discret style technique */}
        <div className="container mx-auto px-6 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-sky-400 text-2xl">Nos partenaires</span>
            <div className="h-px flex-grow bg-slate-100" />
          </div>
        </div>

        {/* Masquage des bords pour un fondu élégant */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="animate-infinite-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center w-[280px] px-10 border-r border-slate-100 last:border-r-0 group"
            >
              <div className="relative h-16 w-full flex items-center justify-center filter  contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700">
                <Image 
                  width={200}
                  height={80}
                  src={logo.url} 
                  alt={logo.name} 
                  className="object-contain max-h-full w-auto"
                />
              </div>
              
              {/* Libellé style étiquette technique */}
              <div className="mt-6 flex flex-col items-center">
                <span className="text-[9px] font-mono text-slate-300 tracking-[0.2em] uppercase">Verified Partner</span>
                <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-tighter mt-1">{logo.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LogoScroller;