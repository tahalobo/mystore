
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { searchProducts } from "@/data/products";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClickAway } from "@/hooks/use-click-away";

const SearchBar: React.FC<{ className?: string }> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickResults, setQuickResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Close search when clicking outside
  useClickAway(searchRef, () => {
    setIsSearchOpen(false);
  });

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length >= 2) {
      setIsSearching(true);
      
      // Add a small debounce for searching
      const timeoutId = setTimeout(() => {
        // Get quick results for popover
        const results = searchProducts(query).slice(0, 5);
        setQuickResults(results);
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timeoutId);
    } else {
      setQuickResults([]);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };
  
  // Handle "View all results" click
  const handleViewAllResults = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Focus input when search is opened
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  return (
    <div ref={searchRef} className={cn("relative", className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSearchOpen(true)}
        className="md:hidden"
      >
        <Search className="h-5 w-5" />
      </Button>
      
      <Popover open={isSearchOpen}>
        <PopoverTrigger asChild>
          <div className="hidden md:block">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm transition-all md:w-40 lg:w-64",
                isSearchOpen && "w-full md:w-80 lg:w-96"
              )}
              onClick={() => setIsSearchOpen(true)}
            >
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex w-full">
                  <Input
                    ref={inputRef}
                    type="search"
                    placeholder="Search products..."
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </form>
              ) : (
                <div className="flex items-center text-muted-foreground">
                  <Search className="mr-2 h-4 w-4" />
                  <span className="truncate">Search...</span>
                </div>
              )}
            </div>
          </div>
        </PopoverTrigger>
        
        <PopoverContent
          className="w-80 p-0"
          align="end"
          sideOffset={8}
        >
          {isSearchOpen && (
            <div>
              {/* Mobile search input */}
              <div className="p-4 md:hidden">
                <form onSubmit={handleSearchSubmit} className="flex w-full">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="flex-1"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    autoFocus
                  />
                  <Button type="submit" className="ml-2">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
              
              {/* Quick results */}
              {searchQuery.trim().length >= 2 && (
                <div className="max-h-[60vh] overflow-auto p-2">
                  {isSearching ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : quickResults.length > 0 ? (
                    <div>
                      <div className="px-2 pb-1 pt-2 text-xs font-medium text-gray-500">
                        Quick Results
                      </div>
                      {quickResults.map((product) => (
                        <div
                          key={product.id}
                          className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-gray-100"
                          onClick={() => {
                            navigate(`/search?q=${encodeURIComponent(product.name)}`);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-gray-100">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 overflow-hidden">
                            <div className="truncate font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No matching products found
                    </div>
                  )}
                </div>
              )}
              
              {/* View all results action */}
              <div className="border-t p-2">
                {searchQuery.trim().length >= 2 ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={handleViewAllResults}
                  >
                    <span>View all results for "{searchQuery}"</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="px-2 py-1 text-center text-sm text-gray-500">
                    Type at least 2 characters to search
                  </div>
                )}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
