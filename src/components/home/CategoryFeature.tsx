
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

interface CategoryFeatureProps {
  categoryId: string;
  reversed?: boolean;
}

const CategoryFeature: React.FC<CategoryFeatureProps> = ({ categoryId, reversed = false }) => {
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return null;
  }
  
  return (
    <section className={`py-16 ${reversed ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl blur-xl"></div>
              <img 
                src={category.image} 
                alt={category.name} 
                className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" 
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold mb-4">{category.name}</h2>
              <p className="text-gray-600 mb-6 text-lg">{category.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card className="border-primary/10 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">+{category.count}</div>
                    <p className="text-sm text-gray-600">منتج متوفر</p>
                  </CardContent>
                </Card>
                
                <Card className="border-primary/10">
                  <CardContent className="p-4 flex flex-col justify-center items-center text-center h-full">
                    <p className="text-sm font-medium text-gray-800">أحدث المنتجات والإكسسوارات</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to={`/category/${category.id}`}>
                    تصفح المنتجات
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={`/shop`}>
                    العروض الخاصة
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;
