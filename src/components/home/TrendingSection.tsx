import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types";
import { getNewArrivals, getBestSellers, loadProductsFromAPI } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">الأكثر رواجاً</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">اكتشف المنتجات الأكثر شعبية في متجرنا حالياً</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-6 text-muted-foreground text-lg">جاري تحميل المنتجات...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Enhanced header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <h2 className="text-4xl font-bold text-foreground">الأكثر رواجاً</h2>
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            اكتشف المنتجات الأكثر شعبية في متجرنا حالياً واحصل على أفضل العروض
          </p>
        </div>
        
        <Tabs defaultValue="new-arrivals" className="w-full">
          {/* Enhanced tabs */}
          <div className="flex justify-center mb-10">
            <TabsList className="grid w-full max-w-sm grid-cols-2 h-12 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-1">
              <TabsTrigger 
                value="new-arrivals" 
                className="text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
              >
                وصل حديثاً
              </TabsTrigger>
              <TabsTrigger 
                value="best-sellers"
                className="text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg transition-all duration-300"
              >
                الأكثر مبيعاً
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* New Arrivals - Horizontal Scroll */}
          <TabsContent value="new-arrivals" className="animate-fade-in">
            <ScrollArea className="w-full whitespace-nowrap rounded-xl">
              <div className="flex gap-6 pb-4 px-2">
                {newArrivals.length > 0 ? (
                  newArrivals.slice(0, 12).map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`flex-shrink-0 w-72 animate-fade-up [animation-delay:${index * 50}ms] hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="h-full bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <ProductCard 
                          product={product}
                          onProductClick={handleProductClick}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-16">
                    <p className="text-muted-foreground text-lg">لا توجد منتجات جديدة حالياً</p>
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" className="h-2 bg-muted/30" />
            </ScrollArea>
          </TabsContent>
          
          {/* Best Sellers - Horizontal Scroll */}
          <TabsContent value="best-sellers" className="animate-fade-in">
            <ScrollArea className="w-full whitespace-nowrap rounded-xl">
              <div className="flex gap-6 pb-4 px-2">
                {bestSellers.length > 0 ? (
                  bestSellers.slice(0, 12).map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`flex-shrink-0 w-72 animate-fade-up [animation-delay:${index * 50}ms] hover:scale-105 transition-transform duration-300`}
                    >
                      <div className="h-full bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                        <ProductCard 
                          product={product}
                          onProductClick={handleProductClick}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full text-center py-16">
                    <p className="text-muted-foreground text-lg">لا توجد منتجات مميزة حالياً</p>
                  </div>
                )}
              </div>
              <ScrollBar orientation="horizontal" className="h-2 bg-muted/30" />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TrendingSection;
