
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { RTLProvider } from "@/contexts/RTLContext";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect, useState } from "react";
import { loadProductsFromAPI } from "@/data/products";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import Collection from "./pages/Collection";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Search from "./pages/Search";
import BrandsIndex from "./pages/BrandsIndex";
import BrandPage from "./pages/BrandPage";
import ProductDetail from "./pages/ProductDetail";
import { getBrands } from "@/utils/brandsApi";
import { getCategories } from "@/utils/categoriesApi";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);
  
  // Load all data on app initialization
  useEffect(() => {
    const initialize = async () => {
      try {
        // Load all data in parallel for better performance
        await Promise.all([
          loadProductsFromAPI(),
          getBrands(),
          getCategories()
        ]);
        
        console.log('All data loaded successfully');
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        // Add a delay to ensure smooth loading experience
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    
    initialize();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <RTLProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              
              {/* Global loading screen */}
              <LoadingScreen show={loading} />
              
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
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/:collectionId" element={<Collection />} />
                  <Route path="/brands" element={<BrandsIndex />} />
                  <Route path="/brand/:brandId" element={<BrandPage />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ScrollToTopButton />
              </BrowserRouter>
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </RTLProvider>
    </QueryClientProvider>
  );
};

export default App;
