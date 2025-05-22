import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Brand data from BrandsSection
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
}, {
  id: "bose",
  name: "Bose",
  logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop",
  slogan: "Better Sound Through Research",
  category: "Audio Equipment",
  productCount: 24
}, {
  id: "jbl",
  name: "JBL",
  logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop",
  slogan: "Sound that Moves You",
  category: "Audio Systems",
  productCount: 31
}, {
  id: "anker",
  name: "Anker",
  logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop",
  slogan: "Power for All",
  category: "Mobile Accessories",
  productCount: 47
}];
const NewsletterSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<any>(null);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);
  return;
};
export default NewsletterSection;