import Reveal from './Reveal'

const StatsStrip = () => (
  <section className="bg-blue-950 py-24 text-white relative overflow-hidden">
     <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
     
     <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-blue-800/50">
           {[
             { label: "Années d'Expérience", val: "12+" },
             { label: "Pays Desservis", val: "25" },
             { label: "Clients Satisfaits", val: "2k+" },
             { label: "Tonnes expédiées", val: "15k" }
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="px-4">
                  <div className="text-5xl md:text-6xl font-bold mb-4 text-blue-400">{s.val}</div>
                  <div className="text-blue-200 text-sm font-bold uppercase tracking-widest">{s.label}</div>
                </div>
             </Reveal>
           ))}
        </div>
     </div>
  </section>
)


export default StatsStrip