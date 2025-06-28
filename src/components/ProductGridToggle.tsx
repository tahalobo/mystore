
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export type GridViewType = "grid" | "list" | "compact";

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
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("grid")}
        className="p-2"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("list")}
        className="p-2"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductGridToggle;
