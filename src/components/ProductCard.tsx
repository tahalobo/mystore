
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
import { formatPrice } from "@/utils/currency";

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
    // Always navigate to product detail page
    navigate(`/product/${product.id}`);
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
      toast.info(`${product.name} تمت إزالتها من قائمة الرغبات`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} أضيفت إلى قائمة الأمنيات!`);
    }
  };

  const discountedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <motion.div 
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white border border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-xl h-full flex flex-col",
        className
      )}
      onClick={handleCardClick}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100">
          <motion.img 
            src="/lovable-uploads/e9f3b555-0da2-47b3-a199-b5ee1fced447.png"
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700"
            initial={{ scale: 1 }}
            animate={{ scale: isHovered ? 1.05 : 1, rotate: isHovered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          />
        </div>
        
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/product/${product.id}`);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.bestSeller && (
            <Badge variant="default" className="bg-amber-500 text-white hover:bg-amber-600 text-xs rounded-full px-2 py-0.5 shadow-sm">
        الأكثر مبيعاً
            </Badge>
          )}
          
          {product.newArrival && (
            <Badge variant="default" className="bg-emerald-500 text-white hover:bg-emerald-600 text-xs rounded-full px-2 py-0.5 shadow-sm">
              جديد
            </Badge>
          )}
          
          {product.featured && (
            <Badge variant="default" className="bg-purple-500 text-white hover:bg-purple-600 text-xs rounded-full px-2 py-0.5 shadow-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              مميز
            </Badge>
          )}
        </div>
        
        {product.discount && (
          <div className="absolute right-2 top-2">
            <Badge variant="destructive" className="rounded-full px-1.5 py-0.5 text-[10px] font-medium shadow-sm">
              -{product.discount}%
            </Badge>
          </div>
        )}
        
        {product.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <span className="rounded-full bg-white/90 px-6 py-2 font-semibold text-red-600 shadow-md">
            غير متوفر من المخزون
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col p-4 flex-grow">
        <span className="text-xs font-medium uppercase tracking-wider text-primary/80">
          {product.category.replace('-', ' ')}
        </span>
        
        <h3 className="mt-1 line-clamp-2 min-h-[40px] font-bold text-gray-800 transition-colors group-hover:text-primary/90">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-center gap-1">
          <div className="flex items-center text-xs font-medium text-gray-500">
            <Tag className="h-3 w-3 mr-1" />
            <span>ID: {product.id}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-3 flex items-end justify-between">
          <div className="flex flex-col">
            {product.discount ? (
              <>
                <span className="text-sm font-medium text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatPrice(discountedPrice)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {product.stock > 0 && product.stock <= 5 && (
            <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              <Clock className="mr-1 h-3 w-3" />
              <span>فقط {product.stock} بقي</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
          {product.featured && (
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
              <BadgeCheck className="mr-1 h-3 w-3 text-primary" />
              <span>مميز</span>
            </div>
          )}
          <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full">
            <Shield className="mr-1 h-3 w-3 text-primary" />
            <span>ضمان</span>
          </div>
        </div>

        <div className="mt-4 sm:hidden">
          <Button 
            onClick={handleAddToCart} 
            disabled={product.stock === 0 || isAddingToCart}
            className="w-full rounded-full"
            variant="default"
            size="sm"
          >
            {isAddingToCart ? (
              <>
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                أضف...
              </>
            ) : (
              <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                اضافة للسلة
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
