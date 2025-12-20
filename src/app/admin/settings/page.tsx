"use client";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your admin preferences.</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-4">
          General Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Store Name
            </label>
            <input
              type="text"
              defaultValue="Wonderland Toys"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#9B59B6]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Support Email
            </label>
            <input
              type="email"
              defaultValue="help@wonderland.com"
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#9B59B6]"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="bg-gradient-to-r from-[#FF6B9D] via-[#9B59B6] to-[#4FA8D5] text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-purple-200 transform transition hover:-translate-y-1">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
