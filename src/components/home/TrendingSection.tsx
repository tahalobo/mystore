
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { getNewArrivals, getBestSellers, loadProductsFromAPI } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";

interface TrendingSectionProps {
  onProductClick?: (product: Product) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ onProductClick }) => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        setNewArrivals(getNewArrivals());
        setBestSellers(getBestSellers());
      } catch (error) {
        console.error("Error loading trending products:", error);
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
      <section className="section-padding bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">الأكثر رواجاً</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">اكتشف المنتجات الأكثر شعبية في متجرنا حالياً</p>
          </div>
          <div className="flex justify-center items-center py-12">
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
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">الأكثر رواجاً</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">اكتشف المنتجات الأكثر شعبية في متجرنا حالياً</p>
        </div>
        
        <Tabs defaultValue="new-arrivals" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="new-arrivals">وصل حديثاً</TabsTrigger>
              <TabsTrigger value="best-sellers">الأكثر مبيعاً</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="new-arrivals" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.length > 0 ? (
                newArrivals.slice(0, 8).map((product, index) => (
                  <div key={product.id} className={`animate-fade-up [animation-delay:${index * 50}ms]`}>
                    <ProductCard 
                      product={product}
                      onProductClick={handleProductClick}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-8">
                  <p className="text-gray-500">لا توجد منتجات جديدة حالياً</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="best-sellers" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.length > 0 ? (
                bestSellers.slice(0, 8).map((product, index) => (
                  <div key={product.id} className={`animate-fade-up [animation-delay:${index * 50}ms]`}>
                    <ProductCard 
                      product={product}
                      onProductClick={handleProductClick}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-8">
                  <p className="text-gray-500">لا توجد منتجات مميزة حالياً</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TrendingSection;
