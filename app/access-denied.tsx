export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-8">You must agree to the legal disclaimer to use this site.</p>
      <a href="/" className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-all">Return to Home</a>
    </div>
  );
} 