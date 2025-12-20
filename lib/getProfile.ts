// D:\Minhaj\toy-store\toy-store\lib\getProfile.ts

import supabase from "@/lib/supabaseClient";

/**
 * Fetches the user's profile data from the public.profiles table.
 * Requires RLS: 'authenticated' with using expression 'auth.uid() = id'.
 * @param uid The unique user ID from Supabase Auth (auth.uid()).
 * @returns The profile data or null on error.
 */
export async function getProfile(uid: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", uid)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return data;
}
