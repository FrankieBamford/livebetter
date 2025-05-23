"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default async function ServicePage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  console.log("Service page - Fetching provider with ID:", params.id);

  // Fetch the provider data based on the ID
  const { data: provider, error } = await supabase
    .from("providers")
    .select("*")
    .eq("id", parseInt(params.id))
    .single();

  console.log("Service page - Query result:", { 
    provider, 
    error, 
    providerExists: !!provider,
    errorMessage: error?.message 
  });

  if (error || !provider) {
    console.error("Service page - Provider not found or error:", error);
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
            <span className="inline-flex items-center justify-center px-4 py-2 bg-[#3A3FC1] hover:bg-[#2e32a6] text-white text-sm font-medium rounded-md transform hover:scale-105 transition-all duration-200">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Directory
            </span>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

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
              <h1 className="text-4xl font-bold mb-4">{provider.name}</h1>
              
              {/* Rating display */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < (provider.live_rating || provider.google_rating?.[0] || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                </div>
                <span className="ml-2">
                  {provider.live_rating || provider.google_rating?.[0] || 4} /5
                  ({provider.live_reviews_count || provider.google_reviews_count || "0"} reviews)
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center text-sm mb-6">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{provider.location || "UK"}</span>
              </div>

              {/* Service badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {provider.is_online && (
                  <span className="px-3 py-1 bg-blue-500 rounded-md text-xs font-medium">
                    Online
                  </span>
                )}
                {provider.is_verified && (
                  <span className="px-3 py-1 bg-green-500 rounded-md text-xs font-medium">
                    Verified
                  </span>
                )}
                {!provider.requires_referal && (
                  <span className="px-3 py-1 bg-purple-500 rounded-md text-xs font-medium">
                    No Referral Required
                  </span>
                )}
                {provider.open_now && (
                  <span className="px-3 py-1 bg-yellow-500 rounded-md text-xs font-medium">
                    Open Now
                  </span>
                )}
              </div>

              {/* Contact buttons */}
              <div className="flex gap-4 mt-6">
                {provider.phone && (
                  <a
                    href={`tel:${provider.phone}`}
                    className="inline-flex items-center justify-center px-4 py-2 bg-[#FF5001] hover:bg-[#cc4001] text-white text-sm font-medium rounded-md transform hover:scale-105 transition-all duration-200"
                  >
                    <Phone className="mr-2 h-4 w-4" /> Contact
                  </a>
                )}
                {provider.website_url && (
                  <a
                    href={provider.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-white text-white hover:bg-white/10 text-sm font-medium rounded-md transform hover:scale-105 transition-all duration-200"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                  </a>
                )}
              </div>
            </div>
            
            {/* Provider image */}
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
          
          {/* Left column - About */}
          <div className="lg:w-2/3">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-[#0b6344]">
                About {provider.name}
              </h2>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <p className="text-gray-700 mb-6">
                  {provider.description || "No description available."}
                </p>
                
                {/* Display all available provider data */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {provider.created_at && (
                    <div>
                      <h4 className="font-semibold text-[#0b6344] mb-2">Member Since</h4>
                      <p className="text-gray-700">
                        {new Date(provider.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  
                  {provider.is_verified && (
                    <div>
                      <h4 className="font-semibold text-[#0b6344] mb-2">Verification Status</h4>
                      <p className="text-green-600 font-medium">✓ Verified Provider</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Right column - Contact info */}
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
                      {provider.location || "Location not provided"}
                    </p>
                  </div>
                </div>
                
                {provider.phone && (
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#3A3FC1] mr-3" />
                    <a
                      href={`tel:${provider.phone}`}
                      className="text-gray-700 hover:text-[#3A3FC1] hover:underline"
                    >
                      {provider.phone}
                    </a>
                  </div>
                )}
                
                {provider.email && (
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#3A3FC1] mr-3" />
                    <a
                      href={`mailto:${provider.email}`}
                      className="text-gray-700 hover:text-[#3A3FC1] hover:underline"
                    >
                      {provider.email}
                    </a>
                  </div>
                )}
                
                {provider.website_url && (
                  <div className="flex items-center">
                    <ExternalLink className="w-5 h-5 text-[#3A3FC1] mr-3" />
                    <a
                      href={provider.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3A3FC1] hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-[#0b6344]">
                Provider Details
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Provider ID:</span>
                  <span className="ml-2 text-gray-600">{provider.id}</span>
                </div>
                
                {provider.google_reviews_count && (
                  <div>
                    <span className="font-medium text-gray-700">Google Reviews:</span>
                    <span className="ml-2 text-gray-600">{provider.google_reviews_count}</span>
                  </div>
                )}
                
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <span className={`ml-2 ${provider.is_verified ? 'text-green-600' : 'text-gray-600'}`}>
                    {provider.is_verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                
                {provider.slug && (
                  <div>
                    <span className="font-medium text-gray-700">Slug:</span>
                    <span className="ml-2 text-gray-600">{provider.slug}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            {provider.latitude && provider.longitude && (
              <div className="bg-white rounded-lg p-6 shadow-md mt-8">
                <h3 className="text-lg font-semibold mb-4 text-[#0b6344]">
                  Location Map
                </h3>
                <div className="h-64 rounded-md mb-4 overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${provider.latitude},${provider.longitude}&zoom=15`}
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {provider.location}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${provider.latitude},${provider.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3A3FC1] hover:underline text-sm inline-flex items-center"
                >
                  <MapPin className="w-4 h-4 mr-1" /> Get directions
                </a>
              </div>
            )}

            {/* Social Links */}
            {provider.social_links && Array.isArray(provider.social_links) && provider.social_links.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-md mt-8">
                <h3 className="text-lg font-semibold mb-4 text-[#0b6344]">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {provider.social_links.map((social: any, idx: number) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#3A3FC1] text-white text-sm rounded-md hover:bg-[#2e32a6] transition-colors capitalize"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
