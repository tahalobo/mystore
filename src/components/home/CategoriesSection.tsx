
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Grid3X3 } from "lucide-react";
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
      <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800">جاري تحميل الفئات...</h2>
            <p className="text-gray-600 mt-3">يرجى الانتظار قليلاً</p>
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-20" />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20">
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              <Grid3X3 className="w-6 h-6 text-primary/70" />
            </div>
          </div>
          
          <motion.h2 
            className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            تسوق حسب الفئة
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            اكتشف مجموعتنا المتنوعة والحصرية من أفضل المنتجات التقنية المختارة بعناية فائقة
          </motion.p>
        </motion.div>
        
        {/* Enhanced Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link to={`/category/${category.id}`} className="block h-full">
                <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/30 hover:shadow-2xl transition-all duration-500 text-center group h-full flex flex-col justify-center hover:bg-white/80">
                  {/* Icon Container */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg">
                      <div className="text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                        {category.name.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="inline-block bg-gray-100 group-hover:bg-primary/10 px-4 py-2 rounded-full transition-colors duration-300">
                      <p className="text-sm font-medium text-gray-600 group-hover:text-primary">
                        كود: {category.code}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA Button */}
        {categories.length > 0 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
            >
              <Link to="/categories" className="flex items-center space-x-2">
                <span className="text-lg font-semibold">عرض جميع الفئات</span>
                <ArrowRight className="w-5 h-5 mr-2" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CategoriesSection;
