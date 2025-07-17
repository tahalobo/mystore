
import React from "react";
import { motion } from "framer-motion";

const BrandsShowcase: React.FC = () => {
  const brands = [
    { name: "Apple", logo: "🍎" },
    { name: "Samsung", logo: "📱" },
    { name: "Google", logo: "🔍" },
    { name: "Microsoft", logo: "🪟" },
    { name: "Sony", logo: "🎮" },
    { name: "Nike", logo: "✓" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">العلامات التجارية المميزة</h2>
          <p className="text-gray-600">تسوق من أفضل العلامات التجارية العالمية</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-4xl mb-2">{brand.logo}</div>
              <h3 className="font-medium text-gray-800">{brand.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
