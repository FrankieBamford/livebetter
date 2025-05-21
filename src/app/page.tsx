import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { MapPin, Phone, Mail } from "lucide-react";
import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import NearbyServices from "@/components/nearby-services";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-white">
      <div className=" bg-[#f6f3f3] ">
        <Navbar />
        <Hero />
      </div>
      {/* Browse Services Section */}
      <section className="py-16 bg-livebetter">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Browse Services Near You
          </h2>

          <NearbyServices />
        </div>
      </section>
      <Footer />
    </div>
  );
}
