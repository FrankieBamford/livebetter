import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Phone,
  Clock,
  Globe,
  AlertTriangle,
  Heart,
  Users,
  MessageCircle,
} from "lucide-react";

const urgentHelplines = [
  {
    name: "Samaritans",
    number: "116 123",
    availability: "24/7, 365 days a year",
    description:
      "Free emotional support for anyone in distress, struggling to cope, or at risk of suicide.",
    website: "https://www.samaritans.org",
    textSupport: "Text SHOUT to 85258",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    name: "Crisis Text Line (SHOUT)",
    number: "Text SHOUT to 85258",
    availability: "24/7",
    description: "Free, confidential support via text for anyone in crisis.",
    website: "https://giveusashout.org",
    icon: <MessageCircle className="w-6 h-6" />,
  },
  {
    name: "NHS 111",
    number: "111",
    availability: "24/7",
    description: "For urgent medical help when it's not a 999 emergency.",
    website:
      "https://www.nhs.uk/using-the-nhs/nhs-services/urgent-and-emergency-care/nhs-111/",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    name: "Emergency Services",
    number: "999",
    availability: "24/7",
    description: "For life-threatening emergencies requiring immediate help.",
    urgent: true,
    icon: <AlertTriangle className="w-6 h-6" />,
  },
];

const specialistHelplines = [
  {
    name: "Mind Infoline",
    number: "0300 123 3393",
    availability: "Mon-Fri 9am-6pm",
    description: "Information and support for mental health problems.",
    website: "https://www.mind.org.uk",
    email: "info@mind.org.uk",
  },
  {
    name: "Rethink Mental Illness",
    number: "0300 5000 927",
    availability: "Mon-Fri 9:30am-4pm",
    description: "Support for people affected by mental illness.",
    website: "https://www.rethink.org",
  },
  {
    name: "Mental Health Foundation",
    number: "020 7803 1100",
    availability: "Mon-Fri 9am-5pm",
    description: "Information and support for mental health awareness.",
    website: "https://www.mentalhealth.org.uk",
  },
  {
    name: "CALM (Campaign Against Living Miserably)",
    number: "0800 58 58 58",
    availability: "Daily 5pm-midnight",
    description: "Support for men at risk of suicide.",
    website: "https://www.thecalmzone.net",
  },
  {
    name: "Papyrus HOPELINEUK",
    number: "0800 068 41 41",
    availability: "Mon-Fri 10am-10pm, Weekends 2pm-10pm",
    description:
      "Support for young people under 35 experiencing suicidal thoughts.",
    website: "https://www.papyrus-uk.org",
    textSupport: "Text 07860 039967",
  },
  {
    name: "Childline",
    number: "0800 1111",
    availability: "24/7",
    description: "Free, private and confidential support for anyone under 19.",
    website: "https://www.childline.org.uk",
  },
  {
    name: "The Mix",
    number: "0808 808 4994",
    availability: "Daily 3pm-midnight",
    description:
      "Support for under 25s via phone, email, peer support and counselling.",
    website: "https://www.themix.org.uk",
  },
  {
    name: "SupportLine",
    number: "01708 765200",
    availability: "Tues & Thurs 6pm-8pm",
    description: "Emotional support to children, young adults and adults.",
    website: "https://www.supportline.org.uk",
    email: "info@supportline.org.uk",
  },
];

const onlineSupport = [
  {
    name: "7 Cups",
    description: "Free emotional support through anonymous chat.",
    website: "https://www.7cups.com",
    type: "Online Chat",
  },
  {
    name: "Kooth",
    description:
      "Free online counselling and emotional well-being platform for young people.",
    website: "https://www.kooth.com",
    type: "Online Counselling",
  },
  {
    name: "Big White Wall",
    description: "Anonymous online community for mental health support.",
    website: "https://www.bigwhitewall.com",
    type: "Online Community",
  },
  {
    name: "NHS Mental Health Services",
    description: "Find local NHS mental health services near you.",
    website:
      "https://www.nhs.uk/service-search/mental-health/find-a-psychological-therapies-service",
    type: "Service Finder",
  },
];

const copingStrategies = [
  {
    title: "Breathing Exercises",
    description:
      "Try the 4-7-8 technique: breathe in for 4, hold for 7, exhale for 8.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    title: "Ground Yourself",
    description:
      "Use the 5-4-3-2-1 technique: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Reach Out",
    description:
      "Contact a trusted friend, family member, or one of the helplines above.",
    icon: <Phone className="w-5 h-5" />,
  },
  {
    title: "Safe Space",
    description: "Find a quiet, comfortable place where you feel secure.",
    icon: <Heart className="w-5 h-5" />,
  },
];

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-[#F6EDE1]">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#045741] text-white py-16">
        <div className="container mx-auto px-8">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-[#F6EDE1]" />
            <h1 className="text-5xl font-extrabold mb-4 text-[#F6EDE1] tracking-tight drop-shadow-lg">
              Help in a Crisis
            </h1>
            <p className="text-lg text-[#F6EDE1] max-w-3xl mx-auto leading-relaxed font-medium mb-8">
              If you're in immediate danger, call <strong>999</strong> now. If
              you're struggling with your mental health, you're not alone. Help
              is available 24/7.
            </p>
            <div className="bg-[#FF3939] p-6 rounded-lg max-w-2xl mx-auto border-2 border-[#F6EDE1]">
              <p className="text-lg font-semibold text-[#F6EDE1]">
                🚨 If you are in immediate danger or having thoughts of suicide,
                please call 999 or go to your nearest A&E department.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Helplines */}
      <section className="py-16 bg-[#F6EDE1]">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0b6344]">
            Immediate Crisis Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {urgentHelplines.map((helpline, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg ${
                  helpline.urgent
                    ? "bg-red-50 border-2 border-red-200"
                    : "bg-[#F6EDE1] border-2 border-[#045842]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-full ${helpline.urgent ? "bg-red-100 text-red-600" : "bg-[#045741] text-white"}`}
                  >
                    {helpline.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-[#0b6344]">
                      {helpline.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#3A3FC1]" />
                        <a
                          href={`tel:${helpline.number.replace(/\s/g, "")}`}
                          className="text-lg font-bold text-[#3A3FC1] hover:underline"
                        >
                          {helpline.number}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">
                          {helpline.availability}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                      {helpline.description}
                    </p>
                    {helpline.textSupport && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                          📱 <strong>Text Support:</strong>{" "}
                          {helpline.textSupport}
                        </p>
                      </div>
                    )}
                    {helpline.website && (
                      <div className="mt-3">
                        <a
                          href={helpline.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#3A3FC1] hover:underline"
                        >
                          <Globe className="w-4 h-4" />
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immediate Coping Strategies */}
      <section className="py-16 bg-[#045741] text-white">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F6EDE1]">
            Immediate Coping Strategies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copingStrategies.map((strategy, index) => (
              <div
                key={index}
                className="bg-[#F6EDE1]/10 p-6 rounded-lg shadow-md border-2 border-[#F6EDE1]/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#3A3FC1] text-white rounded-full">
                    {strategy.icon}
                  </div>
                  <h3 className="font-semibold text-[#F6EDE1]">
                    {strategy.title}
                  </h3>
                </div>
                <p className="text-[#F6EDE1]/90 text-sm leading-relaxed">
                  {strategy.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist Helplines */}
      <section className="py-16 bg-[#F6EDE1]">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#0b6344]">
            Specialist Mental Health Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialistHelplines.map((helpline, index) => (
              <div
                key={index}
                className="bg-[#F6EDE1] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-[#045842]"
              >
                <h3 className="text-lg font-semibold mb-3 text-[#0b6344]">
                  {helpline.name}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#3A3FC1]" />
                    <a
                      href={`tel:${helpline.number.replace(/\s/g, "")}`}
                      className="font-semibold text-[#3A3FC1] hover:underline"
                    >
                      {helpline.number}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">
                      {helpline.availability}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {helpline.description}
                </p>
                <div className="space-y-2">
                  {helpline.website && (
                    <a
                      href={helpline.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#3A3FC1] hover:underline text-sm"
                    >
                      <Globe className="w-4 h-4" />
                      Website
                    </a>
                  )}
                  {helpline.email && (
                    <div>
                      <a
                        href={`mailto:${helpline.email}`}
                        className="text-[#3A3FC1] hover:underline text-sm"
                      >
                        📧 {helpline.email}
                      </a>
                    </div>
                  )}
                  {helpline.textSupport && (
                    <div className="text-sm text-blue-800 bg-blue-50 p-2 rounded">
                      📱 Text: {helpline.textSupport}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Online Support */}
      <section className="py-16 bg-[#045741] text-white">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#F6EDE1]">
            Online Support & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {onlineSupport.map((resource, index) => (
              <div
                key={index}
                className="bg-[#F6EDE1]/10 p-6 rounded-lg border-2 border-[#F6EDE1]/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-[#F6EDE1]">
                    {resource.name}
                  </h3>
                  <span className="text-xs bg-[#FF5001] px-2 py-1 rounded text-white">
                    {resource.type}
                  </span>
                </div>
                <p className="text-[#F6EDE1]/90 mb-4 leading-relaxed">
                  {resource.description}
                </p>
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#3A3FC1] text-white px-4 py-2 rounded-md hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  Visit Resource
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-[#F6EDE1]">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#0b6344]">
              Remember: You Are Not Alone
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-[#F6EDE1] p-6 rounded-lg shadow-md border-2 border-[#045842]">
                <Heart className="w-12 h-12 text-[#FF3939] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0b6344] mb-2">
                  It's Okay to Ask for Help
                </h3>
                <p className="text-gray-700 text-sm">
                  Seeking help is a sign of strength, not weakness. Professional
                  support can make a real difference.
                </p>
              </div>
              <div className="bg-[#F6EDE1] p-6 rounded-lg shadow-md border-2 border-[#045842]">
                <Users className="w-12 h-12 text-[#3A3FC1] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0b6344] mb-2">
                  You Matter
                </h3>
                <p className="text-gray-700 text-sm">
                  Your life has value and meaning. There are people who care
                  about you and want to help.
                </p>
              </div>
              <div className="bg-[#F6EDE1] p-6 rounded-lg shadow-md border-2 border-[#045842]">
                <Clock className="w-12 h-12 text-[#045741] mx-auto mb-4" />
                <h3 className="font-semibold text-[#0b6344] mb-2">
                  This Feeling is Temporary
                </h3>
                <p className="text-gray-700 text-sm">
                  However you're feeling right now, it won't last forever. Help
                  is available and recovery is possible.
                </p>
              </div>
            </div>
            <div className="bg-[#F6EDE1] p-8 rounded-lg shadow-md border-2 border-[#045842]">
              <h3 className="text-xl font-semibold mb-4 text-[#0b6344]">
                If you're supporting someone in crisis:
              </h3>
              <ul className="text-left text-gray-700 space-y-2 max-w-2xl mx-auto">
                <li>• Listen without judgment</li>
                <li>• Take their feelings seriously</li>
                <li>• Encourage them to seek professional help</li>
                <li>• Stay with them if they're in immediate danger</li>
                <li>• Contact emergency services if necessary</li>
                <li>• Look after your own wellbeing too</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
