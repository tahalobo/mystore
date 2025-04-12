
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import NavigationMenu from "./NavigationMenu";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-2 backdrop-blur-lg bg-white/80 shadow-sm"
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            TechBazaar
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu />
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative rounded-full"
            >
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative rounded-full"
            >
              <Link to="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative rounded-full"
            >
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-100 shadow-md"
          >
            <div className="container mx-auto px-4 py-4">
              <nav>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className={cn(
                        "block py-2 px-4 rounded-lg transition-colors hover:bg-gray-100",
                        location.pathname === '/' && 'text-primary font-medium bg-primary/10'
                      )}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/shop"
                      className={cn(
                        "block py-2 px-4 rounded-lg transition-colors hover:bg-gray-100",
                        location.pathname === '/shop' && 'text-primary font-medium bg-primary/10'
                      )}
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/deals"
                      className={cn(
                        "block py-2 px-4 rounded-lg transition-colors hover:bg-gray-100",
                        location.pathname === '/deals' && 'text-primary font-medium bg-primary/10'
                      )}
                    >
                      Deals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className={cn(
                        "block py-2 px-4 rounded-lg transition-colors hover:bg-gray-100",
                        location.pathname === '/about' && 'text-primary font-medium bg-primary/10'
                      )}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className={cn(
                        "block py-2 px-4 rounded-lg transition-colors hover:bg-gray-100",
                        location.pathname === '/contact' && 'text-primary font-medium bg-primary/10'
                      )}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
