"use client";
import { useState, useEffect } from "react";
import DisclaimerPopup from "./DisclaimerPopup";

export default function ClientDisclaimerGuard() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if disclaimer has been accepted
    const disclaimerAccepted = localStorage.getItem('sixthsense-disclaimer-accepted');
    if (!disclaimerAccepted) {
      setShowDisclaimer(true);
    }
    setIsLoading(false);
  }, []);

  const handleAgree = () => {
    localStorage.setItem('sixthsense-disclaimer-accepted', 'true');
    setShowDisclaimer(false);
  };

  const handleDisagree = () => {
    setShowDisclaimer(false);
    window.location.href = "https://www.google.com";
  };

  if (isLoading || !showDisclaimer) return null;
  return <DisclaimerPopup onAgree={handleAgree} onDisagree={handleDisagree} />;
}
