
import React from "react";
import { Button } from "@/components/ui/button";
import { Grid, List, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  const viewOptions = [
    { value: "grid", icon: Grid, label: "شبكة" },
    { value: "list", icon: List, label: "قائمة" },
    { value: "compact", icon: Grid3X3, label: "مضغوط" },
  ];

  return (
    <div className={cn("flex items-center bg-gray-100 rounded-lg p-1", className)}>
      {viewOptions.map((option) => (
        <motion.div key={option.value} className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange(option.value as GridViewType)}
            className={cn(
              "relative px-3 py-2 rounded-md transition-all duration-200",
              view === option.value
                ? "bg-white text-primary shadow-sm"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
          >
            <option.icon className="h-4 w-4" />
            <span className="sr-only">{option.label}</span>
          </Button>
          
          {view === option.value && (
            <motion.div
              className="absolute inset-0 bg-white rounded-md shadow-sm"
              layoutId="activeView"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              style={{ zIndex: -1 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGridToggle;
