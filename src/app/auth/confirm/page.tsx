"use client";

import { useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Loader from "../../../components/shared/Loader";

export default function AuthConfirmPage() {
  const router = useRouter();

  useEffect(() => {
    // This listener handles the session information passed in the URL fragment (#...)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        console.log("Email confirmed and user signed in!", session.user);

        // Redirect the user to their profile page after successful confirmation and login
        router.push("/profile");
      } else if (event === "SIGNED_OUT") {
        // If they land here but are somehow signed out, send them to login
        router.push("/login");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Display the new Loader while Supabase processes the confirmation link
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex flex-col items-center">
        <Loader />
        <p className="text-gray-600 mt-4">
          Confirming your email and logging you in...
        </p>
      </div>
    </div>
  );
}
