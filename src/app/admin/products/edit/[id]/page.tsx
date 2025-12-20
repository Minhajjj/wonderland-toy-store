"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProducts, updateProduct } from "@/lib/products";
import { UnifiedProduct } from "@/src/types/product";
import { ArrowPathIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<UnifiedProduct | null>(null);

  useEffect(() => {
    async function loadProduct() {
      const allProducts = await getProducts();
      const found = allProducts.find((p) => String(p.id) === String(id));
      if (found) setProduct(found as UnifiedProduct);
      setLoading(false);
    }
    loadProduct();
  }, [id]);

  const handleUpdate = async () => {
    if (!product) return;
    setSaving(true);
    try {
      await updateProduct(String(id), {
        ...product,
        available: product.stock > 0,
      });
      router.push("/admin/products");
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-20 text-center">
        <ArrowPathIcon className="h-10 w-10 animate-spin mx-auto text-purple-500" />
      </div>
    );
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl border bg-white"
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
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {saving ? "Saving Changes..." : "Update Product"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <label className="block text-sm font-bold text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: parseInt(e.target.value) })
            }
          />

          <label className="block text-sm font-bold text-gray-700">
            Price ($)
          </label>
          <input
            type="number"
            className="w-full bg-gray-50 border-none rounded-xl px-4 py-3"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
          />
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold">Quick Specifications</h3>
          {Object.keys(product.specifications).map((key) => (
            <div key={key}>
              <label className="text-xs font-bold text-gray-400 uppercase">
                {key}
              </label>
              <input
                className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 mt-1"
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
      </div>
    </div>
  );
}
