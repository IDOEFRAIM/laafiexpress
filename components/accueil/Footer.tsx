import { ArrowRight, Globe, Ship } from 'lucide-react'
import Link from "next/link"

const Footer = () => (
  <footer id="contact" className="bg-white border-t border-slate-100 pt-24 pb-12">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-20">
         <div className="col-span-1 md:col-span-2 pr-10">
            <Link href="/" className="flex items-center gap-2 mb-8">
               <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <Ship size={24} />
               </div>
               <span className="font-black text-2xl text-blue-950 tracking-tighter">LAAFI<span className="text-blue-600">CARGO</span></span>
            </Link>
            <p className="text-slate-500 max-w-md leading-relaxed text-lg">
               Nous redéfinissons les standards du transport international. 
               Une approche moderne, efficace et centrée sur le client pour tous vos besoins logistiques entre la Chine et le Burkina Faso.
            </p>
         </div>
         
         <div>
            <h4 className="font-bold text-blue-950 mb-8 text-lg">Liens Rapides</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
               <li><a href="#pricing" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="opacity-0 hover:opacity-100 transition-opacity"/> Nos Tarifs</a></li>
               <li><a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="opacity-0 hover:opacity-100 transition-opacity"/> Suivre un colis</a></li>
               <li><a href="#contact" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ArrowRight size={14} className="opacity-0 hover:opacity-100 transition-opacity"/> Contact Support</a></li>
            </ul>
         </div>
         
         <div>
            <h4 className="font-bold text-blue-950 mb-8 text-lg">Légal</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
               <li><Link href="/cgv" className="hover:text-blue-600 transition-colors">Conditions General de Services: 2026</Link></li>
               <li><Link href="/confidential" className="hover:text-blue-600 transition-colors">Confidentialité</Link></li>
               <li><Link href="/legal" className="hover:text-blue-600 transition-colors">Mentions Légales</Link></li>
            </ul>
         </div>
      </div>
      
      <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 font-medium">
         <p>&copy; 2026 Laafi Cargo International. Tous droits réservés.</p>
         <div className="flex gap-6 mt-4 md:mt-0">
            <Globe className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
         </div>
      </div>
    </div>
  </footer>
)


export default Footer