import Reveal from './Reveal'

const StatsStrip = () => (
  <section className="relative w-full py-32 text-white overflow-hidden">
    
    {/* --- ARRIÈRE-PLAN TOTAL --- */}
    <div className="absolute inset-0">
      <img 
        src="/teamdocker.jpeg" 
        alt="Background"
        /* L'image remplit tout le conteneur sans bordures */
        className="w-full h-full object-cover" 
      />
      {/* Overlay sombre léger pour garder le texte lisible sans masquer l'image */}
      <div className="absolute inset-0 bg-black/40"></div>
    </div>

    {/* --- CONTENU --- */}
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Années d'Expérience", val: "12+" },
            { label: "Pays Desservis", val: "25" },
            { label: "Clients Satisfaits", val: "2k+" },
            { label: "Tonnes expédiées", val: "15k" }
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
               <div className="py-8 md:py-0 px-4">
                 <div className="text-5xl md:text-7xl font-black mb-4 text-white drop-shadow-lg">
                    {s.val}
                 </div>
                 <div className="text-white/90 text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                    {s.label}
                 </div>
               </div>
            </Reveal>
          ))}
      </div>
    </div>
  </section>
)

export default StatsStrip