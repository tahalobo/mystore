
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { getProductsByCategory, getProductsByDiscount } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FlameIcon, 
  Zap, 
  Tag, 
  Clock, 
  Gift, 
  Ban, 
  CheckCircle,
  Sparkles,
  ChevronRight,
  Percent
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductDetailModal from "@/components/ProductDetailModal";

const Deals: React.FC = () => {
  const [discountedProducts, setDiscountedProducts] = useState<Product[]>([]);
  const [bestSellerDeals, setBestSellerDeals] = useState<Product[]>([]);
  const [newArrivalDeals, setNewArrivalDeals] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("all-deals");
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
      const flashSale = discounted
        .filter(product => (product.discount || 0) > 20)
        .slice(0, 6);
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
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-50 to-indigo-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                عروض وخصومات حصرية
              </motion.h1>
              
              <motion.p 
                className="text-lg text-gray-600 max-w-2xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                اكتشف خصومات مذهلة على ملحقات التقنية المفضلة لديك. عروض محدودة الوقت لا تريد تفويتها!
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Badge className="bg-amber-100 text-amber-800 px-3 py-1 text-sm font-medium border-0">
                  <FlameIcon className="w-4 h-4 ml-1" />
                  خصم يصل إلى 70%
                </Badge>
                
                <Badge className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium border-0">
                  <Zap className="w-4 h-4 ml-1" />
                  عروض فلاش
                </Badge>
                
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium border-0">
                  <CheckCircle className="w-4 h-4 ml-1" />
                  جودة مضمونة
                </Badge>
                
                <Badge className="bg-purple-100 text-purple-800 px-3 py-1 text-sm font-medium border-0">
                  <Gift className="w-4 h-4 ml-1" />
                  هدايا مجانية
                </Badge>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Flash Sale Timer */}
        <section className="py-8 bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <Sparkles className="w-6 h-6 ml-2 animate-pulse" />
                <h2 className="text-2xl font-bold">عرض فلاش</h2>
              </div>
              
              <div className="flex items-center">
                <div className="text-sm ml-3">ينتهي في:</div>
                <div className="flex gap-1">
                  <div className="bg-white/20 rounded-md px-3 py-1 backdrop-blur-sm">
                    <span className="font-mono font-bold">{formatTime(timeLeft.hours)}</span>
                    <span className="text-xs mr-1">ساعة</span>
                  </div>
                  <div className="bg-white/20 rounded-md px-3 py-1 backdrop-blur-sm">
                    <span className="font-mono font-bold">{formatTime(timeLeft.minutes)}</span>
                    <span className="text-xs mr-1">دقيقة</span>
                  </div>
                  <div className="bg-white/20 rounded-md px-3 py-1 backdrop-blur-sm">
                    <span className="font-mono font-bold">{formatTime(timeLeft.seconds)}</span>
                    <span className="text-xs mr-1">ثانية</span>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                size="sm" 
                className="bg-white text-red-500 hover:bg-white/90"
                onClick={() => setCurrentTab("flash-sale")}
              >
                تسوق عروض الفلاش
                <ChevronRight className="mr-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Deals Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue="all-deals" 
              value={currentTab} 
              onValueChange={setCurrentTab}
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-3xl grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="all-deals" className="flex items-center gap-1">
                    <Percent className="w-4 h-4" />
                    <span>جميع العروض</span>
                  </TabsTrigger>
                  <TabsTrigger value="best-sellers" className="flex items-center gap-1">
                    <FlameIcon className="w-4 h-4" />
                    <span>الأكثر مبيعاً</span>
                  </TabsTrigger>
                  <TabsTrigger value="new-arrivals" className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>وصل حديثاً</span>
                  </TabsTrigger>
                  <TabsTrigger value="flash-sale" className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span>عروض فلاش</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={currentTab}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                  </div>
                ) : productsToShow().length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {productsToShow().map((product) => (
                      <motion.div
                        key={product.id}
                        variants={itemVariants}
                        className="h-full"
                      >
                        <ProductCard 
                          product={product} 
                          onProductClick={handleProductClick}
                          className="h-full"
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Ban className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">لا توجد عروض متاحة</h3>
                    <p className="text-gray-500 mb-6">لا توجد حالياً أي عروض في هذه الفئة.</p>
                    <Button onClick={() => setCurrentTab("all-deals")}>عرض جميع العروض</Button>
                  </div>
                )}
              </motion.div>
            </Tabs>
          </div>
        </section>
        
        {/* Deal Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">تسوق العروض حسب الفئة</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "أغطية الهواتف", icon: "📱", color: "bg-blue-100 text-blue-800" },
                { name: "سماعات الرأس", icon: "🎧", color: "bg-purple-100 text-purple-800" },
                { name: "الشواحن", icon: "🔌", color: "bg-green-100 text-green-800" },
                { name: "الكابلات", icon: "🔌", color: "bg-yellow-100 text-yellow-800" },
                { name: "مكبرات الصوت", icon: "🔊", color: "bg-red-100 text-red-800" },
                { name: "واقيات الشاشة", icon: "🛡️", color: "bg-indigo-100 text-indigo-800" },
                { name: "بنوك الطاقة", icon: "🔋", color: "bg-teal-100 text-teal-800" },
                { name: "الملحقات", icon: "🎮", color: "bg-pink-100 text-pink-800" }
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button 
                    variant="ghost" 
                    className="w-full h-full py-6 flex flex-col items-center justify-center gap-2"
                    asChild
                  >
                    <a href={`/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                      <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-2xl mb-1`}>
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="outline" className="mt-1">خصم يصل إلى 50%</Badge>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Deal Info */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">شروط ومعلومات العروض</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex gap-4">
                  <Clock className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">وقت محدود</h3>
                    <p className="text-gray-600 text-sm">جميع العروض سارية لفترة محدودة فقط. احصل عليها قبل انتهائها!</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Ban className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">لا استرداد للمنتجات المخفضة</h3>
                    <p className="text-gray-600 text-sm">لا يمكن استرداد العناصر المخفضة، ولكن يمكن استبدالها برصيد المتجر.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Tag className="w-8 h-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">متوفر حتى نفاد الكمية</h3>
                    <p className="text-gray-600 text-sm">جميع العروض متاحة فقط حتى نفاد الكمية. لا إعادة تعبئة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
