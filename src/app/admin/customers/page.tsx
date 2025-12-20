"use client";

import { useEffect, useState } from "react";
import {
  UserPlusIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  EnvelopeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { getCustomers } from "@/lib/customers"; 

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadCustomers() {
      const data = await getCustomers();
      setCustomers(data);
      setLoading(false);
    }
    loadCustomers();
  }, []);

  // Filter logic
  const filteredCustomers = customers.filter(
    (cust) =>
      cust.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your customer base and view history.
          </p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-gray-800 transition">
          <UserPlusIcon className="h-5 w-5" />
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400">Total Customers</p>
          <p className="text-2xl font-black text-gray-900 mt-1">
            {loading ? "..." : customers.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400">Active Members</p>
          <p className="text-2xl font-black text-gray-900 mt-1">
            {loading
              ? "..."
              : customers.filter((c) => c.status === "active").length ||
                customers.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400">New This Month</p>
          <p className="text-2xl font-black text-[#FF6B9D] mt-1">+0</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-transparent outline-none text-sm text-gray-700 py-2"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center">
            <ArrowPathIcon className="h-8 w-8 text-purple-500 animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                  Customer
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                  Location
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase text-right">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#FF6B9D] to-[#4FA8D5] p-[2px]">
                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-gray-600 uppercase">
                          {cust.full_name?.substring(0, 2) || "U"}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 group-hover:text-[#9B59B6] transition-colors">
                          {cust.full_name || "New User"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <EnvelopeIcon className="h-3 w-3" />
                          {cust.email || "No email"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4 text-gray-400" />
                      {cust.country || "Not specified"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-gray-500 font-medium">
                    {new Date(cust.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
