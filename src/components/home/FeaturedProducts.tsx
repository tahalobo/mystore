import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { Product } from "@/types";
interface FeaturedProductsProps {
  onProductClick?: (product: Product) => void;
}
const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onProductClick
}) => {
  const featuredProducts = getFeaturedProducts();
  return;
};
export default FeaturedProducts;