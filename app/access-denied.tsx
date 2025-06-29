export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-center">Access Denied</h1>
      <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center max-w-md mx-auto">
        You must agree to the legal disclaimer to use this site.
      </p>
      <a 
        href="/" 
        className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-all text-sm sm:text-base"
      >
        Return to Home
      </a>
    </div>
  );
} 