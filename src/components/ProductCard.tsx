
import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, onProductClick }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
      } else if (i === fullStars && rating % 1 > 0) {
        // This would be a half star, but for simplicity using full star
        stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    
    return stars;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onProductClick) {
      e.preventDefault();
      onProductClick(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast(`Added ${product.name} to cart`, {
      description: `$${product.price.toFixed(2)}`,
      action: {
        label: "View Cart",
        onClick: () => window.location.href = "/cart"
      }
    });
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast(`Added ${product.name} to wishlist`, {
        description: "You can view your wishlist in your account",
      });
    } else {
      toast(`Removed ${product.name} from wishlist`);
    }
  };

  return (
    <motion.div 
      className={cn(
        "product-card group rounded-lg overflow-hidden bg-white shadow hover:shadow-lg",
        className
      )}
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <motion.img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Product Labels */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.bestSeller && (
            <motion.span 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded-full"
            >
              Best Seller
            </motion.span>
          )}
          
          {product.newArrival && (
            <motion.span 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full"
            >
              New Arrival
            </motion.span>
          )}
        </div>
        
        {product.discount && (
          <motion.span 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full"
          >
            {product.discount}% Off
          </motion.span>
        )}
        
        {/* Product Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-10 flex items-center justify-center">
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="secondary" 
                size="icon" 
                className="bg-white hover:bg-primary hover:text-white"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="secondary" 
                size="icon" 
                className={cn(
                  "bg-white hover:bg-primary hover:text-white",
                  isWishlisted && "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white"
                )}
                onClick={toggleWishlist}
              >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500")} />
              </Button>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="secondary" 
                size="icon" 
                className="bg-white hover:bg-primary hover:text-white"
                onClick={handleCardClick}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium line-clamp-1 hover:text-primary transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        
        <div className="flex items-center mt-1">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        
        <div className="mt-2 flex justify-between items-center">
          <div>
            {product.discount ? (
              <div className="flex items-center space-x-2">
                <span className="font-semibold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
              </div>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            variant="primary" 
            size="sm" 
            className="btn-hover-effect"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
