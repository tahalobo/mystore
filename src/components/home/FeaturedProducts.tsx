
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, loadProductsFromAPI } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import ProductGridToggle, { GridViewType } from "@/components/ProductGridToggle";
import ProductGrid from "@/components/ProductGrid";

interface FeaturedProductsProps {
  onProductClick?: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gridView, setGridView] = useState<GridViewType>("grid");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        await loadProductsFromAPI();
        setFeaturedProducts(getFeaturedProducts());
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  if (isLoading) {
    return (
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المنتجات المميزة...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          <div className="text-center py-12">
            <p className="text-gray-500">لا توجد منتجات مميزة حاليًا</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
