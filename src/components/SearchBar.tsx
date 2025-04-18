
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn("relative", className)}
    >
      <div className={cn(
        "relative flex items-center transition-all duration-300",
        isFocused ? "ring-2 ring-primary ring-opacity-50 rounded-lg" : ""
      )}>
        <Input
          type="text"
          placeholder="ابحث عن المنتجات..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "pr-16 transition-all duration-300 bg-gray-50 border-gray-200",
            isFocused ? "w-60 border-primary/50" : "w-40",
            searchQuery ? "pr-20" : "pr-8"
          )}
        />
        
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-8"
            >
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={handleClear}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">مسح البحث</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button 
          type="submit" 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 h-full aspect-square hover:bg-primary/10 rounded-r-md"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">البحث</span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
