"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import LocationConsent from "./location-consent";
import { createClient } from "@/utils/supabase/client";

interface Service {
  id: number;
  name: string;
  description: string;
  categories: string[];
  location: string;
  rating: number;
  distance?: number; // in kilometers
  image: string;
  email: string;
  phone: string;
  website: string;
}

// We'll fetch services from Supabase instead of using mock data

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
  const [loading, setLoading] = useState(true);

  // Handle when user accepts location sharing
  const handleLocationAccept = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setUserLocation({ lat: latitude, lon: longitude });
    setLocationAccepted(true);
  };

  // Handle when user declines location sharing
  const handleLocationDecline = () => {
    // Just set locationAccepted to true to continue fetching services
    setLocationAccepted(true);
  };

  useEffect(() => {
    if (!locationAccepted) return; // Don't fetch until location consent is handled

    const fetchServices = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from("providers").select("*");

        if (error) {
          console.error("Error fetching services:", error);
          return;
        }

        console.log("Raw provider data:", data);

        // Transform the data to match the expected format if needed
        const transformedData =
          data?.map((provider) => ({
            id: provider.id,
            name: provider.name || "Unknown Provider",
            description: provider.description || "No description available",
            // Use fallback data for missing columns
            categories: provider.categories || ["Mental Health"], // Default category
            location: provider.location || "UK", // Default location
            rating: provider.rating || Math.floor(Math.random() * 2) + 4, // Random 4-5 star rating
            image:
              provider.image ||
              "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
            // Include the actual database fields for potential use
            email: provider.email || "",
            phone: provider.phone || "",
            website: provider.website || "",
          })) || [];

        console.log("Transformed data:", transformedData);

        if (userLocation) {
          // Sort services by distance from user if location is available
          const servicesWithDistance = transformedData.map((service) => {
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

          console.log("Setting services with location:", sortedServices);
          setServices(sortedServices);
        } else {
          // If no location, just show the first 4 services
          const firstFour = transformedData.slice(0, 4);
          console.log("Setting services without location:", firstFour);
          setServices(firstFour);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [locationAccepted, userLocation]);

  return (
    <div className="bg-[#045741] px-8 py-8">
      <h2 className="text-3xl font-bold text-center pb-8 text-[#F6EDE1]">
        Support Near You
      </h2>
      {/* Optional location consent - only show if services are not yet sorted by distance */}
      {!userLocation && (
        <div className="mb-8 text-center">
          <LocationConsent
            onAccept={handleLocationAccept}
            onDecline={handleLocationDecline}
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-16">
        {loading ? (
          <div className="col-span-full text-center text-[#F6EDE1]">
            <div className="animate-pulse">Loading services...</div>
          </div>
        ) : services.length === 0 ? (
          <div className="col-span-full text-center text-[#F6EDE1]">
            <p className="text-lg mb-2">No services found</p>
            <p className="text-sm opacity-75">
              Check the console for debugging info
            </p>
          </div>
        ) : (
          services.map((service) => (
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

              <div className="p-4 bg-[#F8EFE2]">
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
                    {service.phone && (
                      <a
                        href={`tel:${service.phone}`}
                        className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <Phone className="w-4 h-4 text-gray-500" />
                      </a>
                    )}
                    {service.email && (
                      <a
                        href={`mailto:${service.email}`}
                        className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-gray-500" />
                      </a>
                    )}
                  </div>

                  <Link
                    href={`/service/${service.id}`}
                    className="px-4 py-2 bg-[#3A3FC1] text-white text-sm font-medium rounded-md hover:bg-[#2e32a6] hover:text-white transform hover:scale-105 transition-all duration-200"
                  >
                    View Listing
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-16 text-center">
        <Link
          href="/directory"
          className="inline-block px-8 py-4 text-livebetter font-medium rounded-md hover:bg-[#EDE1CF] transform hover:scale-105 transition-all duration-200 bg-[#F8EFE2]"
        >
          Load More Services
        </Link>
      </div>
    </div>
  );
}
