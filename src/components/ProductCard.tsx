
import React, { useState } from "react";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { ShoppingBag, Heart, Clock, BadgeCheck, Shield, Eye, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
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
        "group relative overflow-hidden rounded-2xl bg-white border border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-xl h-full",
        className
      )}
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <div 
          className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6"
        >
          <motion.img 
            src={product.image || "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png"} 
            alt={product.name}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1, rotate: isHovered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
        
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <motion.button 
              className={cn(
                "flex items-center justify-center rounded-full w-10 h-10 shadow-md transition-colors",
                isInWishlist(product.id) 
                  ? "bg-red-50 text-red-500 hover:bg-red-100" 
                  : "bg-white text-gray-700 hover:bg-primary hover:text-white"
              )}
              onClick={toggleWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className={cn(
                "h-5 w-5", 
                isInWishlist(product.id) && "fill-red-500"
              )} />
            </motion.button>
            
            <motion.button 
              className={cn(
                "flex items-center justify-center rounded-full bg-primary w-10 h-10 text-white shadow-md transition-colors hover:bg-primary/90",
                (product.stock === 0 || isAddingToCart) && "cursor-not-allowed opacity-60"
              )}
              disabled={product.stock === 0 || isAddingToCart}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isAddingToCart ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <ShoppingBag className="h-5 w-5" />
              )}
            </motion.button>

            <motion.button 
              className="flex items-center justify-center rounded-full bg-white w-10 h-10 text-gray-700 shadow-md transition-colors hover:bg-gray-50"
              onClick={handleCardClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        
        {/* Product badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.bestSeller && (
            <Badge variant="default" className="bg-amber-500 text-white hover:bg-amber-600 rounded-full px-3 shadow-md">
              Best Seller
            </Badge>
          )}
          
          {product.newArrival && (
            <Badge variant="default" className="bg-emerald-500 text-white hover:bg-emerald-600 rounded-full px-3 shadow-md">
              New
            </Badge>
          )}
          
          {product.featured && (
            <Badge variant="default" className="bg-purple-500 text-white hover:bg-purple-600 rounded-full px-3 shadow-md">
              <Sparkles className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        
        {product.discount && (
          <div className="absolute right-3 top-3">
            <Badge variant="destructive" className="rounded-full px-3 py-1.5 text-xs font-bold shadow-md flex items-center">
              <span className="-ml-0.5 mr-1 text-lg font-bold">{product.discount}%</span> OFF
            </Badge>
          </div>
        )}
        
        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <span className="rounded-full bg-white/90 px-6 py-2 font-semibold text-red-600 shadow-md">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="flex flex-col p-5">
        {/* Category */}
        <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
          {product.category.replace('-', ' ')}
        </span>
        
        {/* Product name */}
        <h3 className="mt-1 line-clamp-2 font-bold text-gray-800 transition-colors group-hover:text-primary/90">
          {product.name}
        </h3>
        
        {/* Product ID instead of Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center text-xs font-medium text-gray-500">
            <Tag className="h-3 w-3 mr-1" />
            <span>ID: {product.id}</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="mt-3 flex items-end justify-between">
          <div className="flex flex-col">
            {product.discount ? (
              <>
                <span className="text-sm font-medium text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl font-bold text-primary">
                  ${discountedPrice}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Stock indicator */}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              <Clock className="mr-1 h-3 w-3" />
              <span>Only {product.stock} left</span>
            </div>
          )}
        </div>
        
        {/* Additional features */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
          {product.featured && (
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
              <BadgeCheck className="mr-1 h-3 w-3 text-primary" />
              <span>Premium</span>
            </div>
          )}
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
            <Shield className="mr-1 h-3 w-3 text-primary" />
            <span>Warranty</span>
          </div>
        </div>

        {/* Add to Cart - Mobile Only */}
        <div className="mt-4 sm:hidden">
          <Button 
            onClick={handleAddToCart} 
            disabled={product.stock === 0 || isAddingToCart}
            className="w-full rounded-full"
            variant="default"
          >
            {isAddingToCart ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
