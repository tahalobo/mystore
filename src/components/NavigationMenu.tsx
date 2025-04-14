
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";

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

const brands = [
  { name: "Apple", href: "/brand/apple", description: "Innovative tech products with sleek design" },
  { name: "Samsung", href: "/brand/samsung", description: "Cutting-edge electronics spanning mobile and home" },
  { name: "Sony", href: "/brand/sony", description: "Premium audio, video, and gaming products" },
  { name: "Bose", href: "/brand/bose", description: "Superior sound systems and headphones" },
  { name: "JBL", href: "/brand/jbl", description: "High-performance speakers and audio accessories" },
  { name: "Anker", href: "/brand/anker", description: "Reliable charging solutions and accessories" },
];

export function MainNav() {
  const location = useLocation();
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-primary",
                location.pathname === "/" && "text-primary font-medium"
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "bg-transparent hover:bg-transparent hover:text-primary",
            categories.some(category => location.pathname === category.href) && "text-primary font-medium"
          )}>
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <li key={category.name} className="row-span-1">
                  <NavigationMenuLink asChild>
                    <Link
                      to={category.href}
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-primary/10"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {category.name}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Browse our {category.name.toLowerCase()} collection
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "bg-transparent hover:bg-transparent hover:text-primary",
            collections.some(collection => location.pathname === collection.href) && "text-primary font-medium"
          )}>
            Collections
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              {collections.map((collection) => (
                <li key={collection.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={collection.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {collection.name}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {collection.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "bg-transparent hover:bg-transparent hover:text-primary",
            (location.pathname === "/brands" || location.pathname.startsWith("/brand/")) && "text-primary font-medium"
          )}>
            Brands
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              {brands.map((brand) => (
                <li key={brand.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={brand.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {brand.name}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {brand.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
              <li className="lg:col-span-2">
                <NavigationMenuLink asChild>
                  <Link
                    to="/brands"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors bg-primary/5 hover:bg-primary/10 text-center"
                  >
                    <div className="text-sm font-medium leading-none">View All Brands</div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/shop">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-primary",
                location.pathname === "/shop" && "text-primary font-medium"
              )}
            >
              Shop
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/deals">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-primary",
                location.pathname === "/deals" && "text-primary font-medium"
              )}
            >
              Deals
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-primary",
                location.pathname === "/about" && "text-primary font-medium"
              )}
            >
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent hover:bg-transparent hover:text-primary",
                location.pathname === "/contact" && "text-primary font-medium"
              )}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
