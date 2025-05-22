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
    products: [{
      id: 'apple-watch-band',
      name: 'حزام Apple Watch جلد',
      image: 'https://images.unsplash.com/photo-1574156814151-ed747bca9d4a?q=80&w=300&auto=format&fit=crop',
      price: 149,
      rating: 4.8
    }, {
      id: 'airpods-case',
      name: 'غطاء سيليكون AirPods Pro',
      image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?q=80&w=300&auto=format&fit=crop',
      price: 59,
      rating: 4.6
    }, {
      id: 'iphone-case',
      name: 'غطاء iPhone 15 مغناطيسي',
      image: 'https://images.unsplash.com/photo-1676561734574-9c5bd66293e0?q=80&w=300&auto=format&fit=crop',
      price: 89,
      rating: 4.7
    }]
  };
  return;
};
export default FeaturedBrandSection;