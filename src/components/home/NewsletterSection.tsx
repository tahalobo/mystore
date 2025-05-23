
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Brand data from BrandsSection
const brands = [{
  id: "apple",
  name: "Apple",
  logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
  slogan: "Think Different",
  category: "Consumer Electronics",
  productCount: 42
}, {
  id: "samsung",
  name: "Samsung",
  logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
  slogan: "Do What You Can't",
  category: "Electronics & Technology",
  productCount: 56
}, {
  id: "sony",
  name: "Sony",
  logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
  slogan: "Be Moved",
  category: "Entertainment & Electronics",
  productCount: 38
}, {
  id: "bose",
  name: "Bose",
  logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
  slogan: "Better Sound Through Research",
  category: "Audio Equipment",
  productCount: 24
}, {
  id: "jbl",
  name: "JBL",
  logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
  slogan: "Sound that Moves You",
  category: "Audio Systems",
  productCount: 31
}, {
  id: "anker",
  name: "Anker",
  logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
  slogan: "Power for All",
  category: "Mobile Accessories",
  productCount: 47
}];

const NewsletterSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription:', email);
      setEmail('');
      // Handle subscription logic here
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">ابق على اطلاع بأحدث العروض</h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                اشترك في نشرتنا الإخبارية واحصل على أحدث العروض والمنتجات الجديدة
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                <Mail className="mr-2 h-5 w-5" />
                اشتراك
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">
                انضم إلى أكثر من 10,000 عميل راضٍ واحصل على خصم 10% على طلبك الأول
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {brands.slice(0, 6).map((brand, index) => (
                  <motion.div
                    key={brand.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4 flex items-center justify-center"
                  >
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-8 max-w-20 object-contain opacity-60"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
