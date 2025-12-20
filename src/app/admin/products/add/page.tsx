"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PhotoIcon,
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon,
  ArrowPathIcon,
  StarIcon,
  ShoppingBagIcon,
  ChatBubbleLeftIcon,
  ArchiveBoxIcon,
  TagIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";
import { uploadProductImage } from "@/lib/storage";
import { addProduct } from "@/lib/products";
import { UnifiedProduct } from "@/src/types/product";

export default function AddProductFullPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Image State
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Local State for Features
  const [newFeature, setNewFeature] = useState("");

  // Frontend State (CamelCase)
  const [product, setProduct] = useState<
    Omit<UnifiedProduct, "id" | "image" | "images" | "available">
  >({
    title: "",
    description: "",
    category: "Action Figures",
    tag: "featured",
    price: 0,
    originalPrice: 0,
    rating: 5.0,
    reviews: 0,
    soldCount: 0,
    ages: "3+",
    pieces: 0,
    stock: 0,
    features: [],
    specifications: {
      Dimensions: "",
      Weight: "",
      Material: "",
      Care: "",
      Safety: "",
      Origin: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setProduct({
        ...product,
        features: [...product.features, newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handlePublish = async () => {
    if (!product.title || imageFiles.length === 0) {
      alert("Please provide a title and at least one image.");
      return;
    }

    setLoading(true);
    console.log("🚀 Starting Publish Process...");

    try {
      // 1. Upload Images to 'product-images' bucket
      console.log("📸 Step 1: Uploading images...");
      const uploadPromises = imageFiles.map((file) => uploadProductImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);
      console.log("✅ Step 1 Success. URLs:", uploadedUrls);

      // 2. Map Frontend state to Database Columns (Snake Case)
      // This solves your 'image' column not found error
      const dbPayload = {
        title: product.title,
        description: product.description,
        category: product.category,
        tag: product.tag,
        price: product.price,
        original_price: product.originalPrice, // Mapped
        rating: product.rating,
        reviews: product.reviews,
        sold_count: product.soldCount, // Mapped
        ages: product.ages,
        pieces: product.pieces,
        available: product.stock > 0,
        main_image: uploadedUrls[0], // Mapped to SQL column
        all_images: uploadedUrls, // Mapped to SQL column
        features: product.features,
        specifications: product.specifications,
      };

      console.log("📦 Step 2: Payload prepared for Supabase:", dbPayload);

      // 3. Save to Database
      console.log("💾 Step 3: Sending to products table...");
      await addProduct(dbPayload);
      console.log("🎉 Step 3 Success: Product added to DB!");

      router.push("/admin/products");
    } catch (err: any) {
      console.error("❌ PUBLISH FAILED:", err);
      // Detailed error log to identify specific column issues
      if (err.hint) console.error("💡 Supabase Hint:", err.hint);
      if (err.details) console.error("📝 Error Details:", err.details);

      alert(`Publish Error: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
      console.log("🏁 Loading state cleared.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between py-8 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border hover:bg-gray-50 transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Add New Toy
          </h1>
        </div>
        <button
          onClick={handlePublish}
          disabled={loading}
          className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-3"
        >
          {loading && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
          {loading ? "Publishing..." : "Publish Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Media Section */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-xl flex items-center gap-2 text-gray-800">
              <PhotoIcon className="h-6 w-6 text-indigo-500" /> Media Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-3xl overflow-hidden border-2 border-gray-50"
                >
                  <img
                    src={url}
                    className="w-full h-full object-cover"
                    alt="Preview"
                  />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-xl"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition-all">
                <PlusIcon className="h-10 w-10 text-gray-300" />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="bg-indigo-600 p-8 rounded-[2rem] grid grid-cols-1 sm:grid-cols-3 gap-8 text-white">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-80">
                Base Rating
              </label>
              <input
                type="number"
                step="0.1"
                className="w-full bg-indigo-500/50 border-none rounded-2xl p-3 font-bold"
                value={product.rating || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    rating:
                      e.target.value === "" ? 0 : parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-80">
                Review Count
              </label>
              <input
                type="number"
                className="w-full bg-indigo-500/50 border-none rounded-2xl p-3 font-bold"
                value={product.reviews || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    reviews:
                      e.target.value === "" ? 0 : parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase opacity-80">
                Units Sold
              </label>
              <input
                type="number"
                className="w-full bg-indigo-500/50 border-none rounded-2xl p-3 font-bold"
                value={product.soldCount || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    soldCount:
                      e.target.value === "" ? 0 : parseInt(e.target.value),
                  })
                }
              />
            </div>
          </section>

          {/* Details Section */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <input
              placeholder="Product Title"
              className="w-full text-3xl font-black border-none focus:ring-0 p-0"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
            <textarea
              placeholder="Product Description"
              rows={6}
              className="w-full border-none focus:ring-0 p-0 text-gray-600 text-lg"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <ArchiveBoxIcon className="h-5 w-5 text-indigo-500" /> Inventory
            </h2>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase">
                Current Stock
              </label>
              <input
                type="number"
                className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold"
                value={product.stock || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: e.target.value === "" ? 0 : parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold text-indigo-600"
                  value={product.price || ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price:
                        e.target.value === "" ? 0 : parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase">
                  Original
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-none rounded-xl p-4 font-bold"
                  value={product.originalPrice || ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      originalPrice:
                        e.target.value === "" ? 0 : parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
