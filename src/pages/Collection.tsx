import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { 
  getProductsByDiscount, 
  getBestSellers, 
  getNewArrivals, 
  getFeaturedProducts
} from "@/data/products";
import { Product } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import MobileProductList from "@/components/MobileProductList";
import MobileCollectionHeader from "@/components/MobileCollectionHeader";
import ProductCard from "@/components/ProductCard";

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

  const applyFilters = () => {
    let productsToFilter = [...initialProducts];
    
    productsToFilter = productsToFilter.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
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
    
    if (selectedFilters.hasDiscount) {
      productsToFilter = productsToFilter.filter(product => product.discount && product.discount > 0);
      
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
    
    if (selectedFilters.colorFilter && selectedFilters.colorFilter !== "all") {
      productsToFilter = productsToFilter.filter(
        product => product.colors && product.colors.includes(selectedFilters.colorFilter as string)
      );
    }
    
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

  const handleColorFilterChange = (value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      colorFilter: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <MobileCollectionHeader 
          title={collection.title}
          description={collection.description}
          imageUrl={collection.image}
          setFilterOpen={setFilterOpen}
          filterOpen={filterOpen}
        />
        
        <div className="container mx-auto px-4 py-4 md:py-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <MobileFilterDrawer 
              isOpen={filterOpen}
              onClose={() => setFilterOpen(false)}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              selectedFilters={selectedFilters}
              toggleFilter={toggleFilter}
              handleSortChange={handleSortChange}
              handleDiscountRangeChange={handleDiscountRangeChange}
              handleColorFilterChange={handleColorFilterChange}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              availableColors={uniqueColors}
            />
            
            <div className={`${(isMobile && filterOpen) ? 'hidden' : 'block'} md:block md:w-full lg:w-full`}>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard 
                      product={product}
                      onProductClick={openProductModal}
                    />
                  </div>
                ))}
              </div>
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

export default Collection;
