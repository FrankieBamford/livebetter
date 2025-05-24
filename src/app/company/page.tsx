import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Sarah founded Live Better Directory with a mission to make mental health resources more accessible to everyone. With over 15 years of experience in healthcare and technology, she leads our vision and strategy.",
    image: "/images/headshots/sarah_mitchell .png",
    linkedin: "#",
  },
  {
    name: "James Bennett",
    role: "Head of Partnerships",
    bio: "James builds relationships with mental health providers across the UK to ensure our directory offers comprehensive support options. His background in community mental health services drives his passion for connecting people with the right resources.",
    image: "/images/headshots/james_bennett.png",
    linkedin: "#",
  },
  {
    name: "Rachel Lewis",
    role: "Clinical Director",
    bio: "As a practicing clinical psychologist, Rachel ensures all content and resources meet the highest clinical standards. She oversees our verification process and helps develop our educational materials.",
    image: "/images/headshots/rachel_lewis.png",
    linkedin: "#",
  },
  {
    name: "Daniel Cooper",
    role: "Technical Lead",
    bio: "Daniel leads our development team, building innovative features to improve user experience. With a background in both technology and psychology, he's passionate about creating digital tools that support mental wellbeing.",
    image: "/images/headshots/daniel_cooper.png",
    linkedin: "#",
  },
  {
    name: "Frankie Bamford",
    role: "Community Manager",
    bio: "Frankie oversees our online community, ensuring it remains a safe, supportive space for all members. With experience in peer support and digital community building, she's dedicated to fostering meaningful connections.",
    image: "/images/headshots/frankie_bamford.png",
    linkedin: "#",
  },
];

const values = [
  {
    title: "Accessibility",
    description:
      "We believe mental health support should be accessible to everyone, regardless of location, background, or circumstances.",
  },
  {
    title: "Empowerment",
    description:
      "We aim to empower individuals with knowledge, resources, and community support to take control of their mental wellbeing journey.",
  },
  {
    title: "Inclusivity",
    description:
      "We're committed to creating a platform that serves and represents the diverse needs of all communities.",
  },
  {
    title: "Quality",
    description:
      "We maintain high standards for the resources and services we list, ensuring users can trust the support they find.",
  },
  {
    title: "Compassion",
    description:
      "We approach our work with empathy and understanding, recognizing the courage it takes to seek help.",
  },
];

const openPositions = [
  {
    title: "Content Writer (Mental Health)",
    type: "Full-time",
    location: "Remote (UK)",
  },
  {
    title: "UX Researcher",
    type: "Part-time",
    location: "London or Remote",
  },
  {
    title: "Community Support Specialist",
    type: "Full-time",
    location: "Manchester or Remote",
  },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-[#F6EDE1]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#045741] py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-[#F6EDE1] tracking-tight drop-shadow-lg">
          About Live Better Directory
        </h1>
        <p className="text-lg text-[#F6EDE1] max-w-2xl mx-auto font-medium">
          Our mission is to make mental health and wellness support accessible
          to everyone
        </p>
      </div>

      <div className="container mx-auto px-8 py-16">
        {/* Our Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">Our Story</h2>
          <div className="bg-white rounded-lg p-8 shadow-md border-2 border-[#045842]">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <p className="mb-4 text-gray-700">
                  Live Better Directory was founded in 2020 with a simple but
                  powerful mission: to make it easier for people to find the
                  mental health and wellness support they need, when they need
                  it.
                </p>
                <p className="mb-4 text-gray-700">
                  Our founder, Sarah Mitchell, experienced firsthand the
                  challenges of navigating the complex mental health system
                  while supporting a family member. The frustration of endless
                  Google searches, outdated information, and difficulty finding
                  appropriate services inspired her to create a solution.
                </p>
                <p className="text-gray-700">
                  Today, Live Better Directory has grown into a comprehensive
                  platform connecting thousands of people across the UK with
                  verified mental health providers, community resources, and
                  educational content. We're proud to be making a difference in
                  how people access mental health support.
                </p>
              </div>
              <div className="md:w-1/2 flex justify-center items-center">
                <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80"
                    alt="Team working together"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md border-2 border-[#045842]"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#0b6344]">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Team Section */}
        <section id="team" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md border-2 border-[#045842]"
              >
                <div className="h-64 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-[#0b6344]">
                    {member.name}
                  </h3>
                  <p className="text-[#3A3FC1] font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    className="inline-flex items-center text-[#3A3FC1] hover:underline"
                  >
                    <Linkedin className="h-4 w-4 mr-2" /> Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Careers Section */}
        <section id="careers" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">
            Join Our Team
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border-2 border-[#045842] mb-8">
            <p className="mb-6 text-gray-700">
              We're always looking for passionate individuals who share our
              mission of making mental health support more accessible. Join us
              in creating a platform that helps thousands of people find the
              support they need.
            </p>
            <h3 className="text-xl font-semibold mb-4 text-[#0b6344]">
              Why Work With Us
            </h3>
            <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2">
              <li>Make a meaningful impact on mental health accessibility</li>
              <li>Flexible remote-first working environment</li>
              <li>Competitive compensation and benefits</li>
              <li>Professional development opportunities</li>
              <li>Supportive, inclusive team culture</li>
            </ul>
            <h3 className="text-xl font-semibold mb-4 text-[#0b6344]">
              Open Positions
            </h3>
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-lg text-[#0b6344]">
                        {position.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{position.type}</span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />{" "}
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-[#3A3FC1] hover:bg-[#2e32a6] text-white transform hover:scale-105 transition-all duration-200">
                      Apply
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#045741] rounded-lg p-8 text-white">
            <h3 className="text-xl font-semibold mb-4">
              Don't see a role that fits?
            </h3>
            <p className="mb-6">
              We're always interested in connecting with talented individuals
              who are passionate about our mission. Send us your CV and tell us
              how you could contribute to our team.
            </p>
            <Button className="bg-[#FF5001] hover:bg-[#cc4001] text-white transform hover:scale-105 transition-all duration-200">
              Send Speculative Application
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">Contact Us</h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-md border-2 border-[#045842]">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-[#0b6344]">
                  Get in Touch
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-[#3A3FC1] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:hello@livebetter.directory"
                        className="text-[#3A3FC1] hover:underline"
                      >
                        hello@livebetter.directory
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-[#3A3FC1] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+441234567890"
                        className="text-[#3A3FC1] hover:underline"
                      >
                        +44 (0) 123 456 7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#3A3FC1] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-700">
                        123 Wellbeing Street
                        <br />
                        Manchester, M1 2AB
                        <br />
                        United Kingdom
                      </p>
                    </div>
                  </div>
                </div>
                <h4 className="font-medium mb-2 text-[#0b6344]">
                  For Media Enquiries
                </h4>
                <p className="text-gray-700 mb-4">
                  For press and media inquiries, please contact our
                  communications team at{" "}
                  <a
                    href="mailto:press@livebetter.directory"
                    className="text-[#3A3FC1] hover:underline"
                  >
                    press@livebetter.directory
                  </a>
                </p>
              </div>
              <div className="bg-[#F6EDE1] p-8">
                <h3 className="text-xl font-semibold mb-6 text-[#0b6344]">
                  Send Us a Message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A3FC1]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A3FC1]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A3FC1]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A3FC1]"
                      required
                    ></textarea>
                  </div>
                  <Button className="w-full bg-[#3A3FC1] hover:bg-[#2e32a6] text-white transform hover:scale-105 transition-all duration-200">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
