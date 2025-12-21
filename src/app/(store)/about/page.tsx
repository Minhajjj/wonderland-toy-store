"use client";

import React from "react";
import {
  HeartIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  ShieldCheckIcon,
  BeakerIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* 1. Brand Hero Section */}
      <section className="py-24 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center">
            <span className="text-[#A569BD] font-black uppercase tracking-[0.3em] text-sm mb-4">
              Established 2023
            </span>
            <h1 className="text-6xl md:text-9xl font-black text-gray-900 tracking-tighter mb-8 uppercase leading-none">
              The Heart of <br />
              <span className="text-[#FF6B9D]">WonderLand</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed italic">
              "We don't stop playing because we grow old; we grow old because we
              stop playing."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Visual Storytelling Section */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">
              Our Philosophy
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              In an era dominated by screens, WonderLand was born from a simple
              observation: the most profound learning happens when a child's
              hands are busy. Whether it's building a wooden fortress or solving
              a complex puzzle, physical toys foster cognitive pathways that
              digital pixels simply cannot replicate.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-pink-100 p-2 rounded-lg text-[#FF6B9D]">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <p className="text-gray-700 font-bold">
                  Curated for Curiosity: Every toy is selected to ask a
                  question, not just provide an answer.
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-purple-100 p-2 rounded-lg text-[#A569BD]">
                  <BeakerIcon className="w-5 h-5" />
                </div>
                <p className="text-gray-700 font-bold">
                  Tested by Experts: Our toys undergo rigorous "play-testing" by
                  our board of tiny experts.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 h-[500px]">
            <div className="bg-gray-100 rounded-[40px] overflow-hidden">
              <img
                src="/aboutPagePic1.jpg"
                className="w-full h-full object-cover"
                alt="Toy details"
              />
            </div>
            <div className="bg-gray-100 rounded-[40px] overflow-hidden mt-12">
              <img
                src="/aboutPagePic2.jpg"
                className="w-full h-full object-cover"
                alt="Kids playing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Quality Standards (New Grid) */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              Our Quality Promise
            </h2>
            <div className="h-1.5 w-20 bg-[#FF6B9D] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <QualityBox
              icon={<ShieldCheckIcon />}
              title="Non-Toxic"
              desc="100% BPA-free and lead-free materials."
            />
            <QualityBox
              icon={<HeartIcon />}
              title="Sustainably Sourced"
              desc="FSC certified wood and recycled plastics."
            />
            <QualityBox
              icon={<RocketLaunchIcon />}
              title="Skill Building"
              desc="Focus on STEM and sensory development."
            />
            <QualityBox
              icon={<FaceSmileIcon />}
              title="Lifetime Joy"
              desc="Built to be passed down through generations."
            />
          </div>
        </div>
      </section>

      {/* 4. Meet the Founders Section (New) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black uppercase">
            The Faces Behind the Magic
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <TeamMember
            name="Sarah Jenkins"
            role="Creative Director"
            img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop"
          />
          <TeamMember
            name="David Chen"
            role="Head of Safety"
            img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
          />
          <TeamMember
            name="Maya Thompson"
            role="Toy Curator"
            img="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* 5. Footer Brand Mark */}
      <section className="py-20 border-t border-gray-100 text-center">
        <h3 className="text-2xl font-black uppercase tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B9D] via-[#A569BD] to-[#5DADE2]">
          WonderLand 2025
        </h3>
      </section>
    </div>
  );
}

// Sub-components
function QualityBox({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 text-[#A569BD] mb-4">{icon}</div>
      <h4 className="font-black uppercase text-sm mb-2">{title}</h4>
      <p className="text-gray-500 text-xs font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function TeamMember({ name, role, img }: any) {
  return (
    <div className="group">
      <div className="aspect-4/5 rounded-[40px] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
        <img
          src={img}
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-500"
          alt={name}
        />
      </div>
      <h4 className="text-xl font-black uppercase text-gray-900">{name}</h4>
      <p className="text-[#FF6B9D] font-bold text-sm tracking-widest uppercase">
        {role}
      </p>
    </div>
  );
}
