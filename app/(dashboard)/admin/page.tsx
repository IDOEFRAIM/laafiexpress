import React from 'react'
import { ShipmentDashboardView } from '@/components/dashboard/ShipmentDashboardView'
import { ShipmentService } from '@/services/shipments'

export default async function AdminPage() {
  const shipments = await ShipmentService.getAllShipments()
  
  return (
    <div className='p-4 md:p-8 pt-20'>
      <ShipmentDashboardView title='Administration Globale' shipments={shipments} />
    </div>
  )
}
