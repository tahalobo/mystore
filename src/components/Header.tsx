
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

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  }, [location.pathname]);

  return (
    <header
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center">
          <span className="text-gradient">TechHaven</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-foreground hover:text-primary transition-colors">
            Shop
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-foreground hover:text-primary transition-colors">
                Categories
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/category/phone-cases" className="w-full">Phone Cases</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/category/headphones" className="w-full">Headphones</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/category/chargers" className="w-full">Chargers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/category/cables" className="w-full">Cables</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/category/speakers" className="w-full">Speakers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/category/screen-protectors" className="w-full">Screen Protectors</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/deals" className="text-foreground hover:text-primary transition-colors">
            Deals
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center relative max-w-xs">
          <Input 
            type="text" 
            placeholder="Search products..." 
            className="pr-8"
          />
          <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        {/* Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3 md:hidden">
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
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg overflow-hidden animate-fade-down">
          <div className="px-4 py-3">
            <Input 
              type="text" 
              placeholder="Search products..." 
              className="w-full mb-3"
            />
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-foreground hover:text-primary transition-colors py-1">
                Home
              </Link>
              <Link to="/shop" className="text-foreground hover:text-primary transition-colors py-1">
                Shop
              </Link>
              <Link to="/category/phone-cases" className="text-foreground hover:text-primary transition-colors py-1 pl-3 text-sm">
                Phone Cases
              </Link>
              <Link to="/category/headphones" className="text-foreground hover:text-primary transition-colors py-1 pl-3 text-sm">
                Headphones
              </Link>
              <Link to="/category/chargers" className="text-foreground hover:text-primary transition-colors py-1 pl-3 text-sm">
                Chargers
              </Link>
              <Link to="/category/cables" className="text-foreground hover:text-primary transition-colors py-1 pl-3 text-sm">
                Cables
              </Link>
              <Link to="/category/speakers" className="text-foreground hover:text-primary transition-colors py-1 pl-3 text-sm">
                Speakers
              </Link>
              <Link to="/category/screen-protectors" className="text-foreground hover:text-primary transition-colors py-1 pl-3 text-sm">
                Screen Protectors
              </Link>
              <Link to="/deals" className="text-foreground hover:text-primary transition-colors py-1">
                Deals
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors py-1">
                About
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors py-1">
                Contact
              </Link>
              <Link to="/wishlist" className="text-foreground hover:text-primary transition-colors py-1">
                Wishlist
              </Link>
              <Link to="/account" className="text-foreground hover:text-primary transition-colors py-1">
                My Account
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
