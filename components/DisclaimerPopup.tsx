import React, { useEffect, useRef } from "react";

interface DisclaimerPopupProps {
  onAgree: () => void;
  onDisagree: () => void;
}

const DisclaimerPopup: React.FC<DisclaimerPopupProps> = ({ onAgree, onDisagree }) => {
  const agreeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap for accessibility
  useEffect(() => {
    agreeButtonRef.current?.focus();
    const handleTab = (e: KeyboardEvent) => {
      const focusableEls = document.querySelectorAll(
        '.disclaimer-popup button, .disclaimer-popup a'
      );
      const firstEl = focusableEls[0] as HTMLElement;
      const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onDisagree();
      }
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [onDisagree]);

  // Prevent background scroll/interactions
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center disclaimer-popup font-panara p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      {/* Blurred, dimmed background */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[8px] pointer-events-auto transition-opacity duration-300"
        aria-hidden="true"
      />
      {/* Modal */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-white rounded-xl border border-neutral-200 p-6 sm:p-8 md:p-10 flex flex-col items-center animate-fade-in shadow-lg">
        <h2 className="text-lg sm:text-xl md:text-2xl font-light uppercase tracking-widest text-neutral-900 mb-4 sm:mb-6 text-center">Disclaimer</h2>
        <ul className="text-neutral-700 text-sm sm:text-base font-normal leading-relaxed space-y-2 sm:space-y-3 mb-6 sm:mb-8 list-disc list-inside text-left w-full">
          <li>No solicitation or legal advice is provided on this website.</li>
          <li>Accessing this site does not create an attorney-client relationship.</li>
          <li>All content is for informational purposes only and is the intellectual property of the firm.</li>
          <li>
            This site uses cookies. See our{' '}
            <a
              href="/privacy-policy"
              className="text-red-600 underline hover:text-red-800 transition-colors font-normal"
              tabIndex={0}
            >
              Privacy Policy
            </a>
            .
          </li>
        </ul>
        <div className="flex w-full gap-3 sm:gap-4 mt-2">
          <button
            ref={agreeButtonRef}
            onClick={onAgree}
            className="flex-1 py-2.5 sm:py-3 rounded-md bg-red-600 text-white font-normal shadow-none border-none transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-sm sm:text-base"
          >
            Agree
          </button>
          <button
            onClick={onDisagree}
            className="flex-1 py-2.5 sm:py-3 rounded-md bg-white text-red-600 border border-red-300 font-normal shadow-none transition-all duration-200 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 text-sm sm:text-base"
          >
            Disagree
          </button>
        </div>
      </div>
      <style jsx global>{`
        body {
          pointer-events: none;
        }
        .disclaimer-popup {
          pointer-events: auto;
        }
        .animate-fade-in {
          animation: fadeInDisclaimer 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeInDisclaimer {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default DisclaimerPopup; 