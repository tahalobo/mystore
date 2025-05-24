import React from "react";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";
export type GridViewType = "grid" | "list";
interface ProductGridToggleProps {
  view: GridViewType;
  onChange: (view: GridViewType) => void;
  className?: string;
}
const ProductGridToggle: React.FC<ProductGridToggleProps> = ({
  view,
  onChange,
  className
}) => {
  return;
};
export default ProductGridToggle;