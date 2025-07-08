import BookingTable from "@/components/table";
import { BookingDataArray } from "@/types/BookingDataProps";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [bookingData, setBookingData] = useState<BookingDataArray>([]);
    useEffect(() => {
        axios.get("/api/attendance")
            .then((response) => {
                setBookingData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching booking data:", error);
            });
    }, []);
    return (
        <main className="min-h-screen px-2 sm:px-4 py-8 sm:py-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
        <div className="w-full max-w-5xl space-y-8 sm:space-y-10 bg-white/90 rounded-2xl shadow-xl p-4 sm:p-8 md:p-10 border border-blue-200">
            <header className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-blue-800 mb-3">CAS-FORUM (85/87 set) Admin Dashboard</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-700">Manage the <span className='font-semibold text-blue-700'>CAS-FORUM (85/87 set)</span> reunion bookings and details.</p>
            </header>
    
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md border border-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-700">CAS-FORUM (85/87 set) Bookings Overview</h2>
            <BookingTable bookings={bookingData} />
            </div>
    
            <footer className="text-center text-xs sm:text-sm text-gray-500 mt-8 sm:mt-10">
            &copy; {new Date().getFullYear()} CAS-FORUM (85/87 set) Reunion Committee. All rights reserved.
            </footer>
        </div>
        </main>
    );
}