import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { TikTok } from "./ui/tiktok-icon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F6EDE1] border-t border-[#F6EDE1]">
      <div className="container mx-auto px-8 py-8 md:py-16 border-[#F6EDE1]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-16 md:place-items-center">
          {/* Main Site Menu Column */}
          <div>
            <h3 className="font-semibold text-[#0b6344] mb-3 md:mb-4 text-sm md:text-base">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/guides"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/crisis"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Help in a Crisis
                </Link>
              </li>
              <li>
                <Link
                  href="/directory"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-[#0b6344] mb-3 md:mb-4 text-sm md:text-base">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/company"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/company#team"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/company#careers"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/company#contact"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-[#0b6344] mb-3 md:mb-4 text-sm md:text-base">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal#privacy"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal#terms"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal#cookies"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal#accessibility"
                  className="text-gray-600 hover:text-[#3A3FC1] text-xs md:text-sm"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 md:pt-8 border-t gap-8 border-[#F6EDE1]">
          <div className="flex flex-col md:flex-row items-center gap-2 mb-4 md:mb-0 w-full md:w-auto">
            <div className="relative w-32 md:w-40 h-10 md:h-12">
              <Image
                src="/images/logo.png"
                alt="Live Better Logo"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span className="text-gray-600 text-xs md:text-sm text-center flex justify-center items-center flex-col-reverse">
              © {currentYear} Live Better Directory. All rights reserved.
            </span>
          </div>

          <div className="flex space-x-8 md:space-x-8 text-[#000000]">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">TikTok</span>
              <TikTok className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
