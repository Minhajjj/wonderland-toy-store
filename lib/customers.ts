// lib/customers.ts
import supabase from "./supabaseClient";

export async function getCustomers() {
  const { data, error } = await supabase
    .from("profiles") // Changed from 'customers' to 'profiles'
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching customers:", error.message);
    return [];
  }
  return data;
}
