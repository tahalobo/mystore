
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { allProducts } from "@/data/products";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Clock, Tag, Percent, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Filter products with discounts (for this demo, let's add some discounts if they don't exist)
const getDiscountedProducts = (): Product[] => {
  return allProducts.map(product => {
    if (product.discount) return product;
    // Add random discounts for demo purposes
    const shouldHaveDiscount = Math.random() > 0.4;
    if (shouldHaveDiscount) {
      return {
        ...product,
        discount: Math.floor(Math.random() * 30) + 10 // Random discount between 10-40%
      };
    }
    return product;
  }).filter(product => product.discount);
};

const currentDate = new Date();
const endDate = new Date(currentDate);
endDate.setDate(currentDate.getDate() + 5); // Sale ends in 5 days

const Deals: React.FC = () => {
  const discountedProducts = getDiscountedProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  // Calculate countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 md:mb-0 text-center md:text-left"
              >
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Spring Sale</h1>
                <p className="text-xl md:text-2xl mb-6 text-white/80">Up to 40% off on selected items</p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6"
              >
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold flex items-center justify-center">
                    <Clock className="mr-2 h-5 w-5" /> Sale Ends In
                  </h2>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold">{timeLeft.days}</div>
                    <div className="text-xs text-white/80">Days</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold">{timeLeft.hours}</div>
                    <div className="text-xs text-white/80">Hours</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                    <div className="text-xs text-white/80">Minutes</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                    <div className="text-xs text-white/80">Seconds</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Deals */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Deals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {discountedProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <div className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full w-fit mb-2">
                      {product.discount}% OFF
                    </div>
                    <h3 className="text-white text-xl font-bold mb-1">{product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold">${(product.price * (1 - product.discount! / 100)).toFixed(2)}</span>
                      <span className="text-white/70 line-through text-sm">${product.price.toFixed(2)}</span>
                    </div>
                    <Button 
                      className="mt-4 w-full bg-white text-primary hover:bg-white/90"
                      onClick={() => openProductModal(product)}
                    >
                      View Deal
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* All Deals */}
            <h2 className="text-2xl font-bold mb-8">All Deals</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {discountedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <ProductCard 
                    product={product}
                    onProductClick={openProductModal}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Deal Categories */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Shop Deals By Category</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Headphones Deals",
                  discount: "Up to 30% off",
                  image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300",
                  link: "/category/headphones"
                },
                {
                  title: "Phone Cases Deals",
                  discount: "Up to 25% off",
                  image: "https://images.unsplash.com/photo-1586931775007-15a23142a605?q=80&w=300",
                  link: "/category/phone-cases"
                },
                {
                  title: "Chargers Deals",
                  discount: "Up to 20% off",
                  image: "https://images.unsplash.com/photo-1583863788434-e62bd5126776?q=80&w=300",
                  link: "/category/chargers"
                },
                {
                  title: "Speakers Deals",
                  discount: "Up to 40% off",
                  image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=300",
                  link: "/category/speakers"
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to={category.link}>
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4">
                      <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full w-fit mb-2">
                        {category.discount}
                      </div>
                      <h3 className="text-white text-lg font-bold mb-1">{category.title}</h3>
                      <div className="flex items-center text-white/90 text-sm font-medium">
                        Shop Now <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-12 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-xl mx-auto">
              <Percent className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe for Exclusive Deals</h2>
              <p className="mb-6">
                Be the first to know about our special deals and new products. Subscribe to our newsletter!
              </p>
              <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-4 py-2 rounded-md flex-1 text-gray-800"
                />
                <Button className="bg-white text-primary hover:bg-white/90">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </section>
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

export default Deals;
