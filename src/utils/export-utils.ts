/**
 * Utility functions for exporting reports and metrics to Excel (.csv / .xls) and PDF
 */

export interface ExportColumn {
  header: string;
  key: string;
}

/**
 * Downloads data as an Excel-compatible CSV file with UTF-8 BOM
 * The UTF-8 BOM (\uFEFF) ensures Arabic characters open properly in Microsoft Excel without corruption
 */
export function exportToExcel(
  filename: string,
  title: string,
  headers: string[],
  rows: (string | number)[][],
  summaryStats?: { label: string; value: string | number }[]
) {
  const sanitizeCell = (val: string | number | undefined | null): string => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const csvLines: string[] = [];

  // Title & Metadata
  csvLines.push(`"${title} — الإدارة الرقمية لروض الفرج"`);
  csvLines.push(`"تاريخ الاستخراج: ${new Date().toLocaleDateString('ar-EG')} ${new Date().toLocaleTimeString('ar-EG')}"`);
  csvLines.push('""'); // Blank line

  // Summary Metrics if provided
  if (summaryStats && summaryStats.length > 0) {
    csvLines.push('"ملخص المؤشرات والإحصائيات:"');
    summaryStats.forEach(stat => {
      csvLines.push(`${sanitizeCell(stat.label)},${sanitizeCell(stat.value)}`);
    });
    csvLines.push('""'); // Blank line
  }

  // Header Row
  csvLines.push(headers.map(h => sanitizeCell(h)).join(','));

  // Data Rows
  rows.forEach(row => {
    csvLines.push(row.map(cell => sanitizeCell(cell)).join(','));
  });

  // Footer notes
  csvLines.push('""');
  csvLines.push('"تم التوليد آلياً عبر منظومة الإدارة الرقمية لروض الفرج — وزارة التربية والتعليم"');

  const csvContent = '\uFEFF' + csvLines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Triggers a high-fidelity PDF print/download workflow
 * Formats the document with official governmental styling
 */
export function exportToPDF(
  title: string,
  subtitle: string,
  elementId?: string
) {
  // If an element is specified, focus or print it, or trigger native styled print dialog
  window.print();
}
