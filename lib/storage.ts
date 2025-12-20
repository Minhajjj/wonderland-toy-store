// D:\Minhaj\toy-store\toy-store\lib\storage.ts
import supabase from "@/lib/supabaseClient";

export async function uploadProductImage(file: File) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()
    .toString(36)
    .substring(2)}-${Date.now()}.${fileExt}`;

  // Note: We are uploading directly to the bucket root to avoid folder errors
  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(fileName, file);

  if (error) {
    console.error("Supabase Storage Error:", error);
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("product-images").getPublicUrl(fileName);

  return publicUrl;
}
