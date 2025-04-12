
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, User, Heart, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MainNav } from "@/components/NavigationMenu";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  // Handle scroll event to change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
          <span className="text-gradient">TechHaven</span>
        </Link>

        {/* Desktop Navigation */}
        <MainNav />

        {/* Search Bar - Desktop */}
        <AnimatePresence>
          {searchOpen ? (
            <motion.div 
              className="absolute inset-0 bg-white/95 flex items-center justify-center px-4 md:px-12 py-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full max-w-2xl">
                <Input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="pr-8 py-6 text-lg"
                  autoFocus
                />
                <Search className="absolute right-12 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon" asChild>
                <Link to="/wishlist">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="ghost" size="icon" asChild>
                <Link to="/account">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              
              <Button variant="ghost" size="icon" className="relative" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          )}
        </AnimatePresence>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-3">
              <nav className="flex flex-col space-y-3">
                <Link to="/" className="text-foreground hover:text-primary transition-colors py-2 border-b">
                  Home
                </Link>
                <Link to="/shop" className="text-foreground hover:text-primary transition-colors py-2 border-b">
                  Shop
                </Link>
                
                <div className="py-2 border-b">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="grid grid-cols-2 gap-2 pl-3">
                    <Link to="/category/phone-cases" className="text-foreground hover:text-primary transition-colors py-1 text-sm">
                      Phone Cases
                    </Link>
                    <Link to="/category/headphones" className="text-foreground hover:text-primary transition-colors py-1 text-sm">
                      Headphones
                    </Link>
                    <Link to="/category/chargers" className="text-foreground hover:text-primary transition-colors py-1 text-sm">
                      Chargers
                    </Link>
                    <Link to="/category/cables" className="text-foreground hover:text-primary transition-colors py-1 text-sm">
                      Cables
                    </Link>
                    <Link to="/category/speakers" className="text-foreground hover:text-primary transition-colors py-1 text-sm">
                      Speakers
                    </Link>
                    <Link to="/category/screen-protectors" className="text-foreground hover:text-primary transition-colors py-1 text-sm">
                      Screen Protectors
                    </Link>
                  </div>
                </div>
                
                <Link to="/deals" className="text-foreground hover:text-primary transition-colors py-2 border-b">
                  Deals
                </Link>
                <Link to="/about" className="text-foreground hover:text-primary transition-colors py-2 border-b">
                  About
                </Link>
                <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-2 border-b">
                  Contact
                </Link>
                <Link to="/wishlist" className="text-foreground hover:text-primary transition-colors py-2 border-b">
                  Wishlist
                </Link>
                <Link to="/account" className="text-foreground hover:text-primary transition-colors py-2 border-b">
                  My Account
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
