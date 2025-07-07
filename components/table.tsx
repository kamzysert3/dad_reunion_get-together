import { BookingDataProps } from "@/types/BookingDataProps";
import React, { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./toast";
import { generateStyledTicketPDF } from "./generateStyledTicketPDF";

interface BookingTableProps {
  bookings: BookingDataProps[];
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<string | undefined>(undefined);
    const [deleting, setDeleting] = useState<boolean>(false);
    const [toast, setToast] = useState<string | null>(null);
    const [toastSuccess, setToastSuccess] = useState<boolean>(false);
    const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);

    if (bookings.length === 0) {
        return (
        <div className="text-center text-gray-500 py-8">
            No bookings available.
        </div>
        );
    }

    const handleDeleteClick = (id: string | undefined) => {
        setDeleteId(id);
        setShowDialog(true);
    };

    const handleDownloadClick = (id: string | undefined) => {
        const booking = bookings.find(b => b._id === id);
        if (!booking) {
            setToast("Booking not found.");
            setToastSuccess(false);
            if (toastTimeout) clearTimeout(toastTimeout);
            setToastTimeout(setTimeout(() => setToast(null), 4000));
            return;
        } else {
            generateStyledTicketPDF(booking);
        }

    };

    const handleDialogConfirm = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            const response = await fetch(`/api/attendance?id=${deleteId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setToast("Booking deleted successfully.");
                setToastSuccess(true);
                if (toastTimeout) clearTimeout(toastTimeout);
                setToastTimeout(setTimeout(() => setToast(null), 4000));
                setTimeout(() => window.location.reload(), 1200);
            } else {
                setToast("Failed to delete booking.");
                setToastSuccess(false);
                if (toastTimeout) clearTimeout(toastTimeout);
                setToastTimeout(setTimeout(() => setToast(null), 4000));
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
            setToast("An error occurred while deleting the booking.");
            setToastSuccess(false);
            if (toastTimeout) clearTimeout(toastTimeout);
            setToastTimeout(setTimeout(() => setToast(null), 4000));
        } finally {
            setDeleting(false);
            setShowDialog(false);
            setDeleteId(undefined);
        }
    };

    const handleDialogCancel = () => {
        setShowDialog(false);
        setDeleteId(undefined);
    };

  return (
    <>
      {toast && <Toast message={toast} onClose={() => setToast(null)} success={toastSuccess} />}
      <ConfirmDialog
        open={showDialog}
        title="Delete Booking"
        message="Are you sure you want to delete this booking?"
        onConfirm={handleDialogConfirm}
        onCancel={handleDialogCancel}
        submitting={deleting}
      />
      <div className="overflow-x-auto max-h-[300px] overflow-y-auto rounded-md border border-gray-300">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">S/N</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">State Chapter</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Attendance</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Coming From</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Accommodation</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Logistics</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Support Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Support Amount</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{index+1}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.stateChapter}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.attendance}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.comingFrom}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.accommodation}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.logistics}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.financialSupport}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">₦{booking.financialSupportAmount}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">{booking.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm text-gray-800">
                  <div className="flex flex-col gap-2 md:flex-row md:gap-1 items-start md:items-center">
                    <button
                      className="w-full px-3 py-1 rounded font-semibold shadow-sm border border-red-600 text-red-600 bg-white hover:bg-red-50 hover:text-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => handleDeleteClick(booking._id)}
                    >
                        Delete
                    </button>
                    <button
                      className="w-full px-3 py-1 rounded font-semibold shadow-sm border border-green-600 text-green-600 bg-white hover:bg-green-50 hover:text-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-300"
                      onClick={() => handleDownloadClick(booking._id)}
                    >
                      Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingTable;
