"use client";
import { useState } from "react";
import {
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdAccessTime,
  MdSend,
  MdChat,
  MdFavorite,
  MdSupport,
  MdVerified,
  MdStar,
} from "react-icons/md";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = () => {
    alert(`Thanks ${formData.name}! We'll get back to you soon! 🎉`);
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Premium Version */}
        <div className="text-center mb-24 relative py-12">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-[20%] w-64 h-64 bg-pink-400 rounded-full blur-3xl"></div>
            <div className="absolute top-10 right-[25%] w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
          </div>

          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 mb-8 relative z-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-pink-400"></div>
            <span className="text-sm font-semibold tracking-[0.3em] text-gray-500 uppercase">
              Get in Touch
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 relative z-10 leading-tight tracking-tight">
            We'd Love to
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Hear From You
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12 relative z-10">
            Whether you have a question about our products, need assistance,
            <br className="hidden md:block" />
            or just want to share your WonderLand story—we're here for you.
          </p>

          {/* Stats/Trust Elements */}
          <div className="flex flex-wrap justify-center gap-12 mt-16 relative z-10">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                Support Available
              </div>
            </div>
            <div className="h-16 w-px bg-gray-200 hidden lg:block"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                &lt;2h
              </div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                Response Time
              </div>
            </div>
            <div className="h-16 w-px bg-gray-200 hidden lg:block"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                Happy Families
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid with Vertical Separator */}
        <div className="grid lg:grid-cols-5 gap-12 mb-16 relative">
          {/* Vertical Separator Line - Only on Large Screens */}
          <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>

          {/* Left Side - Contact Form (Takes 3 columns) */}
          <div className="lg:col-span-3 lg:pr-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-xl shadow-lg">
                <MdChat className="text-white text-3xl" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Send us a Message
              </h2>
            </div>

            {/* Why Contact Us Section */}
            <div className="mb-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border-l-4 border-pink-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                💡 Why reach out to us?
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    Get personalized toy recommendations for your child's age
                    and interests
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>
                    Inquire about bulk orders, corporate gifts, or special
                    occasions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-500 mt-1">•</span>
                  <span>
                    Share feedback or suggestions to help us serve you better
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>
                    Request assistance with orders, returns, or product
                    information
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-all text-base bg-white/80 backdrop-blur-sm shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-all text-base bg-white/80 backdrop-blur-sm shadow-md"
                  />
                </div>
              </div>

              {/* Phone and Subject Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-all text-base bg-white/80 backdrop-blur-sm shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-base font-bold text-gray-800 mb-3">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-all text-base bg-white/80 backdrop-blur-sm shadow-md"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-base font-bold text-gray-800 mb-3">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-all text-base resize-none bg-white/80 backdrop-blur-sm shadow-md"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-5 px-8 rounded-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-xl"
              >
                <MdSend className="text-2xl" />
                Send Message
              </button>

              {/* Privacy Notice */}
              <p className="text-sm text-gray-500 text-center">
                🔒 Your information is safe with us. We respect your privacy and
                will never share your details.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Info (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-8 lg:pl-12">
            {/* Quick Contact */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MdFavorite className="text-pink-500 text-3xl" />
                Quick Contact
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-4 rounded-xl shadow-lg">
                    <MdEmail className="text-white text-3xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600 mb-1">
                      Email Us
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      hello@wonderland.com
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      We respond within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-xl shadow-lg">
                    <MdPhone className="text-white text-3xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600 mb-1">
                      Call Us
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      +1 (555) 123-4567
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Mon-Fri: 9AM - 6PM EST
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-xl shadow-lg">
                    <MdLocationOn className="text-white text-3xl" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600 mb-1">
                      Visit Us
                    </p>
                    <p className="text-lg font-bold text-gray-900 leading-relaxed">
                      123 Magic Street
                      <br />
                      Toy Town, CA 90210
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Free parking available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* Business Hours */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MdAccessTime className="text-purple-500 text-3xl" />
                Business Hours
              </h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center pb-5 border-b-2 border-gray-300">
                  <span className="font-bold text-lg text-gray-800">
                    Monday - Friday
                  </span>
                  <span className="text-purple-600 font-bold text-lg">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center pb-5 border-b-2 border-gray-300">
                  <span className="font-bold text-lg text-gray-800">
                    Saturday
                  </span>
                  <span className="text-purple-600 font-bold text-lg">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-gray-800">
                    Sunday
                  </span>
                  <span className="text-gray-400 font-bold text-lg">
                    Closed
                  </span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <p className="text-sm text-gray-700">
                  <strong className="text-blue-700">Holiday Hours:</strong>{" "}
                  We're closed on major holidays. Check our social media for
                  updates!
                </p>
              </div>
            </div>

            {/* Horizontal Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* Why Choose Us */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MdVerified className="text-green-500 text-3xl" />
                Why Choose WonderLand?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MdStar className="text-yellow-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Premium Quality
                    </p>
                    <p className="text-sm text-gray-600">
                      All toys are safety-tested and certified
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdSupport className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Expert Support
                    </p>
                    <p className="text-sm text-gray-600">
                      Our team of toy specialists is here to help
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MdFavorite className="text-pink-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Family Owned</p>
                    <p className="text-sm text-gray-600">
                      We understand what matters to families
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            {/* Social Connect */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Follow Our Journey! 🚀
              </h3>
              <p className="mb-6 text-gray-700 leading-relaxed text-base">
                Join our community on social media for daily inspiration, toy
                tips, and magical moments!
              </p>
              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-4 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Facebook
                </button>
                <button className="flex-1 bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-600 text-white py-4 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Instagram
                </button>
                <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-4 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-16"></div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions 💭
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "What are your shipping times?",
                a: "We ship within 24-48 hours! Most orders arrive in 3-5 business days. Express shipping is available for urgent orders.",
              },
              {
                q: "Do you offer gift wrapping?",
                a: "Yes! We offer complimentary gift wrapping for all orders. Just select the option at checkout and add a personalized message.",
              },
              {
                q: "What's your return policy?",
                a: "30-day hassle-free returns. Your satisfaction is our priority! If your child doesn't love it, simply return it for a full refund.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes! We deliver magical moments worldwide. International shipping typically takes 7-14 business days depending on location.",
              },
              {
                q: "Are your toys safety certified?",
                a: "Absolutely! All our toys meet or exceed international safety standards including ASTM, EN71, and CPSIA certifications.",
              },
              {
                q: "Can I track my order?",
                a: "Yes! You'll receive a tracking number via email once your order ships. Track it in real-time through our website or carrier's site.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="relative p-6 rounded-xl hover:bg-gradient-to-br hover:from-pink-50 hover:to-purple-50 transition-all duration-300"
              >
                <div className="absolute -left-4 top-0 text-6xl font-bold text-pink-200 opacity-50">
                  ?
                </div>
                <h4 className="font-bold text-gray-900 mb-3 text-xl relative z-10">
                  {faq.q}
                </h4>
                <p className="text-gray-700 leading-relaxed text-base">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
