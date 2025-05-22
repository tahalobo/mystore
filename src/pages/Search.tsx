
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import ProductGridToggle, { GridViewType } from "@/components/ProductGridToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { searchProducts, getProductsByCategory, categories } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Search as SearchIcon, X, Filter, ChevronDown } from "lucide-react";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFilter, setSelectedFilter] = useState<string>("relevance");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [gridView, setGridView] = useState<GridViewType>("grid");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
    setSearchResults([]);
  };
  
  const performSearch = (query: string) => {
    setIsSearching(true);
    
    setTimeout(() => {
      let results = searchProducts(query);
      
      if (selectedCategory !== "all") {
        results = results.filter(product => product.category === selectedCategory);
      }
      
      results = sortResults(results, selectedFilter);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };
  
  const sortResults = (products: Product[], filter: string) => {
    switch (filter) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "newest":
        return [...products].filter(p => p.newArrival).concat(
          [...products].filter(p => !p.newArrival)
        );
      default:
        return products;
    }
  };
  
  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  const applyFilters = () => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  };
  
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedFilter]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">البحث عن المنتجات</h1>
            
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-20"
              />
              <div className="absolute inset-y-0 left-0 flex items-center">
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={clearSearch}
                    className="h-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button type="submit" className="rounded-r-none">
                  <SearchIcon className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="ml-2 md:hidden"
                >
                  <Filter className="ml-2 h-4 w-4" />
                  الفلاتر
                  <ChevronDown className={`mr-1 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                {initialQuery && (
                  <div className="text-sm">
                    {isSearching ? (
                      <span>جارِ البحث...</span>
                    ) : (
                      <span>
                        تم العثور على <span className="font-semibold">{searchResults.length}</span> نتيجة لـ&nbsp;
                        <span className="font-semibold">"{initialQuery}"</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <ProductGridToggle
                  view={gridView}
                  onChange={setGridView}
                />
                
                <div className={`w-full md:w-auto ${showFilters ? 'block' : 'hidden md:block'}`}>
                  <Tabs defaultValue="relevance" value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="relevance">الصلة</TabsTrigger>
                      <TabsTrigger value="price-low">السعر: الأقل</TabsTrigger>
                      <TabsTrigger value="price-high">السعر: الأعلى</TabsTrigger>
                      <TabsTrigger value="rating">التقييم</TabsTrigger>
                      <TabsTrigger value="newest">الأحدث</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
            
            <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="flex flex-wrap">
                  <TabsTrigger value="all">جميع الفئات</TabsTrigger>
                  {categories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {isSearching ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary"></div>
                <p className="text-gray-500">جارِ البحث عن المنتجات...</p>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="mb-10">
              <ProductGrid 
                products={searchResults} 
                view={gridView}
                onProductClick={handleProductClick}
              />
            </div>
          ) : initialQuery ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
              <SearchIcon className="mb-4 h-12 w-12 text-gray-400" />
              <h2 className="mb-2 text-xl font-semibold">لم يتم العثور على نتائج</h2>
              <p className="mb-4 text-gray-600">
                لم نتمكن من العثور على أي منتجات تطابق "{initialQuery}".
              </p>
              <p className="text-gray-600">حاول تعديل البحث أو الفلتر للعثور على ما تبحث عنه.</p>
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
              <SearchIcon className="mb-4 h-12 w-12 text-gray-400" />
              <h2 className="mb-2 text-xl font-semibold">ابحث عن المنتجات</h2>
              <p className="text-gray-600">
                أدخل مصطلح البحث أعلاه للعثور على المنتجات.
              </p>
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
    </div>
  );
};

export default Search;
