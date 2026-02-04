import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Extend jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: any;
  }
}

interface ManifestData {
  containerNumber: string;
  departureDate: Date | null;
  estimatedArrival: Date | null;
  shipments: {
    trackingNumber: string;
    clientName: string;
    description: string;
    weight: number | null;
    cbm: number | null;
    status: string;
  }[];
}

export const generateManifestPDF = (data: ManifestData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(37, 99, 235); // Blue 600
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('LAAFI CARGO EXPRESS', 15, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('MANIFESTE DE DÉPART - TRANSIT INTERNATIONAL', 15, 30);
  
  doc.setFontSize(16);
  doc.text(`${data.containerNumber}`, pageWidth - 15, 25, { align: 'right' });

  // Container Infos
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('INFORMATIONS DU CONTENEUR', 15, 55);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Date de départ: ${data.departureDate ? format(new Date(data.departureDate), 'dd MMMM yyyy', { locale: fr }) : 'Non définie'}`, 15, 62);
  doc.text(`Arrivée estimée: ${data.estimatedArrival ? format(new Date(data.estimatedArrival), 'dd MMMM yyyy', { locale: fr }) : 'Non définie'}`, 15, 68);
  doc.text(`Nombre de colis: ${data.shipments.length}`, 15, 74);

  // Totals
  const totalWeight = data.shipments.reduce((acc, s) => acc + (s.weight || 0), 0);
  const totalCBM = data.shipments.reduce((acc, s) => acc + (s.cbm || 0), 0);
  
  doc.setFont('helvetica', 'bold');
  doc.text(`Poids Total: ${totalWeight.toFixed(2)} kg`, pageWidth - 60, 62);
  doc.text(`Volume Total: ${totalCBM.toFixed(3)} m³`, pageWidth - 60, 68);

  // Table
  const tableData = data.shipments.map((s, index) => [
    index + 1,
    s.trackingNumber,
    s.clientName,
    s.description || 'N/A',
    s.weight ? `${s.weight} kg` : '-',
    s.cbm ? `${s.cbm} m³` : '-',
  ]);

  autoTable(doc, {
    startY: 85,
    head: [['#', 'Tracking', 'Client', 'Description', 'Poids', 'CBM']],
    body: tableData,
    headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8, cellPadding: 3 },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { left: 15, right: 15 },
  });

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Généré le ${format(new Date(), 'dd/MM/yyyy HH:mm')} - Laafi Cargo Express - Page ${i}/${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
  }

  // Save/Download
  doc.save(`manifeste_${data.containerNumber}_${format(new Date(), 'yyyyMMdd')}.pdf`);
};
