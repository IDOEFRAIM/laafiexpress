export type TransportType = 'AERIEN' | 'MARITIME';

export type ShipmentCategory = 'MCO' | 'LTA' | 'EXPRESS' | 'CONTAINER';

export type ShipmentStatus = 
  | 'RECU_CHINE' 
  | 'EN_COURS_GROUPAGE' 
  | 'CHARGE_TRANSIT' 
  | 'ARRIVE_OUAGA' 
  | 'LIVRE' 
  | 'LITIGE_BLOQUE';

export interface TrackingStep {
  status: ShipmentStatus;
  label: string;
  description: string;
  isCompleted: boolean;
  date?: Date;
}