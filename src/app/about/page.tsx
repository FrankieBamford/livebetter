import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7EFE2] py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn more about Live Better Directory, our mission, and our team.
          </p>
        </div>

        {/* Mission Statement Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Mission</h2>
          <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Directory Mission:</h3>
            <p className="mb-4 text-gray-700">
              In a world with more options than ever, why does finding mental health support feel so
              overwhelming? That's the question that inspired Live Better Directory.
            </p>
            <p className="mb-4 text-gray-700">
              We're creating a place where finding help isn't another burden to carry. Our mission
              is simple: to connect you with trusted mental health, wellness, and recovery services across
              the UK—in a way that feels personal, straightforward, and hopeful.
            </p>
            <p className="mb-4 text-gray-700">
              Whether you're looking for a therapist nearby, a support group that understands your
              experience, or immediate crisis help, we bring together NHS, private, and charity services
              into one calm, easy-to-navigate platform. No matter where you are in your journey, you'll
              find options that fit your unique needs.
            </p>
            <h3 className="text-xl font-bold mb-4">Beyond listings, we offer:</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li className="mb-2">A moderated, anonymous forum where you can connect with others walking similar paths</li>
              <li className="mb-2">In-depth guides on mental health topics, filled with practical advice, recommended | resources, and real experiences</li>
              <li>Clear information about services—whether they're free, require referrals, or have specific accessibility features</li>
            </ul>
            <p className="mb-4 text-gray-700">
              We built Live Better Directory because we believe everyone deserves support that meets
              them where they are. The path to feeling better shouldn't be complicated. Sometimes, the
              hardest step is the first one—finding where to go. We're here to make that step easier.
            </p>
            <p className="text-gray-700">
              Your wellbeing journey matters. Let's take it together, one connection at a time.
            </p>
          </div>
        </section>

        {/* Team Bios Section - Placeholder */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Meet the Team</h2>
          <p className="text-gray-700">[Placeholder for team biographies and photos.]</p>
          {/* Add components for team members here */}
        </section>

        {/* Contact Form Section - Placeholder */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">Get in Touch</h2>
          <p className="text-gray-700">[Placeholder for a contact form.]</p>
          {/* Add a contact form component here */}
        </section>

        {/* Process Explanation Section - Placeholder */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
          <p className="text-gray-700">[Placeholder for an explanation of the process or how to use the directory.]</p>
          {/* Add content explaining the process here */}
        </section>

      </div>
    </div>
  );
} 