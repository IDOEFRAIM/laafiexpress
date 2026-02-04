'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { registerAction } from '@/actions/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, UserPlus, Mail, Lock, User, Phone, MapPin } from "lucide-react"

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        role: 'CLIENT' as "AGENT_CHINA" | "AGENT_BURKINA" | "CLIENT"
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const result = await registerAction(formData)
            if (result.success) {
                router.push('/login?message=Compte créé avec succès.')
            } else {
                setError(result.error || "Une erreur est survenue")
            }
        } catch (err) {
            setError("Erreur de connexion au serveur")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 py-10 px-4">
            <Card className="w-full max-w-2xl shadow-lg"> {/* Augmenté max-width pour 2 colonnes */}
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-green-600 p-3 text-white">
                            <UserPlus size={24} />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
                    <CardDescription>Rejoignez l'équipe Laafi Express</CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                    <CardContent className="space-y-6">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nom Complet */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Nom Complet</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="fullName" className="pl-10" required placeholder="Moussa Traoré"
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="email" type="email" className="pl-10" required placeholder="moussa@example.com"
                                        onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                            </div>

                            {/* Téléphone - Aligné à côté de l'email sur PC */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Téléphone</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="phone" type="tel" className="pl-10" required placeholder="+226 70 00 00 00"
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                            </div>

                            {/* Mot de passe */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Mot de passe</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Input id="password" type="password" className="pl-10" required
                                        onChange={e => setFormData({ ...formData, password: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Rôle et Adresse en pleine largeur en bas */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Rôle de l'utilisateur</Label>
                                <Select defaultValue="CLIENT" onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir un rôle" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AGENT_CHINA">Agent Chine (Guangzhou)</SelectItem>
                                        <SelectItem value="AGENT_BURKINA">Agent Burkina (Ouaga)</SelectItem>
                                        <SelectItem value="CLIENT">Client Standard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Adresse ou Quartier (Burkina)</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <Textarea id="address" className="pl-10 min-h-[60px]" placeholder="Ex: Samandin, près de la pharmacie..."
                                        onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-green-600 hover:bg-green-700 h-11" type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Créer le compte utilisateur"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}