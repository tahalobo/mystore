
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedBrandSection: React.FC = () => {
  const featuredBrand = {
    id: 'apple',
    name: 'Apple',
    logo: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop',
    slogan: 'Think Different',
    description: 'اكتشف أحدث منتجات أبل الحصرية وملحقاتها المميزة. تسوق الآن للحصول على أحدث الإصدارات من iPhone وملحقات Apple Watch وملحقات iPad وأكثر من ذلك.',
    bgImage: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1400&auto=format&fit=crop',
    products: [
      {
        id: 'apple-watch-band',
        name: 'حزام Apple Watch جلد',
        image: 'https://images.unsplash.com/photo-1574156814151-ed747bca9d4a?q=80&w=300&auto=format&fit=crop',
        price: 149,
        rating: 4.8
      },
      {
        id: 'airpods-case',
        name: 'غطاء سيليكون AirPods Pro',
        image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=300&auto=format&fit=crop',
        price: 59,
        rating: 4.6
      },
      {
        id: 'iphone-case',
        name: 'غطاء iPhone 15 مغناطيسي',
        image: 'https://images.unsplash.com/photo-1676561734574-9c5bd66293e0?q=80&w=300&auto=format&fit=crop',
        price: 89,
        rating: 4.7
      }
    ]
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-gray-50 opacity-80"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={featuredBrand.logo} 
                alt={`${featuredBrand.name} logo`}
                className="h-16 object-contain mb-6" 
              />
              <h2 className="text-3xl font-bold mb-2">{featuredBrand.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{featuredBrand.slogan}</p>
              <p className="text-gray-700 mb-8 text-right">{featuredBrand.description}</p>
              
              <Link to={`/brand/${featuredBrand.id}`}>
                <Button className="group">
                  تسوق منتجات {featuredBrand.name}
                  <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredBrand.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/product/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105" 
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-sm text-right">{product.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="text-sm text-yellow-500">
                            {'★'.repeat(Math.round(product.rating))}
                          </div>
                          <div className="font-bold text-primary">{product.price} د.إ</div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrandSection;
