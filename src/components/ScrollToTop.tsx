
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Calculate scroll progress as a percentage
    const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1) * 100;
    setScrollProgress(progress);
    
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Circular progress indicator */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                className="text-gray-200" 
                strokeWidth="4"
                stroke="currentColor" 
                fill="transparent" 
                r="44" 
                cx="50" 
                cy="50" 
              />
              <circle 
                className="text-primary transition-all duration-300" 
                strokeWidth="4" 
                strokeLinecap="round" 
                stroke="currentColor" 
                fill="transparent" 
                r="44" 
                cx="50" 
                cy="50" 
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - scrollProgress / 100)}`}
              />
            </svg>
            
            <Button 
              onClick={scrollToTop}
              size="icon"
              className="relative w-12 h-12 rounded-full shadow-lg hover:shadow-xl bg-white hover:bg-primary text-primary hover:text-white transition-colors border border-gray-100"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
