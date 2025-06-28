
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const FeaturedBrandSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-1/2 mb-8 lg:mb-0"
          >
            <div className="flex items-center mb-4">
              <Star className="h-8 w-8 text-yellow-400 ml-2" />
              <h2 className="text-3xl md:text-4xl font-bold">علامة تجارية مميزة</h2>
            </div>
            <p className="text-lg mb-6 text-purple-100">
              اكتشف منتجات العلامات التجارية الرائدة والمبتكرة في عالم التكنولوجيا
            </p>
            <Button variant="secondary" asChild>
              <Link to="/brands" className="flex items-center">
                استكشف العلامات التجارية
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-2">جودة عالمية</h3>
              <p className="text-purple-100">
                منتجات معتمدة من أفضل العلامات التجارية في العالم
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrandSection;
