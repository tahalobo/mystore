
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import Collection from "./pages/Collection";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Search from "./pages/Search";
import BrandsIndex from "./pages/BrandsIndex";
import BrandPage from "./pages/BrandPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/search" element={<Search />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/:collectionId" element={<Collection />} />
              <Route path="/brands" element={<BrandsIndex />} />
              <Route path="/brand/:brandId" element={<BrandPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTopButton />
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
