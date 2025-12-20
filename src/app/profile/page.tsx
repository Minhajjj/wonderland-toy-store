// D:\Minhaj\toy-store\toy-store\app\profile\page.tsx (or wherever your profile page is located)

"use client";

import { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// You may need to install Heroicons if you don't have them:
// npm install @heroicons/react
import {
  UserCircleIcon,
  EnvelopeIcon,
  IdentificationIcon,
  ClockIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    // Only redirect if user is explicitly null (not just undefined/loading)
    if (user === null) {
      router.push("/");
    }
  }, [user, router]);

  // Handle Loading State (Optional, but good practice)
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen pt-20">
        <p className="text-xl text-gray-500">Loading profile data...</p>
      </div>
    );
  }

  // Handle Not Logged In State
  if (user === null)
    return (
      <div className="flex flex-col items-center justify-center py-24 pt-20">
        <h1 className="text-3xl font-semibold">Not Logged In</h1>
        <p className="text-gray-600 mt-2">
          Please log in to view your profile.
        </p>
      </div>
    );

  // --- Main Profile UI ---

  // Robust date formatting
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString()
    : "N/A";

  // Fallback for full_name if it was still 'New User' or null
  const fullName = profile?.full_name || user?.email || "User Profile";

  return (
    <div className="min-h-screen pt-35">
      {" "}
      {/* 🟢 FIX: Added pt-20 for top padding */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-8">
          <UserCircleIcon className="h-12 w-12 text-purple-600" />
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome, {fullName.split(" ")[0]}!
          </h1>
        </div>

        {/* Profile Details Card */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
              Account Details
            </h2>

            <dl className="divide-y divide-gray-100">
              {/* Full Name Row */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <IdentificationIcon className="h-5 w-5 mr-2 text-purple-500" />
                  Full Name
                </dt>
                <dd className="mt-1 text-base text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile?.full_name || "Not provided"}
                </dd>
              </div>

              {/* Email Row */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2 text-purple-500" />
                  Email Address
                </dt>
                <dd className="mt-1 text-base text-gray-900 sm:col-span-2 sm:mt-0">
                  {profile?.email}
                </dd>
              </div>

              {/* Role Row */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-2 text-purple-500" />
                  User Role
                </dt>
                <dd className="mt-1 text-base text-gray-900 sm:col-span-2 sm:mt-0">
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-sm font-medium text-purple-700 ring-1 ring-inset ring-purple-600/20">
                    {profile?.role}
                  </span>
                </dd>
              </div>

              {/* Member Since Row */}
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <ClockIcon className="h-5 w-5 mr-2 text-purple-500" />
                  Member Since
                </dt>
                <dd className="mt-1 text-base text-gray-900 sm:col-span-2 sm:mt-0">
                  {memberSince}
                </dd>
              </div>
            </dl>
          </div>

          {/* Action Button */}
          <div className="px-6 py-4 bg-gray-50 sm:px-8 border-t">
            <button
              onClick={signOut}
              className="w-full inline-flex justify-center items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition duration-150"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
