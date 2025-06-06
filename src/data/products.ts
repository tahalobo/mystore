import { Product, Category } from "@/types";
import { fetchProductsFromAPI } from "@/utils/api";

export const categories: Category[] = [
  {
    id: "phone-cases",
    name: "Phone Cases",
    image: "https://images.unsplash.com/photo-1603313011638-94aa4b08b9dd?q=80&w=600",
    description: "جرابات أنيقة وواقية لهاتفك",
    count: 52
  },
  {
    id: "headphones",
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600",
    description: "سماعات رأس عالية الجودة لصوت غامر",
    count: 38
  },
  {
    id: "chargers",
    name: "Chargers",
    image: "https://images.unsplash.com/photo-1583863788434-e62bd5126776?q=80&w=600",
    description: "شواحن سريعة وموثوقة لجميع أجهزتك",
    count: 45
  },
  {
    id: "cables",
    name: "Cables",
    image: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=600",
    description: "كابلات متينة للشحن ونقل البيانات",
    count: 60
  },
  {
    id: "speakers",
    name: "Speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600",
    description: "مكبرات صوت قوية لصوت فائق الوضوح",
    count: 28
  },
  {
    id: "screen-protectors",
    name: "Screen Protectors",
    image: "https://images.unsplash.com/photo-1572345071877-afc5e2c5951e?q=80&w=600",
    description: "واقيات شاشة قوية لمنع الخدوش",
    count: 35
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=600",
    description: "ملحقات تقنية أساسية لتحسين تجربتك الرقمية",
    count: 25
  }
];

// This will be populated with data from the API
export let products: Product[] = [];
export let allProducts: Product[] = [];

// Fallback data in case API is not accessible
const fallbackProducts = [
  { id: "5485", name: "RPP-310 REMAX" },
  { id: "5493", name: "RPP-320 REMAX" },
  { id: "5495", name: "RPP-321 REMAX" },
  { id: "5497", name: "RPP-311 REMAX" },
  { id: "5503", name: "RPP-287 REMAX" },
  { id: "5507", name: "RPP-289 REMAX" },
  { id: "5511", name: "RPP-65 REMAX" },
  { id: "5513", name: "RPP-180 REMAX" },
  { id: "5515", name: "RPP-199 REMAX" },
  { id: "5521", name: "RPP-266 REMAX" },
  { id: "5523", name: "RPP-226 REMAX" },
  { id: "5605", name: "8021-LCD" },
  { id: "5607", name: "3091-SP" },
  { id: "5609", name: "3267-SP" },
  { id: "6213", name: "GT3 PRO G-TAB SMART WATCH" },
  { id: "6223", name: "A10 1.2M CL JOYROOM" }
];

// Initialize with placeholder products until API data is loaded
const initializeProducts = (apiProducts: { id: string; name: string }[]) => {
  console.log('Initializing products with', apiProducts.length, 'items from API or fallback');
  
  // Create products array from API data
  const newProducts = apiProducts.map((item, index) => {
    // Calculate which category to use (rotating through the categories)
    const categoryIndex = index % categories.length;
    const category = categories[categoryIndex].id;
    
    // Generate price based on product ID for consistency
    const basePrice = parseInt(item.id) % 100 + 15; // Price between 15-114 USD
    
    // Create a product using the API id and name, with placeholder data for other fields
    return {
      id: item.id,
      name: item.name,
      price: basePrice,
      image: `/lovable-uploads/e9f3b555-0da2-47b3-a199-b5ee1fced447.png`,
      category,
      description: `منتج عالي الجودة من ${item.name}. يوفر أداءً موثوقًا وتصميمًا عصريًا.`,
      stock: Math.floor(Math.random() * 100) + 10,
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      reviews: Math.floor(Math.random() * 200) + 10,
      featured: index % 5 === 0,
      bestSeller: index % 7 === 0,
      newArrival: index % 9 === 0,
      discount: index % 3 === 0 ? Math.floor(Math.random() * 40) + 5 : 0,
      colors: ["#000000", "#FFFFFF", "#3B82F6"],
      brand: item.name.split(' ')[0] || "Generic"
    };
  });

  // Update the products and allProducts arrays
  products = newProducts.slice(0, Math.min(newProducts.length, 20));
  allProducts = newProducts;
  
  console.log(`Initialized ${newProducts.length} products from API or fallback`);
};

// This function will be called when the app starts to load products from API
export const loadProductsFromAPI = async () => {
  console.log('Attempting to load products from API...');
  try {
    const apiProducts = await fetchProductsFromAPI();
    
    if (apiProducts && apiProducts.length > 0) {
      console.log('Successfully loaded products from API:', apiProducts.length);
      initializeProducts(apiProducts);
      return true;
    } else {
      console.log('API returned no products, using fallback data');
      initializeProducts(fallbackProducts);
      return false;
    }
  } catch (error) {
    console.error('Error loading products from API, using fallback data:', error);
    initializeProducts(fallbackProducts);
    return false;
  }
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.newArrival);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return allProducts.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.id === id);
};

// Fixed to return an array of related products and handle null/undefined properly
export const getRelatedProducts = (product: Product): Product[] => {
  if (!product || !product.category) {
    return [];
  }
  
  return allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
};

export const getProductsByDiscount = (): Product[] => {
  return allProducts.filter(product => product.discount && product.discount > 0);
};

// Initialize products with fallback data immediately to avoid undefined arrays
initializeProducts(fallbackProducts);
