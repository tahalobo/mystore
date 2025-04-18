
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
import { useRTL } from "@/contexts/RTLContext";
import { rtlAwareClasses } from "@/lib/rtl-utils";

const categories = [
  { name: "أغطية الهاتف", href: "/category/phone-cases" },
  { name: "سماعات الرأس", href: "/category/headphones" },
  { name: "الشواحن", href: "/category/chargers" },
  { name: "الكيبلات", href: "/category/cables" },
  { name: "السماعات", href: "/category/speakers" },
  { name: "شاشات الحماية", href: "/category/screen-protectors" },
  { name: "ملحقات", href: "/category/accessories" },
];

const collections = [
  { name: "الوافدون الجدد", href: "/new-arrivals", description: "شاهد أحدث منتجاتنا الطازجة في المتجر" },
  { name: "الأكثر مبيعاً", href: "/best-sellers", description: "منتجاتنا الأكثر شعبية التي يحبها عملاؤنا" },
  { name: "مميز", href: "/featured", description: "منتجات منتقاة بعناية معروضة لجودتها" },
  { name: "عروض", href: "/sale", description: "عروض وخصومات رائعة لا يجب أن تفوتك" },
];

const brands = [
  { name: "Apple", href: "/brand/apple", description: "منتجات تقنية مبتكرة بتصميم أنيق" },
  { name: "Samsung", href: "/brand/samsung", description:"إلكترونيات متطورة تشمل الأجهزة المحمولة والمنزلية" },
  { name: "Sony", href: "/brand/sony", description: "منتجات الصوت والفيديو والألعاب المتميزة"},
  { name: "Bose", href: "/brand/bose", description: "أنظمة صوت وسماعات وسماعات رأس ممتازة"},
  { name: "JBL", href: "/brand/jbl", description: "مكبرات صوت وملحقات صوت عالية الأداء" },
  { name: "Anker", href: "/brand/anker", description: "حلول شحن موثوقة وملحقاتها" },
];

export function MainNav() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isRTL } = useRTL();

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
              الرئيسية
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(
            "bg-transparent hover:bg-transparent hover:text-primary",
            categories.some(category => location.pathname === category.href) && "text-primary font-medium"
          )}>
            الفئات
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
                      تصفح منتجات  {category.name.toLowerCase()} 
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
            المجموعات
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
            العلامات التجارية
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
                    <div className="text-sm font-medium leading-none">عرض جميع العلامات التجارية</div>
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
              المتجر
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
              العروض
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
              عن المتجر
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
              اتصل بنا
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
