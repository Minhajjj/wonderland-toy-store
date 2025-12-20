"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  Legend,
} from "recharts";
import { getCategoryDistribution, getProducts } from "@/lib/products";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const COLORS = ["#FF6B9D", "#9B59B6", "#4FA8D5", "#F1C40F", "#2ECC71"];

export default function AnalyticsPage() {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInventoryValue: 0,
    avgPrice: 0,
    totalItems: 0,
  });

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [distribution, allProducts] = await Promise.all([
          getCategoryDistribution(),
          getProducts(),
        ]);

        setChartData(distribution);

        // Calculate real metrics from your DB
        const totalValue = allProducts.reduce(
          (sum, p) => sum + Number(p.price) * (p.stock || 0),
          0
        );
        const totalItems = allProducts.length;
        const avg = totalItems > 0 ? totalValue / totalItems : 0;

        setStats({
          totalInventoryValue: totalValue,
          avgPrice: avg,
          totalItems: totalItems,
        });
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
      <div className="flex items-center justify-center h-96">
        <ArrowPathIcon className="h-8 w-8 text-purple-500 animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Analytics</h1>
        <p className="text-gray-500">
          Live metrics from your Supabase inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sales Distribution Chart */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">
            Inventory by Category
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ReTooltip
                  contentStyle={{
                    borderRadius: "15px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real Metrics List */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center space-y-6">
          <h3 className="font-bold text-gray-900">Live Inventory Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 text-sm">
                Total Inventory Value
              </span>
              <span className="font-black text-gray-900 text-xl">
                ${stats.totalInventoryValue.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
              <span className="text-gray-500 text-sm">Avg. Product Price</span>
              <span className="font-black text-gray-900 text-xl">
                ${stats.avgPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-purple-100">
              <span className="text-gray-500 text-sm font-bold">
                Total Unique Toys
              </span>
              <span className="font-black text-purple-600 text-xl">
                {stats.totalItems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
