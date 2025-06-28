
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BrandsShowcase: React.FC = () => {
  const brands = [
    { name: "Apple", logo: "🍎" },
    { name: "Samsung", logo: "📱" },
    { name: "Sony", logo: "🎵" },
    { name: "LG", logo: "📺" },
    { name: "Huawei", logo: "📲" },
    { name: "Xiaomi", logo: "⚡" },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">العلامات التجارية المميزة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            نعمل مع أفضل العلامات التجارية العالمية لنقدم لك منتجات عالية الجودة
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="text-3xl mb-2">{brand.logo}</div>
              <h3 className="font-semibold">{brand.name}</h3>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild>
            <Link to="/brands" className="flex items-center">
              عرض جميع العلامات التجارية
              <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
