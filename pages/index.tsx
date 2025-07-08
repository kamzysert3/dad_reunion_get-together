export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white text-center px-4">
      <div className="max-w-xl bg-white/80 rounded-2xl shadow-xl p-10 border border-blue-200">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-6 leading-tight drop-shadow-lg">
          CAS-FORUM (85/87 set) Reunion
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Welcome to the official <span className="font-semibold text-blue-700">CAS-FORUM (85/87 set)</span> reunion page. We're excited to reconnect and create new memories together!
        </p>
        <a
          href="/bookings"
          className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xl font-bold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-500 transition duration-300"
        >
          Join the Meetup
        </a>
      </div>
    </div>
  );
}