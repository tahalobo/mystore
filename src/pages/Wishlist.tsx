
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, Trash } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Product } from "@/types";

// This is a mock wishlist since we don't have a full implementation yet
const mockWishlist = [
  {
    id: "p2",
    name: "Wireless Bluetooth Earbuds",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=600",
    category: "headphones",
    description: "True wireless earbuds with active noise cancellation, touch controls, and up to 24 hours of battery life with the charging case.",
    featured: true,
    newArrival: true,
    stock: 78,
    rating: 4.5,
    reviews: 142,
    colors: ["#000000", "#FFFFFF"]
  },
  {
    id: "p7",
    name: "Noise Cancelling Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600",
    category: "headphones",
    description: "Over-ear headphones with active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions.",
    featured: true,
    stock: 42,
    rating: 4.9,
    reviews: 118,
    colors: ["#000000", "#FFFFFF", "#10B981"]
  },
  {
    id: "p5",
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600",
    category: "speakers",
    description: "Waterproof portable speaker with 360° sound, 12-hour battery life, and built-in microphone for calls.",
    newArrival: true,
    stock: 63,
    rating: 4.4,
    reviews: 76,
    colors: ["#000000", "#3B82F6", "#EF4444"]
  }
];

const Wishlist: React.FC = () => {
  const { addToCart } = useCart();
  const [wishlist, setWishlist] = useState<Product[]>(mockWishlist);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const removeFromWishlist = (productId: string) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };
  
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-24 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
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
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative aspect-square">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openProductModal(product)}
                  />
                  
                  <button 
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 
                    className="text-lg font-medium line-clamp-1 hover:text-primary transition-colors cursor-pointer"
                    onClick={() => openProductModal(product)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => addToCart(product)}
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
      
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal} 
      />
    </div>
  );
};

export default Wishlist;
