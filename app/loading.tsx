import { Loader2, Globe } from "lucide-react";

export default function AuthLoading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500">
      <div className="relative">
        {/* Effet de pulsation en arrière-plan */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
        
        <div className="relative bg-slate-900 border border-white/10 p-4 rounded-2xl shadow-2xl">
          <Globe className="h-10 w-10 text-blue-500 animate-pulse" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium tracking-widest uppercase">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        Initialisation du terminal...
      </div>
    </div>
  );
}