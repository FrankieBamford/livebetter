'use server';

import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { MapPin, Phone, Mail } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import NearbyServices from "@/components/nearby-services";
import { cookies } from 'next/headers'

export default async function Home() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: providers } = await supabase.from('providers').select()

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <NearbyServices />
      <Footer />
    </main>
  )
}
