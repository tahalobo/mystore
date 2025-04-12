
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn("overflow-hidden rounded-xl shadow-md hover:shadow-lg", className)}
    >
      <Link to={`/category/${id}`} className="block relative group">
        <div className="relative aspect-square">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-semibold mb-1">{name}</h3>
              {count !== undefined && (
                <p className="text-sm text-white/80">{count} products</p>
              )}
            </div>
            
            <motion.div 
              className="bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
