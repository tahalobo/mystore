import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
const brands = [{
  id: "apple",
  name: "Apple",
  logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop",
  slogan: "Think Different",
  category: "Consumer Electronics",
  productCount: 42
}, {
  id: "samsung",
  name: "Samsung",
  logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop",
  slogan: "Do What You Can't",
  category: "Electronics & Technology",
  productCount: 56
}, {
  id: "sony",
  name: "Sony",
  logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop",
  slogan: "Be Moved",
  category: "Entertainment & Electronics",
  productCount: 38
}];
const FeaturedBrandSection: React.FC = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">العلامات التجارية المميزة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استكشف منتجات من أفضل العلامات التجارية العالمية في مجال التكنولوجيا
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => <motion.div key={brand.id} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }}>
              <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-100">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="mb-4 h-20 flex items-center justify-center">
                      <img src={brand.logo} alt={brand.name} className="max-h-16 max-w-32 object-contain" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
                    
                    
                    
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/brand/${brand.id}`}>
                        استكشف المنتجات
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>)}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/brands">
              عرض جميع العلامات التجارية
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default FeaturedBrandSection;