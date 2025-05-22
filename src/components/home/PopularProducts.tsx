
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
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button variant="outline" asChild className="text-primary">
              <Link to={`/category/${categoryId}`} className="flex items-center">
                عرض المزيد
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {products.length > 0 ? (
          <ProductGrid 
            products={products}
            view="grid"
            emptyMessage={`لا توجد منتجات في فئة ${categoryId} حاليًا`}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد منتجات متوفرة حاليًا</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularProducts;
