
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const brands = [
  { id: "apple", name: "Apple", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop" },
  { id: "samsung", name: "Samsung", logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop" },
  { id: "sony", name: "Sony", logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop" },
  { id: "bose", name: "Bose", logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop" },
  { id: "jbl", name: "JBL", logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop" },
  { id: "anker", name: "Anker", logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop" },
];

const BrandsShowcase: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50">
        <div className="absolute inset-0 bg-grid-black/[0.03] bg-[size:20px_20px]" />
        <div className="absolute h-full w-full bg-white/30 backdrop-blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-6">
موثوق بها من قبل العلامات التجارية الرائدة          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
       نتشارك مع رواد الصناعة لنقدم لك أفضل التقنيات والابتكارات.
كل منتج أصلي مع ضمان كامل من الشركة المصنعة.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300">
              <Shield className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">منتجات أصلية</h3>
              <p className="text-gray-600">منتجات أصلية مضمونة مع تغطية ضمان كاملة.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300">
              <Star className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">مجموعة مختارات متميزة</h3>
              <p className="text-gray-600">مجموعة منتقاة بعناية من أرقى العلامات التجارية.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300">
              <Zap className="h-10 w-10 text-violet-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">عروض حصرية</h3>
              <p className="text-gray-600">عروض خاصة وعروض ترويجية من العلامات التجارية المتميزة.</p>
            </div>
          </motion.div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link 
                to={`/brand/${brand.id}`}
                className="group relative flex items-center justify-center h-32 p-6 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-blue-200/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="max-h-16 transition-all duration-300 group-hover:scale-110 filter grayscale group-hover:grayscale-0" 
                />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-medium group"
          >
            <Link to="/brands" className="flex items-center gap-2">
      استكشف جميع العلامات التجارية
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
