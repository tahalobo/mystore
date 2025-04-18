import React from "react";
import { X, SlidersHorizontal, ChevronDown, ChevronUp, DollarSign, Tag, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  priceRange: [number, number];
  onPriceChange: (value: number[]) => void;
  selectedFilters: {
    [key: string]: boolean | string;
  };
  toggleFilter: (filter: string) => void;
  handleSortChange: (value: string) => void;
  handleDiscountRangeChange?: (value: string) => void;
  handleColorFilterChange?: (value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  availableColors?: { [key: string]: string };
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  priceRange,
  onPriceChange,
  selectedFilters,
  toggleFilter,
  handleSortChange,
  handleDiscountRangeChange,
  handleColorFilterChange,
  applyFilters,
  resetFilters,
  availableColors,
}) => {
  const [expandedFilters, setExpandedFilters] = React.useState<{[key: string]: boolean}>({
    price: true,
    availability: true,
    productType: true,
    sort: true,
    discount: true,
    colors: true,
  });

  const toggleFilterSection = (section: string) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const FilterHeader = ({ title, filterKey }: { title: string, filterKey: string }) => (
    <div 
      className="flex items-center justify-between cursor-pointer py-2"
      onClick={() => toggleFilterSection(filterKey)}
    >
      <h3 className="font-semibold text-left">{title}</h3>
      {expandedFilters[filterKey] ? (
        <ChevronUp className="h-4 w-4 text-gray-500" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-500" />
      )}
    </div>
  );

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="h-[85vh]">
        <ScrollArea className="h-full">
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">الفلاتر</h2>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
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
                      <RadioGroupItem value="default" id="sort-default-mobile" />
                      <Label htmlFor="sort-default-mobile">الاصلي</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="priceAsc" id="sort-price-asc-mobile" />
                      <Label htmlFor="sort-price-asc-mobile">السعر : من الاغلى للارخص</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="priceDesc" id="sort-price-desc-mobile" />
                      <Label htmlFor="sort-price-desc-mobile">السعر: من الاغلى للارخص</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nameAsc" id="sort-name-asc-mobile" />
                      <Label htmlFor="sort-name-asc-mobile">الاسم من ألف إلى ياء</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nameDesc" id="sort-name-desc-mobile" />
                      <Label htmlFor="sort-name-desc-mobile">الاسم من ياء إلى ألف </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="newest" id="sort-newest-mobile" />
                      <Label htmlFor="sort-newest-mobile">الأحدث أولاً</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="popular" id="sort-popular-mobile" />
                      <Label htmlFor="sort-popular-mobile">الأكثر شهرة</Label>
                    </div>
                    {handleDiscountRangeChange && (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="discount" id="sort-discount-mobile" />
                        <Label htmlFor="sort-discount-mobile">أكبر خصم</Label>
                      </div>
                    )}
                  </RadioGroup>
                )}
              </div>

              {/* Price Range */}
              <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                <FilterHeader title="Price Range" filterKey="price" />
                
                {expandedFilters.price && (
                  <div className="px-2 mt-2">
                    <div className="flex items-center mb-2">
                      <DollarSign className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-medium">التصفية حسب السعر</span>
                    </div>
                    <Slider
                      defaultValue={[0, 150]}
                      value={[priceRange[0], priceRange[1]]}
                      max={150}
                      step={1}
                      onValueChange={onPriceChange}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Colors Filter */}
              {availableColors && handleColorFilterChange && (
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Colors" filterKey="colors" />
                  
                  {expandedFilters.colors && (
                    <div className="mt-2 space-y-2">
                      <RadioGroup
                        value={selectedFilters.colorFilter as string}
                        onValueChange={handleColorFilterChange}
                        className="mt-2 space-y-2"
                      >
                        {Object.entries(availableColors).map(([colorCode, colorName]) => (
                          <div className="flex items-center space-x-2" key={colorCode}>
                            <RadioGroupItem value={colorCode} id={`color-${colorCode}-mobile`} />
                            <div className="flex items-center">
                              {colorCode !== "all" && (
                                <span 
                                  className="w-4 h-4 rounded-full inline-block mr-2"
                                  style={{ backgroundColor: colorCode }}
                                ></span>
                              )}
                              <Label htmlFor={`color-${colorCode}-mobile`}>{colorName}</Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}
                </div>
              )}
              
              {/* Discount Filters */}
              {handleDiscountRangeChange && (
                <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                  <FilterHeader title="Discounts" filterKey="discount" />
                  
                  {expandedFilters.discount && (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center mb-2">
                        <Percent className="h-4 w-4 text-primary mr-1" />
                        <span className="text-sm font-medium">خيارات الخصم</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Checkbox 
                          id="has-discount-mobile" 
                          checked={selectedFilters.hasDiscount as boolean}
                          onCheckedChange={() => toggleFilter('hasDiscount')}
                          className="mr-2"
                        />
                        <label htmlFor="has-discount-mobile" className="text-sm cursor-pointer">
                          On Sale
                        </label>
                      </div>
                      
                      {selectedFilters.hasDiscount && handleDiscountRangeChange && (
                        <div className="pl-6 pt-2 space-y-2">
                          <RadioGroup
                            value={selectedFilters.discountRange as string}
                            onValueChange={handleDiscountRangeChange}
                            className="space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all" id="discount-all-mobile" />
                              <Label htmlFor="discount-all-mobile">جميع الخصومات</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="under25" id="discount-under25-mobile" />
                              <Label htmlFor="discount-under25-mobile">أقل من 25%</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="25to50" id="discount-25to50-mobile" />
                              <Label htmlFor="discount-25to50-mobile">25% - 50%</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="over50" id="discount-over50-mobile" />
                              <Label htmlFor="discount-over50-mobile"> 50% فوق </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Product Type Filters */}
              <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
                <FilterHeader title="Product Type" filterKey="productType" />
                
                {expandedFilters.productType && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center mb-2">
                      <Tag className="h-4 w-4 text-primary mr-1" />
                      <span className="text-sm font-medium">حالة المنتج</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox 
                        id="best-seller-mobile" 
                        checked={selectedFilters.bestSeller as boolean}
                        onCheckedChange={() => toggleFilter('bestSeller')}
                        className="mr-2"
                      />
                      <label htmlFor="best-seller-mobile" className="text-sm cursor-pointer">
                الأكثر مبيعاً
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="new-arrival-mobile" 
                        checked={selectedFilters.newArrival as boolean}
                        onCheckedChange={() => toggleFilter('newArrival')}
                        className="mr-2"
                      />
                      <label htmlFor="new-arrival-mobile" className="text-sm cursor-pointer">
                 الوافدون الجدد
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="featured-mobile" 
                        checked={selectedFilters.featured as boolean}
                        onCheckedChange={() => toggleFilter('featured')}
                        className="mr-2"
                      />
                      <label htmlFor="featured-mobile" className="text-sm cursor-pointer">
                       المنتجات المميزة
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
                        id="in-stock-mobile" 
                        checked={selectedFilters.inStock as boolean}
                        onCheckedChange={() => toggleFilter('inStock')}
                        className="mr-2"
                      />
                      <label htmlFor="in-stock-mobile" className="text-sm cursor-pointer">
                      متوفر في المخزون فقط
                      </label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Apply Filters */}
              <div className="flex flex-col space-y-2 sticky bottom-0 bg-white p-3 border-t border-gray-200 mt-4">
                <Button onClick={applyFilters} className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
              تطبيق الفلاتر
                </Button>
                <Button variant="outline" onClick={resetFilters} className="gap-2">
                  <X className="h-4 w-4" />
                مسح الفلاتر
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterDrawer;
