
import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CategoryCard from "../CategoryCard";

const CategoriesSection: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
        تسوق حسب الفئة
          </motion.h2>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
           تصفح مجموعتنا الواسعة من المنتجات حسب الفئة
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard 
                id={category.id}
                name={category.name}
                image={category.image}
                count={category.count || 0}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
