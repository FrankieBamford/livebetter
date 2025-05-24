import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-[#F6EDE1]">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#045741] py-16 text-center">
        <h1 className="text-5xl font-extrabold mb-4 text-[#F6EDE1] tracking-tight drop-shadow-lg">
          Legal Information
        </h1>
        <p className="text-lg text-[#F6EDE1] max-w-2xl mx-auto font-medium">
          Important information about our terms, privacy, and policies
        </p>
      </div>

      <div className="container mx-auto px-8 py-16">
        {/* Privacy Policy Section */}
        <section id="privacy" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">
            Privacy Policy
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border-2 border-[#045842]">
            <h3 className="text-xl font-semibold mb-4 text-[#0b6344]">
              Your Privacy Matters
            </h3>
            <p className="mb-4 text-gray-700">
              At Live Better Directory, we take your privacy seriously. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our
              services.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Information We Collect
            </h4>
            <p className="mb-4 text-gray-700">
              We collect information that you provide directly to us when you
              register for an account, create or modify your profile, set
              preferences, or make requests through our services. This
              information may include your name, email address, phone number,
              and location.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              How We Use Your Information
            </h4>
            <p className="mb-4 text-gray-700">
              We use the information we collect to provide, maintain, and
              improve our services, to process and complete transactions, and to
              respond to your inquiries and requests.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Information Sharing and Disclosure
            </h4>
            <p className="text-gray-700">
              We do not share, sell, or rent your personal information to third
              parties for their marketing purposes without your explicit
              consent.
            </p>
          </div>
        </section>

        {/* Terms of Service Section */}
        <section id="terms" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">
            Terms of Service
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border-2 border-[#045842]">
            <h3 className="text-xl font-semibold mb-4 text-[#0b6344]">
              Agreement to Terms
            </h3>
            <p className="mb-4 text-gray-700">
              By accessing or using our services, you agree to be bound by these
              Terms of Service and all applicable laws and regulations. If you
              do not agree with any of these terms, you are prohibited from
              using or accessing our services.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Use License
            </h4>
            <p className="mb-4 text-gray-700">
              Permission is granted to temporarily access the materials on Live
              Better Directory's website for personal, non-commercial use only.
              This is the grant of a license, not a transfer of title.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Disclaimer
            </h4>
            <p className="mb-4 text-gray-700">
              The materials on Live Better Directory's website are provided on
              an 'as is' basis. Live Better Directory makes no warranties,
              expressed or implied, and hereby disclaims and negates all other
              warranties.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Limitations
            </h4>
            <p className="text-gray-700">
              In no event shall Live Better Directory or its suppliers be liable
              for any damages arising out of the use or inability to use the
              materials on Live Better Directory's website.
            </p>
          </div>
        </section>

        {/* Cookie Policy Section */}
        <section id="cookies" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">
            Cookie Policy
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border-2 border-[#045842]">
            <h3 className="text-xl font-semibold mb-4 text-[#0b6344]">
              What Are Cookies
            </h3>
            <p className="mb-4 text-gray-700">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to
              make websites work more efficiently and provide information to the
              owners of the site.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              How We Use Cookies
            </h4>
            <p className="mb-4 text-gray-700">
              We use cookies to understand how you use our website and to
              improve your experience. This includes personalizing content,
              providing social media features, and analyzing our traffic.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Types of Cookies We Use
            </h4>
            <p className="text-gray-700">
              We use both session cookies, which expire when you close your
              browser, and persistent cookies, which stay on your device until
              you delete them or they expire.
            </p>
          </div>
        </section>

        {/* Accessibility Section */}
        <section id="accessibility" className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#0b6344]">
            Accessibility Statement
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-md border-2 border-[#045842]">
            <h3 className="text-xl font-semibold mb-4 text-[#0b6344]">
              Our Commitment
            </h3>
            <p className="mb-4 text-gray-700">
              Live Better Directory is committed to ensuring digital
              accessibility for people with disabilities. We are continually
              improving the user experience for everyone and applying the
              relevant accessibility standards.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Conformance Status
            </h4>
            <p className="mb-4 text-gray-700">
              The Web Content Accessibility Guidelines (WCAG) defines
              requirements for designers and developers to improve accessibility
              for people with disabilities. We aim to conform to WCAG 2.1 Level
              AA.
            </p>
            <h4 className="text-lg font-medium mb-2 text-[#0b6344]">
              Feedback
            </h4>
            <p className="text-gray-700">
              We welcome your feedback on the accessibility of Live Better
              Directory. Please let us know if you encounter accessibility
              barriers on our website.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
