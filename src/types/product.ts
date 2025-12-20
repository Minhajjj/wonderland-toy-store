// src/types/product.ts

export interface UnifiedProduct {
  id?: number | string;
  title: string;
  description: string;
  category: string;
  tag: "sale" | "featured" | "popular";
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  soldCount: number;
  ages: string;
  pieces?: number; // Keep this for Lego-specific data
  stock: number; // <--- ADD THIS LINE
  available: boolean;
  features: string[];
  specifications: {
    Dimensions?: string;
    Weight?: string;
    Material?: string;
    Care?: string;
    Safety?: string;
    Origin?: string;
  };
  created_at?: string;
  updated_at?: string;
}
