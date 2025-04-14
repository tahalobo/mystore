
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { categories, getProductsByCategory } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Product, Category } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import MobileProductList from "@/components/MobileProductList";
import MobileCollectionHeader from "@/components/MobileCollectionHeader";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
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
  });
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | undefined>();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (categoryId) {
      const currentCategory = categories.find(cat => cat.id === categoryId);
      setCategory(currentCategory);
      
      // Reset filters when category changes
      resetFilters();
    }
  }, [categoryId]);

  useEffect(() => {
    if (categoryId) {
      applyFilters();
    }
  }, [selectedFilters, priceRange, categoryId]);

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
    });
    
    if (categoryId) {
      setFilteredProducts(getProductsByCategory(categoryId));
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
    if (!categoryId) return;

    let productsToFilter = getProductsByCategory(categoryId);
    
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
    }
    
    setFilteredProducts(productsToFilter);
    
    if (isMobile) {
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

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <MobileCollectionHeader 
          title={category.name}
          description={category.description}
          imageUrl={category.image}
          setFilterOpen={setFilterOpen}
          filterOpen={filterOpen}
        />
        
        {/* Category Content */}
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer 
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
              handleSortChange={handleSortChange}
              handleDiscountRangeChange={handleDiscountRangeChange}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
            
            {/* Desktop Filters */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5 space-y-4">
              {/* Add desktop filters here - I'll skip for brevity */}
              <Button
                variant="outline"
                className="w-full"
                onClick={applyFilters}
              >
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
            </div>
            
            {/* Products Grid */}
            <div className={`${(isMobile && filterOpen) ? 'hidden' : 'block'} md:block md:w-3/4 lg:w-4/5`}>
              <MobileProductList 
                products={filteredProducts}
                onProductClick={openProductModal}
                resetFilters={resetFilters}
              />
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
    </div>
  );
};

export default CategoryPage;
