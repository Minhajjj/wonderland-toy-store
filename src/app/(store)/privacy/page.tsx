"use client";

import React from "react";
import {
  ShieldCheckIcon,
  LockClosedIcon,
  EyeSlashIcon,
  DocumentTextIcon,
  UserGroupIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen text-gray-900">
      {/* 1. Compact Hero Section */}
      <section className="pt-4 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Data Protection
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
            Safe & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
              Private.
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
            Your trust is our most valuable toy. We treat your personal data
            with the same care and protection we give to our own families.
          </p>
        </div>
      </section>

      {/* 2. Core Pillars (Icon Grid) */}
      <section className="py-20 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Pillar
              icon={<LockClosedIcon className="w-8 h-8" />}
              title="Secure Encryption"
              desc="We use industry-standard SSL encryption to ensure your data stays between us."
            />
            <Pillar
              icon={<EyeSlashIcon className="w-8 h-8" />}
              title="No Data Selling"
              desc="We never have, and never will, sell your personal information to third parties."
            />
            <Pillar
              icon={<ShieldCheckIcon className="w-8 h-8" />}
              title="GDPR Ready"
              desc="Fully compliant with global privacy standards to protect your digital rights."
            />
          </div>
        </div>
      </section>

      {/* 3. Detailed Clauses (The "Readable" Legal Text) */}
      <section className="py-24 rounded-[60px] mx-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-16">
            <PolicyBlock
              number="01"
              title="Information We Collect"
              content="We collect information you provide directly to us: your name, email, shipping address, and payment details. We also automatically collect certain device info like your IP address and browsing behavior to improve your WonderLand experience."
            />
            <PolicyBlock
              number="02"
              title="How We Use Your Data"
              content="Your data helps us process orders, send tracking updates, and provide personalized toy recommendations. If you opt-in, we use your email to send 'Secret Sales' and new collection drops."
            />
            <PolicyBlock
              number="03"
              title="Cookies & Tracking"
              content="We use cookies to remember what's in your shopping bag and to understand which toys are the most popular. You can disable cookies in your browser settings at any time."
            />
            <PolicyBlock
              number="04"
              title="Your Rights"
              content="You have the right to access, correct, or delete your personal data. Simply log into your account or contact our privacy team to request a full data export or account closure."
            />
          </div>
        </div>
      </section>

      {/* 4. Contact for Privacy (Asymmetric Callout) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center  border-2 border-gray-50 rounded-[40px] p-12 overflow-hidden relative">
          <div className="flex-1 z-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
              Privacy Questions?
            </h3>
            <p className="text-gray-500 font-medium mb-8">
              Our Data Protection Officer is always available to discuss how we
              keep your information safe. Reach out anytime.
            </p>
            <a
              href="mailto:privacy@wonderland.com"
              className="text-[#A569BD] font-black uppercase tracking-widest text-sm border-b-2 border-[#A569BD]"
            >
              privacy@wonderland.com
            </a>
          </div>
          <div className="flex-1 group">
            <HandRaisedIcon className="w-64 h-64 text-black rotate-12 transition-transform group-hover:rotate-0 duration-500" />
          </div>
        </div>
      </section>

      {/* 5. Gradient Branding Footer */}
      <footer className="py-20 text-center border-t border-gray-100">
        <h3 className="inline-block text-2xl font-black uppercase tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
          WonderLand Privacy
        </h3>
      </footer>
    </div>
  );
}

// Sub-components
function Pillar({ icon, title, desc }: any) {
  return (
    <div className="space-y-4">
      <div className="text-[#FF6B9D]">{icon}</div>
      <h3 className="text-lg font-black uppercase tracking-tight">{title}</h3>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function PolicyBlock({ number, title, content }: any) {
  return (
    <div className="flex gap-8 items-start">
      <span className="text-sm font-black text-[#A569BD] bg-[#A569BD]/10 px-3 py-1 rounded-lg">
        {number}
      </span>
      <div className="space-y-4">
        <h4 className="text-2xl font-black uppercase tracking-tighter">
          {title}
        </h4>
        <p className="text-gray-600 font-medium leading-relaxed text-lg">
          {content}
        </p>
      </div>
    </div>
  );
}
