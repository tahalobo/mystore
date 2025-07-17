
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  count?: number;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, count, className }) => {
  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-2xl border border-gray-100/50 backdrop-blur-sm", className)}
    >
      <Link to={`/category/${id}`} className="block relative">
        {/* Image Container with Enhanced Overlay */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          
          {/* Multi-layered gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-75 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
            <Package className="w-5 h-5 text-white/90" />
          </div>
        </div>
        
        {/* Enhanced Content Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <motion.h3 
                className="text-xl font-bold mb-2 text-white drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {name}
              </motion.h3>
              {count !== undefined && (
                <motion.div 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <p className="text-sm font-medium text-white/95">{count} منتج</p>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Enhanced Arrow Button */}
            <motion.div 
              className="bg-white/20 backdrop-blur-md p-3 rounded-full opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 hover:bg-white/30"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
