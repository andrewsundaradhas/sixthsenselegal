"use client";
import { useEffect, useState } from "react";
import DisclaimerPopup from "./DisclaimerPopup";

export default function ClientDisclaimerGuard() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const agreed = localStorage.getItem("ssl_disclaimer_agreed");
    if (!agreed) setShowDisclaimer(true);
  }, []);

  const handleAgree = () => {
    localStorage.setItem("ssl_disclaimer_agreed", "true");
    setShowDisclaimer(false);
  };

  const handleDisagree = () => {
    localStorage.removeItem("ssl_disclaimer_agreed");
    setShowDisclaimer(false);
    window.location.href = "/access-denied";
  };

  if (!showDisclaimer) return null;
  return <DisclaimerPopup onAgree={handleAgree} onDisagree={handleDisagree} />;
} 