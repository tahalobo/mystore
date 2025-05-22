
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
  return (
    <ToggleGroup 
      type="single" 
      value={view} 
      onValueChange={(value) => value && onChange(value as GridViewType)}
      className={`border rounded-md ${className}`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem 
            value="grid" 
            aria-label="عرض شبكي"
            className="data-[state=on]:bg-primary data-[state=on]:text-white"
          >
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>عرض شبكي</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem 
            value="list" 
            aria-label="عرض قائمة"
            className="data-[state=on]:bg-primary data-[state=on]:text-white"
          >
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>عرض قائمة</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem 
            value="compact" 
            aria-label="عرض مدمج"
            className="data-[state=on]:bg-primary data-[state=on]:text-white"
          >
            <Columns2 className="h-4 w-4" />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>عرض مدمج</p>
        </TooltipContent>
      </Tooltip>
    </ToggleGroup>
  );
};

export default ProductGridToggle;
