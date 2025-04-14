
import React from "react";
import { Product } from "@/types";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Check, Truck, RefreshCw, Package, Shield } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(
    product?.colors ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = React.useState(1);
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const isMobile = useIsMobile();

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors ? product.colors[0] : undefined);
      setQuantity(1);
      setIsAddingToCart(false);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      setIsAddingToCart(true);
      
      // Simulate delay for better UX feedback
      setTimeout(() => {
        addToCart(product, quantity, selectedColor);
        setIsAddingToCart(false);
        onClose();
      }, 600);
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "sm:max-w-[800px] p-0 overflow-hidden",
        isMobile && "h-[90vh] overflow-y-auto"
      )}>
        <div className={cn(
          "grid md:grid-cols-2 gap-0",
          isMobile && "grid-cols-1"
        )}>
          {/* Product Image Section */}
          <div className="relative bg-gray-100 p-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img 
                key={product.image}
                src={product.image} 
                alt={product.name} 
                className={cn(
                  "object-contain",
                  isMobile ? "max-h-[180px]" : "max-h-[300px]"
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            
            {/* Product Labels */}
            <div className="absolute top-4 left-4 flex flex-col gap-1">
              {product.bestSeller && (
                <Badge variant="secondary" className="bg-amber-500 text-white">
                  Best Seller
                </Badge>
              )}
              {product.newArrival && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  New Arrival
                </Badge>
              )}
              {product.featured && (
                <Badge variant="secondary" className="bg-purple-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
            
            {product.discount && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="text-sm font-bold">
                  {product.discount}% OFF
                </Badge>
              </div>
            )}
          </div>
          
          {/* Product Details Section */}
          <div className="p-4 md:p-6">
            <DialogHeader>
              <Badge variant="outline" className="w-fit capitalize text-gray-500">
                {product.category.replace('-', ' ')}
              </Badge>
              <DialogTitle className="text-xl md:text-2xl font-bold mt-2">{product.name}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              {/* Price */}
              <div className="flex items-end gap-2">
                {product.discount ? (
                  <>
                    <div className="text-xl md:text-2xl font-bold text-primary">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </div>
                    <div className="text-sm md:text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </div>
                  </>
                ) : (
                  <div className="text-xl md:text-2xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </div>
                )}
              </div>
              
              <p className="mt-4 text-sm md:text-base text-gray-700">{product.description}</p>
              
              {/* Stock Status */}
              <div className="mt-4 flex items-center">
                <Badge variant={product.stock > 0 ? "outline" : "destructive"} className="px-2 py-1">
                  {product.stock > 10 
                    ? "In Stock" 
                    : product.stock > 0 
                      ? `Only ${product.stock} left` 
                      : "Out of Stock"}
                </Badge>
              </div>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5 md:mt-6">
                  <h4 className="text-sm font-medium mb-2">Color</h4>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 transition-all ${
                          selectedColor === color 
                            ? "border-primary ring-2 ring-primary ring-opacity-30" 
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      >
                        {selectedColor === color && (
                          <Check className="h-3 w-3 md:h-4 md:w-4 text-white mx-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selector */}
              <div className="mt-5 md:mt-6">
                <h4 className="text-sm font-medium mb-2">Quantity</h4>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8 md:h-9 md:w-9"
                  >
                    -
                  </Button>
                  <span className="w-10 md:w-12 text-center text-sm md:text-base">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="h-8 w-8 md:h-9 md:w-9"
                  >
                    +
                  </Button>
                  <span className="ml-3 md:ml-4 text-xs md:text-sm text-gray-500">
                    {product.stock} available
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 md:mt-8 flex space-x-2">
                <Button 
                  className="flex-1 relative overflow-hidden text-sm md:text-base"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAddingToCart}
                >
                  <AnimatePresence mode="wait">
                    {isAddingToCart ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
                
                <Button 
                  variant={isInWishlist(product.id) ? "secondary" : "outline"} 
                  className={cn(
                    "w-10 md:w-12 flex justify-center",
                    isInWishlist(product.id) && "text-red-500 bg-red-50 hover:bg-red-100"
                  )}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={cn("h-4 w-4", isInWishlist(product.id) && "fill-red-500")} />
                </Button>
              </div>
              
              {/* Product Features - hide on small screens to save space */}
              <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4 text-xs">
                <div className="flex items-center">
                  <Truck className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                  <span>30-day returns</span>
                </div>
                <div className="flex items-center">
                  <Package className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                  <span>Secure packaging</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2 text-primary" />
                  <span>2-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
