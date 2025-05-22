
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProductsByDiscount, loadProductsFromAPI } from "@/data/products";
import { ChevronRight, Tag, Clock } from "lucide-react";
import { Product } from "@/types";
import ProductGrid from "@/components/ProductGrid";
import { motion } from "framer-motion";

const DiscountedProducts: React.FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        const products = getProductsByDiscount();
        setDiscountedProducts(products.slice(0, 8));
      } catch (error) {
        console.error("Error loading discounted products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
    
    // Simulate countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newSeconds = prev.seconds - 1;
        
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds };
        
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 };
        
        const newHours = prev.hours - 1;
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 };
        
        const newDays = prev.days - 1;
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 };
        
        return { days: 3, hours: 12, minutes: 45, seconds: 30 }; // Reset timer
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const countdownBlocks = [
    { value: timeLeft.days, label: "يوم" },
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" }
  ];

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">جاري تحميل العروض...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (discountedProducts.length === 0) {
    return null; // Don't render this section if no discounted products
  }

  return (
    <section className="py-16 bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="h-5 w-5 text-red-500" />
            <span className="uppercase text-xs font-semibold tracking-wider text-red-600">تخفيضات محدودة</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">العروض الخاصة</h2>
          <p className="text-gray-600 max-w-xl mx-auto">تخفيضات كبيرة على منتجات مختارة لفترة محدودة. لا تفوت الفرصة!</p>
          
          <div className="flex items-center gap-3 mt-6">
            <Clock className="h-5 w-5 text-red-500" />
            <span className="text-sm font-semibold">ينتهي العرض خلال:</span>
            <div className="flex gap-2">
              {countdownBlocks.map((block, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg shadow-md p-2 w-16 text-center border border-red-100"
                  animate={{ scale: block.value === 0 ? [1, 1.05, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-xl font-bold text-red-600">{block.value}</div>
                  <div className="text-xs text-gray-500">{block.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <ProductGrid 
          products={discountedProducts}
          view="grid"
          emptyMessage="لا توجد عروض خاصة حالياً"
        />
        
        <div className="flex justify-center mt-10">
          <Button asChild size="lg" variant="default" className="bg-red-600 hover:bg-red-700">
            <Link to="/deals" className="flex items-center gap-2">
              تصفح جميع العروض
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscountedProducts;
