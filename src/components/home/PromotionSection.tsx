
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const PromotionSection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            عروض خاصة
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اكتشف أفضل العروض والخصومات الحصرية على منتجاتنا المميزة
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleCardClick('electronics')}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                خصم 50% على الإلكترونيات
              </h3>
              <p className="text-gray-600 mb-4">
                عروض مذهلة على جميع الأجهزة الإلكترونية
              </p>
              <Button className="w-full">
                تسوق الآن
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleCardClick('fashion')}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                أزياء بخصم يصل إلى 40%
              </h3>
              <p className="text-gray-600 mb-4">
                أحدث صيحات الموضة بأسعار مميزة
              </p>
              <Button className="w-full">
                اكتشف المزيد
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => handleCardClick('home')}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                منتجات المنزل بأفضل الأسعار
              </h3>
              <p className="text-gray-600 mb-4">
                كل ما تحتاجه لمنزلك بخصومات رائعة
              </p>
              <Button className="w-full">
                تسوق المنزل
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
