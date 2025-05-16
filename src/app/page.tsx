import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { MapPin, Phone, Mail } from "lucide-react";
import { createClient } from "../../supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-livebetter-light bg-[f6f3f3] bg-[#f6f3f3]">
        <Navbar />
        <Hero />
      </div>
      {/* Browse Services Section */}
      <section className="py-16 bg-livebetter">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Browse Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1527301876608-f8a4b4faac8b?w=800&q=80"
                      alt="Support group session"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-medium">
                        Support Group
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
                        Meditation
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg mb-1">
                      Wellness Together
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Community-focused wellness center offering group support
                      and meditation classes.
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Manchester, UK</span>
                    </div>

                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">4.5 /5</span>
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
                        href="#"
                        className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors"
                      >
                        View Listing
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-white text-livebetter font-medium rounded-md hover:bg-gray-100 transition-colors">
              Load More Services
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
