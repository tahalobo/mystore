
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const brands = [
  { name: "Brand 1", logo: "https://via.placeholder.com/150" },
  { name: "Brand 2", logo: "https://via.placeholder.com/150" },
  { name: "Brand 3", logo: "https://via.placeholder.com/150" },
  { name: "Brand 4", logo: "https://via.placeholder.com/150" },
  { name: "Brand 5", logo: "https://via.placeholder.com/150" },
  { name: "Brand 6", logo: "https://via.placeholder.com/150" },
  { name: "Brand 7", logo: "https://via.placeholder.com/150" },
  { name: "Brand 8", logo: "https://via.placeholder.com/150" },
];

const BrandsShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">علامات تجارية موثوقة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">نتعاون مع أكبر العلامات التجارية لنقدم لك منتجات عالية الجودة</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brands.map((brand, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="border border-gray-100 bg-white transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <CardContent className="p-6 flex items-center justify-center">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="max-h-16 opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
