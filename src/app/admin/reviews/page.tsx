"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChatBubbleBottomCenterIcon,
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  StarIcon,
  UserCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Importing from the API we just designed
import {
  getAllReviewsAdmin,
  addReview,
  deleteReview,
} from "@/lib/reviewActions";

export default function ReviewsManager() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  // Form State
  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 5,
    image_url: "",
  });

  // Load reviews on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllReviewsAdmin();
      setReviews(data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;

    setActionLoading(true);
    try {
      await addReview(newReview);
      setNewReview({ name: "", review: "", rating: 5, image_url: "" });
      await fetchData(); // Refresh list
    } catch (err) {
      alert("Error adding review");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      alert("Error deleting review");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between py-8 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 rounded-xl border hover:bg-gray-50 transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Customer Testimonials
          </h1>
        </div>
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          {reviews.length} Total Feedback
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6 sticky top-8">
            <h2 className="font-bold text-xl flex items-center gap-2 text-gray-800">
              <PlusIcon className="h-6 w-6 text-indigo-500" /> Create Review
            </h2>

            <form onSubmit={handleAddReview} className="space-y-5">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                  Parent Name
                </label>
                <input
                  required
                  className="w-full bg-gray-50 border-none rounded-xl p-3 mt-1"
                  placeholder="e.g. Minhaj Arshad"
                  value={newReview.name}
                  onChange={(e) =>
                    setNewReview({ ...newReview, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                  Rating
                </label>
                <div className="flex gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: num })
                      }
                      className={`flex-1 p-2 rounded-lg border transition-all ${
                        newReview.rating >= num
                          ? "bg-yellow-50 border-yellow-200 text-yellow-500"
                          : "bg-gray-50 border-transparent text-gray-300"
                      }`}
                    >
                      <StarIcon
                        className={`h-5 w-5 mx-auto ${
                          newReview.rating >= num ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                  Avatar URL (Optional)
                </label>
                <input
                  className="w-full bg-gray-50 border-none rounded-xl p-3 mt-1"
                  placeholder="https://i.pravatar.cc/..."
                  value={newReview.image_url}
                  onChange={(e) =>
                    setNewReview({ ...newReview, image_url: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">
                  Review Text
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-gray-50 border-none rounded-xl p-3 mt-1"
                  placeholder="The toys are high quality and my kids love them!"
                  value={newReview.review}
                  onChange={(e) =>
                    setNewReview({ ...newReview, review: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={actionLoading}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {actionLoading ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : (
                  <PlusIcon className="h-5 w-5" />
                )}
                {actionLoading ? "Saving..." : "Save Review"}
              </button>
            </form>
          </section>
        </div>

        {/* Right Column: List */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-bold text-xl flex items-center gap-2 text-gray-800 ml-2">
            <ChatBubbleBottomCenterIcon className="h-6 w-6 text-indigo-500" />{" "}
            Published Reviews
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-200">
              <ArrowPathIcon className="h-8 w-8 text-gray-300 animate-spin" />
              <p className="text-gray-400 font-bold mt-4">Loading reviews...</p>
            </div>
          ) : (
            reviews.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm group hover:border-indigo-100 transition-all flex items-start gap-4"
              >
                <div className="flex-shrink-0">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-50"
                    />
                  ) : (
                    <UserCircleIcon className="h-14 w-14 text-gray-200" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <div className="flex text-yellow-400 mt-0.5">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-3.5 w-3.5 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed italic">
                    "{item.review}"
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase">
                      Added {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}

          {!loading && reviews.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-bold">
                No reviews found in database.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
