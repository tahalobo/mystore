
import React from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";

const BannerSection: React.FC = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Enhanced banner data with premium styling
  const banners = [
    {
      id: 1,
      bgGradient: "from-violet-600 via-purple-600 to-blue-600",
      title: "مجموعة حصرية من الإكسسوارات",
      subtitle: "تقنية متطورة",
      description: "اكتشف أحدث الإكسسوارات التقنية المبتكرة مع ضمان الجودة العالية وأفضل الأسعار",
      buttonText: "استكشف المجموعة",
      buttonLink: "/shop",
      imageUrl: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?q=80&w=2072&auto=format&fit=crop",
      accent: "من",
      highlight: "50% خصم",
      icon: Sparkles
    },
    {
      id: 2,
      bgGradient: "from-pink-500 via-rose-500 to-orange-500",
      title: "عروض استثنائية محدودة",
      subtitle: "فرصة ذهبية",
      description: "خصومات مذهلة على منتجات مختارة بعناية لفترة محدودة جداً - لا تفوت الفرصة",
      buttonText: "احصل على العرض",
      buttonLink: "/deals",
      imageUrl: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=2025&auto=format&fit=crop",
      accent: "حتى",
      highlight: "70% خصم",
      icon: Zap
    },
    {
      id: 3,
      bgGradient: "from-emerald-500 via-teal-500 to-cyan-500",
      title: "الماركات العالمية الأصلية",
      subtitle: "جودة مضمونة",
      description: "تسوق من مجموعة فاخرة من أشهر الماركات العالمية مع ضمان الأصالة والجودة",
      buttonText: "تصفح الماركات",
      buttonLink: "/brands",
      imageUrl: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=2070&auto=format&fit=crop",
      accent: "أكثر من",
      highlight: "100 ماركة",
      icon: Star
    },
    {
      id: 4,
      bgGradient: "from-amber-500 via-yellow-500 to-orange-500",
      title: "أحدث الأجهزة الذكية",
      subtitle: "تكنولوجيا المستقبل",
      description: "استمتع بأحدث الأجهزة الذكية والساعات بتقنيات متطورة وأسعار لا تقاوم",
      buttonText: "اكتشف الجديد",
      buttonLink: "/shop",
      imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      accent: "بدءاً من",
      highlight: "99 د.ع",
      icon: Zap
    },
    {
      id: 5,
      bgGradient: "from-red-500 via-pink-500 to-purple-500",
      title: "تصفية نهاية الموسم",
      subtitle: "فرصة العمر",
      description: "خصومات هائلة على جميع المنتجات - أسعار لن تتكرر مرة أخرى",
      buttonText: "تسوق الآن",
      buttonLink: "/deals",
      imageUrl: "https://images.unsplash.com/photo-1525904097878-94fb15835963?q=80&w=2070&auto=format&fit=crop",
      accent: "وفر حتى",
      highlight: "80% خصم",
      icon: Sparkles
    }
  ];

  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <div className="w-12 h-1 bg-gradient-to-r from-accent to-primary rounded-full"></div>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
              عروض حصرية
            </span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            اكتشف مجموعتنا المتميزة من العروض والخصومات الاستثنائية على أفضل المنتجات
          </motion.p>
        </motion.div>

        {/* Enhanced carousel */}
        <Carousel 
          opts={{ align: "start", loop: true }} 
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {banners.map((banner, index) => (
              <CarouselItem key={banner.id} className="pl-6 md:basis-full lg:basis-full">
                <motion.div
                  className="relative h-[450px] md:h-[550px] w-full rounded-3xl overflow-hidden shadow-2xl group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Enhanced background with image and gradient */}
                  <div className="absolute inset-0">
                    <img 
                      src={banner.imageUrl} 
                      alt={banner.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${banner.bgGradient} opacity-85`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  </div>

                  {/* Floating decorative elements */}
                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-8 right-8 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <banner.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: "3s" }}
                    className="absolute bottom-8 left-8 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-full"
                  ></motion.div>

                  {/* Enhanced content */}
                  <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 z-10">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={containerVariants}
                      className="max-w-2xl"
                    >
                      {/* Highlight badge */}
                      <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                          <span className="text-white/90 text-sm font-medium">{banner.accent}</span>
                          <span className="text-white font-bold text-sm ml-2">{banner.highlight}</span>
                        </div>
                      </motion.div>

                      {/* Subtitle */}
                      <motion.p variants={itemVariants} className="text-white/80 text-lg md:text-xl mb-2 font-medium">
                        {banner.subtitle}
                      </motion.p>

                      {/* Main title */}
                      <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        {banner.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p variants={itemVariants} className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
                        {banner.description}
                      </motion.p>

                      {/* Enhanced CTA button */}
                      <motion.div variants={itemVariants}>
                        <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                          <Link to={banner.buttonLink} className="flex items-center gap-3">
                            {banner.buttonText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Enhanced decorative elements */}
                  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute top-20 -left-16 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute top-1/2 right-16 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Enhanced navigation */}
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="static transform-none bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg hover:shadow-xl w-12 h-12 transition-all duration-300" />
            <CarouselNext className="static transform-none bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg hover:shadow-xl w-12 h-12 transition-all duration-300" />
          </div>
        </Carousel>

        {/* Enhanced feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: "✨",
              title: "ضمان الجودة العالية",
              description: "جميع منتجاتنا أصلية ومضمونة 100%",
              gradient: "from-blue-500/10 to-cyan-500/10",
              iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500"
            },
            {
              icon: "🚀",
              title: "شحن فوري وآمن",
              description: "توصيل سريع لجميع مناطق العراق",
              gradient: "from-purple-500/10 to-pink-500/10",
              iconBg: "bg-gradient-to-br from-purple-500 to-pink-500"
            },
            {
              icon: "💳",
              title: "دفع مرن وآمن",
              description: "ادفع عند الاستلام أو بالطرق الرقمية",
              gradient: "from-emerald-500/10 to-teal-500/10",
              iconBg: "bg-gradient-to-br from-emerald-500 to-teal-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2`}
            >
              <div className="flex items-start">
                <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
