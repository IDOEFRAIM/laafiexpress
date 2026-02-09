import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laafi Cargo International | Transit & Logistique",
  description: "Expert en transport maritime et aérien entre la Chine et le Burkina Faso.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Récupération de la session côté serveur
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');
  
  let user = null;
  if (sessionCookie) {
    try {
      user = JSON.parse(sessionCookie.value);
    } catch (e) {
      user = null;
    }
  }

  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        {/* Navbar avec injection de l'utilisateur pour le responsive et les rôles */}
        <Navbar user={user} />
        
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}