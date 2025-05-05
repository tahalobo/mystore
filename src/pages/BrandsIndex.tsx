
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, Info, Star, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRTL } from "@/contexts/RTLContext";
import { rtlAwareClasses } from "@/lib/rtl-utils";
import ProductPagination from "@/components/ProductPagination";

// Brand data
const brands = [
  {
    id: "apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1516245556508-7d60d4ff0f39?q=80&w=2000&h=500&fit=crop",
    description: "شركة آبل هي شركة تكنولوجيا أمريكية متعددة الجنسيات تقوم بتصميم وتطوير وبيع الإلكترونيات الاستهلاكية وبرامج الكمبيوتر والخدمات عبر الإنترنت.",
    founded: "April 1, 1976",
    headquarters: "Cupertino, California, United States",
    websiteUrl: "https://www.apple.com",
    color: "#333333",
    productCount: 24,
    popularCategories: ["iPhone", "iPad", "Apple Watch", "AirPods"]
  },
  {
    id: "samsung",
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2000&h=500&fit=crop",
    description: "شركة سامسونج للإلكترونيات المحدودة هي شركة كورية جنوبية متعددة الجنسيات للإلكترونيات يقع مقرها الرئيسي في سوون، كوريا الجنوبية. وهي القسم الرئيسي لمجموعة سامسونج.",
    founded: "January 13, 1969",
    headquarters: "Suwon, South Korea",
    websiteUrl: "https://www.samsung.com",
    color: "#1428a0",
    productCount: 32,
    popularCategories: ["Galaxy", "QLED TV", "Soundbar", "Refrigerator"]
  },
  {
    id: "sony",
    name: "Sony",
    logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&h=500&fit=crop",
    description: "شركة سوني هي شركة يابانية متعددة الجنسيات يقع مقرها الرئيسي في كونان، ميناتو، طوكيو. وتعمل الشركة كواحدة من أكبر الشركات المصنعة للمنتجات الإلكترونية الاستهلاكية والمهنية في العالم.",
    founded: "May 7, 1946",
    headquarters: "Tokyo, Japan",
    websiteUrl: "https://www.sony.com",
    color: "#000000",
    productCount: 18,
    popularCategories: ["PlayStation", "Bravia TV", "Headphones", "Camera"]
  },
  {
    id: "bose",
    name: "Bose",
    logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
    description: "شركة Bose Corporation هي شركة تصنيع أمريكية تبيع في الغالب المعدات الصوتية. وقد تأسست الشركة على يد عمار بوز في عام 1964 ويقع مقرها في فرامنغهام، ماساتشوستس.",
    founded: "1964",
    headquarters: "Framingham, Massachusetts, United States",
    websiteUrl: "https://www.bose.com",
    color: "#D51C29",
    productCount: 14,
    popularCategories: ["Headphones", "Speakers", "Soundbars", "Audio Sunglasses"]
  },
  {
    id: "jbl",
    name: "JBL",
    logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&h=500&fit=crop",
    description: "شركة جي بي إل هي شركة أمريكية لتصنيع الأجهزة الصوتية تأسست عام 1946 على يد جيمس بولو لانسنج. وتشمل منتجاتها مكبرات الصوت وسماعات الرأس للأسواق الاستهلاكية والمهنية.",
    founded: "1946",
    headquarters: "Los Angeles, California, United States",
    websiteUrl: "https://www.jbl.com",
    color: "#FF6600",
    productCount: 22,
    popularCategories: ["Speakers", "Headphones", "Earbuds", "Soundbars"]
  },
  {
    id: "anker",
    name: "Anker",
    logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
    banner: "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=2000&h=500&fit=crop",
    description: "أنكر إنوفيشنز هي شركة إلكترونيات صينية أسسها ستيفن يانغ، وهو مهندس برمجيات سابق في جوجل. تنتج الشركة أجهزة الكمبيوتر والأجهزة الطرفية المحمولة، بما في ذلك شواحن الهواتف وبنوك الطاقة وسماعات الأذن وسماعات الرأس ومكبرات الصوت والكابلات.",
    founded: "2011",
    headquarters: "Shenzhen, China",
    websiteUrl: "https://www.anker.com",
    color: "#00AEEF",
    productCount: 28,
    popularCategories: ["Chargers", "Power Banks", "Cables", "Earbuds"]
  }
];

const gradients = [
  "bg-gradient-to-r from-blue-800 to-indigo-900",
  "bg-gradient-to-r from-purple-800 to-indigo-900",
  "bg-gradient-to-r from-gray-800 to-gray-900",
  "bg-gradient-to-r from-red-700 to-rose-800",
  "bg-gradient-to-r from-amber-600 to-orange-700",
  "bg-gradient-to-r from-sky-600 to-cyan-700",
];

const ITEMS_PER_PAGE = 7;

const BrandsIndex: React.FC = () => {
  const { isRTL } = useRTL();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedBrands, setPaginatedBrands] = useState(brands.slice(0, ITEMS_PER_PAGE));
  const [totalPages, setTotalPages] = useState(Math.ceil(brands.length / ITEMS_PER_PAGE));
  
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedBrands(brands.slice(startIndex, endIndex));
  }, [currentPage]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById('featured-brands')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                أفضل العلامات التجارية التقنية
              </h1>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8">
                استكشف المنتجات المتميزة من أكثر العلامات التجارية التقنية الموثوقة في العالم.
                اكتشف الحلول المبتكرة من رواد الصناعة.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link to="/shop">
تسوق جميع المنتجات
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  <a href="#featured-brands">
                    شاهد جميع العلامات التجارية
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Brand Advantages */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="mx-auto bg-blue-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <ShieldCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">منتجات أصلية</h3>
                <p className="text-gray-600">جميع المنتجات أصلية 100% مع ضمان كامل من الشركة المصنعة.</p>
              </motion.div>
              
              <motion.div 
                className="text-center bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="mx-auto bg-amber-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <Star className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">مجموعة مختارات متميزة</h3>
                <p className="text-gray-600">منتجات مُنتقاة بعناية من أفضل العلامات التجارية التكنولوجية في العالم.</p>
              </motion.div>
              
              <motion.div 
                className="text-center bg-gray-50 p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="mx-auto bg-green-100 w-16 h-16 flex items-center justify-center rounded-full mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">عروض حصرية</h3>
                <p className="text-gray-600">احصل على صفقات وعروض ترويجية حصرية من علاماتك التجارية المفضلة.</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured Brands */}
        <section id="featured-brands" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">العلامات المميزة</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
     استكشف مجموعتنا من المنتجات الفاخرة من هذه العلامات التجارية الرائدة في الصناعة. تقدم كل علامة تجارية ابتكارات فريدة وحرفية عالية الجودة.
              </p>
            </div>
            
            <Tabs defaultValue="grid" className="w-full mb-8">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="grid">عرض شبكي</TabsTrigger>
                  <TabsTrigger value="list">عرض قائمة</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedBrands.map((brand, index) => (
                    <motion.div
                      key={brand.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group"
                    >
                      <div className={`h-32 flex items-center justify-center p-4 ${gradients[index % gradients.length]}`}>
                        <img 
                          src={brand.logo} 
                          alt={`${brand.name} logo`} 
                          className="max-h-20 max-w-[180px] object-contain filter brightness-0 invert" 
                        />
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{brand.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {brand.popularCategories.map((category, i) => (
                            <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-600">{brand.productCount} منتج</span>
                          <Button asChild variant="ghost" size="sm" className="text-gray-600 hover:text-primary transition-colors">
                            <Link to={`/brand/${brand.id}`} className={rtlAwareClasses(isRTL, "flex items-center gap-1", "flex items-center gap-1 flex-row-reverse")}>
                              عرض العلامة التجارية
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-6">
                <div className="space-y-4">
                  {paginatedBrands.map((brand, index) => (
                    <motion.div
                      key={brand.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className={rtlAwareClasses(
                        isRTL, 
                        "bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col md:flex-row",
                        "bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col md:flex-row-reverse"
                      )}
                    >
                      <div className={`md:w-1/4 ${gradients[index % gradients.length]} flex items-center justify-center p-6`}>
                        <img 
                          src={brand.logo} 
                          alt={`${brand.name} logo`} 
                          className="max-h-16 md:max-h-24 max-w-[180px] object-contain filter brightness-0 invert" 
                        />
                      </div>
                      
                      <div className="p-6 md:w-3/4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <h3 className="text-xl font-semibold">{brand.name}</h3>
                          <div className="flex items-center mt-2 md:mt-0">
                            <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                              {brand.productCount} منتج
                            </span>
                            <a 
                              href={brand.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className={rtlAwareClasses(isRTL, "ml-3 text-gray-500 hover:text-gray-700 text-sm flex items-center", "mr-3 text-gray-500 hover:text-gray-700 text-sm flex items-center")}
                            >
                              الموقع الرسمي
                              <ExternalLink className={rtlAwareClasses(isRTL, "ml-1 h-3 w-3", "mr-1 h-3 w-3")} />
                            </a>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{brand.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {brand.popularCategories.map((category, i) => (
                            <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600">
                              {category}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between border-t pt-4 mt-2">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <Info className={rtlAwareClasses(isRTL, "mr-1 h-4 w-4 text-gray-400", "ml-1 h-4 w-4 text-gray-400")} />
                              تأسست: {brand.founded}
                            </div>
                            <div className="hidden md:block text-sm text-gray-500">
                              المقر: {brand.headquarters}
                            </div>
                          </div>
                          
                          <Button asChild>
                            <Link to={`/brand/${brand.id}`}>
                              استكشاف المنتجات
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <ProductPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">هل أنت جاهز للتسوق؟</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              تصفح مجموعتنا الواسعة من المنتجات المتميزة من أكثر العلامات التجارية الموثوقة في العالم.
            </p>
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link to="/shop">
                تسوق جميع المنتجات
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrandsIndex;
