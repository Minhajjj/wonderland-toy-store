"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { getProductById } from "@/lib/products";

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      if (!params.id) return;
      const data = await getProductById(params.id as string);
      if (data) {
        setProduct(data);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [params.id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center font-medium opacity-50">
        Product Not Found
      </div>
    );

  const validImages: string[] = [];
  if (product.main_image) validImages.push(product.main_image);

  const dbGallery = product.all_images || [];
  if (Array.isArray(dbGallery)) {
    dbGallery.forEach((img: any) => {
      if (
        typeof img === "string" &&
        img.trim() !== "" &&
        !validImages.includes(img)
      ) {
        validImages.push(img);
      }
    });
  }

  const hasImages = validImages.length > 0;
  const displayImage = hasImages ? validImages[selectedImage] : "";

  const currentPrice = Number(product.price) || 0;
  const oldPrice = Number(product.original_price || product.originalPrice) || 0;
  const discount =
    oldPrice > 0 ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20">
      {" "}
      {/* REMOVED WHITE BG */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section - Removed solid white, added subtle border/transparent look */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 p-2 rounded-[2.5rem]">
          {/* Left - Images */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-white rounded-[2rem] overflow-hidden border-4 border-gray-200 shadow-lg group">
              {discount > 0 && (
                <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                  <FaFire />
                  {discount}% OFF
                </div>
              )}

              <div className="absolute top-6 right-6 z-10">
                <button className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm hover:bg-white transition group">
                  <IoShareSocial className="text-xl text-gray-700" />
                </button>
              </div>

              <div className="w-full h-full flex items-center justify-center p-8">
                {hasImages ? (
                  <img
                    src={displayImage}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400">No Image Available</div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {validImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {validImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-4 transition-all ${
                      selectedImage === idx
                        ? "border-pink-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx}`}
                      className="w-full h-full object-contain bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right - Product Info */}
          <div className="flex flex-col py-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-pink-500 text-white px-4 py-1 rounded-lg text-sm font-bold uppercase">
                {product.category || "Toy"}
              </span>
              <span className="bg-white text-green-700 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 border-2 border-green-200">
                <MdVerified />
                {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </div>

            <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <MdStar
                    key={i}
                    className={
                      i < Math.floor(product.rating || 0)
                        ? "text-yellow-400 text-2xl"
                        : "text-gray-300 text-2xl"
                    }
                  />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-900">
                {product.rating}
              </span>
              <span className="text-gray-500">({product.reviews} reviews)</span>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-pink-600">
                  ${currentPrice}
                </span>
                {oldPrice > currentPrice && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${oldPrice}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-6 mt-auto">
              <div className="flex items-center gap-6">
                <span className="font-bold text-gray-900">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-2 hover:bg-gray-100 font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold text-lg border-x-2 border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-2 hover:bg-gray-100 font-bold text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg">
                  <MdShoppingCart className="text-2xl" /> ADD TO BAG
                </button>
                <button className="flex-1 bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sections - Removed white backgrounds to keep them transparent */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Product Description
            </h2>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.features?.map((feature: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-gray-200"
                >
                  <div className="bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <p className="text-gray-700 font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Specifications
            </h2>
            <div className="bg-white/50 rounded-2xl border border-gray-200 overflow-hidden">
              {Object.entries(product.specifications || {}).map(
                ([key, value]: any, idx) => (
                  <div
                    key={key}
                    className={`flex justify-between p-4 ${
                      idx !== 0 ? "border-t border-gray-200" : ""
                    }`}
                  >
                    <span className="font-bold text-gray-900 uppercase text-xs tracking-widest">
                      {key}
                    </span>
                    <span className="text-gray-700">{value}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
