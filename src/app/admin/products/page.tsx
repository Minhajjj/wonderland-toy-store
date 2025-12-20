"use client";

import { useEffect, useState } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { UnifiedProduct } from "@/src/types/product";

export default function ProductsPage() {
  const [products, setProducts] = useState<UnifiedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch real data from Supabase
  useEffect(() => {
    async function loadInventory() {
      try {
        const data = await getProducts();
        setProducts(data as UnifiedProduct[]);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }
    loadInventory();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your catalog and stock levels.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 bg-white">
            <FunnelIcon className="h-5 w-5" />
          </button>
          <Link
            href="/admin/products/add"
            className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg transition-all"
          >
            <PlusIcon className="h-5 w-5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search products by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 py-2"
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-gray-500 font-medium">
            Loading your inventory...
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {/* Real Image from Supabase */}
                      <img
                        src={product.image || "/placeholder-toy.jpg"}
                        alt={product.title}
                        className="h-12 w-12 rounded-xl object-cover bg-gray-100 border border-gray-200"
                      />
                      <span className="font-bold text-gray-900 group-hover:text-[#9B59B6] transition-colors">
                        {product.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        product.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="inline-block text-gray-400 hover:text-[#4FA8D5] font-semibold text-sm transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="p-20 text-center text-gray-400">
            No products found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}
