
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, ShoppingBag, Heart, Search, Phone, Info, Tag, Package, Layers, LayoutGrid } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface MobileMenuProps {
  logo: React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ logo }) => {
  const { cartItems, cartCount } = useCart();
  const { wishlistItems, wishlistCount } = useWishlist();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

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

  const categories = [
    { name: "Phone Cases", href: "/category/phone-cases" },
    { name: "Headphones", href: "/category/headphones" },
    { name: "Chargers", href: "/category/chargers" },
    { name: "Cables", href: "/category/cables" },
    { name: "Speakers", href: "/category/speakers" },
    { name: "Screen Protectors", href: "/category/screen-protectors" },
    { name: "Accessories", href: "/category/accessories" },
  ];

  const collections = [
    { name: "New Arrivals", href: "/new-arrivals", description: "See our latest products fresh to the store" },
    { name: "Best Sellers", href: "/best-sellers", description: "Our most popular products that customers love" },
    { name: "Featured", href: "/featured", description: "Handpicked products showcased for their quality" },
    { name: "Sale", href: "/sale", description: "Great deals and discounts you shouldn't miss" },
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
                  
                  {/* Categories Collapsible */}
                  <li>
                    <Collapsible
                      open={isCategoriesOpen}
                      onOpenChange={setIsCategoriesOpen}
                      className="w-full"
                    >
                      <CollapsibleTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 w-full">
                        <LayoutGrid className="h-5 w-5 text-primary" />
                        <span className="font-medium flex-1 text-left">Categories</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isCategoriesOpen ? 'transform rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pl-12 pr-4 space-y-2 py-2">
                          {categories.map((category) => (
                            <Link
                              key={category.href}
                              to={category.href}
                              className="block py-2 text-sm hover:text-primary"
                              onClick={closeMenu}
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>

                  {/* Collections Collapsible */}
                  <li>
                    <Collapsible
                      open={isCollectionsOpen}
                      onOpenChange={setIsCollectionsOpen}
                      className="w-full"
                    >
                      <CollapsibleTrigger className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 w-full">
                        <Layers className="h-5 w-5 text-primary" />
                        <span className="font-medium flex-1 text-left">Collections</span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isCollectionsOpen ? 'transform rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pl-12 pr-4 space-y-2 py-2">
                          {collections.map((collection) => (
                            <Link
                              key={collection.href}
                              to={collection.href}
                              className="block py-2 text-sm hover:text-primary"
                              onClick={closeMenu}
                            >
                              {collection.name}
                            </Link>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </li>
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
