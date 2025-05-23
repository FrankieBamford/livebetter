"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

interface Service {
  id: number;
  name: string;
  description: string;
  categories: string[];
  location: string;
  rating: number;
  distance?: number; // in kilometers
  image: string;
  is_online?: boolean;
  is_free?: boolean;
  requires_referral?: boolean;
  is_open_now?: boolean;
}

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-grow flex flex-col">
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
        <p className="text-sm text-gray-600 mb-3 flex-grow">
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

        {/* Service badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.is_online && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
              Online
            </span>
          )}
          {service.is_free && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
              Free
            </span>
          )}
          {service.requires_referral && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
              Referral Required
            </span>
          )}
          {service.is_open_now && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-medium">
              Open Now
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex space-x-2">
            <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
              <Phone className="w-4 h-4 text-gray-500" />
            </button>
            <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors">
              <Mail className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <Link
            href={`/service/${service.id}`}
            className="px-4 py-2 bg-[#3A3FC1] text-white text-sm font-medium rounded-md hover:bg-[#2e32a6] hover:text-white transform hover:scale-105 transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
