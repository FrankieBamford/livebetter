"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

interface LocationConsentProps {
  onAccept: (position: GeolocationPosition) => void;
  onDecline: () => void;
}

export default function LocationConsent({
  onAccept,
  onDecline,
}: LocationConsentProps) {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const locationConsent = localStorage.getItem("location-consent");

    if (locationConsent === null) {
      // If no choice has been made yet, show the consent dialog
      setShowConsent(true);
    } else if (locationConsent === "accepted") {
      // If user previously accepted, get their location again
      navigator.geolocation.getCurrentPosition(
        (position) => onAccept(position),
        () => onDecline(),
        { enableHighAccuracy: true },
      );
    }
  }, [onAccept, onDecline]);

  const handleAccept = () => {
    setShowConsent(false);
    localStorage.setItem("location-consent", "accepted");

    navigator.geolocation.getCurrentPosition(
      (position) => onAccept(position),
      () => {
        // If there's an error getting location after accepting
        onDecline();
        localStorage.setItem("location-consent", "declined");
      },
      { enableHighAccuracy: true },
    );
  };

  const handleDecline = () => {
    setShowConsent(false);
    localStorage.setItem("location-consent", "declined");
    onDecline();
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-full max-w-md rounded-lg shadow-lg border border-gray-200 p-4 z-50 bg-[#F6EFE1] border-4 border-8 border-[#02543c] border-2">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-full">
          <MapPin className="h-5 w-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Location Access</h3>
          <p className="text-sm text-gray-600 mt-1 mb-3">
            Allow access to your location to find mental health and wellness
            services near you.
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Allow Location Access
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
