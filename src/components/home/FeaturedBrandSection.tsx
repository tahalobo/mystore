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
  return;
};
export default FeaturedBrandSection;