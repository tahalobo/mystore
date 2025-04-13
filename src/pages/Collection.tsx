import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { getProductsByDiscount, getBestSellers, getNewArrivals, getFeaturedProducts, allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Filter, X, ShoppingBag, Clock, BadgeCheck } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types";

const collections = {
  "featured": {
    title: "Featured Products",
    description: "Our handpicked selection of premium products",
    getProducts: getFeaturedProducts,
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2070"
  },
  "best-sellers": {
    title: "Best Sellers",
    description: "Our most popular products that customers love",
    getProducts: getBestSellers,
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070"
  },
  "new-arrivals": {
    title: "New Arrivals",
    description: "Check out our latest products and innovations",
    getProducts: getNewArrivals,
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=2070"
  },
  "deals": {
    title: "Special Deals & Offers",
    description: "Limited time offers and special discounts",
    getProducts: getProductsByDiscount,
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070"
  }
};

const Collection: React.FC = () => {
  const { collectionId = "featured" } = useParams<{ collectionId: string }>();
  const collection = collections[collectionId as keyof typeof collections] || collections.featured;
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
  });
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (collectionId && collections[collectionId as keyof typeof collections]) {
      const products = collections[collectionId as keyof typeof collections].getProducts();
      setInitialProducts(products);
      setFilteredProducts(products);
      
      // Reset filters when collection changes
      resetFilters();
    }
  }, [collectionId]);

  const resetFilters = () => {
    setPriceRange([0, 150]);
    setSelectedFilters({
      bestSeller: false,
      newArrival: false,
      featured: false,
      inStock: false,
    });
    
    if (collectionId && collections[collectionId as keyof typeof collections]) {
      const products = collections[collectionId as keyof typeof collections].getProducts();
      setFilteredProducts(products);
    }
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const applyFilters = () => {
    let productsToFilter = [...initialProducts];
    
    // Apply price filter
    productsToFilter = productsToFilter.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply other filters
    if (selectedFilters.bestSeller) {
      productsToFilter = productsToFilter.filter(product => product.bestSeller);
    }
    
    if (selectedFilters.newArrival) {
      productsToFilter = productsToFilter.filter(product => product.newArrival);
    }
    
    if (selectedFilters.featured) {
      productsToFilter = productsToFilter.filter(product => product.featured);
    }
    
    if (selectedFilters.inStock) {
      productsToFilter = productsToFilter.filter(product => product.stock > 0);
    }
    
    setFilteredProducts(productsToFilter);
    
    if (window.innerWidth < 768) {
      setFilterOpen(false);
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Collection Header */}
        <div 
          className="relative py-16 bg-gradient-to-r from-primary/5 to-primary/10"
          style={{
            backgroundImage: `url(${collection.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{collection.title}</h1>
            <p className="text-white/90 max-w-2xl mx-auto text-lg">{collection.description}</p>
          </div>
        </div>
        
        {/* Collection Content */}
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
              bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-lg 
              fixed md:static top-24 left-4 right-4 z-20 
              md:max-h-auto 
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
              
              <div className="space-y-6">
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
                <div className="flex flex-col space-y-2">
                  <Button onClick={applyFilters}>
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={resetFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4 lg:w-4/5">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
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
                    onClick={resetFilters}
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

export default Collection;
