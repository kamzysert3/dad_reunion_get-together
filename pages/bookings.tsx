import BookingForm from "@/components/form";

export default function Bookings() {
  return (
    <main className="min-h-screen px-4 py-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="w-full max-w-3xl space-y-10 bg-white/90 rounded-2xl shadow-xl p-10 border border-blue-200">
        <header className="text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-blue-800 mb-3">Register for the CAS-FORUM (85/87 set) Reunion</h1>
          <p className="text-lg md:text-xl text-gray-700">Please fill out the form below to confirm your attendance at the <span className='font-semibold text-blue-700'>CAS-FORUM (85/87 set)</span> reunion.</p>
        </header>

        <BookingForm />

        <footer className="text-center text-sm text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} CAS-FORUM (85/87 set) Reunion Committee. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
