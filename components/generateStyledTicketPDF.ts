import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AttendanceData } from './AttendanceContext';
import { BookingDataProps } from '@/types/BookingDataProps';

export async function generateStyledTicketPDF(ticketData: AttendanceData | BookingDataProps) {
  // Hidden container for PDF ticket layout
  const ticketContainer = document.createElement('div');
  ticketContainer.style.position = 'fixed';
  ticketContainer.style.left = '-10000px';
  ticketContainer.style.top = '0';

  const today = new Date().toLocaleDateString('en-GB');
  const ticketNo = `#${Math.abs(hashCode(ticketData.email + ticketData.name)).toString().padStart(7, '0')}`;

  ticketContainer.innerHTML = `
    <div style="width:600px;padding:30px;background:#f9fafb;border-radius:16px;font-family:Arial, sans-serif;box-shadow:0 10px 30px rgba(0,0,0,0.1);border: 3px solid #2563eb;">
      <div style="text-align:center;margin-bottom:24px;">
        <h1 style="font-size:1.8em;color:#2563eb;margin:0;">REUNION TICKET</h1>
        <p style="margin:4px 0;color:#6b7280;font-size:0.95em;">Your official confirmation</p>
      </div>
      <div style="display:flex;justify-content:space-between;color:#374151;font-size:0.9em;margin-bottom:16px;">
        <span><strong>Ticket No:</strong> ${ticketNo}</span>
        <span><strong>Date:</strong> ${today}</span>
      </div>
      <div style="padding:20px;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;">
        ${renderRow('Name', ticketData.name)}
        ${renderRow('State Chapter', ticketData.stateChapter)}
        ${renderRow('Attendance', ticketData.attendance)}
        ${renderRow('Coming From', ticketData.comingFrom)}
        ${renderRow('Accommodation', ticketData.accommodation)}
        ${renderRow('Logistics', ticketData.logistics)}
        ${renderRow('Financial Support', ticketData.financialSupport)}
        ${ticketData.financialSupport !== 'None' && ticketData.financialSupportAmount ? renderRow('Support Amount', String(ticketData.financialSupportAmount)) : ''}
        ${renderRow('Email', ticketData.email)}
      </div>
      <p style="margin-top:28px;text-align:center;color:#6b7280;font-size:0.85em;border-top:1px dashed #d1d5db;padding-top:12px;">
        Please keep this ticket for your records.
      </p>
    </div>
  `;

  document.body.appendChild(ticketContainer);

  const canvas = await html2canvas(ticketContainer.firstElementChild as HTMLElement, { scale: 2 });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ unit: 'pt', format: [canvas.width, canvas.height] });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('reunion_ticket.pdf');

  document.body.removeChild(ticketContainer);
}

function renderRow(label: string, value: string): string {
  return `
    <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
      <span style="color:#2563eb;font-weight:600;">${label}</span>
      <span style="color:#1f2937;text-align:right;max-width:300px;word-wrap:break-word;">${value}</span>
    </div>
  `;
}

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
