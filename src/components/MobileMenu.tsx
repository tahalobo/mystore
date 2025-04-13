
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, ShoppingBag, Heart, Search, Phone, Info, Tag, Package } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface MobileMenuProps {
  logo: React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ logo }) => {
  const { cartItems, cartCount } = useCart();
  const { wishlistItems, wishlistCount } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Package, label: "Shop", path: "/shop" },
    { icon: Tag, label: "Deals", path: "/deals" },
    { icon: Phone, label: "Contact", path: "/contact" },
    { icon: Info, label: "About", path: "/about" },
  ];

  return (
    <div className="md:hidden flex items-center justify-between w-full px-4">
      <div className="flex-1">
        {logo}
      </div>
      
      <div className="flex items-center gap-2">
        <Link to="/search" className="p-2">
          <Search className="h-5 w-5" />
        </Link>
        
        <Link to="/wishlist" className="p-2 relative">
          <Heart className="h-5 w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
              {wishlistCount}
            </span>
          )}
        </Link>
        
        <Link to="/cart" className="p-2 relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-primary rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 flex items-center justify-between border-b">
                {logo}
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex-1 overflow-auto py-4">
                <ul className="space-y-2 px-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <Link 
                        to={item.path} 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        <item.icon className="h-5 w-5 text-primary" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
              <div className="p-4 border-t">
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/wishlist" onClick={closeMenu}>
                    <Button variant="outline" className="w-full">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Button>
                  </Link>
                  <Link to="/cart" onClick={closeMenu}>
                    <Button className="w-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Cart
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileMenu;
