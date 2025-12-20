// Add to your lib folder
import supabase from "@/lib/supabaseClient";

export async function getCustomers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching customers:", error);
    return [];
  }
  return data;
}
