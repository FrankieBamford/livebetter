"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import UserProfile from "./user-profile";
import type { User } from "@supabase/auth-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="bg-[#F7EFE2] py-4">
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
        <div className="flex gap-6 items-center">
          <Link
            href="/guides"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Guides
          </Link>
          <Link
            href="/resources"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Resources
          </Link>
          <Link
            href="/community"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Community
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            About
          </Link>
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font-medium bg-[#FF3939] text-white hover:bg-[#cc2e2e] hover:text-white transform hover:scale-105 transition-all duration-200"
          >
            Help in a Crisis
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white hover:text-white"
              >
                <Button>Dashboard</Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-white bg-[#3A3FC1] rounded-md hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
