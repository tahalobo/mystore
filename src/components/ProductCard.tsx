
import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Star, ShoppingCart, Heart, Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
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
    
    setIsAddingToCart(true);
    
    // Simulate delay for better UX feedback
    setTimeout(() => {
      addToCart(product);
      
      toast(`Added ${product.name} to cart`, {
        description: `$${product.price.toFixed(2)}`,
        action: {
          label: "View Cart",
          onClick: () => window.location.href = "/cart"
        }
      });
      
      setIsAddingToCart(false);
    }, 600);
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
        "product-card rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition-all",
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
          
          {product.featured && (
            <motion.span 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded-full"
            >
              Featured
            </motion.span>
          )}
        </div>
        
        {product.discount && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full"
          >
            {product.discount}%
            <br />Off
          </motion.div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-black text-white font-medium rounded-md">Out of Stock</span>
          </div>
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
                className={cn(
                  "bg-white hover:bg-primary hover:text-white relative overflow-hidden",
                  isAddingToCart && "pointer-events-none"
                )}
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddingToCart}
              >
                <AnimatePresence>
                  {isAddingToCart ? (
                    <motion.div 
                      key="loading"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
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
          <div className="flex">
            {renderStars(product.rating)}
          </div>
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
          
          {product.stock > 0 ? (
            <Button 
              variant="default" 
              size="sm" 
              className={cn(
                "relative overflow-hidden",
                isAddingToCart && "pointer-events-none"
              )}
              onClick={handleAddToCart}
              disabled={isAddingToCart}
            >
              <AnimatePresence mode="wait">
                {isAddingToCart ? (
                  <motion.div
                    key="adding"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center"
                  >
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </motion.div>
                ) : (
                  <motion.div
                    key="normal"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2 inline-block" />
                    Add to Cart
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>
              Out of Stock
            </Button>
          )}
        </div>
        
        {/* Stock indicator */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="mt-2 text-xs text-amber-600">
            Only {product.stock} left in stock
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
