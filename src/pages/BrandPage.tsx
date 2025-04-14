
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { 
  Filter, 
  Grid3X3, 
  List, 
  ChevronLeft, 
  ChevronDown, 
  ChevronUp,
  X,
  Star,
  ArrowUpDown,
  Zap,
  ShieldCheck
} from "lucide-react";

// Brand data (would be from API in a real app)
const brandsData = [
  {
    id: "apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1516245556508-7d60d4ff0f39?q=80&w=2000&h=500&fit=crop",
    description: "Apple Inc. is an American multinational technology company that designs, develops, and sells consumer electronics, computer software, and online services. The company's hardware products include the iPhone smartphone, the iPad tablet computer, the Mac personal computer, the iPod portable media player, the Apple Watch smartwatch, the Apple TV digital media player, the AirPods wireless earbuds and the HomePod smart speaker.",
    founded: "April 1, 1976",
    headquarters: "Cupertino, California, United States",
    website: "https://www.apple.com",
    color: "#333333"
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2000&h=500&fit=crop",
    description: "Samsung Electronics Co., Ltd. is a South Korean multinational electronics company headquartered in Suwon, South Korea. It is the flagship division of the Samsung Group and has been the world's largest information technology company, consumer electronics maker and chipmaker by revenue since 2009.",
    founded: "January 13, 1969",
    headquarters: "Suwon, South Korea",
    website: "https://www.samsung.com",
    color: "#1428a0"
  },
  {
    id: "sony",
    name: "Sony",
    logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&h=500&fit=crop",
    description: "Sony Corporation is a Japanese multinational conglomerate corporation headquartered in Kōnan, Minato, Tokyo. The company operates as one of the world's largest manufacturers of consumer and professional electronic products, the largest video game console company, the second largest video game publisher, and one of the most comprehensive media companies.",
    founded: "May 7, 1946",
    headquarters: "Tokyo, Japan",
    website: "https://www.sony.com",
    color: "#000000"
  },
  {
    id: "bose",
    name: "Bose",
    logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
    description: "Bose Corporation is an American manufacturing company that predominantly sells audio equipment. The company was established by Amar Bose in 1964 and is based in Framingham, Massachusetts. Bose is known for its home audio systems, speakers, noise-cancelling headphones, professional audio products and automobile sound systems.",
    founded: "1964",
    headquarters: "Framingham, Massachusetts, United States",
    website: "https://www.bose.com",
    color: "#D51C29"
  },
  {
    id: "jbl",
    name: "JBL",
    logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
    description: "JBL is an American audio hardware manufacturer founded in 1946 by James Bullough Lansing. Their products include loudspeakers and headphones for consumer and professional markets. Since 1969, JBL has been a division of Harman International, a subsidiary of Samsung Electronics.",
    founded: "1946",
    headquarters: "Los Angeles, California, United States",
    website: "https://www.jbl.com",
    color: "#FF6600"
  },
  {
    id: "anker",
    name: "Anker",
    logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2000&h=500&fit=crop",
    description: "Anker Innovations is a Chinese electronics company founded by Steven Yang, a former Google software engineer. The company produces computer and mobile peripherals, including phone chargers, power banks, earbuds, headphones, speakers, and cables.",
    founded: "2011",
    headquarters: "Shenzhen, China",
    website: "https://www.anker.com",
    color: "#00AEEF"
  }
];

const categories = [
  "All Categories",
  "Phone Cases",
  "Headphones",
  "Chargers",
  "Cables",
  "Speakers",
  "Screen Protectors",
  "Accessories"
];

const BrandPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
    onSale: false,
    freeShipping: false
  });
  
  const brand = brandsData.find(b => b.id === brandId);
  
  useEffect(() => {
    // Simulate filtering products by brand (in a real app, this would be an API call)
    // For demo, we'll just use the brandId as a fake filter
    const brandProducts = allProducts.filter(product => 
      product.brand && product.brand.toLowerCase() === (brandId || '').toLowerCase()
    );
    
    setProducts(brandProducts.length > 0 ? brandProducts : allProducts.slice(0, 12));
  }, [brandId]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    // Filter by brand
    filtered = filtered.filter(product => 
      product.brand && product.brand.toLowerCase() === (brandId || '').toLowerCase()
    );
    
    // If no brand-specific products found, show some demo products
    if (filtered.length === 0) {
      filtered = allProducts.slice(0, 12);
    }
    
    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        product => product.category.toLowerCase() === selectedCategory.toLowerCase().replace(/\s+/g, '-')
      );
    }
    
    // Apply selected filters
    if (selectedFilters.bestSeller) {
      filtered = filtered.filter(product => product.bestSeller);
    }
    
    if (selectedFilters.newArrival) {
      filtered = filtered.filter(product => product.newArrival);
    }
    
    if (selectedFilters.featured) {
      filtered = filtered.filter(product => product.featured);
    }
    
    if (selectedFilters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    
    if (selectedFilters.onSale) {
      filtered = filtered.filter(product => product.discountPercentage > 0);
    }
    
    // Sort products
    if (sortOption === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
    } else if (sortOption === "popular") {
      filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
    }
    
    setProducts(filtered);
    if (window.innerWidth < 768) {
      setFilterOpen(false);
    }
  };
  
  const clearFilters = () => {
    setPriceRange([0, 150]);
    setSelectedCategory("All Categories");
    setSelectedFilters({
      bestSeller: false,
      newArrival: false,
      featured: false,
      inStock: false,
      onSale: false,
      freeShipping: false
    });
    setSortOption("featured");
    
    // Reset to brand products
    const brandProducts = allProducts.filter(product => 
      product.brand && product.brand.toLowerCase() === (brandId || '').toLowerCase()
    );
    setProducts(brandProducts.length > 0 ? brandProducts : allProducts.slice(0, 12));
  };
  
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  if (!brand) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Brand Not Found</h1>
            <p className="mb-8">The brand you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/brands">Browse All Brands</Link>
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
        {/* Brand Header */}
        <div 
          className="relative h-60 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${brand.banner})` 
          }}
        >
          <div className="container mx-auto px-4 text-center text-white z-10">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl inline-block mb-4">
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="max-h-16 object-contain filter brightness-0 invert mx-auto" 
              />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{brand.name}</h1>
            <p className="max-w-2xl mx-auto text-gray-200 text-sm md:text-base">
              {brand.description.split('.')[0]}
            </p>
          </div>
        </div>
        
        {/* Brand Info */}
        <div className="bg-gray-50 py-10 border-b">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="about">About {brand.name}</TabsTrigger>
              </TabsList>
              <TabsContent value="products">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">{brand.name} Products</h2>
                  <p className="text-gray-600 mt-2">
                    Explore our selection of premium {brand.name} products
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="about">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-2xl font-semibold mb-4">{brand.name}</h2>
                  <p className="text-gray-700 mb-6">{brand.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Founded</h3>
                      <p className="text-gray-600">{brand.founded}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Headquarters</h3>
                      <p className="text-gray-600">{brand.headquarters}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Official Website</h3>
                      <a 
                        href={brand.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        {brand.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                  
                  <Button asChild variant="outline">
                    <Link to="#products">Browse {brand.name} Products</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="container mx-auto px-4 py-8" id="products">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {filterOpen ? "Hide Filters" : "Show Filters"}
                </Button>
                
                <div className="relative">
                  <Button 
                    variant="outline" 
                    className="flex items-center justify-center"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort By
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isSortOpen ? 'transform rotate-180' : ''}`} />
                  </Button>
                  
                  {isSortOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border z-20">
                      <div className="p-2">
                        <button 
                          className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortOption === 'featured' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                          onClick={() => {
                            setSortOption('featured');
                            setIsSortOpen(false);
                          }}
                        >
                          Featured
                        </button>
                        <button 
                          className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortOption === 'price-asc' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                          onClick={() => {
                            setSortOption('price-asc');
                            setIsSortOpen(false);
                          }}
                        >
                          Price: Low to High
                        </button>
                        <button 
                          className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortOption === 'price-desc' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                          onClick={() => {
                            setSortOption('price-desc');
                            setIsSortOpen(false);
                          }}
                        >
                          Price: High to Low
                        </button>
                        <button 
                          className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortOption === 'newest' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                          onClick={() => {
                            setSortOption('newest');
                            setIsSortOpen(false);
                          }}
                        >
                          Newest
                        </button>
                        <button 
                          className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortOption === 'popular' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                          onClick={() => {
                            setSortOption('popular');
                            setIsSortOpen(false);
                          }}
                        >
                          Most Popular
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="w-10 h-9"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="w-10 h-9"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Filters Sidebar */}
            <div className={`
              md:w-1/4 lg:w-1/5 
              ${filterOpen ? 'block' : 'hidden'} md:block
              bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 rounded-lg 
              fixed md:static top-24 left-4 right-4 z-30 
              md:max-h-auto max-h-[80vh] overflow-y-auto
              animate-fade-in
            `}>
              <div className="flex items-center justify-between mb-4 md:hidden">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer py-1.5 px-3 rounded-md transition-colors text-sm ${
                          selectedCategory === category 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 150]}
                      value={[priceRange[0], priceRange[1]]}
                      max={150}
                      step={1}
                      onValueChange={handlePriceChange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <div className="bg-gray-50 border rounded py-1 px-2 w-16 text-center">
                        ${priceRange[0]}
                      </div>
                      <span className="text-gray-400">to</span>
                      <div className="bg-gray-50 border rounded py-1 px-2 w-16 text-center">
                        ${priceRange[1]}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Product Filters */}
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">Product Filters</h3>
                  <div className="space-y-2.5">
                    <div className="flex items-center">
                      <Checkbox 
                        id="best-seller" 
                        checked={selectedFilters.bestSeller}
                        onCheckedChange={() => toggleFilter('bestSeller')}
                        className="mr-2 text-blue-600"
                      />
                      <label htmlFor="best-seller" className="text-sm cursor-pointer flex items-center gap-1.5">
                        Best Sellers
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="new-arrival" 
                        checked={selectedFilters.newArrival}
                        onCheckedChange={() => toggleFilter('newArrival')}
                        className="mr-2"
                      />
                      <label htmlFor="new-arrival" className="text-sm cursor-pointer">
                        New Arrivals
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="featured" 
                        checked={selectedFilters.featured}
                        onCheckedChange={() => toggleFilter('featured')}
                        className="mr-2"
                      />
                      <label htmlFor="featured" className="text-sm cursor-pointer">
                        Featured Products
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="in-stock" 
                        checked={selectedFilters.inStock}
                        onCheckedChange={() => toggleFilter('inStock')}
                        className="mr-2"
                      />
                      <label htmlFor="in-stock" className="text-sm cursor-pointer">
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="on-sale" 
                        checked={selectedFilters.onSale}
                        onCheckedChange={() => toggleFilter('onSale')}
                        className="mr-2"
                      />
                      <label htmlFor="on-sale" className="text-sm cursor-pointer flex items-center gap-1.5">
                        On Sale
                        <Zap className="h-3.5 w-3.5 text-orange-500" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="free-shipping" 
                        checked={selectedFilters.freeShipping}
                        onCheckedChange={() => toggleFilter('freeShipping')}
                        className="mr-2"
                      />
                      <label htmlFor="free-shipping" className="text-sm cursor-pointer flex items-center gap-1.5">
                        Free Shipping
                        <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Apply Filters */}
                <div className="flex flex-col space-y-2 pt-2">
                  <Button onClick={applyFilters} className="w-full">
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {/* Desktop Sort and View Controls */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-sm">Sort By:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
                
                <div className="flex gap-2 items-center">
                  <span className="text-gray-500 text-sm">View:</span>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className="w-9 h-9"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'} 
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className="w-9 h-9"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {products.length > 0 ? (
                <div className={viewMode === 'grid' ? 
                  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : 
                  "flex flex-col gap-4"
                }>
                  {products.map((product, index) => (
                    <motion.div 
                      key={product.id} 
                      className={`animate-fade-up`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      {viewMode === 'grid' ? (
                        <ProductCard 
                          product={product}
                          onProductClick={openProductModal}
                        />
                      ) : (
                        <div className="flex border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
                          <div className="w-1/3 max-w-[150px]">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="p-4 flex-1">
                            <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="text-lg font-bold">${product.price.toFixed(2)}</div>
                                {product.discountPercentage > 0 && (
                                  <div className="text-sm text-gray-500 line-through">
                                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                                  </div>
                                )}
                              </div>
                              <Button size="sm" onClick={() => openProductModal(product)}>
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-gray-600 mt-2 mb-6">Try adjusting your filters</p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal} 
      />
      
      <ScrollToTop />
      
      {/* Overlay for mobile filters */}
      {filterOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setFilterOpen(false)}
        />
      )}
      
      {/* Overlay for sort options */}
      {isSortOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-10 md:hidden"
          onClick={() => setIsSortOpen(false)}
        />
      )}
    </div>
  );
};

export default BrandPage;
