import React from 'react'
import { ShipmentDashboardView } from '@/components/dashboard/ShipmentDashboardView'
import { ShipmentService } from '@/services/shipments'
import { cookies } from 'next/headers'

export default async function ClientPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  
  if (!session) return <div>Non autorisé</div>
  
  try {
    const userData = JSON.parse(session.value)
    const rawShipments = await ShipmentService.getShipmentsByClient(userData.id)
    
    // Nettoyage des données pour la sérialisation (Dates -> Strings)
    const shipments = JSON.parse(JSON.stringify(rawShipments))
    
    return (
      <div className='p-4 md:p-8 pt-20'>
        <ShipmentDashboardView title='Mon Tableau de Bord' shipments={shipments} />
      </div>
    )
  } catch (e) {
    return <div>Erreur de session</div>
  }
}
