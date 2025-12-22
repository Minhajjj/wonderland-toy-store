"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot2Fill } from "react-icons/ri";
import { IoClose, IoSend } from "react-icons/io5";

interface Message {
  role: "user" | "ai";
  text: string;
}

const AIChatbot = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Welcome to WonderLand! How can I help you find magic today? ✨",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Scroll Logic: Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false); // Hide
        } else {
          setIsVisible(true); // Show
        }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 2. Auto-scroll chat to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 3. API Communication
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Magic connection lost! Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="mb-4 w-80 h-[500px] bg-white rounded-3xl shadow-2xl border-2 border-[#A569BD]/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2 font-bold">
                <div className="bg-white/20 p-1.5 rounded-lg animate-pulse">
                  <RiRobot2Fill className="text-xl" />
                </div>
                <span>WonderAI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition"
              >
                <IoClose className="text-xl" />
              </button>
            </div>

            {/* Messages Body */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-[#FF6B9D] text-white rounded-tr-none"
                        : "bg-white text-gray-700 rounded-tl-none border border-gray-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm bg-gray-100 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A569BD]/30"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-[#A569BD] text-white p-3 rounded-xl hover:bg-[#FF6B9D] transition-colors disabled:opacity-50 shadow-md"
              >
                <IoSend />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING ACTION BUTTON (TRIGGER) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2] p-4 rounded-full shadow-2xl text-white text-3xl border-2 border-white flex items-center justify-center group"
          >
            {isOpen ? <IoClose /> : <RiRobot2Fill />}
            <span className="absolute right-full mr-4 px-3 py-1.5 bg-[#2C3E50] text-white text-[10px] uppercase font-bold tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
              WonderAI Online
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatbot;
