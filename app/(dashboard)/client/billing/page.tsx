import React from 'react'
import { BillingService } from '@/services/billing'
import { cookies } from 'next/headers'
import { ClientBillingView } from '@/components/billing/ClientBillingView'

export default async function ClientBillingPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  
  if (!session) return <div>Non autorisé</div>
  
  try {
    const userData = JSON.parse(session.value)
    const rawInvoices = await BillingService.getInvoicesByClient(userData.id)
    
    // Nettoyage pour Turbopack / Next.js 16
    const invoices = JSON.parse(JSON.stringify(rawInvoices))
    
    return (
      <div className='p-4 md:p-8 pt-20 h-full bg-zinc-50/50 dark:bg-zinc-950/50'>
        <ClientBillingView invoices={invoices} />
      </div>
    )
  } catch (e) {
    return <div>Erreur de chargement des données financières</div>
  }
}
