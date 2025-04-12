
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft
} from "lucide-react";
import { motion } from "framer-motion";

const Collection: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get collection name for display
  const getCollectionName = () => {
    if (!collectionId) return "All Collections";
    return collectionId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  // Load products for this collection
  React.useEffect(() => {
    let filtered = [...allProducts];
    
    if (collectionId === "new-arrivals") {
      filtered = filtered.filter(product => product.newArrival);
    } else if (collectionId === "best-sellers") {
      filtered = filtered.filter(product => product.bestSeller);
    } else if (collectionId === "featured") {
      filtered = filtered.filter(product => product.featured);
    } else if (collectionId === "sale") {
      filtered = filtered.filter(product => product.discount && product.discount > 0);
    }
    
    setProducts(filtered);
  }, [collectionId]);
  
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Collection Header */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {getCollectionName()}
              </motion.h1>
              <motion.p 
                className="text-gray-600 max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Discover our premium selection of {getCollectionName().toLowerCase()} for all your tech needs
              </motion.p>
              
              <motion.nav 
                className="flex mt-6 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-primary font-medium">{getCollectionName()}</span>
              </motion.nav>
            </div>
          </div>
        </div>
        
        {/* Collection Content */}
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          {/* Products Grid */}
          <div className="w-full">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <motion.div 
                    key={product.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard 
                      product={product}
                      onProductClick={openProductModal}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium">No products found</h3>
                <p className="text-gray-600 mt-2">This collection is currently empty</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  asChild
                >
                  <Link to="/shop">Browse All Products</Link>
                </Button>
              </div>
            )}
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

export default Collection;
