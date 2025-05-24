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
        if (newSeconds >= 0) return {
          ...prev,
          seconds: newSeconds
        };
        const newMinutes = prev.minutes - 1;
        if (newMinutes >= 0) return {
          ...prev,
          minutes: newMinutes,
          seconds: 59
        };
        const newHours = prev.hours - 1;
        if (newHours >= 0) return {
          ...prev,
          hours: newHours,
          minutes: 59,
          seconds: 59
        };
        const newDays = prev.days - 1;
        if (newDays >= 0) return {
          days: newDays,
          hours: 23,
          minutes: 59,
          seconds: 59
        };
        return {
          days: 3,
          hours: 12,
          minutes: 45,
          seconds: 30
        }; // Reset timer
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const countdownBlocks = [{
    value: timeLeft.days,
    label: "يوم"
  }, {
    value: timeLeft.hours,
    label: "ساعة"
  }, {
    value: timeLeft.minutes,
    label: "دقيقة"
  }, {
    value: timeLeft.seconds,
    label: "ثانية"
  }];
  if (isLoading) {
    return <section className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">جاري تحميل العروض...</p>
            </div>
          </div>
        </div>
      </section>;
  }
  if (discountedProducts.length === 0) {
    return null; // Don't render this section if no discounted products
  }
  return;
};
export default DiscountedProducts;