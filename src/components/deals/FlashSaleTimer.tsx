
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlashSaleTimerProps {
  timeLeft: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  onFlashSaleClick: () => void;
}

const FlashSaleTimer: React.FC<FlashSaleTimerProps> = ({ timeLeft, onFlashSaleClick }) => {
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <section className="relative py-8 bg-gradient-to-r from-red-600 via-pink-600 to-orange-600 text-white overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse"></div>
      </div>
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-4 left-20 text-white/40"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-4 right-32 text-white/40"
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Flash Sale Info */}
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
            
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-1">
                عرض فلاش محدود ⚡
              </h2>
              <p className="text-white/90 text-sm lg:text-base">
                خصومات إضافية على المنتجات المختارة - لا تفوت الفرصة!
              </p>
            </div>
          </div>
          
          {/* Timer */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm lg:text-base font-medium">
              <Clock className="w-5 h-5" />
              <span>ينتهي خلال:</span>
            </div>
            
            <div className="flex gap-2">
              {[
                { value: timeLeft.hours, label: "ساعة" },
                { value: timeLeft.minutes, label: "دقيقة" },
                { value: timeLeft.seconds, label: "ثانية" }
              ].map((time, index) => (
                <motion.div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/30 min-w-[60px] text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="font-mono font-bold text-lg lg:text-xl">
                    {formatTime(time.value)}
                  </div>
                  <div className="text-xs text-white/80">
                    {time.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-red-600 hover:bg-white/90 font-bold px-6 py-3 rounded-full shadow-lg border-2 border-white/50"
              onClick={onFlashSaleClick}
            >
              تسوق عروض الفلاش
              <ChevronRight className="mr-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleTimer;
