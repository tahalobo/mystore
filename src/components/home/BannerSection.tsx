
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BannerSection: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  return (
    <section className="py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* First Banner */}
            <CarouselItem className="md:basis-full lg:basis-full">
              <motion.div 
                className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-90"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="max-w-lg"
                  >
                    <motion.h2 
                      variants={itemVariants}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                    >
                      أحدث الإكسسوارات التقنية
                    </motion.h2>
                    <motion.p 
                      variants={itemVariants}
                      className="text-white/90 text-lg mb-6"
                    >
                      استكشف مجموعتنا من الإكسسوارات الحديثة لأجهزتك الذكية بأفضل الأسعار
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                        <Link to="/shop">تسوق الآن</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-400 rounded-full opacity-20"></div>
                <div className="absolute top-16 -left-8 w-32 h-32 bg-cyan-300 rounded-full opacity-20"></div>
              </motion.div>
            </CarouselItem>

            {/* Second Banner */}
            <CarouselItem className="md:basis-full lg:basis-full">
              <motion.div 
                className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-purple-600 to-pink-500 opacity-90"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="max-w-lg"
                  >
                    <motion.h2 
                      variants={itemVariants}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                    >
                      عروض حصرية
                    </motion.h2>
                    <motion.p 
                      variants={itemVariants}
                      className="text-white/90 text-lg mb-6"
                    >
                      خصومات رائعة على منتجات مختارة لفترة محدودة فقط
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                        <Link to="/deals">اكتشف العروض</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
                <div className="absolute -bottom-12 -left-16 w-48 h-48 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-12 -right-8 w-32 h-32 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
              </motion.div>
            </CarouselItem>

            {/* Third Banner */}
            <CarouselItem className="md:basis-full lg:basis-full">
              <motion.div 
                className="h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden relative"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 opacity-90"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="max-w-lg"
                  >
                    <motion.h2 
                      variants={itemVariants}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
                    >
                      ماركات عالمية
                    </motion.h2>
                    <motion.p 
                      variants={itemVariants}
                      className="text-white/90 text-lg mb-6"
                    >
                      تسوق من مجموعة واسعة من الماركات العالمية المميزة
                    </motion.p>
                    <motion.div variants={itemVariants}>
                      <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-white/90">
                        <Link to="/brands">تصفح الماركات</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-yellow-400 rounded-full opacity-20"></div>
                <div className="absolute top-10 -left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20"></div>
              </motion.div>
            </CarouselItem>
          </CarouselContent>
          
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="static mx-2 transform-none bg-white/20 backdrop-blur-sm hover:bg-white/40 border-0" />
            <CarouselNext className="static mx-2 transform-none bg-white/20 backdrop-blur-sm hover:bg-white/40 border-0" />
          </div>
        </Carousel>
        
        {/* Feature boxes below the slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm flex items-center"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">ضمان جودة</h3>
              <p className="text-sm text-gray-600">جميع منتجاتنا أصلية ومضمونة</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm flex items-center"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 4-8-4V5l8 4 8-4v2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">شحن سريع</h3>
              <p className="text-sm text-gray-600">توصيل سريع لجميع مناطق المملكة</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg shadow-sm flex items-center"
          >
            <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">الدفع عند الاستلام</h3>
              <p className="text-sm text-gray-600">ادفع بعد استلام منتجاتك</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
