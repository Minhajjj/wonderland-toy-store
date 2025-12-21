"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  FaceFrownIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

// 1. Define the FAQ data outside the component
const ALL_FAQS = [
  {
    id: 1,
    question: "What is the recommended age for WonderLand toys?",
    answer:
      "We offer toys for all stages! Each product page specifies an age range. Generally, our collection spans from sensory toys for 6-month-olds to complex STEM kits for kids aged 12 and up.",
  },
  {
    id: 2,
    question: "How do I track my delivery?",
    answer:
      "Once your order is dispatched, you'll receive an email with a tracking link. You can also view live updates in your 'My Profile' section under 'Orders'.",
  },
  {
    id: 3,
    question: "What materials are used in your wooden toys?",
    answer:
      "We exclusively use FSC-certified sustainable wood, primarily beech and maple. All paints are water-based, non-toxic, and saliva-resistant.",
  },
  {
    id: 4,
    question: "Can I cancel my order after placing it?",
    answer:
      "We process orders quickly, but you have a 2-hour window after purchase to cancel via your account dashboard.",
  },
  {
    id: 5,
    question: "Do you offer gift wrapping?",
    answer:
      "Yes! At checkout, you can select our 'Wonder-Wrap' option which includes a hand-written note and eco-friendly premium gift packaging.",
  },
  {
    id: 6,
    question: "What is your policy on missing pieces?",
    answer:
      "If a set arrives with a missing component, we will ship the replacement part to you immediately at no extra cost. Just let us know the set ID.",
  },
  {
    id: 7,
    question: "Are your digital payments secure?",
    answer:
      "We use industry-standard SSL encryption and Stripe/PayPal gateways. We never store your full credit card details on our servers.",
  },
  {
    id: 8,
    question: "Do you offer bulk discounts for schools?",
    answer:
      "Yes, we have a 'WonderLand for Educators' program. Please visit our contact page to request a wholesale or bulk pricing quote.",
  },
];

export default function HelpCentre() {
  const [searchQuery, setSearchQuery] = useState("");

  // 2. SEARCH LOGIC: Filter FAQs based on query
  const filteredFaqs = ALL_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen text-gray-900">
      {/* Header Section */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none">
            Help{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
              Centre
            </span>
          </h1>

          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
            <input
              type="text"
              placeholder="Search for a topic (e.g. 'shipping', 'wood', 'age')..."
              className="w-full pl-16 pr-6 py-6 bg-gray-50 border-2 border-gray-50 rounded-2xl text-lg outline-none focus:border-[#A569BD]/30 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 max-w-4xl mx-auto px-6 min-h-[400px]">
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
          <QuestionMarkCircleIcon className="w-8 h-8 text-[#FF6B9D]" />
          {searchQuery
            ? `Search Results (${filteredFaqs.length})`
            : "Common Questions"}
        </h2>

        <div className="space-y-2">
          {/* 3. Render filtered list */}
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))
          ) : (
            /* 4. No Results State */
            <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[40px]">
              <FaceFrownIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-xl font-bold text-gray-400 uppercase tracking-widest">
                No matching answers found
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#A569BD] font-black underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Navigation Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[40px] p-[2px] bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
          <div className="bg-white rounded-[38px] p-12 md:p-20 text-center">
            <ChatBubbleBottomCenterTextIcon className="w-16 h-16 mx-auto mb-6 text-[#A569BD]" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-gray-900">
              Still haven't found <br /> what you're{" "}
              <span className="text-[#FF6B9D]">looking for?</span>
            </h2>
            <Link
              href="/contact"
              className="inline-block px-12 py-5 bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-sm rounded-2xl hover:bg-gradient-to-r hover:from-[#FF6B9D] hover:via-[#A569BD] hover:to-[#5DADE2] transition-all transform hover:scale-105 shadow-xl"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 text-center">
        <h3 className="inline-block text-2xl font-black uppercase tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
          WonderLand Help
        </h3>
      </footer>
    </div>
  );
}

// Accordion Sub-component
function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`border-b border-gray-100 transition-all ${
        open ? "bg-gray-50/50 px-4" : ""
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-7 flex justify-between items-center text-left group"
      >
        <span
          className={`text-lg font-black uppercase tracking-tight transition-colors ${
            open ? "text-[#A569BD]" : "text-gray-800"
          }`}
        >
          {question}
        </span>
        <ChevronDownIcon
          className={`w-6 h-6 transition-transform duration-300 ${
            open
              ? "rotate-180 text-[#FF6B9D]"
              : "text-gray-300 group-hover:text-gray-900"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-60 pb-8" : "max-h-0"
        }`}
      >
        <p className="text-gray-500 font-medium leading-relaxed max-w-3xl">
          {answer}
        </p>
      </div>
    </div>
  );
}
