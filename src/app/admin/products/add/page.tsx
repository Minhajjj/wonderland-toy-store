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

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

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
    try {
      const uploadPromises = imageFiles.map((file) => uploadProductImage(file));
      const uploadedUrls = await Promise.all(uploadPromises);

      // Mapping Frontend keys to your SQL Snake_Case columns
      const dbPayload = {
        title: product.title,
        description: product.description,
        category: product.category,
        tag: product.tag,
        price: product.price,
        original_price: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        sold_count: product.soldCount,
        ages: product.ages,
        pieces: product.pieces,
        available: product.stock > 0,
        main_image: uploadedUrls[0],
        all_images: uploadedUrls,
        features: product.features,
        specifications: product.specifications,
      };

      await addProduct(dbPayload);
      router.push("/admin/products");
    } catch (err: any) {
      console.error("Publish Error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-20 px-4 space-y-8 animate-in fade-in duration-500">
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
          className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-3"
        >
          {loading && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
          {loading ? "Publishing..." : "Publish Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Media */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-xl flex items-center gap-2 text-gray-800">
              <PhotoIcon className="h-6 w-6 text-indigo-500" /> Media Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {previews.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-3xl overflow-hidden border"
                >
                  <img src={url} className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition-all">
                <PlusIcon className="h-10 text-gray-300" />
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

          {/* 2. Technical Specs (MISSING FIELD ADDED) */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h2 className="font-bold text-xl flex items-center gap-2 text-gray-800">
              <BeakerIcon className="h-6 w-6 text-indigo-500" /> Technical
              Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.keys(product.specifications).map((key) => (
                <div key={key}>
                  <label className="text-[10px] font-black text-gray-400 uppercase">
                    {key}
                  </label>
                  <input
                    className="w-full bg-gray-50 border-none rounded-xl p-3 mt-1"
                    placeholder={`Enter ${key}...`}
                    value={(product.specifications as any)[key]}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        specifications: {
                          ...product.specifications,
                          [key]: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 3. Description Content */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <input
              placeholder="Toy Title"
              className="w-full text-3xl font-black border-none focus:ring-0 p-0"
              value={product.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
            <textarea
              placeholder="Detailed description..."
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
          {/* 4. Pricing & Stock */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <ArchiveBoxIcon className="h-5 w-5 text-indigo-500" /> Logistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase">
                  Stock
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-none rounded-xl p-3"
                  value={product.stock || ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      stock: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-50 border-none rounded-xl p-3"
                  value={product.price || ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      price: parseFloat(e.target.value) || 0,
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
                  className="w-full bg-gray-50 border-none rounded-xl p-3"
                  value={product.originalPrice || ""}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      originalPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </div>
          </section>

          {/* 5. Features (MISSING FIELD ADDED) */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <ClipboardDocumentListIcon className="h-5 w-5 text-indigo-500" />{" "}
              Features
            </h2>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-50 border-none rounded-xl p-2 text-sm"
                placeholder="Add feature..."
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
              />
              <button
                onClick={addFeature}
                className="bg-indigo-100 text-indigo-600 p-2 rounded-xl"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.features.map((f, i) => (
                <span
                  key={i}
                  className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  {f}{" "}
                  <XMarkIcon
                    className="h-3 w-3 cursor-pointer"
                    onClick={() =>
                      setProduct({
                        ...product,
                        features: product.features.filter(
                          (_, idx) => idx !== i
                        ),
                      })
                    }
                  />
                </span>
              ))}
            </div>
          </section>

          {/* 6. Taxonomy & Ages */}
          <section className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <TagIcon className="h-5 w-5 text-indigo-500" /> Categorization
            </h2>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase">
                Ages
              </label>
              <input
                className="w-full bg-gray-50 border-none rounded-xl p-3"
                placeholder="3+"
                value={product.ages}
                onChange={(e) =>
                  setProduct({ ...product, ages: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase">
                Lego Pieces
              </label>
              <input
                type="number"
                className="w-full bg-gray-50 border-none rounded-xl p-3"
                value={product.pieces || ""}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    pieces: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
