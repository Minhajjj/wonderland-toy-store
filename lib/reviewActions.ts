import supabase from "@/lib/supabaseClient";

/**
 * Fetches all published reviews ordered by most recent
 */
export async function getReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_published", true) // Only show approved reviews on UI
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
  return data || [];
}

/**
 * Fetches all reviews (for Admin table, including unpublished)
 */
export async function getAllReviewsAdmin() {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin reviews:", error);
    throw error;
  }
  return data || [];
}

/**
 * Adds a new review (mapped from your UI form)
 */
export async function addReview(reviewData: {
  name: string;
  review: string;
  rating: number;
  image_url?: string;
}) {
  const { data, error } = await supabase
    .from("reviews")
    .insert([reviewData])
    .select();

  if (error) {
    console.error("DB Error adding review:", error);
    throw error;
  }
  return data;
}

/**
 * Updates a review (e.g., to approve/publish or edit content)
 */
export async function updateReview(
  id: string | number,
  updates: Partial<{
    name: string;
    review: string;
    rating: number;
    is_published: boolean;
  }>
) {
  const { data, error } = await supabase
    .from("reviews")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating review:", error);
    throw error;
  }
  return data;
}

/**
 * Deletes a review by ID
 */
export async function deleteReview(id: string | number) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
  return true;
}
