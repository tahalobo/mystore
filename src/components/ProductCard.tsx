
import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Star, ShoppingBag, Heart, Clock, BadgeCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
  onProductClick?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, onProductClick }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />);
      } else if (i === fullStars && rating % 1 > 0) {
        stars.push(<Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
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
      setIsAddingToCart(false);
      toast.success(`${product.name} added to cart!`);
    }, 600);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  // Calculate discount price if applicable
  const discountedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100)).toFixed(2) 
    : product.price.toFixed(2);

  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg",
        className
      )}
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image - Now consistently landscape */}
      <div className="relative overflow-hidden bg-gray-50">
        <div className="aspect-[4/3] flex items-center justify-center p-4">
          <motion.img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-contain"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
        
        {/* Quick actions overlay */}
        <div 
          className={`absolute inset-0 bg-black/0 transition-colors ${isHovered ? 'bg-black/5' : ''}`}
        >
          <div className={`absolute bottom-0 left-0 right-0 flex justify-center gap-2 bg-white/90 p-3 backdrop-blur-sm transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}>
            <motion.button 
              className={cn(
                "flex items-center justify-center rounded-full p-2 shadow-md transition-all",
                isInWishlist(product.id) 
                  ? "bg-red-50 text-red-500 hover:bg-red-100" 
                  : "bg-white hover:bg-primary hover:text-white"
              )}
              onClick={toggleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={cn(
                "h-4 w-4", 
                isInWishlist(product.id) && "fill-red-500"
              )} />
            </motion.button>
            
            <motion.button 
              className={cn(
                "flex items-center justify-center rounded-full bg-primary p-2 text-white shadow-md transition-all hover:bg-primary/90",
                (product.stock === 0 || isAddingToCart) && "cursor-not-allowed opacity-60"
              )}
              disabled={product.stock === 0 || isAddingToCart}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAddingToCart ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
            </motion.button>
          </div>
        </div>
        
        {/* Product badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.bestSeller && (
            <Badge variant="default" className="bg-amber-500 text-white hover:bg-amber-600">
              Best Seller
            </Badge>
          )}
          
          {product.newArrival && (
            <Badge variant="default" className="bg-green-500 text-white hover:bg-green-600">
              New
            </Badge>
          )}
          
          {product.featured && (
            <Badge variant="default" className="bg-purple-500 text-white hover:bg-purple-600">
              Featured
            </Badge>
          )}
        </div>
        
        {product.discount && (
          <div className="absolute right-3 top-3">
            <Badge variant="destructive" className="rounded-full px-2 py-1 text-xs font-bold">
              {product.discount}% OFF
            </Badge>
          </div>
        )}
        
        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="rounded-full bg-white px-4 py-2 font-semibold text-red-600">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="flex flex-col p-4">
        {/* Category */}
        <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
          {product.category.replace('-', ' ')}
        </span>
        
        {/* Product name */}
        <h3 className="mt-1 line-clamp-2 font-semibold text-gray-800 transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex gap-0.5">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            {product.discount ? (
              <>
                <span className="text-sm font-medium text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-primary">
                  ${discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Stock indicator */}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="flex items-center text-xs font-medium text-amber-600">
              <Clock className="mr-1 h-3 w-3" />
              <span>Only {product.stock} left</span>
            </div>
          )}
        </div>
        
        {/* Additional features */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
          {product.featured && (
            <div className="flex items-center">
              <BadgeCheck className="mr-1 h-3 w-3 text-primary" />
              <span>Premium</span>
            </div>
          )}
          <div className="flex items-center">
            <Shield className="mr-1 h-3 w-3 text-primary" />
            <span>Warranty</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
