
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const brands = [
  {
    id: "apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
    slogan: "Think Different",
    category: "Consumer Electronics",
    productCount: 42
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
    slogan: "Do What You Can't",
    category: "Electronics & Technology",
    productCount: 56
  },
  {
    id: "sony",
    name: "Sony",
    logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
    slogan: "Be Moved",
    category: "Entertainment & Electronics",
    productCount: 38
  },
  {
    id: "bose",
    name: "Bose",
    logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
    slogan: "Better Sound Through Research",
    category: "Audio Equipment",
    productCount: 24
  },
  {
    id: "jbl",
    name: "JBL",
    logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
    slogan: "Sound that Moves You",
    category: "Audio Systems",
    productCount: 31
  },
  {
    id: "anker",
    name: "Anker",
    logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
    slogan: "Power for All",
    category: "Mobile Accessories",
    productCount: 47
  }
];

const BrandsSection: React.FC = () => {
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
            Top Brands
          </motion.h2>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            We partner with the world's leading technology brands
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
                      <img 
                        src={brand.logo} 
                        alt={`${brand.name} logo`}
                        className="max-h-full object-contain transform group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{brand.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{brand.slogan}</p>
                      <div className="text-xs text-gray-400 mb-4">{brand.category}</div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600">{brand.productCount} Products</span>
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
      </div>
    </section>
  );
};

export default BrandsSection;
