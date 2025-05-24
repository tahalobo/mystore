import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProductsByCategory, loadProductsFromAPI } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import ProductGrid from "@/components/ProductGrid";
interface PopularProductsProps {
  categoryId?: string;
  title?: string;
  description?: string;
  limit?: number;
}
const PopularProducts: React.FC<PopularProductsProps> = ({
  categoryId = "headphones",
  title = "المنتجات المميزة في الفئة",
  description = "تشكيلة مميزة من أفضل منتجاتنا",
  limit = 8
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        const categoryProducts = getProductsByCategory(categoryId);
        setProducts(categoryProducts.slice(0, limit));
      } catch (error) {
        console.error(`Error loading products for category ${categoryId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [categoryId, limit]);
  if (isLoading) {
    return <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
            </div>
          </div>
        </div>
      </section>;
  }
  return;
};
export default PopularProducts;