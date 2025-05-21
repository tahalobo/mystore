import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromotionSection from "@/components/home/PromotionSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import ScrollToTop from "@/components/ScrollToTop";
import { Product } from "@/types";
import ProductDetailModal from "@/components/ProductDetailModal";
import TrendingSection from "@/components/home/TrendingSection";
import { motion } from "framer-motion";
import FeaturedBrandSection from "@/components/home/FeaturedBrandSection";
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import BrandsShowcase from "@/components/home/BrandsShowcase";
import BannerSection from "@/components/home/BannerSection";

const Index: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  // Scroll animations for sections
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <BannerSection />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <CategoriesSection />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <FeaturedProducts onProductClick={openProductModal} />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <BrandsShowcase />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <FeaturedBrandSection />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <SpecialOffersSection />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <PromotionSection />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <TrendingSection onProductClick={openProductModal} />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <TestimonialsSection />
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        amount: 0.2
      }} variants={sectionVariants}>
          <NewsletterSection />
        </motion.div>
      </main>
      
      <Footer />
      
      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeProductModal} />
      
      <ScrollToTop />
    </div>;
};
export default Index;
