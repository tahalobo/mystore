
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromotionSection from "@/components/home/PromotionSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getBestSellers, getNewArrivals } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import ProductDetailModal from "@/components/ProductDetailModal";
import BrandsSection from "@/components/home/BrandsSection";
import TrendingSection from "@/components/home/TrendingSection";

const Index: React.FC = () => {
  const bestSellers = getBestSellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      
      <main className="flex-grow">
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts onProductClick={openProductModal} />
        
        {/* Best Sellers Section */}
        <section className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Best Sellers</h2>
                <p className="text-gray-600 mt-2">Our most popular products</p>
              </div>
              <Button variant="link" asChild className="mt-2 md:mt-0 text-primary">
                <Link to="/shop" className="flex items-center">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestSellers.map((product, index) => (
                <div key={product.id} className={`animate-fade-up [animation-delay:${index * 100}ms]`}>
                  <ProductCard 
                    product={product} 
                    onProductClick={openProductModal}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <BrandsSection />
        <PromotionSection />
        
        {/* New Arrivals Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">New Arrivals</h2>
                <p className="text-gray-600 mt-2">Check out our latest products</p>
              </div>
              <Button variant="link" asChild className="mt-2 md:mt-0 text-primary">
                <Link to="/shop" className="flex items-center">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <div key={product.id} className={`animate-fade-up [animation-delay:${index * 100}ms]`}>
                  <ProductCard 
                    product={product}
                    onProductClick={openProductModal}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <TrendingSection onProductClick={openProductModal} />
        <TestimonialsSection />
        <NewsletterSection />
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

export default Index;
