"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Added for button functionality
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ArrowPathIcon,
  ArrowUpIcon,
  ChartBarIcon,
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
        const [orders, customers, products] = await Promise.all([
          getOrders().catch(() => []),
          getCustomers().catch(() => []),
          getProducts().catch(() => []),
        ]);

        const totalRev = orders.reduce(
          (sum: number, order: any) => sum + (Number(order.total_amount) || 0),
          0
        );

        const topToys = Array.isArray(products)
          ? [...products]
              .sort(
                (a, b) =>
                  (Number(b.sold_count) || 0) - (Number(a.sold_count) || 0)
              )
              .slice(0, 5)
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
      <div className="flex h-[60vh] items-center justify-center">
        <ArrowPathIcon className="h-10 w-10 text-indigo-500 animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">
            Store Overview
          </h1>
          <p className="text-gray-500 font-medium tracking-tight">
            Real-time performance metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 bg-white border border-gray-100 px-4 py-2 rounded-2xl shadow-sm self-start uppercase tracking-widest">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          Status: Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          name="Total Revenue"
          value={`$${data.revenue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}`}
          icon={CurrencyDollarIcon}
          color="text-emerald-600"
          bg="bg-emerald-50"
          trend="+12%"
        />
        <StatCard
          name="Total Orders"
          value={data.ordersCount.toLocaleString()}
          icon={ShoppingBagIcon}
          color="text-indigo-600"
          bg="bg-indigo-50"
          trend="+5%"
        />
        <StatCard
          name="Total Customers"
          value={data.customersCount.toLocaleString()}
          icon={UserGroupIcon}
          color="text-blue-600"
          bg="bg-blue-50"
          trend="+3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-8">
            Revenue Forecast
          </h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { name: "Mon", rev: data.revenue * 0.1 },
                  { name: "Tue", rev: data.revenue * 0.15 },
                  { name: "Wed", rev: data.revenue * 0.12 },
                  { name: "Thu", rev: data.revenue * 0.18 },
                  { name: "Fri", rev: data.revenue * 0.25 },
                  { name: "Sat", rev: data.revenue * 0.3 },
                  { name: "Sun", rev: data.revenue * 0.2 },
                ]}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3F4F6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 11, fontWeight: 700 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rev"
                  stroke="#6366F1"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRev)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Sellers - Black BG Removed */}
        <div className="bg-white p-6 rounded-4x1 border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">
            Best Sellers
          </h3>
          <div className="space-y-5 flex-1">
            {data.topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 group">
                <img
                  src={product.main_image || "/placeholder.jpg"}
                  className="h-12 w-12 rounded-2xl object-cover bg-gray-50 border border-gray-100 shadow-sm"
                  alt={product.title}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                    {product.title}
                  </p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {product.sold_count || 0} units sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
            {data.topProducts.length === 0 && (
              <p className="text-center text-gray-400 py-10 italic text-sm">
                No sales data found.
              </p>
            )}
          </div>

          {/* Working Analytics Link */}
          <Link
            href="/admin/analytics"
            className="w-full mt-6 py-4 rounded-2xl bg-indigo-600 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all text-center shadow-lg shadow-indigo-100 active:scale-95"
          >
            View Full Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ name, value, icon: Icon, color, bg, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-4x1 border border-gray-100 shadow-sm group hover:border-indigo-200 transition-all">
      <div className="flex justify-between items-start">
        <div className={`p-4 rounded-[20px] ${bg} ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-black">
          <ArrowUpIcon className="h-3 w-3" />
          {trend}
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          {name}
        </h3>
        <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
}
