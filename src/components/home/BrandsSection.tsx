
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
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
        // Show random 6 brands for the section
        const shuffledBrands = brandsData.sort(() => 0.5 - Math.random()).slice(0, 6);
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              اشهر العلامات التجارية
            </h2>
            <p className="text-gray-600 mt-2">جاري تحميل العلامات التجارية...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            اشهر العلامات التجارية
          </motion.h2>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            نحن نتشارك مع العلامات التجارية الرائدة في مجال التكنولوجيا في العالم
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/brand/${brand.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm border-blue-100">
                  <CardContent className="p-6">
                    <div className="h-20 flex items-center justify-center mb-6 grayscale group-hover:grayscale-0 transition-all duration-300">
                      <div className="text-2xl font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                        {brand.name}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{brand.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">منتجات عالية الجودة</p>
                      <div className="text-xs text-gray-400 mb-4">كود: {brand.code}</div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">منتجات متنوعة</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-blue-600 transition-colors -mr-2"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {brands.length > 0 && (
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm">
              <Link to="/brands">عرض جميع العلامات التجارية</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrandsSection;
