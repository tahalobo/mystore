
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { ChevronRight, Filter, Grid3X3, LayoutGrid, List, Star, TrendingUp, Zap, Heart, Tag, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import ProductGridToggle, { GridViewType } from "@/components/ProductGridToggle";
import ProductGrid from "@/components/ProductGrid";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface FeaturedProductsProps {
  onProductClick?: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gridView, setGridView] = useState<GridViewType>("grid");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  const filterOptions = [
    { id: "all", label: "جميع المنتجات", icon: LayoutGrid, count: featuredProducts.length },
    { id: "bestseller", label: "الأكثر مبيعاً", icon: TrendingUp, count: featuredProducts.filter(p => p.bestSeller).length },
    { id: "new", label: "جديد", icon: Sparkles, count: featuredProducts.filter(p => p.newArrival).length },
    { id: "featured", label: "مميز", icon: Star, count: featuredProducts.filter(p => p.featured).length },
    { id: "discount", label: "خصومات", icon: Tag, count: featuredProducts.filter(p => p.discount).length },
  ];

  const filteredProducts = featuredProducts.filter(product => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "bestseller") return product.bestSeller;
    if (selectedFilter === "new") return product.newArrival;
    if (selectedFilter === "featured") return product.featured;
    if (selectedFilter === "discount") return product.discount;
    return true;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-cyan-300/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 opacity-30" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
            <Zap className="h-6 w-6 text-primary mr-2" />
            <span className="text-primary font-medium">منتجات مميزة</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            اكتشف مجموعتنا 
            <span className="text-gradient"> المُنتقاة</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            منتجات مُختارة بعناية فائقة لتلبي احتياجاتك وتفوق توقعاتك
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:w-80 flex-shrink-0"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6 sticky top-6">
              {/* Filter Header */}
              <div className="flex items-center mb-6">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Filter className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">التصنيفات</h3>
              </div>

              <Separator className="mb-6" />

              {/* Filter Options */}
              <div className="space-y-3">
                {filterOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = selectedFilter === option.id;
                  
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => setSelectedFilter(option.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? "bg-primary text-white shadow-lg shadow-primary/25" 
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center">
                        <Icon className={`h-5 w-5 mr-3 ${isActive ? "text-white" : "text-primary"}`} />
                        <span className="font-medium">{option.label}</span>
                      </div>
                      <Badge 
                        variant={isActive ? "secondary" : "outline"}
                        className={`text-xs ${isActive ? "bg-white/20 text-white" : ""}`}
                      >
                        {option.count}
                      </Badge>
                    </motion.button>
                  );
                })}
              </div>

              <Separator className="my-6" />

              {/* Quick Stats */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-2" />
                  إحصائيات سريعة
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{featuredProducts.length}</div>
                    <div className="text-xs text-blue-600/80">منتج مميز</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">4.8</div>
                    <div className="text-xs text-green-600/80">متوسط التقييم</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button asChild className="w-full mt-6 rounded-xl h-12 text-base font-medium bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/shop" className="flex items-center justify-center">
                  تسوق جميع المنتجات
                  <ChevronRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Grid Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {filterOptions.find(f => f.id === selectedFilter)?.label || "جميع المنتجات"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {filteredProducts.length} منتج متوفر
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <ProductGridToggle
                  view={gridView}
                  onChange={setGridView}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-white/50 shadow-sm"
                />
              </div>
            </div>

            {/* Products Content */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6">
              {filteredProducts.length > 0 ? (
                <ProductGrid 
                  products={filteredProducts}
                  view={gridView}
                  emptyMessage="لا توجد منتجات في هذا التصنيف"
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array(6).fill(0).map((_, i) => (
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
