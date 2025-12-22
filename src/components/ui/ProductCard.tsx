"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { IoStarSharp } from "react-icons/io5";
import { LuCake } from "react-icons/lu";
import { PiJar } from "react-icons/pi";
import Secondary_Button from "./Secondary_Button";
import { getProducts } from "@/lib/products";

interface Product {
  id: number | string;
  main_image: string;
  title: string;
  price: number;
  rating: number;
  age_range: string;
  stock: number;
  tag: "sale" | "featured" | "popular";
}

interface ProductCardSliderProps {
  filterTag: "sale" | "featured" | "popular" | "all";
}

const ProductCard: React.FC<ProductCardSliderProps> = ({ filterTag }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        if (data) {
          setProducts(data as any);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts =
    filterTag === "all"
      ? products
      : products.filter((item) => item.tag === filterTag);

  if (loading) return null;

  return (
    <div className="w-full px-4">
      <div className="max-w-[1400px] mx-auto">
        <Swiper
          modules={[Scrollbar]}
          spaceBetween={20}
          slidesPerView={5}
          scrollbar={{ draggable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          // Ensures all slides in a row match the height of the tallest one
          className="pb-10"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id} className="h-full mb-7">
              <Link href={`/products/${product.id}`} className="block h-full">
                {/* FIX 1: added 'h-full' to link and div 
                   FIX 2: added 'min-h-[460px]' to ensure cards stay same size 
                */}
                <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col h-full min-h-[460px] cursor-pointer border border-transparent hover:border-pink-200 transition-all">
                  {/* FIX 3: Fixed height container with object-contain to prevent image stretching */}
                  <div className="w-full h-48 mb-4 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={product.main_image}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex items-center mb-2 gap-3 text-left">
                    <div className="flex items-center">
                      <IoStarSharp className="text-yellow-400 mr-1" />
                      <span className="text-gray-600 text-sm">
                        {product.rating}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <LuCake className="mr-1 text-gray-500" />
                      <span className="text-gray-600 text-sm">
                        {product.age_range}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <PiJar className="mr-1 text-gray-500" />
                      <span className="text-gray-600 text-sm">
                        {product.stock}
                      </span>
                    </div>
                  </div>

                  {/* FIX 4: line-clamp-2 ensures title always takes 2 lines max, keeping buttons aligned */}
                  <h2 className="text-lg font-semibold mb-2 text-left line-clamp-2 h-[56px]">
                    {product.title}
                  </h2>

                  {/* FIX 5: flex-grow pushes the price and button to the very bottom */}
                  <div className="mt-auto">
                    <p className="text-[#FF6B9D] font-black text-xl mb-3 text-left">
                      ${product.price}
                    </p>
                    <Secondary_Button text="Add to Bag" />
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCard;
