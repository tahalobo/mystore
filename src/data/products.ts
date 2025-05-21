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

// Initialize with placeholder products until API data is loaded
const initializeProducts = (apiProducts: { id: string; name: string }[]) => {
  // Create products array from API data
  const newProducts = apiProducts.map((item, index) => {
    // Calculate which category to use (rotating through the categories)
    const categoryIndex = index % categories.length;
    const category = categories[categoryIndex].id;
    
    // Create a product using the API id and name, with placeholder data for other fields
    return {
      id: item.id,
      name: item.name,
      price: 19.99 + (index * 5), // Generate placeholder price
      image: `https://images.unsplash.com/photo-${1600000000 + (index * 1000)}?q=80&w=600`, // Placeholder image
      category,
      description: "Product description placeholder",
      stock: Math.floor(Math.random() * 100) + 10, // Random stock between 10-110
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // Convert to number explicitly
      reviews: Math.floor(Math.random() * 200) + 10, // Random reviews count
      featured: index % 5 === 0, // Every 5th item is featured
      bestSeller: index % 7 === 0, // Every 7th item is bestseller
      newArrival: index % 9 === 0, // Every 9th item is new arrival
      discount: index % 3 === 0 ? Math.floor(Math.random() * 40) + 5 : undefined, // Every 3rd item has discount
      colors: ["#000000", "#FFFFFF", "#3B82F6"] // Default colors
    };
  });

  // Update the products and allProducts arrays
  products = newProducts.slice(0, Math.min(newProducts.length, 12));
  allProducts = newProducts;
  
  console.log(`Initialized ${newProducts.length} products from API`);
};

// This function will be called when the app starts to load products from API
export const loadProductsFromAPI = async () => {
  try {
    const apiProducts = await fetchProductsFromAPI();
    
    if (apiProducts && apiProducts.length > 0) {
      initializeProducts(apiProducts);
      return true;
    } else {
      console.error('No products loaded from API');
      return false;
    }
  } catch (error) {
    console.error('Error loading products from API:', error);
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

export const getRelatedProducts = (product: Product): Product[] => {
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
