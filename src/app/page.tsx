"use server";

import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  MapPin,
  Phone,
  Mail,
  Users,
  BookOpen,
  Shield,
  Send,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import NearbyServices from "@/components/nearby-services";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const popularGuides = [
  {
    title: "What is Anxiety?",
    description:
      "Learn about anxiety triggers, symptoms, and effective coping strategies.",
    category: "Mental Health",
    readTime: "8 min read",
  },
  {
    title: "How to Find the Right Therapist",
    description:
      "A step-by-step guide to finding a therapist who meets your specific needs.",
    category: "Therapy",
    readTime: "10 min read",
  },
  {
    title: "Signs You Might Be Burning Out",
    description:
      "Recognize the warning signs of burnout and learn how to prevent it.",
    category: "Self-Care",
    readTime: "7 min read",
  },
];

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: providers } = await supabase.from("providers").select();

  return (
    <main className="flex min-h-screen flex-col border-[#b60404] border-0">
      <Navbar />
      <Hero />
      <div className="bg-[#F6EDE1]">
        <h2 className="text-3xl font-bold text-center pt-8 pb-2 bg-[#045741] text-[#F6EDE1]">
          Support Near You
        </h2>
        <div className="bg-[#F6EDE1]">
          <NearbyServices />
        </div>
      </div>
      {/* Community Invitation Section */}
      <section className="bg-[#045842] py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <Users className="h-16 w-16 text-[#3A3FC1] mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-white">
                Talk to Others Who Get It
              </h2>
              <p className="text-lg mb-6 text-white">
                Our peer-support forum is a safe space to share your story, ask
                questions, and connect with others.
              </p>
              <Button className="bg-[#3A3FC1] hover:bg-[#2e32a6] text-white transform hover:scale-105 transition-all duration-200">
                Visit the Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2 rounded-lg p-6 bg-white">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border-[#F6EDE1] border-4">
                  <p className="font-medium text-[#0b6344]">
                    "Finding this community has been life-changing. I finally
                    feel understood."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    — Sarah, Community Member
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border-[#F6EDE1] border-4">
                  <p className="font-medium text-[#0b6344]">
                    "The support I've received here helped me through my darkest
                    days."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    — James, Community Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Popular Guides Section */}
      <section className="py-16 bg-[#F6EDE1] border-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <BookOpen className="h-12 w-12 mx-auto text-[#FF5001] mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-[#0b6344]">
              Understand What You're Going Through
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-700">
              Explore our expert-written guides to help you navigate your mental
              health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {popularGuides.map((guide, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-200 bg-[#F6EDE1] border-4 border-[#055640]"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-sm font-medium text-orange-500">
                        {guide.category}
                      </span>
                      <CardTitle className="mt-2">{guide.title}</CardTitle>
                    </div>
                    <span className="text-sm text-gray-500">
                      {guide.readTime}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {guide.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="w-full group bg-[#3A3FC1] text-white hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200"
                  >
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-[#FF5001] hover:bg-[#cc4001] text-white transform hover:scale-105 transition-all duration-200">
              Browse All Guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      {/* Trust & Transparency Strip */}
      <section className="bg-[#045741] py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <p className="text-xl font-medium mb-6">
              Built with input from mental health professionals and people with
              lived experience
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full p-4 mb-4 bg-[#F6EDE1]">
                <Image
                  src="/images/logo.png"
                  alt="Partner Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="font-medium">Trusted Partner</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 rounded-full p-4 mb-4">
                <Shield className="h-10 w-10" />
              </div>
              <p className="font-medium">Data Never Shared</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 rounded-full p-4 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <p className="font-medium">Used by Thousands</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-white/10 rounded-full p-4 mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <p className="font-medium">Free and Independent</p>
            </div>
          </div>
        </div>
      </section>
      {/* Newsletter CTA */}
      <section className="bg-[#F6EDE1] py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <Send className="h-12 w-12 mx-auto text-[#3A3FC1] mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-[#0b6344]">
              Get mental health tips and resources — straight to your inbox
            </h2>
          </div>

          <div className="rounded-lg p-8 bg-[#F6EDE1] border-[#3C41C8] border-4">
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3A3FC1]"
                required
              />
              <Button className="bg-[#FF5001] hover:bg-[#cc4001] text-white transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-4 text-center">
              No spam. Just helpful stuff.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
