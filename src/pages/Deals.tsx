
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { getProductsByCategory, getProductsByDiscount } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlameIcon, Zap, Tag, Clock, Gift, Ban, CheckCircle, Sparkles, ChevronRight, Percent, Filter, X, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ProductDetailModal from "@/components/ProductDetailModal";
import DealsFilters from "@/components/deals/DealsFilters";
import DealsHero from "@/components/deals/DealsHero";
import FlashSaleTimer from "@/components/deals/FlashSaleTimer";

const Deals: React.FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [bestSellerDeals, setBestSellerDeals] = useState<Product[]>([]);
  const [newArrivalDeals, setNewArrivalDeals] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("all-deals");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 59,
    seconds: 59
  });

  // Load products with discounts
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      
      // Get all discounted products
      const discounted = getProductsByDiscount();
      setDiscountedProducts(discounted);
      
      // Get best seller deals
      const bestSellers = discounted.filter(product => product.bestSeller);
      setBestSellerDeals(bestSellers);
      
      // Get new arrival deals
      const newArrivals = discounted.filter(product => product.newArrival);
      setNewArrivalDeals(newArrivals);
      
      // Create a subset for flash sale (first 6 products with discount > 20%)
      const flashSale = discounted.filter(product => (product.discount || 0) > 20).slice(0, 6);
      setFlashSaleProducts(flashSale);
      
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Countdown timer for flash sale
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset the timer when it reaches 0
          return { hours: 5, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const productsToShow = () => {
    switch (currentTab) {
      case "best-sellers":
        return bestSellerDeals;
      case "new-arrivals":
        return newArrivalDeals;
      case "flash-sale":
        return flashSaleProducts;
      default:
        return discountedProducts;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50/50">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Modern Hero Section */}
        <DealsHero />
        
        {/* Flash Sale Timer */}
        <FlashSaleTimer 
          timeLeft={timeLeft} 
          onFlashSaleClick={() => setCurrentTab("flash-sale")} 
        />
        
        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="xl:hidden">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 bg-white shadow-sm border-gray-200 hover:bg-gray-50"
                onClick={() => setIsMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                عرض الفلاتر والخيارات
              </Button>
            </div>

            {/* Products Grid - Left Side */}
            <div className="flex-1 xl:order-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tabs Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                  <Tabs defaultValue="all-deals" value={currentTab} onValueChange={setCurrentTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200">
                      <TabsTrigger 
                        value="all-deals" 
                        className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                      >
                        <Percent className="w-4 h-4" />
                        <span className="hidden sm:inline">جميع العروض</span>
                        <span className="sm:hidden">الكل</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="best-sellers" 
                        className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                      >
                        <FlameIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">الأكثر مبيعاً</span>
                        <span className="sm:hidden">مبيعاً</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="new-arrivals" 
                        className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                      >
                        <Tag className="w-4 h-4" />
                        <span className="hidden sm:inline">وصل حديثاً</span>
                        <span className="sm:hidden">جديد</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="flash-sale" 
                        className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                      >
                        <Zap className="w-4 h-4" />
                        <span className="hidden sm:inline">عروض فلاش</span>
                        <span className="sm:hidden">فلاش</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Products Content */}
                <div className="p-6">
                  <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible" 
                    key={currentTab}
                    className="min-h-[500px]"
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center min-h-[400px]">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                          <p className="text-gray-600 font-medium">جاري تحميل العروض المميزة...</p>
                        </div>
                      </div>
                    ) : productsToShow().length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productsToShow().map((product, index) => (
                          <motion.div key={product.id} variants={itemVariants} className="h-full">
                            <ProductCard 
                              product={product} 
                              onProductClick={handleProductClick} 
                              className="h-full hover:shadow-lg transition-all duration-300" 
                            />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <Ban className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-gray-800">لا توجد عروض متاحة</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          لا توجد حالياً أي عروض في هذه الفئة. تحقق من الفئات الأخرى أو عد لاحقاً للاطلاع على العروض الجديدة.
                        </p>
                        <Button 
                          onClick={() => setCurrentTab("all-deals")}
                          className="rounded-full px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        >
                          عرض جميع العروض
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Filters Sidebar - Right Side */}
            <div className="xl:w-80 xl:order-2">
              <DealsFilters 
                isOpen={isMobileFiltersOpen}
                onClose={() => setIsMobileFiltersOpen(false)}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Deals;
