"use client";

import { signInAction } from "@/app/actions";
import Navbar from "@/components/navbar";
import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [tab, setTab] = useState<'user' | 'provider'>('user');
  const [showRegisterOptions, setShowRegisterOptions] = useState(false);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7EFE2] px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-white p-6 shadow-sm">
          {/* Tabs */}
          <div className="flex mb-8">
            <button
              className={`flex-1 py-2 text-lg font-semibold rounded-t-md transition-colors duration-200 ${tab === 'user' ? 'bg-[#3A3FC1] text-white' : 'bg-[#EAAEEC] text-[#3A3FC1]'}`}
              onClick={() => setTab('user')}
              aria-selected={tab === 'user'}
              aria-controls="user-tab"
              role="tab"
            >
              Users
            </button>
            <button
              className={`flex-1 py-2 text-lg font-semibold rounded-t-md transition-colors duration-200 ${tab === 'provider' ? 'bg-[#3A3FC1] text-white' : 'bg-[#EAAEEC] text-[#3A3FC1]'}`}
              onClick={() => setTab('provider')}
              aria-selected={tab === 'provider'}
              aria-controls="provider-tab"
              role="tab"
            >
              Providers
            </button>
          </div>

          {/* Tab Panels */}
          <form className="flex flex-col space-y-6" action={signInAction}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#3A3FC1]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A3FC1]"
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#3A3FC1]">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3A3FC1]"
                  autoComplete="current-password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" name="remember" className="mr-2" />
                Remember me
              </label>
              <Link href="/forgot-password" className="text-[#3A3FC1] text-sm font-medium hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#3A3FC1] text-white font-medium rounded-md hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          {/* New to Live Better? Section */}
          <div className="mt-10 text-center">
            <div className="mb-4 text-gray-700 font-semibold">New to Live Better?</div>
            <button
              className="w-full px-4 py-2 bg-[#FF5000] text-white font-medium rounded-md hover:bg-[#cc4001] transform hover:scale-105 transition-all duration-200 mb-2"
              onClick={() => setShowRegisterOptions((v) => !v)}
              type="button"
            >
              Create Account
            </button>
            {showRegisterOptions && (
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/sign-up?type=customer" className="w-full block px-4 py-2 bg-[#3A3FC1] text-white font-medium rounded-md hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200">
                  Register as Customer
                </Link>
                <Link href="/sign-up?type=provider" className="w-full block px-4 py-2 bg-[#3A3FC1] text-white font-medium rounded-md hover:bg-[#2e32a6] transform hover:scale-105 transition-all duration-200">
                  Register as Provider
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
