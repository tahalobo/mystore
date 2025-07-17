
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBrands, ApiBrand } from "@/utils/brandsApi";

const BrandsSection: React.FC = () => {
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await getBrands();
        // Show random 8 brands for the section
        const shuffledBrands = brandsData.sort(() => 0.5 - Math.random()).slice(0, 8);
        setBrands(shuffledBrands);
      } catch (error) {
        console.error('Error loading brands:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadBrands();
  }, []);

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-grid-white/20 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">العلامات التجارية</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              اشهر العلامات التجارية
            </h2>
            <p className="text-gray-600 text-lg">جاري تحميل العلامات التجارية...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15)_0%,transparent_50%),radial-gradient(circle_at_bottom_left,rgba(147,51,234,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-grid-white/20 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse-slow" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-6 w-6 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">العلامات التجارية</span>
          </motion.div>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            اشهر العلامات التجارية
          </motion.h2>
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            نحن نتشارك مع العلامات التجارية الرائدة في مجال التكنولوجيا في العالم لنقدم لك أفضل المنتجات
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Link to={`/brand/${brand.id}`}>
                <Card className="relative overflow-hidden bg-white/70 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white/80">
                  {/* Gradient Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 p-[1px] rounded-lg">
                    <div className="h-full w-full bg-white/90 backdrop-blur-xl rounded-lg" />
                  </div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  
                  <CardContent className="relative p-8">
                    {/* Brand Icon Area */}
                    <div className="h-24 flex items-center justify-center mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-xl group-hover:from-blue-200/60 group-hover:to-purple-200/60 transition-all duration-300" />
                      <div className="relative text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">
                        {brand.name.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                        {brand.name}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">منتجات عالية الجودة</p>
                      
                      {brand.code && (
                        <div className="inline-flex items-center px-3 py-1 bg-gray-100/80 rounded-full">
                          <span className="text-xs font-medium text-gray-600">كود: {brand.code}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-sm font-semibold text-blue-600">منتجات متنوعة</span>
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-50 group-hover:bg-blue-100 rounded-full transition-all duration-300 group-hover:scale-110">
                          <ChevronRight className="h-4 w-4 text-blue-600 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {brands.length > 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Link to="/brands" className="flex items-center gap-2">
                عرض جميع العلامات التجارية
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BrandsSection;
