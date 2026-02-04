import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { formatCFA } from '@/lib/utils';

// Extend jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: any;
  }
}

interface InvoiceData {
  invoiceNumber: string;
  date: Date;
  dueDate: Date | null;
  client: {
    name: string;
    email: string;
  };
  shipment: {
    trackingNumber: string;
    description: string;
    type: string;
    weight: number | null;
    cbm: number | null;
  };
  subTotal: number;
  additionalFees: number;
  totalAmount: number;
  status: string;
  payments: {
    amount: number;
    paymentDate: Date;
    method: string;
  }[];
}

export const generateInvoicePDF = (data: InvoiceData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Color Palette
  const primaryColor: [number, number, number] = [37, 99, 235]; // Blue 600
  const secondaryColor: [number, number, number] = [100, 116, 139]; // Slate 500

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 50, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('LAAFI CARGO', 15, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Transit & Logistique Chine-Burkina', 15, 33);
  doc.text('Samandin, Ouagadougou | +226 XX XX XX XX', 15, 38);
  
  doc.setFontSize(18);
  doc.text('FACTURE', pageWidth - 15, 25, { align: 'right' });
  doc.setFontSize(12);
  doc.text(data.invoiceNumber, pageWidth - 15, 35, { align: 'right' });

  // Columns for Client and Invoice Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  // Left: Client Info
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURÉ À:', 15, 65);
  doc.setFont('helvetica', 'normal');
  doc.text(data.client.name, 15, 72);
  doc.text(data.client.email, 15, 77);
  
  // Right: Invoice Stats
  doc.setFont('helvetica', 'bold');
  doc.text('DÉTAILS:', pageWidth - 80, 65);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date d'émission: ${format(new Date(data.date), 'dd/MM/yyyy')}`, pageWidth - 80, 72);
  doc.text(`Échéance: ${data.dueDate ? format(new Date(data.dueDate), 'dd/MM/yyyy') : 'Sur réception'}`, pageWidth - 80, 77);
  doc.text(`Statut: ${data.status}`, pageWidth - 80, 82);

  // Shipment Detail Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, 90, pageWidth - 30, 25, 3, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('RÉFÉRENCE COLIS', 20, 97);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Tracking: ${data.shipment.trackingNumber}`, 20, 104);
  doc.text(`Description: ${data.shipment.description || 'Non spécifiée'}`, 20, 109);
  doc.text(`Type: ${data.shipment.type} | Format: ${data.shipment.weight ? data.shipment.weight + ' kg' : data.shipment.cbm + ' m³'}`, 80, 104);

  // Items Table
  const tableData = [
    ['Prestation de transport international', '1', formatCFA(data.subTotal), formatCFA(data.subTotal)],
    ['Frais de dossier / Douane (inclus)', '-', '-', '0 F'],
    ['Frais supplémentaires', '-', '-', formatCFA(data.additionalFees)],
  ];

  autoTable(doc, {
    startY: 125,
    head: [['Désignation', 'Qté', 'Prix Unitaire', 'Total']],
    body: tableData,
    headStyles: { fillColor: primaryColor, textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 5 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { halign: 'center' },
      2: { halign: 'right' },
      3: { halign: 'right' },
    },
  });

  // Totals Area
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Sous-total:', pageWidth - 85, finalY);
  doc.text(formatCFA(data.subTotal), pageWidth - 15, finalY, { align: 'right' });
  
  doc.text('Frais additionnels:', pageWidth - 85, finalY + 7);
  doc.text(formatCFA(data.additionalFees), pageWidth - 15, finalY + 7, { align: 'right' });
  
  doc.setFillColor(...primaryColor);
  doc.rect(pageWidth - 90, finalY + 12, 75, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL À PAYER:', pageWidth - 85, finalY + 19);
  doc.text(formatCFA(data.totalAmount), pageWidth - 20, finalY + 19, { align: 'right' });

  // Payments History if any
  if (data.payments.length > 0) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('HISTORIQUE DES PAIEMENTS:', 15, finalY + 35);
    
    const paymentRows = data.payments.map(p => [
      format(new Date(p.paymentDate), 'dd/MM/yyyy'),
      p.method,
      formatCFA(p.amount)
    ]);

    autoTable(doc, {
      startY: finalY + 38,
      head: [['Date', 'Méthode', 'Montant Payé']],
      body: paymentRows,
      margin: { left: 15, right: pageWidth - 120 },
      styles: { fontSize: 9 },
      headStyles: { fillColor: secondaryColor },
    });
  }

  // Final Balance
  const paidTotal = data.payments.reduce((acc, p) => acc + p.amount, 0);
  const balance = data.totalAmount - paidTotal;
  
  const balanceY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 15 : finalY + 35;
  doc.setFont('helvetica', 'bold');
  doc.text(`RESTE À PAYER: ${formatCFA(balance)}`, pageWidth - 15, balanceY, { align: 'right' });

  // Footer & Terms
  doc.setFontSize(8);
  doc.setTextColor(...secondaryColor);
  doc.text('Conditions: Le paiement doit être effectué avant la livraison du colis à Samandin.', 15, doc.internal.pageSize.getHeight() - 30);
  doc.text('Merci de votre confiance ! Laafi Cargo, votre partenaire logistique de confiance.', 15, doc.internal.pageSize.getHeight() - 25);
  
  doc.save(`${data.invoiceNumber}_LAAFI.pdf`);
};
