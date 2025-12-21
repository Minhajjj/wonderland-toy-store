"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { getProducts } from "@/lib/products";
import {
  ArrowPathIcon,
  CurrencyDollarIcon,
  CubeIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const COLORS = ["#6366F1", "#EC4899", "#8B5CF6", "#F59E0B", "#10B981"];

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInventoryValue: 0,
    avgPrice: 0,
    totalItems: 0,
    lowStockCount: 0,
  });

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const allProducts = await getProducts();

        if (!allProducts || allProducts.length === 0) {
          setLoading(false);
          return;
        }

        // 1. Calculations based on your specific columns: 'price' and 'stock'
        let totalValue = 0;
        let lowStock = 0;

        allProducts.forEach((p) => {
          // Using Number() to handle Numeric and Int4 types from your screenshot
          const price = Number(p.price) || 0;
          const stock = Number(p.stock) || 0;

          totalValue += price * stock;
          if (stock < 5) lowStock++;
        });

        const totalItems = allProducts.length;

        setStats({
          totalInventoryValue: totalValue,
          avgPrice: totalItems > 0 ? totalValue / totalItems : 0,
          totalItems: totalItems,
          lowStockCount: lowStock,
        });

        // 2. Bar Chart Logic: Using 'title' instead of 'name'
        const sortedForStock = [...allProducts]
          .sort((a, b) => (Number(b.stock) || 0) - (Number(a.stock) || 0))
          .slice(0, 5)
          .map((p) => ({
            // Your table uses 'title' for the product name
            name: p.title?.substring(0, 12) || "Unknown",
            stock: Number(p.stock) || 0,
          }));
        setTopProducts(sortedForStock);

        // 3. Category Distribution
        const categories: Record<string, number> = {};
        allProducts.forEach((p) => {
          const cat = p.category || "Uncategorized";
          categories[cat] = (categories[cat] || 0) + 1;
        });

        const distData = Object.keys(categories).map((key) => ({
          name: key,
          value: categories[key],
        }));
        setChartData(distData);
      } catch (err) {
        console.error("Analytics error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <ArrowPathIcon className="h-10 w-10 text-indigo-500 animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8 pb-10 px-4">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Inventory Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Live data from your products table.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Inventory Value"
          value={`$${stats.totalInventoryValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          icon={<CurrencyDollarIcon className="h-6 w-6 text-emerald-600" />}
          color="bg-emerald-50"
        />
        <StatCard
          title="Avg. Product Price"
          value={`$${stats.avgPrice.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}`}
          icon={<ChartBarIcon className="h-6 w-6 text-purple-600" />}
          color="bg-purple-50"
        />
        <StatCard
          title="Total Products"
          value={stats.totalItems}
          icon={<CubeIcon className="h-6 w-6 text-blue-600" />}
          color="bg-blue-50"
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats.lowStockCount}
          icon={<ExclamationTriangleIcon className="h-6 w-6 text-amber-600" />}
          color="bg-amber-50"
          isWarning={stats.lowStockCount > 0}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">Stock by Category</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  cornerRadius={4}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ReTooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highest Stock Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">Top 5 Items by Stock</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <ReTooltip
                  cursor={{ fill: "#f9fafb" }}
                  contentStyle={{ borderRadius: "12px", border: "none" }}
                />
                <Bar
                  dataKey="stock"
                  fill="#6366F1"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, isWarning }: any) {
  return (
    <div className="p-6 rounded-3xl border border-gray-100 shadow-sm bg-white flex items-center gap-4 hover:border-indigo-100 transition-colors">
      <div className={`p-3 rounded-2xl ${color}`}>{icon}</div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <p
          className={`text-xl font-black ${
            isWarning ? "text-amber-600" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
