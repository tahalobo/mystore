
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
import { Star, ShoppingCart, Heart, Check, Truck, RefreshCw } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

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
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(
    product?.colors ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = React.useState(1);

  // Reset state when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors ? product.colors[0] : undefined);
      setQuantity(1);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor);
      onClose();
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
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden animate-scale">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image Section */}
          <div className="relative bg-gray-100 p-8 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-[300px] object-contain animate-fade-in"
            />
            {product.bestSeller && (
              <Badge variant="default" className="absolute top-4 left-4 bg-amber-500">
                Best Seller
              </Badge>
            )}
            {product.newArrival && (
              <Badge variant="default" className="absolute top-4 left-4 bg-green-500">
                New Arrival
              </Badge>
            )}
            {product.discount && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                {product.discount}% Off
              </Badge>
            )}
          </div>
          
          {/* Product Details Section */}
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
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
              <div className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>
              
              <p className="mt-4 text-gray-700">{product.description}</p>
              
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Color</h4>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          selectedColor === color 
                            ? "border-primary ring-2 ring-primary ring-opacity-30" 
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      >
                        {selectedColor === color && (
                          <Check className="h-4 w-4 text-white mx-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity Selector */}
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Quantity</h4>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                  <span className="ml-4 text-sm text-gray-500">
                    {product.stock} available
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-8 flex space-x-2">
                <Button 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="outline" className="w-12 flex justify-center">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Product Features */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 mr-2 text-primary" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center text-sm">
                  <RefreshCw className="h-4 w-4 mr-2 text-primary" />
                  <span>30-day free returns</span>
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
