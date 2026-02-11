import Reveal from './Reveal'

const StatsStrip = () => (
  <section className="relative py-32 text-white overflow-hidden w-full bg-blue-950">
    {/* --- IMAGE DE FOND (Background réel) --- */}
    <div className="absolute inset-0 w-full h-full">
      <img 
        src="/teamdocker.jpeg" 
        alt="Background"
        className="w-full h-full object-cover opacity-40" 
      />
      {/* L'overlay bleu foncé qui se mélange à l'image */}
      <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply"></div>
      {/* Dégradé pour assurer la transition avec les autres sections du site */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-transparent to-blue-950/50"></div>
    </div>

    {/* --- CONTENU --- */}
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { label: "Années d'Expérience", val: "12+" },
            { label: "Pays Desservis", val: "25" },
            { label: "Clients Satisfaits", val: "2k+" },
            { label: "Tonnes expédiées", val: "15k" }
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
               <div className="py-8 md:py-0 px-4">
                 <div className="text-5xl md:text-7xl font-black mb-4 text-white drop-shadow-2xl">
                    {s.val}
                 </div>
                 <div className="text-blue-400 text-xs md:text-sm font-black uppercase tracking-[0.2em]">
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