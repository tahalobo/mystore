
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, Trash, Clock } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion } from "framer-motion";
import ProductDetailModal from "@/components/ProductDetailModal";
import { formatDistanceToNow } from "date-fns";

const Wishlist: React.FC = () => {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        
        <main className="container mx-auto flex-grow px-4 py-8 pt-24">
          <div className="mx-auto max-w-2xl py-16 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <Heart className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="mb-4 text-2xl font-bold">Your wishlist is empty</h2>
            <p className="mb-8 text-gray-600">
              Save your favorite items to your wishlist to come back to them later.
            </p>
            <Button asChild>
              <Link to="/shop">Explore Products</Link>
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Wishlist</h1>
            <Button 
              variant="outline" 
              onClick={clearWishlist}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear Wishlist
            </Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item, index) => (
              <motion.div 
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-lg bg-white shadow-md"
              >
                <div className="relative aspect-square">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="h-full w-full cursor-pointer object-cover"
                    onClick={() => openProductModal(item.product)}
                  />
                  
                  <button 
                    className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-100"
                    onClick={() => removeFromWishlist(item.product.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </button>
                  
                  <div className="absolute bottom-2 left-2 flex items-center rounded-full bg-white/80 px-2 py-1 text-xs backdrop-blur-sm">
                    <Clock className="mr-1 h-3 w-3 text-gray-500" />
                    <span>Added {formatDistanceToNow(new Date(item.addedAt))} ago</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 
                    className="line-clamp-1 cursor-pointer font-medium text-lg hover:text-primary transition-colors"
                    onClick={() => openProductModal(item.product)}
                  >
                    {item.product.name}
                  </h3>
                  
                  <div className="mt-2 font-semibold text-primary">
                    {item.product.discount ? (
                      <div className="flex items-center space-x-2">
                        <span>${(item.product.price * (1 - item.product.discount / 100)).toFixed(2)}</span>
                        <span className="text-sm text-gray-500 line-through">${item.product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span>${item.product.price.toFixed(2)}</span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        addToCart(item.product);
                        removeFromWishlist(item.product.id);
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-8">
            <Button variant="outline" asChild>
              <Link to="/shop" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={closeProductModal} 
        />
      )}
    </div>
  );
};

export default Wishlist;
