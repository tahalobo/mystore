import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { allProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import ScrollToTop from "@/components/ScrollToTop";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUpDown, ChevronDown, X, Star, Zap, ShieldCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileCollectionHeader from "@/components/MobileCollectionHeader";
import MobileProductList from "@/components/MobileProductList";
import { cn } from "@/lib/utils";
import { useRTL } from "@/contexts/RTLContext";
import { rtlAwareClasses } from "@/lib/rtl-utils";
const categories = ["كل الاقسام", "اغلفة الهاتف", "سماعات راس", "شاحنات", "كيابل", "سماعات", "شاشات الحماية", "ملحقات"];
const brandsData = [{
  id: "apple",
  name: "Apple",
  logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
  banner: "https://images.unsplash.com/photo-1516245556508-7d60d4ff0f39?q=80&w=2000&h=500&fit=crop",
  description: "شركة آبل هي شركة تكنولوجيا أمريكية متعددة الجنسيات تقوم بتصميم وتطوير وبيع الإلكترونيات الاستهلاكية وبرامج الكمبيوتر والخدمات عبر الإنترنت. تشمل منتجات الشركة من الأجهزة الهاتف الذكي iPhone، والكمبيوتر اللوحي iPad، والكمبيوتر الشخصي Mac، ومشغل الوسائط المحمول iPod، وساعة Apple Watch الذكية، ومشغل الوسائط الرقمية Apple TV، وسماعات الأذن اللاسلكية AirPods، ومكبر الصوت الذكي HomePod.",
  founded: "April 1, 1976",
  headquarters: "Cupertino, California, United States",
  website: "https://www.apple.com",
  color: "#333333"
}, {
  id: "samsung",
  name: "Samsung",
  logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
  banner: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2000&h=500&fit=crop",
  description: "شركة سامسونج للإلكترونيات المحدودة هي شركة كورية جنوبية متعددة الجنسيات للإلكترونيات يقع مقرها الرئيسي في سوون بكوريا الجنوبية. وهي القسم الرئيسي في مجموعة سامسونج وهي أكبر شركة تكنولوجيا معلومات وصانع إلكترونيات استهلاكية وصانع رقائق إلكترونية استهلاكية في العالم من حيث الإيرادات منذ عام 2009.",
  founded: "January 13, 1969",
  headquarters: "Suwon, South Korea",
  website: "https://www.samsung.com",
  color: "#1428a0"
}, {
  id: "sony",
  name: "Sony",
  logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
  banner: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&h=500&fit=crop",
  description: "شركة سوني هي شركة يابانية متعددة الجنسيات يقع مقرها الرئيسي في كونان، ميناتو، طوكيو. تعمل الشركة كواحدة من أكبر الشركات المصنعة للمنتجات الإلكترونية الاستهلاكية والمهنية في العالم، وأكبر شركة لأجهزة ألعاب الفيديو، وثاني أكبر ناشر لألعاب الفيديو، وواحدة من أكثر الشركات الإعلامية شمولاً.",
  founded: "May 7, 1946",
  headquarters: "Tokyo, Japan",
  website: "https://www.sony.com",
  color: "#000000"
}, {
  id: "bose",
  name: "Bose",
  logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
  banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
  description: "شركة Bose Corporation هي شركة تصنيع أمريكية تبيع في الغالب المعدات الصوتية. تأسست الشركة على يد عمار بوز في عام 1964 ويقع مقرها في فرامنغهام، ماساتشوستس. تشتهر Bose بأنظمة الصوت المنزلية، ومكبرات الصوت، وسماعات إلغاء الضوضاء، والمنتجات الصوتية الاحترافية وأنظمة الصوت في السيارات.",
  founded: "1964",
  headquarters: "Framingham, Massachusetts, United States",
  website: "https://www.bose.com",
  color: "#D51C29"
}, {
  id: "jbl",
  name: "JBL",
  logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
  banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
  description: "شركة جي بي إل هي شركة أمريكية لتصنيع الأجهزة الصوتية تأسست في عام 1946 على يد جيمس بولو لانسنج. وتشمل منتجاتها مكبرات الصوت وسماعات الرأس للأسواق الاستهلاكية والمهنية. ومنذ عام 1969، أصبحت JBL أحد أقسام شركة Harman International، وهي شركة تابعة لشركة Samsung Electronics.",
  founded: "1946",
  headquarters: "Los Angeles, California, United States",
  website: "https://www.jbl.com",
  color: "#FF6600"
}, {
  id: "anker",
  name: "Anker",
  logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
  banner: "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2000&h=500&fit=crop",
  description: "أنكر إنوفيشنز هي شركة إلكترونيات صينية أسسها ستيفن يانغ، وهو مهندس برمجيات سابق في جوجل. وتنتج الشركة أجهزة الكمبيوتر والأجهزة الطرفية المحمولة، بما في ذلك شواحن الهواتف وبنوك الطاقة وسماعات الأذن وسماعات الرأس ومكبرات الصوت والكابلات.",
  founded: "2011",
  headquarters: "Shenzhen, China",
  website: "https://www.anker.com",
  color: "#00AEEF"
}];
const BrandPage: React.FC = () => {
  const {
    brandId
  } = useParams<{
    brandId: string;
  }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("featured");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: boolean;
  }>({
    bestSeller: false,
    newArrival: false,
    featured: false,
    inStock: false,
    onSale: false,
    freeShipping: false
  });
  const isMobile = useIsMobile();
  const {
    isRTL
  } = useRTL();
  const brand = brandsData.find(b => b.id === brandId);
  useEffect(() => {
    const brandProducts = allProducts.filter(product => product.brand && product.brand.toLowerCase() === (brandId || '').toLowerCase());
    setProducts(brandProducts.length > 0 ? brandProducts : allProducts.slice(0, 12));
  }, [brandId]);
  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeProductModal = () => {
    setIsModalOpen(false);
  };
  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };
  const applyFilters = () => {
    let filtered = [...allProducts];
    filtered = filtered.filter(product => product.brand && product.brand.toLowerCase() === (brandId || '').toLowerCase());
    if (filtered.length === 0) {
      filtered = allProducts.slice(0, 12);
    }
    filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase().replace(/\s+/g, '-'));
    }
    if (selectedFilters.bestSeller) {
      filtered = filtered.filter(product => product.bestSeller);
    }
    if (selectedFilters.newArrival) {
      filtered = filtered.filter(product => product.newArrival);
    }
    if (selectedFilters.featured) {
      filtered = filtered.filter(product => product.featured);
    }
    if (selectedFilters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    if (selectedFilters.onSale) {
      filtered = filtered.filter(product => product.discount && product.discount > 0);
    }
    filtered.sort((a, b) => {
      if (sortOption === "price-asc") {
        return a.price - b.price;
      } else if (sortOption === "price-desc") {
        return b.price - a.price;
      } else if (sortOption === "newest") {
        return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      } else if (sortOption === "popular") {
        return (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0);
      }
      return 0;
    });
    setProducts(filtered);
    if (isMobile) {
      setFilterOpen(false);
    }
  };
  const clearFilters = () => {
    setPriceRange([0, 150]);
    setSelectedCategory("All Categories");
    setSelectedFilters({
      bestSeller: false,
      newArrival: false,
      featured: false,
      inStock: false,
      onSale: false,
      freeShipping: false
    });
    setSortOption("featured");
    const brandProducts = allProducts.filter(product => product.brand && product.brand.toLowerCase() === (brandId || '').toLowerCase());
    setProducts(brandProducts.length > 0 ? brandProducts : allProducts.slice(0, 12));
  };
  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  if (!brand) {
    return <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">العلامة التجارية غير موجودة</h1>
            <p className="mb-8">العلامة التجارية التي تبحث عنها غير موجودة أو تمت إزالتها.</p>
            <Button asChild>
              <Link to="/brands">تصفح كل العلامات التجارية</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>;
  }
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {isMobile ? <MobileCollectionHeader title={brand.name} description={brand.description.split('.')[0]} imageUrl={brand.banner} setFilterOpen={setFilterOpen} filterOpen={filterOpen} /> : <div className="relative h-[300px] bg-cover bg-center flex items-center justify-center" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${brand.banner})`
      }}>
            <div className="container mx-auto px-4 text-center text-white relative z-10">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl inline-block mb-4">
                <img src={brand.logo} alt={`${brand.name} logo`} className="h-16 object-contain filter brightness-0 invert" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{brand.name}</h1>
              
            </div>
          </div>}
        
        <div className="container mx-auto px-4 py-8">
          <div className={rtlAwareClasses(isRTL, "flex flex-col md:flex-row gap-6", "flex flex-col md:flex-row-reverse gap-6")}>
            <div className={cn("md:w-1/4 lg:w-1/5", filterOpen ? "block" : "hidden", "md:block fixed md:static inset-0 md:inset-auto z-50 md:z-0", "bg-white md:bg-transparent", "p-6 md:p-0 overflow-auto md:overflow-visible", "transform transition-transform duration-300 ease-in-out")}>
              <div className="flex items-center justify-between mb-4 md:hidden">
                <h3 className="font-semibold text-lg">الفلاتر</h3>
                <Button variant="ghost" size="icon" onClick={() => setFilterOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-4 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">الفئات</h3>
                  <div className="space-y-1">
                    {categories.map(category => <div key={category} onClick={() => setSelectedCategory(category)} className={`cursor-pointer py-1.5 px-3 rounded-md transition-colors text-sm ${selectedCategory === category ? 'bg-blue-50 text-blue-600 font-medium' : 'hover:bg-gray-50'}`}>
                        {category}
                      </div>)}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">نطاق السعر</h3>
                  <div className="px-2">
                    <Slider defaultValue={[0, 150]} value={[priceRange[0], priceRange[1]]} max={150} step={1} onValueChange={handlePriceChange} className="mb-6" />
                    <div className="flex items-center justify-between text-sm">
                      <div className="bg-gray-50 border rounded py-1 px-2 w-16 text-center">
                        ${priceRange[0]}
                      </div>
                      <span className="text-gray-400">إلى</span>
                      <div className="bg-gray-50 border rounded py-1 px-2 w-16 text-center">
                        ${priceRange[1]}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-gray-800">فلاتر المنتجات</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox id="best-seller" checked={selectedFilters.bestSeller} onCheckedChange={() => toggleFilter('bestSeller')} className={rtlAwareClasses(isRTL, "mr-2 text-blue-600", "ml-2 text-blue-600")} />
                      <label htmlFor="best-seller" className="text-sm cursor-pointer flex items-center gap-1.5">
                   الاكثر مبيعا
                        <Star className="h-3.5 w-3.5 text-amber-400" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="new-arrival" checked={selectedFilters.newArrival} onCheckedChange={() => toggleFilter('newArrival')} className={rtlAwareClasses(isRTL, "mr-2", "ml-2")} />
                      <label htmlFor="new-arrival" className="text-sm cursor-pointer">
                 جديدنا
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="featured" checked={selectedFilters.featured} onCheckedChange={() => toggleFilter('featured')} className={rtlAwareClasses(isRTL, "mr-2", "ml-2")} />
                      <label htmlFor="featured" className="text-sm cursor-pointer">
                    منتجات مقترحة
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="in-stock" checked={selectedFilters.inStock} onCheckedChange={() => toggleFilter('inStock')} className={rtlAwareClasses(isRTL, "mr-2", "ml-2")} />
                      <label htmlFor="in-stock" className="text-sm cursor-pointer">
               متوفر
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="on-sale" checked={selectedFilters.onSale} onCheckedChange={() => toggleFilter('onSale')} className={rtlAwareClasses(isRTL, "mr-2", "ml-2")} />
                      <label htmlFor="on-sale" className="text-sm cursor-pointer flex items-center gap-1.5">
                    معروض
                        <Zap className="h-3.5 w-3.5 text-orange-500" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="free-shipping" checked={selectedFilters.freeShipping} onCheckedChange={() => toggleFilter('freeShipping')} className={rtlAwareClasses(isRTL, "mr-2", "ml-2")} />
                      <label htmlFor="free-shipping" className="text-sm cursor-pointer flex items-center gap-1.5">
                     توصيل مجاني
                        <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 pt-2">
                  <Button onClick={applyFilters} className="w-full">
                  تطبيق
                  </Button>
                  <Button variant="outline" onClick={clearFilters} className="w-full">
               إزالة
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="md:w-3/4 lg:w-4/5">
              {isMobile ? <MobileProductList products={products} onProductClick={openProductModal} resetFilters={clearFilters} /> : <>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-500">
                      عرض <span className="font-medium">{products.length}</span> منتج
                    </p>
                    <div className="flex items-center gap-2">
                      <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="border rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option value="featured">مقترحة</option>
                        <option value="price-asc">الارخص</option>
                        <option value="price-desc">الاغلى</option>
                        <option value="newest">الاجدد</option>
                        <option value="popular">الاشهر</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product, index) => <div key={product.id} className="animate-fade-up" style={{
                  animationDelay: `${index * 50}ms`
                }}>
                        <ProductCard product={product} onProductClick={openProductModal} />
                      </div>)}
                  </div>
                </>}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <ProductDetailModal product={selectedProduct} isOpen={isModalOpen} onClose={closeProductModal} />
      
      <ScrollToTop />
      
      {filterOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setFilterOpen(false)} />}
    </div>;
};
export default BrandPage;