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
import { getBrands, ApiBrand } from "@/utils/brandsApi";

const gradients = ["bg-gradient-to-r from-blue-800 to-indigo-900", "bg-gradient-to-r from-purple-800 to-indigo-900", "bg-gradient-to-r from-gray-800 to-gray-900", "bg-gradient-to-r from-red-700 to-rose-800", "bg-gradient-to-r from-amber-600 to-orange-700", "bg-gradient-to-r from-sky-600 to-cyan-700"];
const ITEMS_PER_PAGE = 7;

const BrandsIndex: React.FC = () => {
  const { isRTL } = useRTL();
  const [currentPage, setCurrentPage] = useState(1);
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [paginatedBrands, setPaginatedBrands] = useState<ApiBrand[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      try {
        const brandsData = await getBrands();
        // Verify received data length
        console.log('Received brands count:', brandsData.length);
        setBrands(brandsData);
        setTotalPages(Math.ceil(brandsData.length / ITEMS_PER_PAGE));
      } catch (error) {
        console.error('Error loading brands:', error);
      } finally {
        setLoading(false);
      }
    };
    loadBrands();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedBrands(brands.slice(startIndex, endIndex));
  }, [currentPage, brands]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.getElementById('featured-brands')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  if (loading) {
    return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">جاري تحميل العلامات التجارية...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </main>
      <Footer />
    </div>;
  }

  return <div className="flex flex-col min-h-screen">
    <Header />
    
    <main className="flex-grow pt-24">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} 
                     animate={{ opacity: 1, y: 0 }} 
                     transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              أفضل العلامات التجارية التقنية
            </h1>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              استكشف المنتجات المتميزة من أكثر العلامات التجارية التقنية الموثوقة في العالم.
              اكتشف الحلول المبتكرة من رواد الصناعة.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Link to="/shop">تسوق جميع المنتجات</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Brand Advantages */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ... Advantage cards ... */}
          </div>
        </div>
      </section>
      
      {/* Featured Brands */}
      <section id="featured-brands" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">العلامات المميزة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              استكشف مجموعتنا من المنتجات الفاخرة من هذه العلامات التجارية الرائدة في الصناعة.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBrands.map((brand, index) => (
              <motion.div key={brand.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group">
                <div className={`h-32 flex items-center justify-center p-4 ${gradients[index % gradients.length]}`}>
                  <div className="text-2xl font-bold text-white">
                    {brand.name}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">كود: {brand.code}</p>
                  
                  <div className="flex items-center justify-between">
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
            <Link to="/shop">تسوق جميع المنتجات</Link>
          </Button>
        </div>
      </section>
    </main>
    
    <Footer />
  </div>;
};

export default BrandsIndex;
