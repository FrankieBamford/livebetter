import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  BookOpen,
  Users,
  Shield,
  Send,
  Heart,
  Lightbulb,
  Compass,
  HandHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Frankie Bamford",
    title: "Founder & CEO",
    image: "/images/headshots/frankie_bamford.png",
    bio: `After help founding The Pearl Exchange with my family in Bude, Cornwall and witnessing both the power of connection and the barriers to finding support, I created Live Better Directory to build a bridge between people and the help they deserve. My experience losing my sister to suicide and navigating my own mental health challenges drives my commitment to making this resource as compassionate and practical as possible.`,
  },
  {
    name: "Sarah Mitchell",
    title: "Director of Services & Partnerships",
    image: "/images/headshots/sarah_mitchell .png",
    bio: `With over a decade of experience in community mental health services, Sarah builds relationships with providers across the UK to ensure our directory remains comprehensive and accurate. Her previous work coordinating NHS referral pathways gives her unique insight into the gaps users face when seeking support.`,
  },
  {
    name: "Daniel Cooper",
    title: "Technology Lead",
    image: "/images/headshots/daniel_cooper.png",
    bio: `Daniel brings his technical expertise from developing healthcare applications to ensure our platform is accessible, secure, and intuitive—especially for users in distress. His personal experience supporting family members through mental health challenges drives his commitment to creating technology that truly helps when it's needed most.`,
  },
  {
    name: "Rachel Lewis",
    title: "User Experience & Community Manager",
    image: "/images/headshots/rachel_lewis.png",
    bio: `Drawing from her background in mental health advocacy and digital content creation, Rachel ensures Live Better Directory feels welcoming and straightforward for every user. She oversees our resource guides and moderated community spaces, translating complex mental health information into clear, practical guidance.`,
  },
  {
    name: "James Bennett",
    title: "Operations & Sustainability Director",
    image: "/images/headshots/james_bennett.png",
    bio: `James applies his experience from scaling social enterprises to build a sustainable foundation for Live Better Directory. His expertise in forming strategic partnerships with healthcare organisations helps ensure our directory can grow while remaining free and accessible to everyone who needs it.`,
  },
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Header Section */}
      <div className="bg-[#045741] py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-[#F6EDE1] tracking-tight drop-shadow-lg">
          About Us
        </h1>
        <p className="text-lg text-[#F6EDE1] max-w-2xl mx-auto font-medium">
          Live Better Directory: Making mental health support accessible,
          personal, and hopeful.
        </p>
      </div>

      {/* Our Story */}
      <section className="py-16 px-4 bg-[#F6EDE1]">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="md:w-1/2">
              <Heart className="h-16 w-16 text-[#3A3FC1] mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-[#0b6344]">
                Our Story
              </h2>
              <p className="mb-4 text-gray-700">
                <strong>
                  In a world with more options than ever, why does finding
                  mental health support feel so overwhelming?
                </strong>
              </p>
              <p className="mb-4 text-gray-700">
                That's the question that inspired Live Better Directory.
              </p>
            </div>
            <div className="md:w-1/2 rounded-lg p-6 bg-[#F6EDE1] border-[#045842] border-4">
              <p className="mb-4 text-gray-700">
                After losing my sister to suicide and navigating my own mental
                health journey for most of my life, I experienced firsthand how
                fragmented and confusing the support landscape can be. Each step
                toward help felt like another mountain to climb when I was
                already exhausted.
              </p>
              <p className="mb-4 text-gray-700">
                <strong>
                  That's when the vision for Live Better Directory was born.
                </strong>
              </p>
            </div>
          </div>
          <p className="mb-4 text-gray-700">
            In 2022, I founded The Pearl Exchange in Bude—a creative wellbeing
            hub for young adults. While the impact was meaningful, I struggled
            to reach everyone who needed support. I saw people falling through
            the cracks not because help wasn't available, but because they
            couldn't find the right services at the right time.
          </p>
        </div>
      </section>

      {/* Mission Section with accent background */}
      <section className="py-16 px-4 bg-[#F6EDE1]">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <Compass className="h-16 w-16 text-[#FF5001] mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-[#0b6344]">
                Our Mission
              </h2>
              <p className="mb-4 text-gray-700">
                We're creating a place where finding help isn't another burden
                to carry. Our mission is simple: to connect you with trusted
                mental health, wellness, and recovery services across the UK—in
                a way that feels personal, straightforward, and hopeful.
              </p>
            </div>
            <div className="md:w-1/2 rounded-lg p-6 bg-[#F6EDE1] border-[#3C41C8] border-4">
              <p className="mb-4 text-gray-700">
                Whether you're looking for a therapist nearby, a support group
                that understands your experience, or immediate crisis help, we
                bring together NHS, private, and charity services into one calm,
                easy-to-navigate platform. No matter where you are in your
                journey, you'll find options that fit your unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 bg-[#045741] text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-[#F6EDE1]">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F6EDE1]/10 rounded-full p-4 mb-4">
                <Compass className="h-10 w-10" />
              </div>
              <p className="font-medium">Simplified Search</p>
              <p className="text-sm mt-2">
                Find services filtered by location, needs, cost, and wait times
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F6EDE1]/10 rounded-full p-4 mb-4">
                <BookOpen className="h-10 w-10" />
              </div>
              <p className="font-medium">Clear Information</p>
              <p className="text-sm mt-2">
                Understand exactly what each service provides and how to access
                it
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F6EDE1]/10 rounded-full p-4 mb-4">
                <Lightbulb className="h-10 w-10" />
              </div>
              <p className="font-medium">Practical Guides</p>
              <p className="text-sm mt-2">
                Navigate mental health topics with straightforward advice
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F6EDE1]/10 rounded-full p-4 mb-4">
                <Users className="h-10 w-10" />
              </div>
              <p className="font-medium">Community Connection</p>
              <p className="text-sm mt-2">
                Join our moderated forum to share experiences and find hope
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-4 bg-[#F6EDE1]">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <HandHeart className="h-16 w-16 text-[#3A3FC1] mb-4" />
              <h2 className="text-3xl font-bold mb-4 text-[#0b6344]">
                Our Approach
              </h2>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <div className="bg-[#3A3FC1] rounded-full p-1 mr-3 mt-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span>
                    <strong>Everyone deserves accessible support</strong> that
                    meets them where they are
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#3A3FC1] rounded-full p-1 mr-3 mt-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span>
                    <strong>Finding help shouldn't require extra energy</strong>{" "}
                    when you're already struggling
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#3A3FC1] rounded-full p-1 mr-3 mt-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span>
                    <strong>The right connection can change everything</strong>{" "}
                    on your wellbeing journey
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#3A3FC1] rounded-full p-1 mr-3 mt-1">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <span>
                    <strong>Lived experience matters</strong> in creating truly
                    helpful resources
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden">
              <div className="relative w-full h-80">
                <Image
                  src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80"
                  alt="Team collaboration"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 px-4 bg-[#F6EDE1]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 mx-auto text-[#3A3FC1] mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-[#0b6344]">
              Meet Our Team
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-700">
              Our team brings together expertise in mental health, technology,
              and community building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-lg shadow-md p-6 bg-[#F6EDE1] border-[#045842] border-2"
              >
                <div className="w-32 h-32 mb-4 relative rounded-full overflow-hidden border-4 border-[#FF5001]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-[#0b6344]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#FF5001] font-semibold mb-2">
                  {member.title}
                </p>
                <p className="text-gray-700 text-center text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Journey */}
      <section className="py-16 px-4 bg-[#045741] text-center">
        <div className="container mx-auto max-w-2xl">
          <Send className="h-12 w-12 mx-auto text-[#F6EDE1] mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-[#F6EDE1]">
            Join Our Journey
          </h2>
          <p className="mb-6 text-[#F6EDE1]">
            Live Better Directory is just beginning. We're building this
            resource step by step, starting with a focus on Cornwall before
            expanding across the UK.
            <br />
            <br />
            Your wellbeing journey matters. Let's take it together, one
            connection at a time.
          </p>
          <Link href="/contact">
            <Button className="bg-[#3A3FC1] hover:bg-[#2e32a6] text-white transform hover:scale-105 transition-all duration-200">
              Contact Us
            </Button>
          </Link>
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
