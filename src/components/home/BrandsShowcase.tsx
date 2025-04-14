
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";

const brands = [
  {
    id: "apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
    description: "Innovative tech products with sleek design and seamless ecosystem integration.",
    color: "bg-gradient-to-r from-gray-800 to-gray-900",
    products: 24
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
    description: "Cutting-edge electronics spanning mobile, home appliances, and entertainment.",
    color: "bg-gradient-to-r from-blue-800 to-blue-900",
    products: 32
  },
  {
    id: "sony",
    name: "Sony",
    logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
    description: "Premium audio, video, and gaming products with exceptional quality.",
    color: "bg-gradient-to-r from-indigo-800 to-indigo-900",
    products: 18
  },
  {
    id: "bose",
    name: "Bose",
    logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
    description: "Superior sound systems and noise-canceling headphones for immersive audio experiences.",
    color: "bg-gradient-to-r from-purple-800 to-purple-900",
    products: 14
  },
  {
    id: "jbl",
    name: "JBL",
    logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
    description: "High-performance speakers and audio accessories for energetic sound.",
    color: "bg-gradient-to-r from-orange-600 to-orange-700",
    products: 22
  },
  {
    id: "anker",
    name: "Anker",
    logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
    description: "Reliable charging solutions and portable power accessories with innovative technology.",
    color: "bg-gradient-to-r from-blue-600 to-blue-700",
    products: 28
  }
];

const BrandsShowcase: React.FC = () => {
  return (
    <section className="py-16 overflow-hidden relative">
      {/* Background with pattern and gradient */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDI5NGEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptNiAwaDF2NWgtMXYtNXptLTExIDBoMXY1aC0xdi01em0tNiAwaDN2MWgtM3YtMXptMCAyaDJ2MWgtMnYtMXptMCAyaDFkAASB2MWgtMXYtMXptMTMtMmgxdjFoLTF2LTF6bS0xMyAyaDJWMXYtMWgtMnYtMXptNSAwaDF2MWgtMXYtMXptNSAwaDF2MWgtMXYtMXpNMzAgM2gxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDF2MWgtMXYtMXptLTIgMGgxdjFoLTF2LTF6bS0yIDBoMXYxaC0xdi0xem0tMiAwaDNWNGgtM1YzeiIvPjwvZz48L2c+PC9zdmc+')] opacity-80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 opacity-90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm inline-block">
              Premium Partnerships
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-md mt-4">
              Explore Premium Brands
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-sm md:text-base">
              Discover cutting-edge technology from the world's leading manufacturers.
              We partner exclusively with brands known for quality, innovation, and reliability.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {brands.slice(0, 3).map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <Link 
                to={`/brand/${brand.id}`}
                className="block bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1 border border-white/20"
              >
                <div className={`h-28 flex items-center justify-center p-4 ${brand.color}`}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="max-h-16 max-w-[140px] object-contain filter brightness-0 invert transition-all duration-300" 
                  />
                </div>
                
                <div className="p-5 text-white">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {brand.name}
                    <ArrowRight className="h-4 w-0 ml-0 transition-all duration-300 group-hover:w-4 group-hover:ml-2 opacity-0 group-hover:opacity-100" />
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">{brand.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-300">
                      {brand.products} Products
                    </span>
                    <span className="text-xs text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {brands.slice(3).map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
              className="group"
            >
              <Link 
                to={`/brand/${brand.id}`}
                className="block bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1 border border-white/20"
              >
                <div className={`h-28 flex items-center justify-center p-4 ${brand.color}`}>
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    className="max-h-16 max-w-[140px] object-contain filter brightness-0 invert transition-all duration-300" 
                  />
                </div>
                
                <div className="p-5 text-white">
                  <h3 className="text-xl font-semibold mb-2 flex items-center">
                    {brand.name}
                    <ArrowRight className="h-4 w-0 ml-0 transition-all duration-300 group-hover:w-4 group-hover:ml-2 opacity-0 group-hover:opacity-100" />
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">{brand.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-300">
                      {brand.products} Products
                    </span>
                    <span className="text-xs text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button asChild 
            variant="secondary" 
            className="bg-white text-blue-800 hover:bg-blue-50 border border-white/50 backdrop-blur-sm"
          >
            <Link to="/brands" className="flex items-center gap-2 px-6 py-6 text-base font-medium">
              View All Brands
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
