"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Scale, Building2, Globe, HardDrive, Mail, 
  Phone, ArrowLeft, ShieldCheck, EyeOff, UserX, Lock 
} from "lucide-react";

const MentionsLegales = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen mt-6 bg-white text-slate-900 pt-12 pb-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* --- BOUTON RETOUR --- */}
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 group font-bold uppercase text-[10px] tracking-[0.2em]"
        >
          <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span>Retour</span>
        </motion.button>

        {/* En-tête de page */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-blue-600 font-bold uppercase tracking-[0.3em] text-xs mb-4"
          >
            <Scale className="w-4 h-4" /> Cadre Juridique & Confidentialité
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-8">
            Mentions <br />
            <span className="text-slate-400 italic">Légales.</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
        </header>

        {/* Grille d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
          
          {/* 1. Identité de l'entreprise */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <Building2 className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Éditeur du site</h2>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed pl-2 border-l-2 border-slate-50">
              <p className="font-bold text-slate-900 text-lg">LAAFI CARGO INTERNATIONAL</p>
              <p>Siège social : Ouagadougou, Quartier Samendin</p>
              <p>Localisation : En face de la Pharmacie WATI</p>
              <p>Pays : Burkina Faso</p>
              <p className="text-blue-600 font-bold italic text-sm">Expert en logistique Chine - Burkina Faso</p>
            </div>
          </section>

          {/* 2. Contact Officiel */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <Mail className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Contact</h2>
            </div>
            <div className="space-y-4 pl-2 border-l-2 border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+226 66 66 36 51 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+226 56 77 78 19</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>laaficargointernational@gmail.com</span>
              </div>
            </div>
          </section>

          {/* 3. Protection des données (Ta politique spécifique) */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <ShieldCheck className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Confidentialité</h2>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed pl-2 border-l-2 border-slate-50">
              <p><span className="font-bold text-slate-800">Collecte :</span> Consentement par accord verbal (Nom, Prénom, Téléphone, CNIB).</p>
              <p><span className="font-bold text-slate-800">Conservation :</span> Les données sont conservées indéfiniment pour le suivi historique des expéditions.</p>
              <p><span className="font-bold text-slate-800">Partage :</span> Aucune donnée n'est partagée avec des tiers (partenaires, douanes ou services de paiement).</p>
              <p><span className="font-bold text-slate-800">Sécurité :</span> Cryptage des données et accès strictement restreint au <span className="underline italic">Responsable Numérique</span>.</p>
            </div>
          </section>

          {/* 4. Tracking & Cookies */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <HardDrive className="w-6 h-6 text-slate-600" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight">Cookies & Outils</h2>
            </div>
            <div className="space-y-3 text-slate-600 leading-relaxed pl-2 border-l-2 border-slate-50">
              <p>• Utilisation de <span className="font-bold">Google Analytics</span> pour l'administration.</p>
              <p>• Absence de cookies publicitaires tiers.</p>
              <p>• Interaction future envisagée via <span className="font-bold">WAZZAP AI</span> pour le support client.</p>
            </div>
          </section>

          {/* 5. Droits & Restrictions */}
          <section className="space-y-6 md:col-span-2 bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="flex flex-wrap gap-8">
              <div className="flex-1 min-w-[250px] space-y-4">
                <div className="flex items-center gap-3">
                   <UserX className="w-5 h-5 text-red-500" />
                   <h3 className="font-black uppercase text-sm tracking-widest">Accès Mineurs</h3>
                </div>
                <p className="text-slate-500 text-sm">Les services de LAAFI Cargo International sont strictement réservés aux personnes majeures (18 ans et plus).</p>
              </div>
              
              <div className="flex-1 min-w-[250px] space-y-4">
                <div className="flex items-center gap-3">
                   <EyeOff className="w-5 h-5 text-slate-400" />
                   <h3 className="font-black uppercase text-sm tracking-widest">Gestion des Droits</h3>
                </div>
                <p className="text-slate-500 text-sm">Conformément à notre politique interne, les données enregistrées ne sont pas modifiables ou supprimables par l'utilisateur une fois validées pour des raisons de traçabilité logistique.</p>
              </div>

              <div className="flex-1 min-w-[250px] space-y-4">
                <div className="flex items-center gap-3">
                   <Lock className="w-5 h-5 text-blue-500" />
                   <h3 className="font-black uppercase text-sm tracking-widest">Hébergement</h3>
                </div>
                <p className="text-slate-500 text-sm">L'infrastructure technique est sécurisée par cryptage de bout en bout pour garantir l'intégrité de vos informations.</p>
              </div>
            </div>
          </section>

        </div>

        {/* Note de bas de page */}
        <footer className="mt-32 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          <p>© 2026 LAAFI CARGO INTERNATIONAL — OUAGADOUGOU</p>
          <p>Dernière mise à jour : Février 2026</p>
        </footer>

      </div>
    </div>
  );
};

export default MentionsLegales;