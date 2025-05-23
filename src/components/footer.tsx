import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F7EFE2] border-t border-gray-100">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:gap-x-6 md:grid-cols-4 md:gap-8 mb-8 md:mb-12">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-xs md:text-sm"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-gray-200 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 mb-4 md:mb-0 w-full md:w-auto">
            <div className="relative w-32 md:w-40 h-10 md:h-12">
              <Image
                src="/images/logo.png"
                alt="Live Better Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-gray-600 text-xs md:text-sm text-center md:text-left">
              © {currentYear} Directory. All rights reserved.
            </span>
          </div>

          <div className="flex space-x-4 md:space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
