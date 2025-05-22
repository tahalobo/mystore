
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, loadProductsFromAPI } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";

interface FeaturedProductsProps {
  onProductClick?: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        setFeaturedProducts(getFeaturedProducts());
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المنتجات المميزة...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">المنتجات المميزة</h2>
            <p className="text-gray-600 mt-2">منتجات مُنتقاة بعناية فائقة منتقاة بعناية فائقة</p>
          </div>
          <Button variant="link" asChild className="mt-2 md:mt-0 text-primary">
            <Link to="/shop" className="flex items-center">
              عرض جميع المنتجات
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <div key={product.id} className={`animate-fade-up [animation-delay:${index * 100}ms]`}>
                <ProductCard 
                  product={product} 
                  onProductClick={handleProductClick}
                />
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">لا توجد منتجات مميزة حاليًا</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
