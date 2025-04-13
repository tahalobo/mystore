
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { allProducts } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Product } from "@/types";
import { ShoppingBag, Percent, Clock, BadgePercent, Tag, Sparkles } from "lucide-react";

const Deals: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter products based on selected filter
  const getFilteredProducts = () => {
    switch (selectedFilter) {
      case "flash-deals":
        return allProducts.filter(p => p.discount && p.discount >= 30);
      case "clearance":
        return allProducts.filter(p => p.discount && p.discount >= 50);
      case "bundle-deals":
        // In a real app, you would have a separate field for bundle deals
        // Here, we'll simulate it by using products that are featured and have a discount
        return allProducts.filter(p => p.featured && p.discount);
      case "new-deals":
        return allProducts.filter(p => p.newArrival && p.discount);
      default:
        return allProducts.filter(p => p.discount);
    }
  };
  
  const filteredProducts = getFilteredProducts();
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="mb-4 text-4xl font-extrabold leading-tight md:text-5xl">
                  Special Offers & <br />
                  <span className="text-yellow-300">Exclusive Deals</span>
                </h1>
                <p className="mb-6 text-lg opacity-90">
                  Discover our limited-time offers and save big on your favorite products.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop All Deals
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                    <Clock className="mr-2 h-5 w-5" />
                    Flash Sales
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="hidden md:block"
              >
                <div className="relative mx-auto max-w-md">
                  <div className="absolute -right-6 -top-6 rounded-full bg-yellow-400 p-4 text-purple-700 shadow-lg">
                    <Percent className="h-8 w-8" />
                  </div>
                  <div className="rounded-xl bg-white/10 p-6 backdrop-blur-md">
                    <div className="mb-4 text-center">
                      <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
                        Limited Time Offer
                      </span>
                    </div>
                    <h3 className="mb-2 text-center text-2xl font-bold">Up to 50% OFF</h3>
                    <p className="mb-4 text-center text-sm">
                      Get amazing discounts on top products
                    </p>
                    <div className="grid grid-cols-4 gap-3 text-center">
                      <div className="rounded-md bg-white/20 p-2">
                        <div className="text-xl font-bold">23</div>
                        <div className="text-xs">Days</div>
                      </div>
                      <div className="rounded-md bg-white/20 p-2">
                        <div className="text-xl font-bold">12</div>
                        <div className="text-xs">Hours</div>
                      </div>
                      <div className="rounded-md bg-white/20 p-2">
                        <div className="text-xl font-bold">45</div>
                        <div className="text-xs">Mins</div>
                      </div>
                      <div className="rounded-md bg-white/20 p-2">
                        <div className="text-xl font-bold">18</div>
                        <div className="text-xs">Secs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Deals Categories */}
        <div className="border-b bg-gray-50">
          <div className="container mx-auto px-4 py-4">
            <Tabs defaultValue="all" value={selectedFilter} onValueChange={setSelectedFilter}>
              <TabsList className="grid w-full grid-cols-2 gap-2 md:grid-cols-5 lg:w-auto">
                <TabsTrigger value="all" className="flex items-center">
                  <Tag className="mr-2 h-4 w-4" />
                  All Deals
                </TabsTrigger>
                <TabsTrigger value="flash-deals" className="flex items-center">
                  <BadgePercent className="mr-2 h-4 w-4" />
                  Flash Deals
                </TabsTrigger>
                <TabsTrigger value="clearance" className="flex items-center">
                  <Percent className="mr-2 h-4 w-4" />
                  Clearance
                </TabsTrigger>
                <TabsTrigger value="bundle-deals" className="flex items-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Bundle Deals
                </TabsTrigger>
                <TabsTrigger value="new-deals" className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  New Deals
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 flex justify-between">
            <h2 className="text-2xl font-bold">
              {selectedFilter === "all" ? "All Deals" : 
               selectedFilter === "flash-deals" ? "Flash Deals" : 
               selectedFilter === "clearance" ? "Clearance Sale" : 
               selectedFilter === "bundle-deals" ? "Bundle Deals" : 
               "New Deals"}
            </h2>
            <span className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard 
                    product={product} 
                    onProductClick={handleProductClick} 
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
              <BadgePercent className="mb-4 h-12 w-12 text-gray-400" />
              <h2 className="mb-2 text-xl font-semibold">No deals available</h2>
              <p className="text-gray-600">
                There are currently no deals in this category. Please check back later.
              </p>
            </div>
          )}
        </div>
        
        {/* Newsletter Section */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Get Notified About New Deals</h2>
              <p className="mb-8 text-gray-600">
                Subscribe to our newsletter and never miss out on our exclusive deals and promotions.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none sm:flex-1"
                />
                <Button size="lg">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Deals;
