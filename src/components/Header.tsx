
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import SearchBar from "./SearchBar";
import { MainNav } from "./NavigationMenu";
import MobileMenu from "./MobileMenu";
import { ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsSearchOpen(false);
  };

  const Logo = (
    <Link to="/" className="flex items-center gap-2">
      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        TechStore
      </span>
    </Link>
  );

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-40 transition-all duration-300 backdrop-blur-lg",
        isScrolled 
          ? "py-3 bg-white/90 shadow-sm" 
          : "py-5 bg-white/50"
      )}
    >
      <div className="container flex flex-col px-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="hidden md:block">
            {Logo}
          </div>

          <div className="hidden md:block flex-1 px-6">
            <MainNav />
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <SearchBar onSearch={handleSearchSubmit} />
            
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cart.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
                    {cart.items.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <MobileMenu logo={Logo} />
        </div>
      </div>
    </header>
  );
};

export default Header;
