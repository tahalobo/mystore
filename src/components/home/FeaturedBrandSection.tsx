import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
}
const featuredBrand: Brand = {
  id: "apple",
  name: "TechGear Pro",
  logo: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png",
  description: "اختبر الإكسسوارات عالية الجودة المصممة خصيصاً لعشاق التكنولوجيا الحديثة",
  category: "headphones"
};
const FeaturedBrandSection: React.FC = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate(`/category/${featuredBrand.category}`);
  };
  return;
};
export default FeaturedBrandSection;