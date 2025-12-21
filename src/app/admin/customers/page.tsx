"use client";

import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  EnvelopeIcon,
  ArrowPathIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getCustomers } from "@/lib/customers";
import supabase from "../../../../lib/supabaseClient";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: selectedCustomer.full_name,
          role: selectedCustomer.role,
        })
        .eq("id", selectedCustomer.id);

      if (error) throw error;

      // Refresh list after update
      await loadInitialData();
      setIsModalOpen(false);
    } catch (error: any) {
      alert("Update failed: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCustomers = customers.filter((cust) => {
    const name = cust.full_name?.toLowerCase() || "";
    const email = cust.email?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();
    return name.includes(search) || email.includes(search);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-gray-900">Customers</h1>
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

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 flex justify-center">
            <ArrowPathIcon className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b">
              <tr className="text-xs font-bold text-gray-400 uppercase">
                <th className="px-6 py-5">Customer</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">
                        {cust.full_name || "New User"}
                      </p>
                      <p className="text-xs text-gray-500">{cust.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                          cust.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {cust.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedCustomer(cust);
                          setIsModalOpen(true);
                        }}
                        className="text-indigo-600 font-bold text-sm hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-gray-400">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900">
                Edit User Profile
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <XMarkIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Full Name
                </label>
                <input
                  className="w-full bg-gray-50 p-4 rounded-xl mt-1 outline-none font-bold focus:ring-2 focus:ring-indigo-500 border-none"
                  value={selectedCustomer?.full_name || ""}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      full_name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Role
                </label>
                <select
                  className="w-full bg-gray-50 p-4 rounded-xl mt-1 outline-none font-bold border-none"
                  value={selectedCustomer?.role || "user"}
                  onChange={(e) =>
                    setSelectedCustomer({
                      ...selectedCustomer,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg"
              >
                {isSaving ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
