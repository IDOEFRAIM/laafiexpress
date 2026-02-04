import Link from "next/link";
import { MoveLeft, PackageSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthNotFound() {
  return (
    <div className="text-center space-y-6 animate-in zoom-in-95 duration-300">
      <div className="flex justify-center">
        <div className="p-6 bg-slate-900/50 rounded-full border border-dashed border-slate-700">
          <PackageSearch size={64} className="text-slate-500" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tighter">404 - Colis Introuvable</h2>
        <p className="text-slate-400 max-w-[300px] mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée vers un autre terminal.
        </p>
      </div>

      <Button asChild variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
        <Link href="/login" className="flex items-center gap-2">
          <MoveLeft size={16} />
          Retour au portail
        </Link>
      </Button>
      
      <div className="pt-8 text-[10px] text-slate-600 uppercase tracking-[0.2em]">
        System Error: SHIPMENT_ROUTE_NOT_DEFINED
      </div>
    </div>
  );
}