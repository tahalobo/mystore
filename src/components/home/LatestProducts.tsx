
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { allProducts, loadProductsFromAPI } from "@/data/products";
import { ChevronRight, Clock, Sparkles, TrendingUp, Star, Zap } from "lucide-react";
import { Product } from "@/types";
import ProductGrid from "@/components/ProductGrid";
import { motion } from "framer-motion";

const LatestProducts: React.FC = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        // Get the latest 8 products (you can sort by date if you have that field, for now we'll take the last 8)
        const latest = allProducts.slice(-8).reverse(); // Get last 8 and reverse to show newest first
        setLatestProducts(latest);
      } catch (error) {
        console.error("Error loading latest products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 relative overflow-hidden min-h-screen">
        {/* Ultra Modern Loading Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.4),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transform skew-y-12" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 left-16 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-orange-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex justify-center items-center py-32">
            <div className="text-center">
              <div className="relative">
                <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-white/20 border-r-white/80 align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg"></div>
              </div>
              <p className="mt-6 text-white/80 text-lg font-medium">جاري تحميل أحدث المنتجات...</p>
              <div className="mt-4 w-64 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (latestProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden min-h-screen">
      {/* Ultra Modern Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        
        {/* Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.4),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" />
        
        {/* Diagonal Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transform skew-y-12" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-transparent via-pink-500/8 to-transparent transform -skew-y-6" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating Animated Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-16 w-96 h-96 bg-gradient-to-br from-pink-400/15 to-orange-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-yellow-400/10 to-red-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}} />
        
        {/* Moving Light Streaks */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-purple-400/30 to-transparent animate-pulse" style={{animationDelay: '1.5s'}} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span className="text-white font-medium text-lg">منتجات حصرية</span>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-emerald-200 leading-tight">
              أحدث المنتجات
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mb-8"></div>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            اكتشف أحدث إضافاتنا من المنتجات التقنية المبتكرة والعصرية التي تلبي احتياجاتك وتفوق توقعاتك
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Star, label: "منتج مميز", value: latestProducts.length },
              { icon: TrendingUp, label: "الأكثر طلباً", value: "95%" },
              { icon: Zap, label: "توصيل سريع", value: "24ساعة" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <stat.icon className="h-5 w-5 text-emerald-400" />
                <div className="text-right">
                  <div className="text-white font-bold text-lg">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Products Grid Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glass Container */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
            {/* Container Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">مجموعة مختارة</h3>
                <p className="text-white/70">{latestProducts.length} منتج متوفر</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid 
              products={latestProducts}
              view="grid"
              emptyMessage="لا توجد منتجات جديدة"
            />
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">استكشف المجموعة الكاملة</h3>
              <p className="text-white/70">اكتشف المزيد من المنتجات المذهلة في متجرنا</p>
            </div>
            
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 text-white border-0 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 text-lg px-8 py-6 rounded-full font-semibold"
            >
              <Link to="/shop" className="flex items-center space-x-3">
                <span>عرض جميع المنتجات</span>
                <ChevronRight className="h-5 w-5" />
                <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestProducts;
