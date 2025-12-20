"use client";

import { useState } from "react";
import { loginWithEmail, signUpWithEmail } from "@/lib/authActions";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-4 top-3 text-2xl text-purple-500 hover:scale-110 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-5 text-purple-600">
          {mode === "login" ? "Welcome Back!" : "Create Your Account"}
        </h2>

        {mode === "login" ? (
          // ---------------- LOGIN FORM ----------------
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const email = form.get("email") as string;
              const password = form.get("password") as string;

              const { error } = await loginWithEmail(email, password);
              if (error) {
                alert(error.message);
                return;
              }

              onClose();
            }}
          >
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Login
            </button>

            <p className="text-center text-sm mt-3">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-purple-600 font-semibold"
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          // ---------------- SIGNUP FORM ----------------
          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = new FormData(e.currentTarget);
              const fullname = form.get("fullname") as string;
              const email = form.get("email") as string;
              const password = form.get("password") as string;

              const { error } = await signUpWithEmail(
                fullname,
                email,
                password
              );

              if (error) {
                alert(error.message);
                return;
              }

              onClose();
            }}
          >
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                name="fullname"
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full border rounded-lg px-3 py-2"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Sign Up
            </button>

            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <button
                type="button"
                className="text-purple-600 font-semibold"
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
