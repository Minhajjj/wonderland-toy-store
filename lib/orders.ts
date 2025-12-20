import supabase from "@/lib/supabaseClient";

export async function getOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      profiles (full_name, email)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
