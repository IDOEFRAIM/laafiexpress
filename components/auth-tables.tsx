'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthTabs() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="inline-flex p-1 bg-slate-200/60 rounded-xl w-full border border-slate-200">
      <Link 
        href="/login"
        className={`flex-1 px-4 py-2.5 text-xs font-black tracking-widest rounded-lg transition-all text-center ${
          isLogin ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        CONNEXION
      </Link>
      <Link 
        href="/register"
        className={`flex-1 px-4 py-2.5 text-xs font-black tracking-widest rounded-lg transition-all text-center ${
          !isLogin ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"
        }`}
      >
        INSCRIPTION
      </Link>
    </div>
  );
}