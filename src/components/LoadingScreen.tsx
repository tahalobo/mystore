
import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  show: boolean;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  show,
  message = "جاري تحميل المنتجات..."
}) => {
  if (!show) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md px-4">
        <motion.div 
          className="mb-8"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 1.5, repeat: Infinity }
          }}
        >
          <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-primary border-b-primary mx-auto"></div>
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-4">{message}</h3>
        
        <div className="space-y-2 mb-6">
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        
        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.15,
              }}
              className="bg-primary w-2 h-2 rounded-full"
            />
          ))}
        </div>
        
        <p className="text-gray-500 text-sm">
          جاري جلب البيانات من الخادم، يرجى الانتظار...
        </p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
