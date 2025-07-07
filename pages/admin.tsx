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
        <main className="min-h-screen px-4 py-12 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
        <div className="w-full max-w-full space-y-8">
            <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage the reunion bookings and details.</p>
            </header>
    
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Bookings Overview</h2>
            <BookingTable bookings={bookingData} />
            </div>
    
            <footer className="text-center text-sm text-gray-500 mt-8">
            &copy; {new Date().getFullYear()} Reunion Committee. All rights reserved.
            </footer>
        </div>
        </main>
    );
}