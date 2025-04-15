
import React, { useState } from "react";
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
import { 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp,
  X 
} from "lucide-react";

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

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
  });
  
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
    });
    setProducts(allProducts);
  };
  
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Shop Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Shop</h1>
            <p className="text-gray-600 text-center">Browse our wide selection of products</p>
          </div>
        </div>
        
        {/* Shop Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {filterOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            
            {/* Filters Sidebar */}
            <div className={`
              md:w-1/4 lg:w-1/5 
              ${filterOpen ? 'block' : 'hidden'} md:block
              fixed md:static top-24 left-4 right-4 z-20
              bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-lg
              max-h-[70vh] md:max-h-full overflow-auto
              transform transition-transform duration-300 ease-in-out
            `}>
              <div className="flex items-center justify-between sticky top-0 bg-white z-10 pb-2 mb-2 md:hidden">
                <h3 className="font-semibold text-lg">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div 
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`cursor-pointer py-1 px-2 rounded-md transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 150]}
                      value={[priceRange[0], priceRange[1]]}
                      max={150}
                      step={1}
                      onValueChange={handlePriceChange}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                {/* Other Filters */}
                <div>
                  <h3 className="font-semibold mb-3">Product Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="best-seller" 
                        checked={selectedFilters.bestSeller}
                        onCheckedChange={() => toggleFilter('bestSeller')}
                        className="mr-2"
                      />
                      <label htmlFor="best-seller" className="text-sm cursor-pointer">
                        Best Sellers
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
                  </div>
                </div>
                
                {/* Apply Filters */}
                <div className="flex flex-col space-y-2 sticky bottom-0 bg-white pt-4 pb-2 md:relative md:pt-0 md:pb-0">
                  <Button onClick={applyFilters}>
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                  {products.map((product, index) => (
                    <div 
                      key={product.id} 
                      className={`animate-fade-up [animation-delay:${index * 50}ms]`}
                    >
                      <ProductCard 
                        product={product}
                        onProductClick={openProductModal}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-gray-600 mt-2">Try adjusting your filters</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
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
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default Shop;
