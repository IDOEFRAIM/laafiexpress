export type PaymentStatus = 'EN_ATTENTE' | 'PARTIEL' | 'PAYE' | 'RETARD_BLOQUANT';

export interface BillingSummary {
  subTotal: number;
  additionalFees: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
  isOverdue: boolean; // Calculé selon les règles J-5/J-3
}