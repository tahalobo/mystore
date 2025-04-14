
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

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
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-16 overflow-hidden bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Our Featured Brands
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover premium products from the world's most trusted technology brands.
              We partner with industry leaders to bring you the best in tech.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button asChild variant="outline" className="bg-white hover:bg-blue-50">
              <Link to="/brands" className="flex items-center gap-2">
                Explore All Brands
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white border border-gray-100 group"
            >
              <div className={`h-24 flex items-center justify-center p-4 ${brand.color}`}>
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="max-h-16 max-w-[140px] object-contain filter brightness-0 invert transition-all duration-300" 
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{brand.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">{brand.products} Products</span>
                  <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-primary transition-colors">
                    <Link to={`/brand/${brand.id}`}>
                      View Collection
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
