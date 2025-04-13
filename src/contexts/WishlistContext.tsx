
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Product, WishlistItem } from "@/types";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        // Convert string dates back to Date objects
        const processedWishlist = parsedWishlist.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        setWishlistItems(processedWishlist);
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    }
  }, []);

  // Update localStorage and wishlist metrics when wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    setWishlistCount(wishlistItems.length);
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    setWishlistItems(prevItems => {
      // Check if item already exists in wishlist
      if (prevItems.some(item => item.product.id === product.id)) {
        toast.info(`${product.name} is already in your wishlist`);
        return prevItems;
      } else {
        // Add new item to wishlist
        toast.success(`Added ${product.name} to wishlist`);
        return [...prevItems, { product, addedAt: new Date() }];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => {
      const removedItem = prevItems.find(item => item.product.id === productId);
      const newItems = prevItems.filter(item => item.product.id !== productId);
      
      if (removedItem) {
        toast.info(`Removed ${removedItem.product.name} from wishlist`);
      }
      
      return newItems;
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.info("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
