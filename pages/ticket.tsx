import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAttendance } from '../components/AttendanceContext';
import { generateStyledTicketPDF } from '../components/generateStyledTicketPDF';

const TicketPage = () => {
  const router = useRouter();
  const { data: ticket } = useAttendance();

  useEffect(() => {
    if (!ticket) {
      router.replace('/');
    }
  }, [ticket, router]);

  if (!ticket) return null;

  const handleDownload = () => {
    if (ticket) {
      generateStyledTicketPDF(ticket);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-10 bg-white/90 rounded-2xl shadow-2xl border border-blue-200">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800 drop-shadow">Your CAS-FORUM (85/87 set) Reunion Ticket</h1>
      <div className="space-y-4 text-gray-800 text-lg">
        <div><span className="font-semibold">Name:</span> {ticket.name}</div>
        <div><span className="font-semibold">State Chapter:</span> {ticket.stateChapter}</div>
        <div><span className="font-semibold">Attendance:</span> {ticket.attendance}</div>
        <div><span className="font-semibold">Coming From:</span> {ticket.comingFrom}</div>
        <div><span className="font-semibold">Accommodation:</span> {ticket.accommodation}</div>
        <div><span className="font-semibold">Logistics:</span> {ticket.logistics}</div>
        <div><span className="font-semibold">Financial Support:</span> {ticket.financialSupport}</div>
        {ticket.financialSupport !== 'None' && ticket.financialSupportAmount && (
          <div><span className="font-semibold">Financial Support Amount:</span> {ticket.financialSupportAmount}</div>
        )}
        <div><span className="font-semibold">Email:</span> {ticket.email}</div>
      </div>
      <button
        onClick={handleDownload}
        className="w-full mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-sm"
      >
        Download Ticket
      </button>
    </div>
  );
};

export default TicketPage;