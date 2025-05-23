"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Star,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";

async function SimilarServicesSection({
  providerId,
  categories,
  supabase,
}: {
  providerId: string;
  categories: string[];
  supabase: any;
}) {
  const { data: similarServices } = await supabase
    .from("providers")
    .select("*")
    .neq("id", providerId)
    .in("categories", categories)
    .limit(3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {similarServices && similarServices.length > 0 ? (
        similarServices.map((service: any) => (
          <div
            key={service.id}
            className="bg-[#F6EDE1] rounded-lg p-4 shadow-md"
          >
            <div className="h-40 rounded-md mb-4 overflow-hidden">
              <img
                src={
                  service.logo_url ||
                  "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80"
                }
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold mb-2">{service.name}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {service.description?.substring(0, 100)}...
            </p>
            <Link
              href={`/service/${service.id}`}
              className="text-[#3A3FC1] hover:underline text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-3 text-center py-8">
          <p className="text-gray-500">No similar services found</p>
        </div>
      )}
    </div>
  );
}

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Fetch the provider data based on the ID
  const { data: provider, error } = await supabase
    .from("providers")
    .select("*, reviews(*)")
    .eq("id", params.id)
    .single();

  if (error || !provider) {
    return (
      <main className="flex min-h-screen flex-col bg-[#F6EDE1]">
        <Navbar />
        <div className="container mx-auto px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-[#0b6344] mb-6">
            Service not found
          </h1>
          <p className="mb-8">
            The service you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/directory">
            <Button className="bg-[#3A3FC1] hover:bg-[#2e32a6] text-white">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Use reviews from the provider data if available
  const reviews: Review[] = provider.reviews || [];

  return (
    <main className="flex min-h-screen flex-col bg-[#F6EDE1]">
      <Navbar />

      {/* Back to directory link */}
      <div className="container mx-auto px-8 py-6">
        <Link
          href="/directory"
          className="inline-flex items-center text-[#3A3FC1] hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
        </Link>
      </div>

      {/* Hero section with service image */}
      <div className="w-full bg-[#045741] text-white">
        <div className="container mx-auto px-8 py-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="flex gap-2 mb-4 flex-wrap">
                {provider.categories &&
                  provider.categories.map((category: string, idx: number) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 ${idx % 2 === 0 ? "bg-orange-500" : "bg-[#3A3FC1]"} rounded-md text-xs font-medium`}
                    >
                      {category}
                    </span>
                  ))}
              </div>
              <h1 className="text-4xl font-bold mb-4">{provider.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < (provider.live_rating || provider.google_rating?.[0] || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                </div>
                <span className="ml-2">
                  {provider.live_rating || provider.google_rating?.[0] || 0} /5
                  (
                  {provider.live_reviews_count ||
                    provider.google_reviews_count ||
                    "0"}{" "}
                  reviews)
                </span>
              </div>
              <div className="flex items-center text-sm mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{provider.location}</span>
                {provider.distance && (
                  <span className="ml-2 text-xs bg-blue-500 px-2 py-1 rounded">
                    {typeof provider.distance === "number"
                      ? provider.distance.toFixed(1)
                      : provider.distance}{" "}
                    km away
                  </span>
                )}
              </div>

              {/* Service badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {provider.is_online && (
                  <span className="px-3 py-1 bg-blue-500 rounded-md text-xs font-medium">
                    Online
                  </span>
                )}
                {provider.is_free && (
                  <span className="px-3 py-1 bg-green-500 rounded-md text-xs font-medium">
                    Free
                  </span>
                )}
                {provider.requires_referal && (
                  <span className="px-3 py-1 bg-purple-500 rounded-md text-xs font-medium">
                    Referral Required
                  </span>
                )}
                {provider.open_now && (
                  <span className="px-3 py-1 bg-yellow-500 rounded-md text-xs font-medium">
                    Open Now
                  </span>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  className="bg-[#FF5001] hover:bg-[#cc4001] text-white transform hover:scale-105 transition-all duration-200"
                  onClick={() =>
                    (window.location.href = `tel:${provider.phone}`)
                  }
                >
                  <Phone className="mr-2 h-4 w-4" /> Contact
                </Button>
                {provider.website_url && (
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => window.open(provider.website_url, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-1/2 h-80 rounded-lg overflow-hidden">
              <img
                src={
                  provider.logo_url ||
                  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                }
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - About and Reviews */}
          <div className="lg:w-2/3">
            {/* About section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#0b6344]">
                About {provider.name}
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 mb-6">
                  {provider.description || "No description available."}
                </p>

                {/* Services offered */}
                {provider.services_offered &&
                  provider.services_offered.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-[#0b6344]">
                        Services Offered
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {provider.services_offered.map(
                          (service: string, idx: number) => (
                            <li key={idx} className="text-gray-700">
                              {service}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                {/* Specialties */}
                {provider.specialties && provider.specialties.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-[#0b6344]">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map(
                        (specialty: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-[#F6EDE1] text-[#0b6344] rounded-md text-sm"
                          >
                            {specialty}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Qualifications */}
                {provider.qualifications &&
                  provider.qualifications.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-[#0b6344]">
                        Qualifications
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {provider.qualifications.map(
                          (qualification: string, idx: number) => (
                            <li key={idx} className="text-gray-700">
                              {qualification}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </section>

            {/* Reviews section */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#0b6344]">
                Reviews
              </h2>
              <div className="space-y-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Card key={review.id} className="bg-white">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{review.author}</h3>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <div className="flex mb-3">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No reviews yet</p>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <Button className="bg-[#3A3FC1] hover:bg-[#2e32a6] text-white">
                  Write a Review
                </Button>
              </div>
            </section>
          </div>

          {/* Right column - Contact info, hours, map */}
          <div className="lg:w-1/3">
            {/* Contact information */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#0b6344]">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#3A3FC1] mr-3 mt-0.5" />
                  <div>
                    <p className="text-gray-700">
                      {provider.address || provider.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-[#3A3FC1] mr-3" />
                  <a
                    href={`tel:${provider.phone}`}
                    className="text-gray-700 hover:text-[#3A3FC1] hover:underline"
                  >
                    {provider.phone || "Not provided"}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-[#3A3FC1] mr-3" />
                  <a
                    href={`mailto:${provider.email}`}
                    className="text-gray-700 hover:text-[#3A3FC1] hover:underline"
                  >
                    {provider.email || "Not provided"}
                  </a>
                </div>
                <div className="flex items-center">
                  <ExternalLink className="w-5 h-5 text-[#3A3FC1] mr-3" />
                  <a
                    href={provider.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A3FC1] hover:underline"
                  >
                    {provider.website_url ? "Visit Website" : "Not provided"}
                  </a>
                </div>
              </div>
            </div>

            {/* Opening hours */}
            <div className="bg-white rounded-lg p-6 shadow-md mb-8">
              <h3 className="text-lg font-semibold mb-4 text-[#0b6344]">
                Opening Hours
              </h3>
              <div className="space-y-2">
                {provider.opening_hours ? (
                  Object.entries(provider.opening_hours).map(
                    ([day, hours]: [string, any]) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium capitalize">{day}</span>
                        <span className="text-gray-700">
                          {hours || "Closed"}
                        </span>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-gray-700">Opening hours not provided</p>
                )}
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-[#0b6344]">
                Location
              </h3>
              <div className="h-64 rounded-md mb-4 overflow-hidden">
                {provider.latitude && provider.longitude ? (
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${provider.latitude},${provider.longitude}&zoom=15`}
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    Map location not available
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {provider.address || provider.location}
              </p>
              {provider.latitude && provider.longitude && (
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${provider.latitude},${provider.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3A3FC1] hover:underline text-sm mt-2 inline-block"
                >
                  <MapPin className="w-4 h-4 inline mr-1" /> Get directions
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Similar services section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-8">
          <h2 className="text-2xl font-bold mb-8 text-[#0b6344]">
            Similar Services
          </h2>
          <React.Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">Loading similar services...</p>
                </div>
              </div>
            }
          >
            <SimilarServicesSection
              providerId={params.id}
              categories={provider.categories || []}
              supabase={supabase}
            />
          </React.Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
