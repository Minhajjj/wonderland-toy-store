"use client";

import { useState } from "react";
import { loginWithEmail, signUpWithEmail } from "@/lib/authActions";
import { IoClose } from "react-icons/io5";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-[#1a1a2e]/80 backdrop-blur-md flex items-center justify-center z-[200] px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#2C3E50] border-2 border-[#A569BD]/30 rounded-3xl shadow-[0_0_40px_rgba(165,105,189,0.3)] w-full max-w-md p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Magical Background Accent */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF6B9D]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#5DADE2]/10 rounded-full blur-3xl"></div>

        {/* Close Button */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-5 top-5 text-2xl text-gray-400 hover:text-[#FF6B9D] transition-all hover:rotate-90"
        >
          <IoClose />
        </button>

        {/* Header */}
        <div className="text-center mb-8 relative">
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
            {mode === "login" ? "Welcome Back!" : "Join the Magic"}
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            {mode === "login"
              ? "Enter your details to enter WonderLand"
              : "Create an account to start your adventure"}
          </p>
        </div>

        {mode === "login" ? (
          // ---------------- LOGIN FORM ----------------
          <form
            className="space-y-5 relative"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const form = new FormData(e.currentTarget);
              const email = form.get("email") as string;
              const password = form.get("password") as string;

              const { error } = await loginWithEmail(email, password);
              setLoading(false);
              if (error) {
                alert(error.message);
                return;
              }
              onClose();
            }}
          >
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-1.5 ml-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-[#1a1a2e]/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A569BD]/50 focus:border-[#A569BD] transition-all"
                placeholder="you@magic.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-bold mb-1.5 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-[#1a1a2e]/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A569BD]/50 focus:border-[#A569BD] transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF6B9D] to-[#A569BD] text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-[#FF6B9D]/20 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Opening Gates..." : "Enter WonderLand"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-[#5DADE2] font-bold hover:underline"
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          // ---------------- SIGNUP FORM ----------------
          <form
            className="space-y-4 relative"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const form = new FormData(e.currentTarget);
              const fullname = form.get("fullname") as string;
              const email = form.get("email") as string;
              const password = form.get("password") as string;

              const { error } = await signUpWithEmail(
                fullname,
                email,
                password
              );
              setLoading(false);
              if (error) {
                alert(error.message);
                return;
              }
              onClose();
            }}
          >
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-1.5 ml-1">
                Full Name
              </label>
              <input
                name="fullname"
                required
                className="w-full bg-[#1a1a2e]/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A569BD]/50 transition-all"
                placeholder="Toy Explorer"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-bold mb-1.5 ml-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-[#1a1a2e]/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A569BD]/50 transition-all"
                placeholder="you@magic.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-bold mb-1.5 ml-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                className="w-full bg-[#1a1a2e]/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A569BD]/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#A569BD] to-[#5DADE2] text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-[#5DADE2]/20 hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Creating Magic..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                className="text-[#FF6B9D] font-bold hover:underline"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
