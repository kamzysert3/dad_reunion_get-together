export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-white text-center px-4">
      <div className="max-w-xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Dad Reunion Get-Together
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Welcome to the official reunion page. We're excited to reconnect and create new memories together!
        </p>
        <a
          href="/bookings"
          className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Join the Meetup
        </a>
      </div>
    </div>
  );
}