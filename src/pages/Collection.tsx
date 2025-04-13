
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { getProductsByDiscount, getBestSellers, getNewArrivals, getFeaturedProducts, allProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Filter, X, ShoppingBag, Clock, BadgeCheck, DollarSign, Percent, Package2, ZoomIn, Tag, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [expandedFilters, setExpandedFilters] = useState<{[key: string]: boolean}>({
    price: true,
    availability: true,
    productType: true,
    sort: true,
    discount: true,
  });
  
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean | string;
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
    hasDiscount: false,
    sortBy: "default",
    discountRange: "all",
    colorFilter: "all",
  });
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);
  const isMobile = useIsMobile();

  // Get unique colors for filtering
  const uniqueColors: { [key: string]: string } = {
    "all": "All Colors",
    "#000000": "Black",
    "#FFFFFF": "White",
    "#3B82F6": "Blue",
    "#EF4444": "Red",
    "#10B981": "Green",
    "#7C3AED": "Purple",
    "#78350F": "Brown",
  };

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
      hasDiscount: false,
      sortBy: "default",
      discountRange: "all",
      colorFilter: "all",
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

  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
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
    
    // Apply discount filter
    if (selectedFilters.hasDiscount) {
      productsToFilter = productsToFilter.filter(product => product.discount && product.discount > 0);
      
      // Apply discount range filter if needed
      if (selectedFilters.discountRange !== "all") {
        if (selectedFilters.discountRange === "under25") {
          productsToFilter = productsToFilter.filter(product => product.discount && product.discount < 25);
        } else if (selectedFilters.discountRange === "25to50") {
          productsToFilter = productsToFilter.filter(product => product.discount && product.discount >= 25 && product.discount <= 50);
        } else if (selectedFilters.discountRange === "over50") {
          productsToFilter = productsToFilter.filter(product => product.discount && product.discount > 50);
        }
      }
    }
    
    // Apply color filter
    if (selectedFilters.colorFilter && selectedFilters.colorFilter !== "all") {
      productsToFilter = productsToFilter.filter(
        product => product.colors && product.colors.includes(selectedFilters.colorFilter as string)
      );
    }
    
    // Apply sorting
    if (selectedFilters.sortBy === "priceAsc") {
      productsToFilter.sort((a, b) => a.price - b.price);
    } else if (selectedFilters.sortBy === "priceDesc") {
      productsToFilter.sort((a, b) => b.price - a.price);
    } else if (selectedFilters.sortBy === "nameAsc") {
      productsToFilter.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedFilters.sortBy === "nameDesc") {
      productsToFilter.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedFilters.sortBy === "newest") {
      productsToFilter = productsToFilter.filter(product => product.newArrival).concat(
        productsToFilter.filter(product => !product.newArrival)
      );
    } else if (selectedFilters.sortBy === "popular") {
      productsToFilter = productsToFilter.filter(product => product.bestSeller).concat(
        productsToFilter.filter(product => !product.bestSeller)
      );
    } else if (selectedFilters.sortBy === "discount") {
      productsToFilter.sort((a, b) => 
        (b.discount || 0) - (a.discount || 0)
      );
    }
    
    setFilteredProducts(productsToFilter);
    
    if (window.innerWidth < 768) {
      setFilterOpen(false);
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handleSortChange = (value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      sortBy: value
    }));
  };

  const handleDiscountRangeChange = (value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      discountRange: value
    }));
  };

  const handleColorFilterChange = (value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      colorFilter: value
    }));
  };

  const FilterHeader = ({ title, filterKey }: { title: string, filterKey: string }) => (
    <div 
      className="flex items-center justify-between cursor-pointer py-2"
      onClick={() => toggleFilterSection(filterKey)}
    >
      <h3 className="font-semibold">{title}</h3>
      {expandedFilters[filterKey] ? (
        <ChevronUp className="h-4 w-4 text-gray-500" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-500" />
      )}
    </div>
  );

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
        
        {/* Mobile View Tabs */}
        {isMobile && (
          <div className="container mx-auto px-4 py-4">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="products" onClick={() => setFilterOpen(false)}>
                  <Package2 className="h-4 w-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="filters" onClick={() => setFilterOpen(true)}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
        
        {/* Collection Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile Filter Toggle (only for non-tab layout) */}
            {!isMobile && (
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
            )}
            
            {/* Filters Sidebar */}
            <div className={`
              md:w-1/4 lg:w-1/5 
              ${filterOpen || !isMobile ? 'block' : 'hidden'} md:block
              bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 rounded-lg 
              fixed md:static top-24 left-4 right-4 z-20 
              md:max-h-auto overflow-auto max-h-[80vh]
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
              
              <div className="space-y-4">
                {/* Sort By */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Sort By" filterKey="sort" />
                  
                  {expandedFilters.sort && (
                    <RadioGroup
                      value={selectedFilters.sortBy as string}
                      onValueChange={handleSortChange}
                      className="mt-2 space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="sort-default" />
                        <Label htmlFor="sort-default">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="priceAsc" id="sort-price-asc" />
                        <Label htmlFor="sort-price-asc">Price: Low to High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="priceDesc" id="sort-price-desc" />
                        <Label htmlFor="sort-price-desc">Price: High to Low</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nameAsc" id="sort-name-asc" />
                        <Label htmlFor="sort-name-asc">Name: A to Z</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nameDesc" id="sort-name-desc" />
                        <Label htmlFor="sort-name-desc">Name: Z to A</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="newest" id="sort-newest" />
                        <Label htmlFor="sort-newest">Newest First</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="popular" id="sort-popular" />
                        <Label htmlFor="sort-popular">Most Popular</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="discount" id="sort-discount" />
                        <Label htmlFor="sort-discount">Biggest Discount</Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>

                {/* Price Range */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Price Range" filterKey="price" />
                  
                  {expandedFilters.price && (
                    <div className="px-2 mt-4">
                      <div className="flex items-center mb-4">
                        <DollarSign className="h-4 w-4 text-primary mr-1" />
                        <span className="text-sm font-medium">Filter by price</span>
                      </div>
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
                  )}
                </div>
                
                {/* Colors Filter */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Colors" filterKey="colors" />
                  
                  {expandedFilters.colors && (
                    <div className="mt-2 space-y-2">
                      <RadioGroup
                        value={selectedFilters.colorFilter as string}
                        onValueChange={handleColorFilterChange}
                        className="mt-2 space-y-3"
                      >
                        {Object.entries(uniqueColors).map(([colorCode, colorName]) => (
                          <div className="flex items-center space-x-2" key={colorCode}>
                            <RadioGroupItem value={colorCode} id={`color-${colorCode}`} />
                            <div className="flex items-center">
                              {colorCode !== "all" && (
                                <span 
                                  className="w-4 h-4 rounded-full inline-block mr-2"
                                  style={{ backgroundColor: colorCode }}
                                ></span>
                              )}
                              <Label htmlFor={`color-${colorCode}`}>{colorName}</Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>
                
                {/* Discount Filters */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Discounts" filterKey="discount" />
                  
                  {expandedFilters.discount && (
                    <div className="mt-2 space-y-3">
                      <div className="flex items-center mb-3">
                        <Percent className="h-4 w-4 text-primary mr-1" />
                        <span className="text-sm font-medium">Discount options</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox 
                          id="has-discount" 
                          checked={selectedFilters.hasDiscount as boolean}
                          onCheckedChange={() => toggleFilter('hasDiscount')}
                          className="mr-2"
                        />
                        <label htmlFor="has-discount" className="text-sm cursor-pointer">
                          On Sale
                        </label>
                      </div>
                      
                      {selectedFilters.hasDiscount && (
                        <div className="pl-6 pt-2 space-y-2">
                          <RadioGroup
                            value={selectedFilters.discountRange as string}
                            onValueChange={handleDiscountRangeChange}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="discount-all" />
                              <Label htmlFor="discount-all">All discounts</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="under25" id="discount-under25" />
                              <Label htmlFor="discount-under25">Under 25%</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="25to50" id="discount-25to50" />
                              <Label htmlFor="discount-25to50">25% - 50%</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="over50" id="discount-over50" />
                              <Label htmlFor="discount-over50">Over 50%</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Product Type Filters */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Product Type" filterKey="productType" />
                  
                  {expandedFilters.productType && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center mb-3">
                        <Tag className="h-4 w-4 text-primary mr-1" />
                        <span className="text-sm font-medium">Product status</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox 
                          id="best-seller" 
                          checked={selectedFilters.bestSeller as boolean}
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
                          checked={selectedFilters.newArrival as boolean}
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
                          checked={selectedFilters.featured as boolean}
                          onCheckedChange={() => toggleFilter('featured')}
                          className="mr-2"
                        />
                        <label htmlFor="featured" className="text-sm cursor-pointer">
                          Featured Products
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Availability Filter */}
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Availability" filterKey="availability" />
                  
                  {expandedFilters.availability && (
                    <div className="mt-2">
                      <div className="flex items-center">
                        <Checkbox 
                          id="in-stock" 
                          checked={selectedFilters.inStock as boolean}
                          onCheckedChange={() => toggleFilter('inStock')}
                          className="mr-2"
                        />
                        <label htmlFor="in-stock" className="text-sm cursor-pointer">
                          In Stock Only
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Apply Filters */}
                <div className="flex flex-col space-y-2 sticky bottom-0 bg-white p-3 border-t border-gray-200 mt-4">
                  <Button onClick={applyFilters} className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={resetFilters} className="gap-2">
                    <X className="h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className={`${(isMobile && filterOpen) ? 'hidden' : 'block'} md:block md:w-3/4 lg:w-4/5`}>
              {filteredProducts.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-500">
                      Showing <span className="font-medium">{filteredProducts.length}</span> products
                    </p>
                    <div className="hidden md:block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        onClick={resetFilters}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Reset
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <ZoomIn className="h-3 w-3 mr-1" />
                        View All
                      </Button>
                    </div>
                  </div>
                  
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
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Package2 className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium">No products found</h3>
                  <p className="text-gray-600 mt-2">Try adjusting your filters</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
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
      {(isMobile || filterOpen) && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setFilterOpen(false)}
        />
      )}
    </div>
  );
};

export default Collection;
