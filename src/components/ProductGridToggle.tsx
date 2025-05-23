import React from "react";
import { LayoutGrid, LayoutList, Columns2 } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
export type GridViewType = "grid" | "list" | "compact";
interface ProductGridToggleProps {
  view: GridViewType;
  onChange: (view: GridViewType) => void;
  className?: string;
}
const ProductGridToggle: React.FC<ProductGridToggleProps> = ({
  view,
  onChange,
  className = ""
}) => {
  return;
};
export default ProductGridToggle;