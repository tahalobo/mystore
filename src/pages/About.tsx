import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Users, Package, Truck, HeartHandshake, PlayCircle, ChevronRight, Sparkles, Shield, Globe, Check, Rocket, Landmark, Smile } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
const About: React.FC = () => {
  const containerAnimation = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const itemAnimation = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-blue-50 py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6
            }}>
                <span className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-6">
                  قصتنا
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  رائد التقنية في العراق
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  منذ عام 2015، كان متجرنا الوجهة الموثوقة في العراق للمنتجات والملحقات التقنية المتميزة، حيث نخدم العملاء بمنتجات أصلية وخدمة استثنائية.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/shop">استكشاف المنتجات</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">تواصل معنا</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div className="relative" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1000" alt="فريقنا" className="w-full h-auto" />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <Award className="h-10 w-10 text-amber-500" />
                    <div>
                      <h3 className="font-semibold">جودة مضمونة</h3>
                      <p className="text-sm text-gray-600">منذ عام 2015</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-10 w-10 text-green-500" />
                    <div>
                      <h3 className="font-semibold">رضا العملاء</h3>
                      <p className="text-sm text-gray-600">مضمون</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{
              number: "+8",
              label: "سنوات من الخبرة",
              icon: <Landmark className="h-6 w-6" />
            }, {
              number: "+100K",
              label: "عميل سعيد",
              icon: <Smile className="h-6 w-6" />
            }, {
              number: "+500",
              label: "منتج",
              icon: <Package className="h-6 w-6" />
            }, {
              number: "+18",
              label: "محافظة مخدومة",
              icon: <Globe className="h-6 w-6" />
            }].map((stat, index) => <motion.div key={index} className="text-center" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                  <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-primary mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </motion.div>)}
            </div>
          </div>
        </section>
        
        
        
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div variants={containerAnimation} initial="hidden" animate="visible" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">قيمنا الأساسية</h2>
              <p className="text-gray-600">
                هذه المبادئ توجه قراراتنا وتشكل ثقافتنا وتحدد من نحن كشركة.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
              icon: <Users className="h-8 w-8 text-amber-500" />,
              title: "التركيز على العملاء",
              description: "نبدأ بالعميل ونعمل للخلف. نعمل بقوة لكسب ثقة العملاء والحفاظ عليها."
            }, {
              icon: <Shield className="h-8 w-8 text-green-500" />,
              title: "التميز في الجودة",
              description: "نحن لا نتنازل عن الجودة. كل منتج نصنعه يلبي معايير صارمة للمواد والتصميم والمتانة."
            }, {
              icon: <HeartHandshake className="h-8 w-8 text-blue-500" />,
              title: "نزاهة",
              description: "نحن نفعل ما نقول ونقول ما نفعله. الصدق والشفافية أساسيان لكيفية عملنا."
            }, {
              icon: <Rocket className="h-8 w-8 text-purple-500" />,
              title: "ابتكار",
              description: "نحن نتبنى التغيير ونسعى باستمرار لإيجاد طرق لتحسين منتجاتنا وعملياتنا."
            }, {
              icon: <Sparkles className="h-8 w-8 text-pink-500" />,
              title: "شغف",
              description: "نحن متحمسون حقًا للتكنولوجيا وإنشاء منتجات تجعل الحياة الرقمية أفضل."
            }, {
              icon: <Globe className="h-8 w-8 text-teal-500" />,
              title: "استدامة",
              description: "نهدف إلى تقليل تأثيرنا البيئي وتعزيز الممارسات المستدامة في كل ما نقوم به."
            }].map((value, index) => <motion.div key={index} variants={itemAnimation} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </motion.div>)}
            </div>
          </div>
        </section>
        
        
        
        <section className="py-16 bg-zinc-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">شركاؤنا وشهاداتنا</h2>
                <p className="text-gray-600">
                  نحن نعمل مع الشركات والمنظمات الرائدة لضمان أعلى معايير الجودة.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({
                length: 8
              }).map((_, index) => <motion.div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all p-4" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }}>
                    <div className="bg-gray-100 h-20 w-full rounded-md flex items-center justify-center">
                      <span className="text-gray-400 font-medium">شريك {index + 1}</span>
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">هل أنت مستعد لتعزيز تجربتك التقنية؟</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                استكشف مجموعتنا الواسعة من الملحقات التقنية المتميزة وارتقِ بأسلوب حياتك الرقمي.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/shop" className="flex items-center">
                    تسوق الآن
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default About;