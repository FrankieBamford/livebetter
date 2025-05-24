"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { UserCircle, Menu, X } from "lucide-react";
import UserProfile from "./user-profile";
import type { User } from "@supabase/auth-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#F7EFE2] py-4 relative z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="relative h-10 w-40">
          <Image
            src="/images/logo.png"
            alt="Live Better Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex gap-4 lg:gap-6 items-center">
          <Link
            href="/guides"
            className="px-2 lg:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Guides
          </Link>
          <Link
            href="/community"
            className="px-2 lg:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Community
          </Link>
          <Link
            href="/about"
            className="px-2 lg:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/crisis"
            className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium bg-[#FF3939] text-white hover:bg-[#cc2e2e] hover:text-white transform hover:scale-105 transition-all duration-200 rounded-md"
          >
            Help in a Crisis
          </Link>
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-white hover:text-white"
            >
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium text-white bg-[#3A3FC1] rounded-md hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#F7EFE2] shadow-lg z-50 border-t border-gray-200">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              href="/guides"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Guides
            </Link>
            <Link
              href="/community"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              Community
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/crisis"
              className="px-4 py-2 text-sm font-medium bg-[#FF3939] text-white hover:bg-[#cc2e2e] hover:text-white w-full text-center rounded-md"
              onClick={toggleMenu}
            >
              Help in a Crisis
            </Link>
            {user ? (
              <Link href="/dashboard" className="w-full" onClick={toggleMenu}>
                <Button className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-white bg-[#3A3FC1] rounded-md hover:bg-[#2e32a6] block text-center"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
