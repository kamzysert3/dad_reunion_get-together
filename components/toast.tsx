export default function Toast({ message, onClose, success }: { message: string; onClose: () => void; success?: boolean }) {
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 ${success ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 animate-fade-in`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-white font-bold">&times;</button>
    </div>
  );
}