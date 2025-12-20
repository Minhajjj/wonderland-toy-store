"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisHorizontalIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { getOrders } from "@/lib/orders";

const statusStyles = {
  Processing: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Returns: "bg-orange-100 text-orange-700",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  // Filter Logic
  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "All Orders" || order.status === activeTab;
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.profiles?.full_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage customer orders.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm">
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto gap-6 border-b border-gray-100 pb-1">
        {["All Orders", "Processing", "Completed", "Cancelled", "Returns"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold whitespace-nowrap transition-all relative ${
                activeTab === tab
                  ? "text-[#9B59B6]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#9B59B6] rounded-t-full"></span>
              )}
            </button>
          )
        )}
      </div>

      {/* Toolbar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-2">
        <div className="flex-1 flex items-center px-2 bg-transparent">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-sm text-gray-700 py-2"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4">
            <ArrowPathIcon className="h-8 w-8 text-purple-500 animate-spin" />
            <p className="text-sm text-gray-400 font-medium">
              Fetching orders...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold text-[#9B59B6]">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {order.profiles?.full_name || "Guest Customer"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {order.profiles?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-gray-900">
                      ${order.total_amount?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          statusStyles[
                            order.status as keyof typeof statusStyles
                          ] || "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="p-20 text-center">
                <p className="text-gray-400 font-medium">
                  No orders found matching your criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
