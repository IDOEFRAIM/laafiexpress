'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation' // Ajout de useSearchParams
import { loginAction } from '@/actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react"
import Link from 'next/link'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [successMsg, setSuccessMsg] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)
    
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        setMounted(true)
        // Récupérer le message de succès si on vient de /register
        const message = searchParams.get('message')
        if (message) setSuccessMsg(message)
    }, [searchParams])

    if (!mounted) return null
// Modifie ta fonction handleLogin dans LoginPage
// src/app/login/page.tsx

const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // On suppose que loginAction renvoie maintenant le rôle en cas de succès
    const result = await loginAction({ email, password })

    if (result.success && result.role) {
        setSuccessMsg("Connexion réussie ! Redirection vers votre espace...")
        
        router.refresh()

        // Logique de redirection par grade
        let targetPath = '/dashboard'
        
        switch (result.role) {
            case 'AGENT_CHINA':
                targetPath = '/agent_chine'
                break
            case 'AGENT_BURKINA':
                targetPath = '/agent_burkina'
                break
            case 'CLIENT':
                targetPath = '/client'
                break
            case 'ADMIN':
                targetPath = '/admin'
                break
        }

        setTimeout(() => {
            router.push(targetPath)
        }, 500)
    } else {
        setError(result.error || "Identifiants invalides.")
        setLoading(false)
    }
}

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-blue-600">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-blue-600 p-3 text-white">
                            <Lock size={24} />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Laafi Express CRM</CardTitle>
                    <CardDescription>
                        Accédez à votre espace logistique
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        {/* Message de succès (ex: après inscription) */}
                        {successMsg && (
                            <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200 animate-in fade-in">
                                {successMsg}
                            </div>
                        )}

                        {/* Message d'erreur */}
                        {error && (
                            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200 animate-in shake-1">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email professionnel</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nom@laafi-express.com"
                                    className="pl-10 focus-visible:ring-blue-600"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Mot de passe</Label>
                                <button type="button" className="text-xs text-blue-600 hover:underline">
                                    Oublié ?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-10 focus-visible:ring-blue-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700" type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Se connecter"}
                        </Button>
                        
                        <p className="text-sm text-center text-slate-600">
                            Nouveau chez Laafi Express ?{' '}
                            <Link href="/register" className="text-blue-600 font-semibold hover:underline inline-flex items-center">
                                Créer un compte <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}