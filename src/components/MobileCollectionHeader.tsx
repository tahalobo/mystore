import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, Package2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface MobileCollectionHeaderProps {
  title: string;
  description: string;
  imageUrl: string;
  setFilterOpen: (open: boolean) => void;
  filterOpen: boolean;
}
const MobileCollectionHeader: React.FC<MobileCollectionHeaderProps> = ({
  title,
  description,
  imageUrl,
  setFilterOpen,
  filterOpen
}) => {
  return <>
      {/* Collection Header */}
      <div className="relative py-12">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{
        backgroundImage: `url(${imageUrl})`
      }} />
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-primary-foreground">{title}</h1>
          
        </div>
      </div>
      
      {/* Mobile View Tabs */}
      <div className="md:hidden container mx-auto px-4 py-2 bg-background">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" onClick={() => setFilterOpen(false)}>
              <Package2 className="h-4 w-4 mr-2" />
              Products
            </TabsTrigger>
            <TabsTrigger value="filters" onClick={() => setFilterOpen(true)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Mobile Filter Toggle (only for non-tab layout) */}
      <div className="hidden">
        <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => setFilterOpen(!filterOpen)}>
          <Filter className="mr-2 h-4 w-4" />
          {filterOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
    </>;
};
export default MobileCollectionHeader;