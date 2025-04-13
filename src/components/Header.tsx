
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ShoppingCart, Heart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/NavigationMenu";
import SearchBar from "@/components/SearchBar";

const Header: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">TechHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <MainNav />
          </div>

          {/* Search, Wishlist & Cart */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Mobile Search Icon */}
            <div className="md:hidden">
              <SearchBar />
            </div>
            
            {/* Desktop Search Bar */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
            
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu - Improved for all devices */}
        {isMobile && (
          <div
            className={`absolute left-0 right-0 top-16 transform bg-white shadow-lg transition-transform duration-300 ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="container mx-auto px-4 py-4">
              <div className="mb-4">
                <SearchBar className="w-full" />
              </div>
              
              <ul className="grid grid-cols-2 gap-2">
                <li>
                  <Link
                    to="/"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shop"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">Shop</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/categories"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">Categories</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/deals"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">Deals</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">About</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="text-lg font-medium">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/wishlist"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <Heart className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-lg font-medium">Wishlist</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="flex items-center rounded-md p-3 transition-colors hover:bg-gray-100"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5 text-primary" />
                    <span className="text-lg font-medium">Cart</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
