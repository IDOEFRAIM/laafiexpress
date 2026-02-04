import Image from "next/image";

const LogoScroller = () => {
  const logos = [
    { name: "FedEx", url: "/fedex.jpeg" },
    { name: "DHL", url: "/dhl.webp" },
    { name: "Ethiopian cargo ", url: "/ethiopan.jpeg" },
    { name: "Express Air cargo", url: "/expressaircargo.jpeg" },
    { name: "Emirates sky cargo", url: "/emirateaircargo.webp" },
    { name: "Alibaba", url: "/alibaba.jpeg" },

  ];
// ,  ,, , ,  
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
          animation: scroll 20s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full h-100 overflow-hidden bg-gray-50 flex items-center">
        {/* Effet de fondu sur les côtés 
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
*/}
        {/* Le conteneur qui défile */}
        <div className="animate-infinite-scroll">
          {/* On double la liste pour l'effet de boucle infinie */}
          {[...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center w-[300px] px-12"
            >
              <Image 
              width={380}
              height={380}
                src={logo.url} 
                alt={logo.name} 
                className=" w-auto opacity-80"
              />
              <h2 className="text-sky-400">{logo.name} </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LogoScroller;