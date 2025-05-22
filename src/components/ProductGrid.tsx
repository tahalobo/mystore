import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Star, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import { GridViewType } from "./ProductGridToggle";
import { formatPrice } from "@/utils/currency";
interface ProductGridProps {
  products: Product[];
  view: GridViewType;
  onProductClick?: (product: Product) => void;
  emptyMessage?: string;
}
const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  view,
  onProductClick,
  emptyMessage = "لا توجد منتجات متاحة"
}) => {
  const {
    addToCart
  } = useCart();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  } = useWishlist();
  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`تمت إضافة ${product.name} إلى سلة التسوق`);
  };
  const handleToggleWishlist = (e: React.MouseEvent, product: Product) => {
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
  if (products.length === 0) {
    return <div className="w-full py-16 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>;
  }
  if (view === "grid") {
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => <motion.div key={product.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.05,
        duration: 0.4
      }}>
            <ProductCard product={product} onProductClick={onProductClick} />
          </motion.div>)}
      </div>;
  }
  if (view === "list") {
    return <div className="space-y-6">
        {products.map((product, index) => <motion.div key={product.id} className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.05,
        duration: 0.4
      }}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 lg:w-1/4 aspect-[4/3] md:aspect-square relative">
                <Link to={`/product/${product.id}`}>
                  <img src="/lovable-uploads/e9f3b555-0da2-47b3-a199-b5ee1fced447.png" alt={product.name} className="w-full h-full object-cover" />
                </Link>
                
                {product.discount && <Badge variant="destructive" className="absolute top-2 right-2 rounded-full">
                    خصم {product.discount}%
                  </Badge>}
                
                {product.newArrival && <Badge className="absolute top-2 left-2 bg-emerald-500 hover:bg-emerald-600">
                    جديد
                  </Badge>}
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-auto">
                  <div className="flex justify-between items-start">
                    <Link to={`/product/${product.id}`} className="group">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <button onClick={e => handleToggleWishlist(e, product)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>
                  
                  
                  
                  
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-gray-50">
                      {product.category.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center justify-between mt-4">
                  <div className="mb-2 md:mb-0">
                    {product.discount ? <div className="flex items-center">
                        <span className="text-xl font-bold text-primary mr-2">
                          {formatPrice(product.price * (1 - product.discount / 100))}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          {formatPrice(product.price)}
                        </span>
                      </div> : <span className="text-xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={e => handleQuickAdd(e, product)} disabled={product.stock === 0}>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      إضافة للسلة
                    </Button>
                    
                    <Button size="sm" asChild>
                      <Link to={`/product/${product.id}`}>
                        عرض التفاصيل
                        <ArrowRight className="h-4 w-4 mr-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>;
  }

  // Compact view
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {products.map((product, index) => <motion.div key={product.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full" initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      delay: index * 0.03,
      duration: 0.3
    }}>
          <Link to={`/product/${product.id}`} className="block relative">
            <div className="aspect-square bg-gray-50">
              <img src="/lovable-uploads/e9f3b555-0da2-47b3-a199-b5ee1fced447.png" alt={product.name} className="w-full h-full object-contain p-2" />
            </div>
            {product.discount && <Badge variant="destructive" className="absolute top-1 right-1 text-xs rounded-full px-1.5 py-0.5">
                -{product.discount}%
              </Badge>}
          </Link>
          
          <div className="p-2 flex flex-col flex-1">
            <Link to={`/product/${product.id}`} className="block group">
              <h3 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>
            
            <div className="flex items-center justify-between mt-1 mb-auto">
              <div className="flex text-amber-400">
                
                
              </div>
              
              <Badge variant="outline" className="text-[10px] px-1 py-0 h-4">
                {product.category.slice(0, 5)}...
              </Badge>
            </div>
            
            <div className="flex items-center justify-between mt-2 pt-1 border-t">
              <div className="text-sm font-semibold text-primary">
                {formatPrice(product.discount ? product.price * (1 - product.discount / 100) : product.price)}
              </div>
              
              <div className="flex gap-1">
                <button onClick={e => handleToggleWishlist(e, product)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <Heart className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                </button>
                
                <button onClick={e => handleQuickAdd(e, product)} className="text-gray-400 hover:text-primary transition-colors p-1" disabled={product.stock === 0}>
                  <ShoppingBag className="h-3.5 w-3.5" />
                </button>
                
                <Link to={`/product/${product.id}`} className="text-gray-400 hover:text-blue-500 transition-colors p-1">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>)}
    </div>;
};
export default ProductGrid;