// File: src/react-app/lib/exportReport.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface SensorData {
  ph: number;
  tds: number;
  turbidity: number;
  temperature: number;
}

interface ReportData {
  sensorData: SensorData;
  qualityScore: number;
  timestamp: Date;
  alerts: number;
  deviceName?: string;
}

export const generateWaterQualityReport = (data: ReportData) => {
  const doc = new jsPDF();
  
  // Header with logo text
  doc.setFillColor(59, 130, 246);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('AquaSens', 20, 25);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Water Quality Report', 20, 33);
  
  // Report Info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(`Generated: ${data.timestamp.toLocaleString()}`, 150, 25, { align: 'right' });
  doc.text(`Device: ${data.deviceName || 'Demo Mode'}`, 150, 32, { align: 'right' });
  
  // Quality Score Section
  let yPos = 55;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Water Quality Score', 20, yPos);
  
  // Score circle
  const scoreColor = data.qualityScore >= 80 ? [34, 197, 94] : 
                     data.qualityScore >= 60 ? [59, 130, 246] :
                     data.qualityScore >= 40 ? [234, 179, 8] : [239, 68, 68];
  
  doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.circle(35, yPos + 20, 15, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(data.qualityScore.toString(), 35, yPos + 24, { align: 'center' });
  
  // Status text
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  const status = data.qualityScore >= 80 ? 'Excellent' :
                 data.qualityScore >= 60 ? 'Good' :
                 data.qualityScore >= 40 ? 'Moderate' : 'Poor';
  doc.text(`Status: ${status}`, 60, yPos + 20);
  doc.setFontSize(10);
  doc.text(`Active Alerts: ${data.alerts}`, 60, yPos + 28);
  
  // Sensor Readings Table
  yPos += 50;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Sensor Readings', 20, yPos);
  
  const tableData = [
    ['pH Level', data.sensorData.ph.toString(), '6.5 - 8.5', getStatus(data.sensorData.ph, 6.5, 8.5, 'ph')],
    ['TDS (ppm)', data.sensorData.tds.toString(), '< 300', getStatus(data.sensorData.tds, 0, 300, 'tds')],
    ['Turbidity (NTU)', data.sensorData.turbidity.toString(), '< 5', getStatus(data.sensorData.turbidity, 0, 5, 'turbidity')],
    ['Temperature (°C)', data.sensorData.temperature.toString(), '15 - 25', getStatus(data.sensorData.temperature, 15, 25, 'temp')],
  ];
  
  autoTable(doc, {
    startY: yPos + 5,
    head: [['Parameter', 'Value', 'Safe Range', 'Status']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [59, 130, 246], textColor: 255 },
    styles: { fontSize: 10 },
    columnStyles: {
      3: { 
        cellWidth: 30,
        fontStyle: 'bold'
      }
    },
    didParseCell: (data) => {
      if (data.section === 'body' && data.column.index === 3) {
        const status = data.cell.raw as string;
        if (status === '✓ Safe') {
          data.cell.styles.textColor = [34, 197, 94];
        } else if (status === '⚠ Warning') {
          data.cell.styles.textColor = [234, 179, 8];
        } else {
          data.cell.styles.textColor = [239, 68, 68];
        }
      }
    }
  });
  
  // Recommendations
  yPos = (doc as any).lastAutoTable.finalY + 15;
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations', 20, yPos);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos += 8;
  
  const recommendations = getRecommendations(data.sensorData);
  recommendations.forEach((rec, index) => {
    doc.text(`${index + 1}. ${rec}`, 25, yPos);
    yPos += 7;
  });
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('© 2024 AquaSens - Smart Water Monitoring System', 105, 285, { align: 'center' });
  doc.text('This report is generated automatically. For critical decisions, verify with laboratory testing.', 105, 290, { align: 'center' });
  
  // Save PDF
  const fileName = `AquaSens_Report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

function getStatus(value: number, min: number, max: number, type: 'ph' | 'tds' | 'turbidity' | 'temp'): string {
  if (type === 'ph') {
    if (value >= min && value <= max) return '✓ Safe';
    if (value < 6.0 || value > 9.0) return '✗ Danger';
    return '⚠ Warning';
  }
  
  if (type === 'tds' || type === 'turbidity') {
    if (value <= max) return '✓ Safe';
    if (value > max * 1.5) return '✗ Danger';
    return '⚠ Warning';
  }
  
  if (type === 'temp') {
    if (value >= min && value <= max) return '✓ Safe';
    return '⚠ Warning';
  }
  
  return '✓ Safe';
}

function getRecommendations(data: SensorData): string[] {
  const recs: string[] = [];
  
  if (data.ph < 6.5) {
    recs.push('pH is too low (acidic). Consider installing an alkaline filter or adding pH increaser.');
  } else if (data.ph > 8.5) {
    recs.push('pH is too high (alkaline). Consider installing an acid filter or adding pH decreaser.');
  } else {
    recs.push('pH level is within safe range. Continue regular monitoring.');
  }
  
  if (data.tds > 300) {
    recs.push('TDS is elevated. Consider installing a reverse osmosis (RO) filter to reduce dissolved solids.');
  } else {
    recs.push('TDS level is acceptable for drinking water.');
  }
  
  if (data.turbidity > 5) {
    recs.push('Water clarity is poor. Install a sediment filter or check for contamination sources.');
  } else {
    recs.push('Water clarity is good. No filtration needed for turbidity.');
  }
  
  if (data.temperature < 15) {
    recs.push('Water temperature is lower than optimal. This is normal for cold sources.');
  } else if (data.temperature > 25) {
    recs.push('Water temperature is higher than optimal. Ensure proper storage and cooling.');
  }
  
  recs.push('Calibrate sensors every 30 days for accurate readings.');
  recs.push('Run laboratory tests quarterly to verify sensor accuracy.');
  
  return recs;
}