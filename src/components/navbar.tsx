import Link from "next/link";
import Image from "next/image";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { User, UserCircle } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

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
          <Link href="/guides" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Guides
          </Link>
          <Link href="/resources" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Resources
          </Link>
          <Link href="/community" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            Community
          </Link>
          <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
            About
          </Link>
          <Button variant="outline" className="px-4 py-2 text-sm font-medium bg-orange-500 text-white hover:bg-orange-600">
            Help in a Crisis
          </Button>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button>Dashboard</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
