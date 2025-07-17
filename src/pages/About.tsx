
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Users, Package, Truck, HeartHandshake, PlayCircle, ChevronRight, Sparkles, Shield, Globe, Check, Rocket, Landmark, Smile, Star, TrendingUp, Zap, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About: React.FC = () => {
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden min-h-[90vh] flex items-center">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-purple-50">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-right"
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary font-semibold">قصة نجاحنا</span>
                </motion.div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                  <span className="bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
                    رائد التقنية
                  </span>
                  <br />
                  <span className="text-gray-900">في العراق</span>
                </h1>

                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  منذ عام 2015، نحن نقود ثورة التكنولوجيا في العراق، نجمع بين الابتكار والجودة لنقدم لك أفضل المنتجات التقنية.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:shadow-2xl transform hover:scale-105 transition-all duration-300" asChild>
                    <Link to="/shop" className="flex items-center gap-2">
                      استكشف منتجاتنا
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300" asChild>
                    <Link to="/contact">تواصل معنا</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1000" 
                    alt="فريقنا" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                </div>
                
                {/* Floating Cards */}
                <motion.div
                  className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-xl p-6 hidden md:block"
                  animate={floatAnimation}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">جودة عالمية</h3>
                      <p className="text-sm text-gray-600">معايير دولية</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 hidden md:block"
                  animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">ضمان شامل</h3>
                      <p className="text-sm text-gray-600">خدمة متميزة</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Modern Stats Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "+8", label: "سنوات خبرة", icon: <Landmark className="h-8 w-8" />, color: "from-blue-500 to-cyan-600" },
                { number: "+100K", label: "عميل سعيد", icon: <Smile className="h-8 w-8" />, color: "from-green-500 to-emerald-600" },
                { number: "+500", label: "منتج متنوع", icon: <Package className="h-8 w-8" />, color: "from-purple-500 to-indigo-600" },
                { number: "+18", label: "محافظة", icon: <Globe className="h-8 w-8" />, color: "from-orange-500 to-red-600" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`bg-gradient-to-r ${stat.color} w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-gray-900 mb-3">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern Values Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
              className="text-center max-w-4xl mx-auto mb-20"
            >
              <motion.div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-8">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">قيمنا ومبادئنا</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                ما يميزنا عن الآخرين
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                نحن لا نبيع منتجات فقط، بل نبني علاقات طويلة الأمد مع عملائنا
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "عملاؤنا أولاً",
                  description: "نضع احتياجات عملائنا في المقدمة ونسعى لتجاوز توقعاتهم",
                  color: "from-amber-400 to-orange-500"
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "جودة لا تقبل المساومة",
                  description: "نختار منتجاتنا بعناية فائقة لضمان أعلى معايير الجودة",
                  color: "from-green-400 to-emerald-500"
                },
                {
                  icon: <HeartHandshake className="h-8 w-8" />,
                  title: "الثقة والشفافية",
                  description: "نبني علاقاتنا على الصدق والشفافية في كل التعاملات",
                  color: "from-blue-400 to-cyan-500"
                },
                {
                  icon: <Rocket className="h-8 w-8" />,
                  title: "الابتكار المستمر",
                  description: "نواكب أحدث التطورات التقنية لنقدم الأفضل دائماً",
                  color: "from-purple-400 to-indigo-500"
                },
                {
                  icon: <Zap className="h-8 w-8" />,
                  title: "السرعة والكفاءة",
                  description: "خدمة سريعة وموثوقة في جميع مراحل التسوق والتوصيل",
                  color: "from-pink-400 to-rose-500"
                },
                {
                  icon: <TrendingUp className="h-8 w-8" />,
                  title: "النمو المستدام",
                  description: "نسعى للنمو مع المحافظة على البيئة والمجتمع",
                  color: "from-teal-400 to-cyan-500"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemAnimation}
                  className="group"
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className={`bg-gradient-to-r ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {value.icon}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modern CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-purple-600"></div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
                ابدأ رحلتك التقنية معنا
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                اكتشف عالماً من التكنولوجيا المتقدمة واستمتع بتجربة تسوق لا مثيل لها
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 font-bold shadow-xl"
                  asChild
                >
                  <Link to="/shop" className="flex items-center gap-2">
                    تسوق الآن
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <Link to="/contact">اتصل بنا</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
