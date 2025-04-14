
import React from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Package2, X, ZoomIn } from "lucide-react";

interface MobileProductListProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  resetFilters: () => void;
}

const MobileProductList: React.FC<MobileProductListProps> = ({
  products,
  onProductClick,
  resetFilters
}) => {
  if (products.length === 0) {
    return (
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
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium">{products.length}</span> products
        </p>
        <div className="hidden sm:block">
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
      
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className={`animate-fade-up [animation-delay:${Math.min(index * 50, 500)}ms]`}
          >
            <ProductCard 
              product={product}
              onProductClick={onProductClick}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default MobileProductList;
