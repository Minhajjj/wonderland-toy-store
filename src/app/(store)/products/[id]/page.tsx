"use client";
import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BiShoppingBag, BiHeart } from "react-icons/bi";
import {
  MdStar,
  MdStarHalf,
  MdVerified,
  MdLocalShipping,
  MdSecurity,
  MdAutorenew,
  MdShoppingCart,
} from "react-icons/md";
import { IoShareSocial, IoFlash } from "react-icons/io5";
import { FaFire } from "react-icons/fa";

// Mock product data - Replace with actual API call
const getProductData = (id: string) => ({
  id,
  name: "Magical Rainbow Unicorn Plush",
  price: 49.99,
  originalPrice: 69.99,
  rating: 4.5,
  reviews: 128,
  inStock: true,
  soldCount: 2847,
  category: "Plush Toys",
  ageRange: "3-8 years",
  description:
    "Meet your child's new best friend! This enchanting rainbow unicorn plush is crafted with ultra-soft, premium materials and features a sparkly horn and colorful mane. Perfect for cuddles, playtime, and magical adventures.",
  features: [
    "Premium ultra-soft fabric for maximum comfort",
    "Sparkly rainbow mane and tail with shimmer effects",
    "Glittery gold horn and embroidered details",
    "Safety tested and certified for children 3+",
    "Machine washable for easy cleaning",
    "Hypoallergenic stuffing material",
  ],
  specifications: {
    Dimensions: '15" x 10" x 8"',
    Weight: "1.2 lbs",
    Material: "Premium Polyester & Cotton Blend",
    Care: "Machine wash cold, tumble dry low",
    Safety: "ASTM F963, CPSIA Certified",
    Origin: "Made with love in USA",
  },
  images: [
    "https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=800",
    "https://images.unsplash.com/photo-1587912781340-f87ef05c81e5?w=800",
    "https://images.unsplash.com/photo-1587912781940-5a2b48815abe?w=800",
    "https://images.unsplash.com/photo-1587912781641-5a5f6d00f96f?w=800",
  ],
});

const ProductDetailPage = () => {
  const params = useParams();
  const product = getProductData(params.id as string);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isLiked, setIsLiked] = useState(false);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="min-h-screen bg-transparent pt-38 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <span className="text-gray-500 hover:text-pink-500 cursor-pointer transition">
            Home
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 hover:text-pink-500 cursor-pointer transition">
            {product.category}
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-semibold">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden border-4 border-gray-200 shadow-lg">
              {discount > 0 && (
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                  <FaFire className="text-lg" />
                  {discount}% OFF
                </div>
              )}

              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`backdrop-blur-sm p-3 rounded-lg shadow-lg transition-all ${
                    isLiked
                      ? "bg-pink-500 text-white"
                      : "bg-white/90 text-gray-700 hover:bg-pink-50"
                  }`}
                >
                  <BiHeart
                    className={`text-xl ${isLiked ? "fill-current" : ""}`}
                  />
                </button>
                <button className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg hover:bg-purple-50 transition">
                  <IoShareSocial className="text-xl text-gray-700" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <IoFlash className="text-lg text-yellow-500" />
                  <span className="font-bold text-gray-900 text-sm">
                    {product.soldCount.toLocaleString()} sold
                  </span>
                </div>
              </div>

              <div className="aspect-square">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative rounded-lg overflow-hidden border-4 transition-all ${
                    selectedImage === idx
                      ? "border-pink-500 shadow-lg scale-105"
                      : "border-gray-300 hover:border-pink-300"
                  }`}
                >
                  <div className="aspect-square">
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Category & Stock */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                {product.category}
              </span>
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 border-2 border-green-200">
                <MdVerified className="text-base" /> In Stock
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>
              <p className="text-base text-gray-600">
                Perfect for ages{" "}
                <span className="font-bold text-purple-600">
                  {product.ageRange}
                </span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) =>
                  i < Math.floor(product.rating) ? (
                    <MdStar key={i} className="text-yellow-400 text-xl" />
                  ) : i === Math.floor(product.rating) &&
                    product.rating % 1 !== 0 ? (
                    <MdStarHalf key={i} className="text-yellow-400 text-xl" />
                  ) : (
                    <MdStar key={i} className="text-gray-300 text-xl" />
                  )
                )}
              </div>
              <span className="text-lg font-bold text-gray-900">
                {product.rating}
              </span>
              <span className="text-gray-600 text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="pb-4 border-b-2 border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-black text-pink-600">
                  ${product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              </div>
              <p className="text-green-600 font-semibold">
                You save ${(product.originalPrice - product.price).toFixed(2)}!
              </p>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-4 pb-4 border-b-2 border-gray-200">
              <div className="flex items-center gap-4">
                <span className="font-bold text-gray-900">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-lg transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold text-lg border-x-2 border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-2 bg-gray-100 hover:bg-gray-200 font-bold text-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                  <MdShoppingCart className="text-xl" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                <MdLocalShipping className="text-3xl text-blue-500 mx-auto mb-1" />
                <p className="font-bold text-gray-900 text-xs">Free Shipping</p>
                <p className="text-xs text-gray-600">Over $50</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <MdSecurity className="text-3xl text-green-500 mx-auto mb-1" />
                <p className="font-bold text-gray-900 text-xs">Secure Pay</p>
                <p className="text-xs text-gray-600">Protected</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                <MdAutorenew className="text-3xl text-purple-500 mx-auto mb-1" />
                <p className="font-bold text-gray-900 text-xs">
                  30-Day Returns
                </p>
                <p className="text-xs text-gray-600">Easy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product Description
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              {product.description}
            </p>
            <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                🎁 Perfect Gift Choice!
              </h3>
              <p className="text-gray-700">
                Whether it's a birthday, holiday, or just because, this magical
                unicorn brings joy and smiles to every occasion. Watch your
                child's imagination soar!
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications Section - Always Visible */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Specifications
          </h2>
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {Object.entries(product.specifications).map(([key, value], idx) => (
              <div
                key={key}
                className={`flex justify-between items-center p-4 ${
                  idx !== Object.keys(product.specifications).length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <span className="font-bold text-gray-900">{key}</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <div className="space-y-4">
            {[
              {
                name: "Sarah M.",
                rating: 5,
                comment:
                  "My daughter absolutely loves this unicorn! The quality is outstanding and it's so soft.",
                date: "2 weeks ago",
                verified: true,
              },
              {
                name: "Jennifer K.",
                rating: 5,
                comment:
                  "Best toy purchase ever! It's become her favorite bedtime companion.",
                date: "1 month ago",
                verified: true,
              },
              {
                name: "Emily R.",
                rating: 4,
                comment:
                  "Beautiful toy! Slightly smaller than expected but still wonderful quality.",
                date: "1 month ago",
                verified: false,
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-5 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900">{review.name}</p>
                        {review.verified && (
                          <MdVerified className="text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <MdStar
                        key={i}
                        className={`text-lg ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative aspect-square bg-gray-100">
                  <Image
                    src={`https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400`}
                    alt="Related product"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    -25%
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1">
                    Rainbow Buddy #{item}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-pink-600">
                        $39.99
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MdStar className="text-yellow-400 text-sm" />
                      <span className="text-xs font-bold">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
  