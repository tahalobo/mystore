
import React from "react";
import { Product } from "@/types";
import { getNewArrivals, getBestSellers } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";

interface TrendingSectionProps {
  onProductClick?: (product: Product) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ onProductClick }) => {
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  
  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Trending Now</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover what's popular in our store right now</p>
        </div>
        
        <Tabs defaultValue="new-arrivals" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
              <TabsTrigger value="best-sellers">Best Sellers</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="new-arrivals" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 8).map((product, index) => (
                <div key={product.id} className={`animate-fade-up [animation-delay:${index * 50}ms]`}>
                  <ProductCard 
                    product={product}
                    onProductClick={onProductClick}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="best-sellers" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.slice(0, 8).map((product, index) => (
                <div key={product.id} className={`animate-fade-up [animation-delay:${index * 50}ms]`}>
                  <ProductCard 
                    product={product}
                    onProductClick={onProductClick}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TrendingSection;
