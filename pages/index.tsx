export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white text-center px-4">
      <div className="w-full max-w-xl bg-white/80 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-blue-200">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-6 leading-tight drop-shadow-lg">
          CAS-FORUM (85/87 set) Reunion
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-8">
          Welcome to the official <span className="font-semibold text-blue-700">CAS-FORUM (85/87 set)</span> reunion page. We're excited to reconnect and create new memories together!
        </p>
        <a
          href="/bookings"
          className="inline-block w-full sm:w-auto px-6 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-lg sm:text-xl font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition duration-300"
        >
          Join the Meetup
        </a>
      </div>
    </div>
  );
}