
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, Info, Star, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Brand data
const brands = [
  {
    id: "apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1516245556508-7d60d4ff0f39?q=80&w=2000&h=500&fit=crop",
    description: "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services.",
    founded: "April 1, 1976",
    headquarters: "Cupertino, California, United States",
    websiteUrl: "https://www.apple.com",
    color: "#333333",
    productCount: 24,
    popularCategories: ["iPhone", "iPad", "Apple Watch", "AirPods"]
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2000&h=500&fit=crop",
    description: "Samsung Electronics Co., Ltd. is a South Korean multinational electronics company headquartered in Suwon, South Korea. It is the flagship division of the Samsung Group.",
    founded: "January 13, 1969",
    headquarters: "Suwon, South Korea",
    websiteUrl: "https://www.samsung.com",
    color: "#1428a0",
    productCount: 32,
    popularCategories: ["Galaxy", "QLED TV", "Soundbar", "Refrigerator"]
  },
  {
    id: "sony",
    name: "Sony",
    logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&h=500&fit=crop",
    description: "Sony Corporation is a Japanese multinational conglomerate corporation headquartered in Kōnan, Minato, Tokyo. The company operates as one of the world's largest manufacturers of consumer and professional electronic products.",
    founded: "May 7, 1946",
    headquarters: "Tokyo, Japan",
    websiteUrl: "https://www.sony.com",
    color: "#000000",
    productCount: 18,
    popularCategories: ["PlayStation", "Bravia TV", "Headphones", "Camera"]
  },
  {
    id: "bose",
    name: "Bose",
    logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
    description: "Bose Corporation is an American manufacturing company that predominantly sells audio equipment. The company was established by Amar Bose in 1964 and is based in Framingham, Massachusetts.",
    founded: "1964",
    headquarters: "Framingham, Massachusetts, United States",
    websiteUrl: "https://www.bose.com",
    color: "#D51C29",
    productCount: 14,
    popularCategories: ["Headphones", "Speakers", "Soundbars", "Audio Sunglasses"]
  },
  {
    id: "jbl",
    name: "JBL",
    logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
    description: "JBL is an American audio hardware manufacturer founded in 1946 by James Bullough Lansing. Their products include loudspeakers and headphones for consumer and professional markets.",
    founded: "1946",
    headquarters: "Los Angeles, California, United States",
    websiteUrl: "https://www.jbl.com",
    color: "#FF6600",
    productCount: 22,
    popularCategories: ["Speakers", "Headphones", "Earbuds", "Soundbars"]
  },
  {
    id: "anker",
    name: "Anker",
    logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2000&h=500&fit=crop",
    description: "Anker Innovations is a Chinese electronics company founded by Steven Yang, a former Google software engineer. The company produces computer and mobile peripherals, including phone chargers, power banks, earbuds, headphones, speakers, and cables.",
    founded: "2011",
    headquarters: "Shenzhen, China",
    websiteUrl: "https://www.anker.com",
    color: "#00AEEF",
    productCount: 28,
    popularCategories: ["Chargers", "Power Banks", "Cables", "Earbuds"]
  }
];

const gradients = [
  "bg-gradient-to-r from-blue-800 to-indigo-900",
  "bg-gradient-to-r from-purple-800 to-indigo-900",
  "bg-gradient-to-r from-gray-800 to-gray-900",
  "bg-gradient-to-r from-red-700 to-rose-800",
  "bg-gradient-to-r from-amber-600 to-orange-700",
  "bg-gradient-to-r from-sky-600 to-cyan-700",
];

const BrandsIndex: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Top Tech Brands
              </h1>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                Explore premium products from the world's most trusted technology brands.
                Discover innovative solutions from industry leaders.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link to="/shop">
                    Shop All Products
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <a href="#featured-brands">
                    See All Brands
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Brand Advantages */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
                <p className="text-gray-600">All products are 100% authentic with full manufacturer warranty.</p>
              </motion.div>
              
              <motion.div 
                className="text-center bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="mx-auto bg-amber-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <Star className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Selection</h3>
                <p className="text-gray-600">Carefully curated products from the world's top technology brands.</p>
              </motion.div>
              
              <motion.div 
                className="text-center bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="mx-auto bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exclusive Deals</h3>
                <p className="text-gray-600">Get access to exclusive deals and promotions from your favorite brands.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Brands */}
        <section id="featured-brands" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Brands</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our collection of premium products from these industry-leading brands.
                Each brand offers unique innovations and quality craftsmanship.
              </p>
            </div>
            
            <Tabs defaultValue="grid" className="w-full mb-8">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {brands.map((brand, index) => (
                    <motion.div
                      key={brand.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group"
                    >
                      <div className={`h-32 flex items-center justify-center p-4 ${gradients[index % gradients.length]}`}>
                        <img 
                          src={brand.logo} 
                          alt={`${brand.name} logo`} 
                          className="max-h-20 max-w-[180px] object-contain filter brightness-0 invert" 
                        />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{brand.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {brand.popularCategories.map((category, i) => (
                            <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{brand.productCount} Products</span>
                          <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-primary transition-colors">
                            <Link to={`/brand/${brand.id}`} className="flex items-center gap-1">
                              View Brand
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-6">
                <div className="space-y-4">
                  {brands.map((brand, index) => (
                    <motion.div
                      key={brand.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col md:flex-row"
                    >
                      <div className={`md:w-1/4 ${gradients[index % gradients.length]} flex items-center justify-center p-6`}>
                        <img 
                          src={brand.logo} 
                          alt={`${brand.name} logo`} 
                          className="max-h-16 md:max-h-24 max-w-[180px] object-contain filter brightness-0 invert" 
                        />
                      </div>
                      
                      <div className="p-6 md:w-3/4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-xl font-semibold">{brand.name}</h3>
                          <div className="flex items-center mt-2 md:mt-0">
                            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                              {brand.productCount} Products
                            </span>
                            <a 
                              href={brand.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="ml-3 text-gray-500 hover:text-gray-700 text-sm flex items-center"
                            >
                              Official Website
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{brand.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {brand.popularCategories.map((category, i) => (
                            <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between border-t pt-4 mt-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Info className="mr-1 h-4 w-4 text-gray-400" />
                              Founded: {brand.founded}
                            </div>
                            <div className="hidden md:block text-sm text-gray-500">
                              HQ: {brand.headquarters}
                            </div>
                          </div>
                          
                          <Button asChild>
                            <Link to={`/brand/${brand.id}`}>
                              Explore Products
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Shop?</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Browse our extensive collection of premium products from the world's most trusted brands.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link to="/shop">
                Shop All Products
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrandsIndex;
