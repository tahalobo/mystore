
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const FeaturedBrandSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <div className="container mx-auto relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold mb-4">FEATURED BRAND</span>
            <h2 className="text-3xl font-bold mb-6">سماعات REMAX الأصلية</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              استمتع بجودة صوت استثنائية مع سماعات REMAX المتميزة. تصميم مريح ومتين مع تقنية عزل الضوضاء المتقدمة لتجربة استماع لا مثيل لها.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">جودة صوت عالية الدقة مع باس قوي</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">تقنية إلغاء الضوضاء المتقدمة</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-1 mr-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-700">بطارية تدوم طويلاً حتى 40 ساعة من التشغيل</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg">تسوق منتجات REMAX</Button>
              <Button size="lg" variant="outline">عرض التفاصيل</Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-5 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-20 blur-3xl rounded-3xl -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1505236273555-aeec0cc81513?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="REMAX Headphones" 
              className="rounded-2xl shadow-2xl w-full" 
            />
            
            <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full opacity-20 blur-3xl"></div>
          </motion.div>
        </div>
        
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default FeaturedBrandSection;
