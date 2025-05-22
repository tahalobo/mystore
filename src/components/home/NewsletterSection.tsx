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
  return <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-400 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="text-center md:text-left">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              العلامات التجارية المميزة
            </h2>
            <p className="text-gray-600 mt-2 max-w-md">
              نقدم أفضل العلامات التجارية التقنية العالمية بضمان الجودة والأصالة
            </p>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <Button asChild variant="default" className="group">
              <Link to="/brands" className="flex items-center gap-2">
                عرض جميع العلامات التجارية
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        <div className="relative">
          <Carousel opts={{
          align: "start",
          loop: true
        }} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {brands.map((brand, index) => <CarouselItem key={brand.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                  <Link to={`/brand/${brand.id}`}>
                    <motion.div initial={{
                  opacity: 0,
                  y: 10
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.3,
                  delay: index * 0.1
                }} whileHover={{
                  y: -5
                }} className="h-full">
                      <Card className="overflow-hidden border-blue-100 bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6 flex flex-col items-center">
                          <div className="mb-4 h-20 flex items-center justify-center w-full">
                            <img src={brand.logo} alt={brand.name} className="max-h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{brand.name}</h3>
                          
                          
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </CarouselItem>)}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 bg-white/80 backdrop-blur-sm border-blue-100 hover:bg-blue-50" />
              <CarouselNext className="right-0 bg-white/80 backdrop-blur-sm border-blue-100 hover:bg-blue-50" />
            </div>
          </Carousel>
          
          {/* Carousel indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {brands.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to slide ${index + 1}`} />)}
          </div>
        </div>
        
        {/* Newsletter signup below brand carousel */}
        <motion.div className="mt-20 max-w-2xl mx-auto text-center" initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }}>
          
        </motion.div>
      </div>
    </section>;
};
export default NewsletterSection;