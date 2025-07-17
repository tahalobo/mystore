
import React from "react";
import { motion } from "framer-motion";
import { FlameIcon, Zap, CheckCircle, Gift, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DealsHero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-16 md:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-32 right-20 text-white/20"
        >
          <Star className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-40 left-32 text-white/20"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium mb-4 backdrop-blur-sm">
              <Gift className="w-4 h-4 mr-2" />
              عروض حصرية ومحدودة الوقت
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              عروض وخصومات
            </span>
            <br />
            <span className="text-white">لا تُقاوم</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            اكتشف أفضل الصفقات على ملحقات التقنية المفضلة لديك مع خصومات تصل إلى 70%. 
            <br className="hidden md:block" />
            عروض محدودة الوقت وكمية محدودة!
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 text-base font-semibold border-0 shadow-lg">
              <FlameIcon className="w-5 h-5 mr-2" />
              خصم يصل إلى 70%
            </Badge>
            
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-base font-semibold border-0 shadow-lg">
              <Zap className="w-5 h-5 mr-2" />
              عروض فلاش يومية
            </Badge>
            
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 text-base font-semibold border-0 shadow-lg">
              <CheckCircle className="w-5 h-5 mr-2" />
              جودة مضمونة 100%
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 text-white">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-medium">أكثر من 1000+ منتج بخصومات حصرية</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DealsHero;
