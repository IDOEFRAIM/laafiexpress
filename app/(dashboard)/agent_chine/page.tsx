import React from 'react'
import { ShipmentDashboardView } from '@/components/dashboard/ShipmentDashboardView'
import { ShipmentService } from '@/services/shipments'
import { UserService } from '@/services/users'

export default async function AgentChinePage() {
  const [shipmentsData, clientsData] = await Promise.all([
    ShipmentService.getAllShipments(),
    UserService.getClients()
  ])

  // Fix for Next.js 16/Turbopack serialization (converts Dates to strings)
  const shipments = JSON.parse(JSON.stringify(shipmentsData))
  const clients = JSON.parse(JSON.stringify(clientsData))
  
  return (
    <div className='p-4 md:p-8 pt-20'>
      <ShipmentDashboardView 
        title='Gestion Chine' 
        shipments={shipments} 
        clients={clients}
        showAddButton={true}
      />
    </div>
  )
}
