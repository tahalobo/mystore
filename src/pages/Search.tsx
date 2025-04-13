
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { searchProducts, getProductsByCategory, categories } from "@/data/products";
import ProductDetailModal from "@/components/ProductDetailModal";
import { Search as SearchIcon, X, Filter, ChevronDown } from "lucide-react";
import { Product } from "@/types";

const Search: React.FC = () => {
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
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
      performSearch(searchQuery);
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams({});
    setSearchResults([]);
  };
  
  // Perform search
  const performSearch = (query: string) => {
    setIsSearching(true);
    
    // Simulate network delay
    setTimeout(() => {
      let results = searchProducts(query);
      
      // Filter by category if needed
      if (selectedCategory !== "all") {
        results = results.filter(product => product.category === selectedCategory);
      }
      
      // Sort results
      results = sortResults(results, selectedFilter);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };
  
  // Sort results based on selected filter
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
        return products; // relevance
    }
  };
  
  // Handle product click
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  // Close product modal
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  
  // Apply filters
  const applyFilters = () => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  };
  
  // Initial search on mount or when params change
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedFilter]);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold">Search Products</h1>
            
            <form onSubmit={handleSearch} className="relative mb-6">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-20"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
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
                <Button type="submit" className="rounded-l-none">
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
                  className="mr-2 md:hidden"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
                
                {initialQuery && (
                  <div className="text-sm">
                    {isSearching ? (
                      <span>Searching...</span>
                    ) : (
                      <span>
                        Found <span className="font-semibold">{searchResults.length}</span> results for&nbsp;
                        <span className="font-semibold">"{initialQuery}"</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              <div className={`w-full md:w-auto ${showFilters ? 'block' : 'hidden md:block'}`}>
                <Tabs defaultValue="relevance" value={selectedFilter} onValueChange={setSelectedFilter} className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="relevance">Relevance</TabsTrigger>
                    <TabsTrigger value="price-low">Price: Low</TabsTrigger>
                    <TabsTrigger value="price-high">Price: High</TabsTrigger>
                    <TabsTrigger value="rating">Rating</TabsTrigger>
                    <TabsTrigger value="newest">Newest</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className={`mt-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList className="flex flex-wrap">
                  <TabsTrigger value="all">All Categories</TabsTrigger>
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
                <p className="text-gray-500">Searching for products...</p>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {searchResults.map((product, index) => (
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
          ) : initialQuery ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
              <SearchIcon className="mb-4 h-12 w-12 text-gray-400" />
              <h2 className="mb-2 text-xl font-semibold">No results found</h2>
              <p className="mb-4 text-gray-600">
                We couldn't find any products matching "{initialQuery}".
              </p>
              <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
              <SearchIcon className="mb-4 h-12 w-12 text-gray-400" />
              <h2 className="mb-2 text-xl font-semibold">Search for products</h2>
              <p className="text-gray-600">
                Enter a search term above to find products.
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
