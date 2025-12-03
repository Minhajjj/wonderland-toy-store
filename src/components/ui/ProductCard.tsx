"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { FaStar } from "react-icons/fa";
import { LuCake } from "react-icons/lu";
import { PiJar } from "react-icons/pi";
import Secondary_Button from "./Secondary_Button";

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  rating: number;
  ages: string;
  pieces: number;
  available: boolean;
  tag: "sale" | "featured" | "popular";
}

const productCardData: Product[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/300",
    title: "Stylish Shirt",
    price: 29.99,
    rating: 4.5,
    ages: "6+",
    pieces: 153,
    available: true,
    tag: "featured",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300",
    title: "Casual Sneakers",
    price: 49.99,
    rating: 4.0,
    ages: "10+",
    pieces: 85,
    available: true,
    tag: "sale",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300",
    title: "Elegant Watch",
    price: 99.99,
    rating: 4.8,
    ages: "12+",
    pieces: 40,
    available: false,
    tag: "popular",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300",
    title: "Cool Jacket",
    price: 59.99,
    rating: 4.3,
    ages: "8+",
    pieces: 75,
    available: true,
    tag: "featured",
  },

  // ---- 20 New Items Below ----

  {
    id: 5,
    image: "https://via.placeholder.com/300",
    title: "Toy Robot",
    price: 34.99,
    rating: 4.6,
    ages: "5+",
    pieces: 120,
    available: true,
    tag: "popular",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300",
    title: "Adventure Backpack",
    price: 45.99,
    rating: 4.4,
    ages: "7+",
    pieces: 72,
    available: true,
    tag: "sale",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/300",
    title: "Mini Drone",
    price: 89.99,
    rating: 4.7,
    ages: "10+",
    pieces: 38,
    available: false,
    tag: "featured",
  },
  {
    id: 8,
    image: "https://via.placeholder.com/300",
    title: "Magic Puzzle Cube",
    price: 14.99,
    rating: 4.3,
    ages: "4+",
    pieces: 200,
    available: true,
    tag: "popular",
  },
  {
    id: 9,
    image: "https://via.placeholder.com/300",
    title: "LED Skateboard",
    price: 119.99,
    rating: 4.8,
    ages: "8+",
    pieces: 25,
    available: true,
    tag: "featured",
  },
  {
    id: 10,
    image: "https://via.placeholder.com/300",
    title: "Wireless Headphones",
    price: 39.99,
    rating: 4.5,
    ages: "10+",
    pieces: 95,
    available: true,
    tag: "sale",
  },
  {
    id: 11,
    image: "https://via.placeholder.com/300",
    title: "Action Figure",
    price: 24.99,
    rating: 4.1,
    ages: "6+",
    pieces: 150,
    available: true,
    tag: "popular",
  },
  {
    id: 12,
    image: "https://via.placeholder.com/300",
    title: "Kids Story Book",
    price: 12.99,
    rating: 4.9,
    ages: "3+",
    pieces: 300,
    available: true,
    tag: "featured",
  },
  {
    id: 13,
    image: "https://via.placeholder.com/300",
    title: "Building Blocks Set",
    price: 54.99,
    rating: 4.6,
    ages: "5+",
    pieces: 500,
    available: true,
    tag: "popular",
  },
  {
    id: 14,
    image: "https://via.placeholder.com/300",
    title: "Water Gun",
    price: 9.99,
    rating: 4.0,
    ages: "4+",
    pieces: 220,
    available: true,
    tag: "sale",
  },
  {
    id: 15,
    image: "https://via.placeholder.com/300",
    title: "Remote Car",
    price: 69.99,
    rating: 4.7,
    ages: "7+",
    pieces: 60,
    available: true,
    tag: "featured",
  },
  {
    id: 16,
    image: "https://via.placeholder.com/300",
    title: "Art Paint Kit",
    price: 22.99,
    rating: 4.5,
    ages: "5+",
    pieces: 130,
    available: true,
    tag: "popular",
  },
  {
    id: 17,
    image: "https://via.placeholder.com/300",
    title: "Bubble Maker",
    price: 15.99,
    rating: 4.2,
    ages: "3+",
    pieces: 180,
    available: true,
    tag: "sale",
  },
  {
    id: 18,
    image: "https://via.placeholder.com/300",
    title: "Dinosaur Figurine",
    price: 19.99,
    rating: 4.4,
    ages: "6+",
    pieces: 90,
    available: false,
    tag: "popular",
  },
  {
    id: 19,
    image: "https://via.placeholder.com/300",
    title: "Smart Watch Kids",
    price: 59.99,
    rating: 4.7,
    ages: "8+",
    pieces: 40,
    available: true,
    tag: "featured",
  },
  {
    id: 20,
    image: "https://via.placeholder.com/300",
    title: "Plush Teddy Bear",
    price: 18.99,
    rating: 4.9,
    ages: "2+",
    pieces: 260,
    available: true,
    tag: "popular",
  },
  {
    id: 21,
    image: "https://via.placeholder.com/300",
    title: "Racing Track Set",
    price: 74.99,
    rating: 4.6,
    ages: "5+",
    pieces: 80,
    available: true,
    tag: "sale",
  },
  {
    id: 22,
    image: "https://via.placeholder.com/300",
    title: "Coloring Book",
    price: 7.99,
    rating: 4.3,
    ages: "3+",
    pieces: 350,
    available: true,
    tag: "featured",
  },
  {
    id: 23,
    image: "https://via.placeholder.com/300",
    title: "Mini Keyboard Toy",
    price: 27.99,
    rating: 4.4,
    ages: "4+",
    pieces: 140,
    available: true,
    tag: "sale",
  },
  {
    id: 24,
    image: "https://via.placeholder.com/300",
    title: "Kids Camera",
    price: 42.99,
    rating: 4.6,
    ages: "6+",
    pieces: 70,
    available: true,
    tag: "popular",
  },
];

interface ProductCardSliderProps {
  filterTag: "sale" | "featured" | "popular" | "all";
}

const ProductCard: React.FC<ProductCardSliderProps> = ({ filterTag }) => {
  const filteredProducts =
    filterTag === "all"
      ? productCardData
      : productCardData.filter((item) => item.tag === filterTag);

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
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id} className="flex justify-center mb-7">
              <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col min-w-[200px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />

                <div className="flex items-center mb-2 gap-3 text-left">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-gray-600">{product.rating}</span>
                  </div>

                  <div className="flex items-center">
                    <LuCake className="mr-1" />
                    <span className="text-gray-600">{product.ages}</span>
                  </div>

                  <div className="flex items-center">
                    <PiJar className="mr-1" />
                    <span className="text-gray-600">{product.pieces}</span>
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
