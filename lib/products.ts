// D:\Minhaj\toy-store\toy-store\lib\products.ts
import supabase from "@/lib/supabaseClient";
import { UnifiedProduct } from "@/src/types/product"; // The interface we made earlier

/**
 * Fetches a single product by ID (For the Edit Page)
 */
export async function getProductById(id: string | number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }
  return data;
}

/**
 * Adds a new product to the database
 */
export async function addProduct(productData: any) {
  const { data, error } = await supabase.from("products").insert([productData]); // Just insert the mapped object

  if (error) {
    console.error("DB Error Detail:", error);
    throw error;
  }
  return data;
}

export async function updateProduct(
  id: string | number,
  updates: Partial<UnifiedProduct>
) {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}
export async function getCategoryDistribution() {
  const { data, error } = await supabase.from("products").select("category");

  if (error) return [];

  // Count occurrences of each category
  const counts = data.reduce((acc: any, curr: any) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map((key) => ({
    name: key,
    value: counts[key],
  }));
}
