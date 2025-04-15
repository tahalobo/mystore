
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const brands = [
  { id: "apple", name: "Apple", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop" },
  { id: "samsung", name: "Samsung", logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop" },
  { id: "sony", name: "Sony", logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop" },
  { id: "bose", name: "Bose", logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop" },
  { id: "jbl", name: "JBL", logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop" },
  { id: "anker", name: "Anker", logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop" },
];

const BrandsShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-4">Trusted Brands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover premium products from the world's leading technology brands.
            All products are authentic and come with full warranty coverage.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link 
                to={`/brand/${brand.id}`}
                className="bg-white rounded-xl shadow-sm p-6 h-32 flex items-center justify-center hover:shadow-md transition-shadow duration-300 group"
              >
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`} 
                  className="max-h-16 transition-all duration-300 group-hover:scale-110" 
                />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link 
            to="/brands"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Brands
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
