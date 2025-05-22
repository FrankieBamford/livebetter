"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import LocationConsent from "./location-consent";

interface Service {
  id: number;
  name: string;
  description: string;
  categories: string[];
  location: string;
  rating: number;
  distance?: number; // in kilometers
  image: string;
}

// Mock data for services
const mockServices: Service[] = [
  {
    id: 1,
    name: "Wellness Together",
    description:
      "Community-focused wellness center offering group support and meditation classes.",
    categories: ["Support Group", "Meditation"],
    location: "Manchester, UK",
    rating: 4.5,
    image: "/images/wellnesstogether.png",
  },
  {
    id: 2,
    name: "Mind & Body Therapy",
    description:
      "Holistic approach to mental health with individual and group therapy sessions.",
    categories: ["Therapy", "Holistic"],
    location: "Liverpool, UK",
    rating: 4.8,
    image: "/images/mind&bodytherapy.png",
  },
  {
    id: 3,
    name: "Calm Waters Counseling",
    description:
      "Professional counseling services for anxiety, depression, and relationship issues.",
    categories: ["Counseling", "Anxiety"],
    location: "Birmingham, UK",
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
  },
  {
    id: 4,
    name: "Mindful Recovery Center",
    description:
      "Specialized programs for addiction recovery using mindfulness techniques.",
    categories: ["Recovery", "Mindfulness"],
    location: "Leeds, UK",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
  },
  {
    id: 5,
    name: "Serenity Wellness Spa",
    description:
      "Combines mental health support with relaxation techniques and spa treatments.",
    categories: ["Wellness", "Relaxation"],
    location: "Bristol, UK",
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
  },
  {
    id: 6,
    name: "Harmony Mental Health",
    description:
      "Comprehensive mental health services with a focus on long-term wellbeing.",
    categories: ["Mental Health", "Therapy"],
    location: "Sheffield, UK",
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
  },
  {
    id: 7,
    name: "Balance Life Coaching",
    description:
      "Professional life coaching to help achieve personal and professional goals.",
    categories: ["Coaching", "Personal Development"],
    location: "Newcastle, UK",
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  },
  {
    id: 8,
    name: "Inner Peace Meditation",
    description:
      "Guided meditation sessions and mindfulness training for stress reduction.",
    categories: ["Meditation", "Mindfulness"],
    location: "Glasgow, UK",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  },
];

// Function to calculate distance between two coordinates using Haversine formula
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Mock coordinates for UK cities to simulate geolocation
const cityCoordinates: Record<string, { lat: number; lon: number }> = {
  "Manchester, UK": { lat: 53.4808, lon: -2.2426 },
  "Liverpool, UK": { lat: 53.4084, lon: -2.9916 },
  "Birmingham, UK": { lat: 52.4862, lon: -1.8904 },
  "Leeds, UK": { lat: 53.8008, lon: -1.5491 },
  "Bristol, UK": { lat: 51.4545, lon: -2.5879 },
  "Sheffield, UK": { lat: 53.3811, lon: -1.4701 },
  "Newcastle, UK": { lat: 54.9783, lon: -1.6178 },
  "Glasgow, UK": { lat: 55.8642, lon: -4.2518 },
};

export default function NearbyServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
  const [locationAccepted, setLocationAccepted] = useState(false);

  // Handle when user accepts location sharing
  const handleLocationAccept = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lon: longitude });
    setLocationAccepted(true);
  };

  // Handle when user declines location sharing
  const handleLocationDecline = () => {
    setServices(mockServices.slice(0, 4));
  };

  useEffect(() => {
    // Show initial services immediately
    setServices(mockServices.slice(0, 4));

    if (userLocation) {
      // Sort services by distance from user if location is available
      const servicesWithDistance = mockServices.map((service) => {
        const coords = cityCoordinates[service.location] || {
          lat: 51.5074,
          lon: -0.1278,
        };

        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lon,
          coords.lat,
          coords.lon,
        );

        return {
          ...service,
          distance,
        };
      });

      const sortedServices = servicesWithDistance
        .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity))
        .slice(0, 4);

      setServices(sortedServices);
    }
  }, [userLocation]);

  return (
    <div className="bg-[#045741] px-7 py-8">
      {/* Optional location consent - only show if services are not yet sorted by distance */}
      {!userLocation && (
        <div className="mb-8 text-center">
          <LocationConsent
            onAccept={handleLocationAccept}
            onDecline={handleLocationDecline}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-lg overflow-hidden shadow-md bg-[#F8EFE2]"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 bg-[#F8EFE2e] bg-[#F8EFE2]">
              <div className="flex gap-2 mb-2 flex-wrap">
                {service.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 ${idx % 2 === 0 ? "bg-orange-100 text-orange-700" : "bg-purple-100 text-purple-700"} rounded-md text-xs font-medium`}
                  >
                    {category}
                  </span>
                ))}
              </div>

              <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-3">
                {service.description}
              </p>

              <div className="flex items-center text-sm text-gray-500 mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{service.location}</span>
                {service.distance && (
                  <span className="ml-1 text-xs text-blue-600">
                    ({service.distance.toFixed(1)} km away)
                  </span>
                )}
              </div>

              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < service.rating ? "text-yellow-400" : "text-gray-300"}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">
                  {service.rating} /5
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="p-2 border border-gray-200 rounded-md">
                    <Phone className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-2 border border-gray-200 rounded-md">
                    <Mail className="w-4 h-4 text-gray-500" />
                  </button>
                </div>

                <Link
                  href={`#service-${service.id}`}
                  className="px-4 py-2 bg-[#3A3FC1] text-white text-sm font-medium rounded-md hover:bg-[#2e32a6] hover:text-white transform hover:scale-105 transition-all duration-200"
                >
                  View Listing
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <button className="px-6 py-3 text-livebetter font-medium rounded-md hover:bg-[#EDE1CF] transform hover:scale-105 transition-all duration-200 bg-[#F8EFE2]">
          Load More Services
        </button>
      </div>
    </div>
  );
}
