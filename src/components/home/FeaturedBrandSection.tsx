
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
}

const featuredBrand: Brand = {
  id: "apple",
  name: "TechGear Pro",
  logo: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png",
  description: "Experience premium quality accessories crafted for modern tech enthusiasts",
  category: "headphones"
};

const FeaturedBrandSection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleShopNow = () => {
    navigate(`/category/${featuredBrand.category}`);
  };
  
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-white rounded-3xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Side */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 md:p-16 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, rotate: -5 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-sm"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 w-full h-full"></div>
                <img 
                  src={featuredBrand.logo} 
                  alt={featuredBrand.name} 
                  className="w-full h-auto object-contain relative z-10 drop-shadow-2xl mix-blend-multiply"
                />
              </motion.div>
            </div>
            
            {/* Content Side */}
            <div className="p-8 md:p-16 flex items-center">
              <div className="max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-sm text-primary font-semibold uppercase tracking-wider mb-2">
                    Featured Brand
                  </h2>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {featuredBrand.name}
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    {featuredBrand.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="rounded-full gap-2"
                      onClick={handleShopNow}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      Shop Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full gap-2"
                      onClick={() => navigate('/shop')}
                    >
                      View All Brands
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">50+</div>
                      <div className="text-sm text-gray-500">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">4.9</div>
                      <div className="text-sm text-gray-500">Average Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">24h</div>
                      <div className="text-sm text-gray-500">Support</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBrandSection;
