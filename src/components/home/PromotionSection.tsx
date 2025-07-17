import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
const PromotionSection: React.FC = () => {
  const navigate = useNavigate();
  const handleCardClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };
  return;
};
export default PromotionSection;