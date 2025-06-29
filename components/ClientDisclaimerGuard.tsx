"use client";
import { useState } from "react";
import DisclaimerPopup from "./DisclaimerPopup";

export default function ClientDisclaimerGuard() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleAgree = () => {
    setShowDisclaimer(false);
  };

  const handleDisagree = () => {
    setShowDisclaimer(false);
    window.location.href = "/access-denied";
  };

  if (!showDisclaimer) return null;
  return <DisclaimerPopup onAgree={handleAgree} onDisagree={handleDisagree} />;
} 