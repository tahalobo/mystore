
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGridToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
  className?: string;
}

const ProductGridToggle: React.FC<ProductGridToggleProps> = ({ view, onChange, className }) => {
  return (
    <div className={cn("flex gap-1", className)}>
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("grid")}
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => onChange("list")}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductGridToggle;
