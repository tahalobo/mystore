
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import ProductGridToggle, { GridViewType } from "@/components/ProductGridToggle";
import ProductGrid from "@/components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedProductsProps {
  onProductClick?: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gridView, setGridView] = useState<GridViewType>("grid");
  const navigate = useNavigate();

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <section className="section-padding py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">المنتجات المميزة</h2>
            <p className="text-gray-600 mt-2">منتجات مُنتقاة بعناية فائقة</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <ProductGridToggle
              view={gridView}
              onChange={setGridView}
              className="mr-4"
            />
            <Button variant="outline" asChild className="text-primary">
              <Link to="/shop" className="flex items-center">
                عرض جميع المنتجات
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {featuredProducts.length > 0 ? (
          <ProductGrid 
            products={featuredProducts}
            view={gridView}
            emptyMessage="لا توجد منتجات مميزة حاليًا"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <Skeleton className="h-56 w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
