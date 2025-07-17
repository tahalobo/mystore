
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Grid3X3, Star, Zap } from "lucide-react";
import { getCategories, ApiCategory } from "@/utils/categoriesApi";
import { Button } from "@/components/ui/button";

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        // Show random 6 categories for the section
        const shuffledCategories = categoriesData.sort(() => 0.5 - Math.random()).slice(0, 6);
        setCategories(shuffledCategories);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Modern Loading Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/70 rounded-2xl flex items-center justify-center animate-spin">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">جاري تحميل الفئات...</h2>
            <p className="text-slate-600 mt-3 text-lg">يرجى الانتظار قليلاً</p>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      {/* Modern Background Elements */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/25 via-purple-400/20 to-cyan-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-gradient-to-br from-purple-400/20 via-pink-400/15 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Secondary accent elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-br from-cyan-300/15 to-blue-300/10 rounded-full blur-3xl" />
        
        {/* Floating geometric elements */}
        <div className="absolute top-32 right-32 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl rotate-45 animate-float" />
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-full animate-float" style={{animationDelay: '1.5s'}} />
      </div>
      
      {/* Advanced Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `
          radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0),
          linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
          linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px, 40px 40px, 40px 40px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Header Design */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Badge */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center space-x-4 bg-white/60 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-2xl shadow-lg shadow-blue-500/10">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div className="w-px h-6 bg-slate-300" />
              <Grid3X3 className="w-6 h-6 text-slate-600" />
              <Zap className="w-5 h-5 text-orange-500" />
            </div>
          </motion.div>
          
          {/* Main Title */}
          <motion.h2 
            className="text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-800 bg-clip-text text-transparent">
              تسوق حسب 
            </span>
            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              الفئة
            </span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            اكتشف مجموعتنا المتنوعة والحصرية من أفضل المنتجات التقنية
            <span className="text-primary font-semibold"> المختارة بعناية فائقة</span>
          </motion.p>
        </motion.div>
        
        {/* Enhanced Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="h-full group"
            >
              <Link to={`/category/${category.id}`} className="block h-full">
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-700 text-center h-full flex flex-col justify-center hover:bg-white/90 group-hover:border-primary/20">
                  {/* Gradient Background Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  
                  {/* Modern Icon Container */}
                  <div className="mb-8 flex justify-center relative z-10">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/10 group-hover:shadow-primary/20 border border-primary/10">
                        <div className="text-4xl font-bold bg-gradient-to-br from-primary to-primary/70 bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-primary/60 transition-all duration-300">
                          {category.name.charAt(0)}
                        </div>
                      </div>
                      {/* Floating accent */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-500">
                      {category.name}
                    </h3>
                    <div className="inline-block bg-slate-100 group-hover:bg-gradient-to-r group-hover:from-primary/10 group-hover:to-purple-500/10 px-6 py-3 rounded-2xl transition-all duration-500 border border-slate-200 group-hover:border-primary/20">
                      <p className="text-sm font-semibold text-slate-600 group-hover:text-primary transition-colors duration-300">
                        كود: {category.code}
                      </p>
                    </div>
                  </div>
                  
                  {/* Enhanced Hover Arrow */}
                  <div className="mt-8 flex justify-center relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary/20">
                      <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                  
                  {/* Modern shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[300%] transition-transform duration-1500" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Modern CTA Button */}
        {categories.length > 0 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 text-white px-10 py-6 rounded-2xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 transform hover:scale-105 border-0 text-lg font-semibold backdrop-blur-sm"
            >
              <Link to="/categories" className="flex items-center space-x-3">
                <span>عرض جميع الفئات</span>
                <ArrowRight className="w-6 h-6 mr-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
