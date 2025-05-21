import React from 'react';
import Image from "next/image";
import Link from "next/link";

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
    <div className="min-h-screen bg-[#F7EFE2]">
      {/* Header Section */}
      <div className="bg-[#3C40C7] py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-[#F7EFE2] tracking-tight drop-shadow-lg">About Us</h1>
        <p className="text-lg text-[#EAAEEC] max-w-2xl mx-auto font-medium">
          Live Better Directory: Making mental health support accessible, personal, and hopeful.
        </p>
      </div>

      {/* Our Story */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-[#3C40C7]">Our Story</h2>
        <p className="mb-4 text-gray-700">
          <strong>In a world with more options than ever, why does finding mental health support feel so overwhelming?</strong>
        </p>
        <p className="mb-4 text-gray-700">
          That's the question that inspired Live Better Directory.
        </p>
        <p className="mb-4 text-gray-700">
          After losing my sister to suicide and navigating my own mental health journey for most of my life, I experienced firsthand how fragmented and confusing the support landscape can be. Each step toward help felt like another mountain to climb when I was already exhausted.
        </p>
        <p className="mb-4 text-gray-700">
          In 2022, I founded The Pearl Exchange in Bude—a creative wellbeing hub for young adults. While the impact was meaningful, I struggled to reach everyone who needed support. I saw people falling through the cracks not because help wasn't available, but because they couldn't find the right services at the right time.
        </p>
        <p className="mb-4 text-gray-700">
          <strong>That's when the vision for Live Better Directory was born.</strong>
        </p>
      </section>

      {/* Mission Section with accent background */}
      <section className="py-12 px-4 bg-[#EAAEEC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-[#3C40C7]">Our Mission</h2>
          <p className="mb-4 text-[#3C40C7]">
            We're creating a place where finding help isn't another burden to carry. Our mission is simple: to connect you with trusted mental health, wellness, and recovery services across the UK—in a way that feels personal, straightforward, and hopeful.
          </p>
          <p className="mb-4 text-[#3C40C7]">
            Whether you're looking for a therapist nearby, a support group that understands your experience, or immediate crisis help, we bring together NHS, private, and charity services into one calm, easy-to-navigate platform. No matter where you are in your journey, you'll find options that fit your unique needs.
          </p>
        </div>
      </section>

      {/* What We Offer - racing green background, old lace text */}
      <section className="py-12 px-4 bg-[#3C40C7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-[#FF5D01]">What We Offer</h2>
          <ul className="list-disc pl-6 text-[#F7EFE2] mb-4">
            <li><strong>Simplified Search:</strong> Find services filtered by location, needs, cost, and wait times</li>
            <li><strong>Clear Information:</strong> Understand exactly what each service provides and how to access it</li>
            <li><strong>Practical Guides:</strong> Navigate mental health topics with straightforward advice and real experiences</li>
            <li><strong>Community Connection:</strong> Join our moderated forum to share experiences and find hope</li>
          </ul>
        </div>
      </section>

      {/* Our Approach - old lace background, racing green text */}
      <section className="py-12 px-4 bg-[#F7EFE2]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-[#3C40C7]">Our Approach</h2>
          <ul className="list-disc pl-6 text-[#3C40C7] mb-4">
            <li><strong>Everyone deserves accessible support</strong> that meets them where they are</li>
            <li><strong>Finding help shouldn't require extra energy</strong> when you're already struggling</li>
            <li><strong>The right connection can change everything</strong> on your wellbeing journey</li>
            <li><strong>Lived experience matters</strong> in creating truly helpful resources</li>
          </ul>
        </div>
      </section>

      {/* Meet Our Team - light pink background, racing green text */}
      <section className="py-16 px-4 bg-[#EAAEEC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-[#3C40C7] text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center rounded-lg shadow-md p-6 bg-[#F7EFE2]">
                <div className="w-32 h-32 mb-4 relative rounded-full overflow-hidden border-4 border-[#FF5D01]">
                  <Image src={member.image} alt={member.name} fill style={{objectFit: 'cover'}} />
                </div>
                <h3 className="text-xl font-bold mb-1 text-[#3C40C7]">{member.name}</h3>
                <p className="text-sm text-[#FF5D01] font-semibold mb-2">{member.title}</p>
                <p className="text-[#3C40C7] text-center text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Journey - racing green background, old lace text */}
      <section className="py-16 px-4 bg-[#3C40C7] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4 text-[#FF5D01]">Join Our Journey</h2>
          <p className="mb-6 text-[#F7EFE2]">
            Live Better Directory is just beginning. We're building this resource step by step, starting with a focus on Cornwall before expanding across the UK.<br /><br />
            Your wellbeing journey matters. Let's take it together, one connection at a time.
          </p>
          <Link href="/contact">
            <button className="px-8 py-3 bg-[#3A3FC1] text-white font-medium rounded-md hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200 text-lg shadow-md">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
} 