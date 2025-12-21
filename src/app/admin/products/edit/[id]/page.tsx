"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import supabase from "../../../../../../lib/supabaseClient";
import { ArrowPathIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function loadProduct() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (data) setProduct(data);
      setLoading(false);
    }
    if (id) loadProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!product) return;
    setSaving(true);
    try {
      // Map back to snake_case for Supabase
      const { error } = await supabase
        .from("products")
        .update({
          title: product.title,
          price: product.price,
          description: product.description,
          stock: product.stock,
          available: (product.stock || 0) > 0,
          specifications: product.specifications,
        })
        .eq("id", id);

      if (error) throw error;
      router.push("/admin/products");
    } catch (err: any) {
      alert("Update failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center flex flex-col items-center gap-4">
        <ArrowPathIcon className="h-10 w-10 animate-spin text-indigo-500" />
        <p className="font-bold text-gray-500">Fetching Toy Details...</p>
      </div>
    );

  if (!product)
    return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border bg-white hover:bg-gray-50 transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-black text-gray-900">
            Edit: {product.title}
          </h1>
        </div>
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg disabled:opacity-50 flex items-center gap-2"
        >
          {saving && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-lg">General Info</h3>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">
              Stock Quantity
            </label>
            <input
              type="number"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold"
              value={product.stock ?? 0}
              onChange={(e) =>
                setProduct({ ...product, stock: parseInt(e.target.value) || 0 })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase">
              Price ($)
            </label>
            <input
              type="number"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold text-indigo-600"
              value={product.price ?? 0}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-lg">Specifications</h3>
          {product.specifications &&
            Object.keys(product.specifications).map((key) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {key}
                </label>
                <input
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 font-medium"
                  value={product.specifications[key] || ""}
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
      </div>
    </div>
  );
}
