
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, Sliders, RefreshCw, Sparkles, Star, Tag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, USD_TO_IQD_RATE } from "@/utils/currency";

interface DealsFiltersProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: "all", name: "جميع الفئات", icon: Package },
  { id: "phone-cases", name: "أغطية الهواتف", icon: Package },
  { id: "headphones", name: "سماعات الرأس", icon: Package },
  { id: "chargers", name: "الشواحن", icon: Package },
  { id: "cables", name: "الكابلات", icon: Package },
  { id: "speakers", name: "مكبرات الصوت", icon: Package },
  { id: "screen-protectors", name: "واقيات الشاشة", icon: Package },
  { id: "accessories", name: "الملحقات", icon: Package }
];

const DealsFilters: React.FC<DealsFiltersProps> = ({ isOpen, onClose }) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150 * USD_TO_IQD_RATE]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
    highDiscount: false,
    freeShipping: false,
  });

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const clearFilters = () => {
    setPriceRange([0, 150 * USD_TO_IQD_RATE]);
    setSelectedCategory("all");
    setSelectedFilters({
      bestSeller: false,
      newArrival: false,
      featured: false,
      inStock: false,
      highDiscount: false,
      freeShipping: false,
    });
  };

  const getActiveFiltersCount = () => {
    const activeFilters = Object.values(selectedFilters).filter(Boolean).length;
    const hasCustomPrice = priceRange[0] !== 0 || priceRange[1] !== 150 * USD_TO_IQD_RATE;
    const hasCustomCategory = selectedCategory !== "all";
    return activeFilters + (hasCustomPrice ? 1 : 0) + (hasCustomCategory ? 1 : 0);
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Sliders className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-lg">الفلاتر والخيارات</h3>
            <p className="text-sm text-gray-500">اضبط البحث حسب تفضيلاتك</p>
          </div>
        </div>
        
        {getActiveFiltersCount() > 0 && (
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {getActiveFiltersCount()} فلتر نشط
          </Badge>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">نطاق السعر</h4>
        </div>
        
        <div className="px-3">
          <Slider
            value={[priceRange[0], priceRange[1]]}
            max={200 * USD_TO_IQD_RATE}
            step={5000}
            onValueChange={handlePriceChange}
            className="mb-4"
          />
          
          <div className="flex justify-between items-center">
            <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium">
              {formatPrice(priceRange[0] / USD_TO_IQD_RATE)}
            </div>
            <span className="text-gray-400">-</span>
            <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm font-medium">
              {formatPrice(priceRange[1] / USD_TO_IQD_RATE)}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">الفئات</h4>
        </div>
        
        <div className="space-y-2">
          {categories.map(category => (
            <motion.div
              key={category.id}
              className={`cursor-pointer p-3 rounded-xl transition-all ${
                selectedCategory === category.id 
                  ? 'bg-primary/10 border-2 border-primary/30 text-primary' 
                  : 'hover:bg-gray-50 border-2 border-transparent'
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <category.icon className="w-4 h-4" />
                <span className="font-medium text-sm">{category.name}</span>
                {selectedCategory === category.id && (
                  <div className="w-2 h-2 bg-primary rounded-full mr-auto"></div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Filter Options */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">خيارات التصفية</h4>
        </div>
        
        <div className="space-y-3">
          {[
            { key: 'bestSeller', label: 'الأكثر مبيعاً', icon: Star },
            { key: 'newArrival', label: 'وصل حديثاً', icon: Tag },
            { key: 'featured', label: 'منتجات مميزة', icon: Sparkles },
            { key: 'inStock', label: 'متوفر في المخزون', icon: Package },
            { key: 'highDiscount', label: 'خصم أكثر من 30%', icon: Tag },
            { key: 'freeShipping', label: 'شحن مجاني', icon: Package },
          ].map(filter => (
            <motion.div
              key={filter.key}
              className="flex items-center space-x-3 space-x-reverse p-2 rounded-lg hover:bg-gray-50 transition-colors"
              whileHover={{ x: 4 }}
            >
              <Checkbox 
                id={filter.key}
                checked={selectedFilters[filter.key]}
                onCheckedChange={() => toggleFilter(filter.key)}
              />
              <filter.icon className="w-4 h-4 text-gray-500" />
              <label 
                htmlFor={filter.key} 
                className="text-sm font-medium cursor-pointer flex-1"
              >
                {filter.label}
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button 
          className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 font-semibold py-3"
          size="lg"
        >
          تطبيق الفلاتر
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full rounded-xl border-2 hover:bg-gray-50 font-medium"
          onClick={clearFilters}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          إعادة تعيين الفلاتر
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden xl:block">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 xl:hidden"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 xl:hidden overflow-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-xl">الفلاتر والخيارات</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DealsFilters;
