import BookingForm from "@/components/form";

export default function Bookings() {
  return (
    <main className="min-h-screen px-4 py-12 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Register for the Reunion</h1>
          <p className="text-lg text-gray-600">Please fill out the form below to confirm your attendance.</p>
        </header>

        <BookingForm />

        <footer className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Reunion Committee. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
