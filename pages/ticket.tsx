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
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Your Reunion Ticket</h1>
      <div className="space-y-3 text-gray-800">
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