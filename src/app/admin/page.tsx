"use client";

import { useEffect, useState } from "react";
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  EllipsisHorizontalIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getOrders } from "@/lib/orders";
import { getCustomers } from "@/lib/customers";
import { getProducts } from "@/lib/products";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    revenue: 0,
    ordersCount: 0,
    customersCount: 0,
    topProducts: [] as any[],
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Use .catch to return an empty array if the table doesn't exist yet
        const [orders, customers, products] = await Promise.all([
          getOrders().catch(() => []),
          getCustomers().catch(() => []),
          getProducts().catch(() => []),
        ]);

        const totalRev = orders.reduce(
          (sum: number, order: any) => sum + (order.total_amount || 0),
          0
        );

        const topToys = Array.isArray(products)
          ? [...products]
              .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
              .slice(0, 4)
          : [];

        setData({
          revenue: totalRev,
          ordersCount: orders.length,
          customersCount: customers.length,
          topProducts: topToys,
        });
      } catch (err) {
        console.error("Dashboard calculation error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (loading)
    return (
      <div className="flex h-96 items-center justify-center">
        <ArrowPathIcon className="h-10 w-10 text-[#9B59B6] animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of your store's performance.
          </p>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          Last Updated:{" "}
          <span className="font-bold text-gray-800">Just now</span>
        </div>
      </div>

      {/* Stats Grid - Now using LIVE data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          name="Total Revenue"
          value={`$${data.revenue.toLocaleString()}`}
          icon={CurrencyDollarIcon}
          color="text-[#FF6B9D]"
          bg="bg-[#FF6B9D]/10"
          change="+12%" // You can calculate this by comparing to last month later
        />
        <StatCard
          name="Total Orders"
          value={data.ordersCount.toString()}
          icon={ShoppingBagIcon}
          color="text-[#9B59B6]"
          bg="bg-[#9B59B6]/10"
          change="+5%"
        />
        <StatCard
          name="Total Customers"
          value={data.customersCount.toString()}
          icon={UserGroupIcon}
          color="text-[#4FA8D5]"
          bg="bg-[#4FA8D5]/10"
          change="+2%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Graph (Can be updated later to show real daily data) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-8">
            Weekly Revenue Forecast
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { name: "Mon", revenue: data.revenue * 0.1 },
                  { name: "Tue", revenue: data.revenue * 0.15 },
                  { name: "Wed", revenue: data.revenue * 0.12 },
                  { name: "Thu", revenue: data.revenue * 0.18 },
                  { name: "Fri", revenue: data.revenue * 0.25 },
                  { name: "Sat", revenue: data.revenue * 0.3 },
                  { name: "Sun", revenue: data.revenue * 0.2 },
                ]}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9B59B6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#9B59B6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#9B59B6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products - Real Data */}
        <div className="bg-gradient-to-br from-[#FF6B9D] via-[#9B59B6] to-[#4FA8D5] p-1 rounded-3xl shadow-xl">
          <div className="bg-white h-full rounded-[20px] p-6 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Best Selling Toys
            </h3>
            <div className="space-y-6 flex-1">
              {data.topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <img
                    src={product.image || "/placeholder-toy.jpg"}
                    className="h-12 w-12 rounded-xl object-cover bg-gray-100"
                    alt={product.title}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {product.soldCount || 0} sold
                    </p>
                  </div>
                  <span className="text-sm font-bold text-[#9B59B6]">
                    ${product.price}
                  </span>
                </div>
              ))}
              {data.topProducts.length === 0 && (
                <p className="text-center text-gray-400 py-10">
                  No sales data yet.
                </p>
              )}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl bg-gray-50 text-gray-600 font-bold text-sm hover:bg-gray-100 transition">
              Manage Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Stat Component
function StatCard({ name, value, icon: Icon, color, bg, change }: any) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${bg} ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600">
          {change}
        </span>
      </div>
      <div className="mt-5">
        <h3 className="text-sm font-medium text-gray-400">{name}</h3>
        <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
