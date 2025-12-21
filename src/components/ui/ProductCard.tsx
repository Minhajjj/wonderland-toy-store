"use client";
import React, { useEffect, useState } from "react";
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
          // Mapping DB result to match our UI needs
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
          // RESTORED: Exactly your original breakpoints to fix the card length/width
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center mb-7">
              {/* RESTORED: Exactly your original card classes and padding */}
              <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col min-w-[200px]">
                <img
                  src={product.main_image} // From DB
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <div className="flex items-center mb-2 gap-3 text-left">
                  <div className="flex items-center">
                    <IoStarSharp className="text-yellow-400 mr-1" />
                    <span className="text-gray-600">{product.rating}</span>
                  </div>

                  <div className="flex items-center">
                    <LuCake className="mr-1" />
                    <span className="text-gray-600">{product.age_range}</span>
                  </div>

                  <div className="flex items-center">
                    <PiJar className="mr-1" />
                    <span className="text-gray-600">{product.stock}</span>
                  </div>
                </div>

                <h2 className="text-lg font-semibold mb-2 text-left">
                  {product.title}
                </h2>

                <p className="text-[#FF6B9D] font-bold mb-3 mt-7 text-left">
                  ${product.price}
                </p>

                <Secondary_Button text="Add to Bag" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductCard;
