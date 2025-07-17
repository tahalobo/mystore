
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allProducts, loadProductsFromAPI } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductPagination from "@/components/ProductPagination";
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3,
  List,
  Filter,
  X,
  TrendingUp,
  Clock,
  Star,
  ShoppingBag
} from "lucide-react";
import { toast } from "sonner";
import ProductGrid from "@/components/ProductGrid";
import ProductGridToggle, { GridViewType } from "@/components/ProductGridToggle";
import { Badge } from "@/components/ui/badge";
import ShopFilters from "@/components/ShopFilters";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 12;

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean | string | number[];
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
    hasDiscount: false,
    priceRange: [0, 200],
    category: "all",
    sortBy: "default",
    rating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [gridView, setGridView] = useState<GridViewType>("grid");
  const [showFilters, setShowFilters] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  // Quick filter states
  const [quickFilter, setQuickFilter] = useState<string>("all");
  
  useEffect(() => {
    const initializeProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        toast.success("تم تحميل المنتجات بنجاح");
      } catch (error) {
        console.error("Error initializing products:", error);
        toast.error("حدث خطأ أثناء تحميل المنتجات");
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedFilters, searchQuery, quickFilter]);
  
  // Update pagination whenever filtered products change
  useEffect(() => {
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    setTotalPages(total || 1);
    
    if (currentPage > total && total > 0) {
      setCurrentPage(1);
    }
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  const applyFilters = () => {
    let filtered = [...allProducts];
    
    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Quick filter
    if (quickFilter !== "all") {
      switch (quickFilter) {
        case "bestsellers":
          filtered = filtered.filter(p => p.bestSeller);
          break;
        case "new":
          filtered = filtered.filter(p => p.newArrival);
          break;
        case "deals":
          filtered = filtered.filter(p => p.discount && p.discount > 0);
          break;
        case "featured":
          filtered = filtered.filter(p => p.featured);
          break;
      }
    }

    // Price range filter
    const [minPrice, maxPrice] = selectedFilters.priceRange as number[];
    filtered = filtered.filter(
      product => product.price >= minPrice && product.price <= maxPrice
    );
    
    // Category filter
    if (selectedFilters.category !== "all") {
      filtered = filtered.filter(
        product => product.category === selectedFilters.category
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

    if (selectedFilters.hasDiscount) {
      filtered = filtered.filter(product => product.discount && product.discount > 0);
    }

    // Rating filter
    if (selectedFilters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedFilters.rating);
    }
    
    // Apply sorting
    if (selectedFilters.sortBy === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedFilters.sortBy === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selectedFilters.sortBy === "nameAsc") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilters.sortBy === "nameDesc") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedFilters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (selectedFilters.sortBy === "newest") {
      filtered = filtered.filter(product => product.newArrival).concat(
        filtered.filter(product => !product.newArrival)
      );
    } else if (selectedFilters.sortBy === "popular") {
      filtered = filtered.filter(product => product.bestSeller).concat(
        filtered.filter(product => !product.bestSeller)
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };
  
  const clearFilters = () => {
    setSelectedFilters({
      bestSeller: false,
      newArrival: false,
      featured: false,
      inStock: false,
      hasDiscount: false,
      priceRange: [0, 200],
      category: "all",
      sortBy: "default",
      rating: 0,
    });
    setSearchQuery("");
    setQuickFilter("all");
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickFilters = [
    { key: "all", label: "جميع المنتجات", icon: ShoppingBag },
    { key: "bestsellers", label: "الأكثر مبيعاً", icon: TrendingUp },
    { key: "new", label: "جديد", icon: Clock },
    { key: "deals", label: "عروض", icon: Star },
    { key: "featured", label: "مميز", icon: Star },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Modern Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-blue-600 text-white py-16">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                متجرنا المميز
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-50">
                اكتشف مجموعتنا الواسعة من المنتجات العالية الجودة
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="ابحث عن المنتجات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg focus:bg-white transition-all"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-white border-b shadow-sm sticky top-20 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {quickFilters.map((filter) => (
                  <Button
                    key={filter.key}
                    variant={quickFilter === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setQuickFilter(filter.key)}
                    className="rounded-full"
                  >
                    <filter.icon className="h-4 w-4 mr-2" />
                    {filter.label}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  فلاتر
                </Button>
                
                <ProductGridToggle 
                  view={gridView}
                  onChange={setGridView}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Shop Content */}
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-gray-600 text-lg">جاري تحميل المنتجات...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Products Grid - Left Side */}
              <div className="lg:w-3/4 order-2 lg:order-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6 bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold">
                      {searchQuery ? `نتائج البحث عن "${searchQuery}"` : "جميع المنتجات"}
                    </h2>
                    <Badge variant="outline" className="text-sm">
                      {filteredProducts.length} منتج
                    </Badge>
                  </div>
                  
                  {(searchQuery || Object.values(selectedFilters).some(v => 
                    typeof v === 'boolean' ? v : Array.isArray(v) ? v[0] !== 0 || v[1] !== 200 : v !== "all" && v !== "default" && v !== 0
                  )) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-2" />
                      مسح الفلاتر
                    </Button>
                  )}
                </div>

                {filteredProducts.length > 0 ? (
                  <>
                    <ProductGrid 
                      products={paginatedProducts}
                      view={gridView}
                      onProductClick={openProductModal}
                      emptyMessage="لم يتم العثور على منتجات تطابق معايير البحث"
                    />
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <ProductPagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    )}
                  </>
                ) : (
                  <motion.div 
                    className="text-center py-16 bg-white rounded-xl shadow-sm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-16 w-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-4">لم يتم العثور على منتجات</h3>
                    <p className="text-gray-600 mb-6">حاول تعديل الفلاتر أو مصطلح البحث</p>
                    <Button onClick={clearFilters}>
                      إعادة تعيين الفلاتر
                    </Button>
                  </motion.div>
                )}
              </div>

              {/* Filters Sidebar - Right Side */}
              <div className="lg:w-1/4 order-1 lg:order-2">
                <AnimatePresence>
                  {(showFilters || window.innerWidth >= 1024) && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="lg:sticky lg:top-32"
                    >
                      <ShopFilters
                        selectedFilters={selectedFilters}
                        onFiltersChange={setSelectedFilters}
                        onApplyFilters={applyFilters}
                        onClearFilters={clearFilters}
                        products={allProducts}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeProductModal} 
      />
      
      <ScrollToTop />
    </div>
  );
};

export default Shop;
