
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  X, 
  DollarSign, 
  Star,
  Tag,
  Zap,
  Grid,
  TrendingUp
} from "lucide-react";
import { Product } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/utils/currency";

interface ShopFiltersProps {
  selectedFilters: {
    [key: string]: boolean | string | number[];
  };
  onFiltersChange: (filters: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  products: Product[];
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
  selectedFilters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  products
}) => {
  const [openSections, setOpenSections] = useState({
    price: true,
    category: true,
    features: true,
    rating: true,
    sort: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const categories = Array.from(new Set(products.map(p => p.category)));
  const maxPrice = Math.max(...products.map(p => p.price));

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...selectedFilters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (key === 'priceRange') {
        const [min, max] = value as number[];
        if (min > 0 || max < 200) count++;
      } else if (typeof value === 'boolean' && value) {
        count++;
      } else if (typeof value === 'string' && value !== 'all' && value !== 'default') {
        count++;
      } else if (typeof value === 'number' && value > 0) {
        count++;
      }
    });
    return count;
  };

  const FilterSection = ({ 
    title, 
    icon: Icon, 
    sectionKey, 
    children 
  }: { 
    title: string; 
    icon: any; 
    sectionKey: string; 
    children: React.ReactNode;
  }) => (
    <Card className="shadow-sm border-gray-100">
      <Collapsible
        open={openSections[sectionKey as keyof typeof openSections]}
        onOpenChange={() => toggleSection(sectionKey)}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                {title}
              </div>
              {openSections[sectionKey as keyof typeof openSections] ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-50 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">الفلاتر</h3>
              {getActiveFiltersCount() > 0 && (
                <Badge variant="default" className="rounded-full">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </div>
            
            {getActiveFiltersCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-1" />
                مسح الكل
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Price Range Filter */}
      <FilterSection title="نطاق السعر" icon={DollarSign} sectionKey="price">
        <div className="space-y-4">
          <Slider
            value={selectedFilters.priceRange as number[]}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={maxPrice}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>{formatPrice((selectedFilters.priceRange as number[])[0])}</span>
            <span>-</span>
            <span>{formatPrice((selectedFilters.priceRange as number[])[1])}</span>
          </div>
        </div>
      </FilterSection>

      {/* Category Filter */}
      <FilterSection title="الفئات" icon={Grid} sectionKey="category">
        <RadioGroup
          value={selectedFilters.category as string}
          onValueChange={(value) => updateFilter('category', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="cat-all" />
            <Label htmlFor="cat-all" className="cursor-pointer">جميع الفئات</Label>
          </div>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem value={category} id={`cat-${category}`} />
              <Label htmlFor={`cat-${category}`} className="cursor-pointer capitalize">
                {category.replace('-', ' ')}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      {/* Product Features */}
      <FilterSection title="خصائص المنتج" icon={Zap} sectionKey="features">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bestseller"
              checked={selectedFilters.bestSeller as boolean}
              onCheckedChange={(checked) => updateFilter('bestSeller', checked)}
            />
            <Label htmlFor="bestseller" className="cursor-pointer">الأكثر مبيعاً</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newarrival"
              checked={selectedFilters.newArrival as boolean}
              onCheckedChange={(checked) => updateFilter('newArrival', checked)}
            />
            <Label htmlFor="newarrival" className="cursor-pointer">وصل حديثاً</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={selectedFilters.featured as boolean}
              onCheckedChange={(checked) => updateFilter('featured', checked)}
            />
            <Label htmlFor="featured" className="cursor-pointer">منتجات مميزة</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="instock"
              checked={selectedFilters.inStock as boolean}
              onCheckedChange={(checked) => updateFilter('inStock', checked)}
            />
            <Label htmlFor="instock" className="cursor-pointer">متوفر في المخزون</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasdiscount"
              checked={selectedFilters.hasDiscount as boolean}
              onCheckedChange={(checked) => updateFilter('hasDiscount', checked)}
            />
            <Label htmlFor="hasdiscount" className="cursor-pointer">منتجات مخفضة</Label>
          </div>
        </div>
      </FilterSection>

      {/* Rating Filter */}
      <FilterSection title="التقييم" icon={Star} sectionKey="rating">
        <RadioGroup
          value={selectedFilters.rating?.toString()}
          onValueChange={(value) => updateFilter('rating', parseInt(value))}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="rating-all" />
            <Label htmlFor="rating-all" className="cursor-pointer">جميع التقييمات</Label>
          </div>
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="cursor-pointer flex items-center">
                <div className="flex mr-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                فأكثر
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      {/* Sort Options */}
      <FilterSection title="ترتيب حسب" icon={TrendingUp} sectionKey="sort">
        <Select
          value={selectedFilters.sortBy as string}
          onValueChange={(value) => updateFilter('sortBy', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="اختر طريقة الترتيب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">الترتيب الافتراضي</SelectItem>
            <SelectItem value="priceAsc">السعر: من الأقل للأعلى</SelectItem>
            <SelectItem value="priceDesc">السعر: من الأعلى للأقل</SelectItem>
            <SelectItem value="nameAsc">الاسم: أ-ي</SelectItem>
            <SelectItem value="nameDesc">الاسم: ي-أ</SelectItem>
            <SelectItem value="rating">التقييم الأعلى</SelectItem>
            <SelectItem value="newest">الأحدث</SelectItem>
            <SelectItem value="popular">الأكثر شعبية</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Apply Filters Button */}
      <Card className="bg-gradient-to-r from-primary to-blue-600 text-white">
        <CardContent className="p-4">
          <Button 
            onClick={onApplyFilters}
            className="w-full bg-white text-primary hover:bg-gray-100"
            size="lg"
          >
            <Filter className="h-4 w-4 mr-2" />
            تطبيق الفلاتر ({filteredProducts?.length || 0} منتج)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopFilters;
