import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "phone-cases",
    name: "Phone Cases",
    image: "https://images.unsplash.com/photo-1603313011638-94aa4b08b9dd?q=80&w=600",
    description: "Stylish and protective cases for your phone",
    count: 52
  },
  {
    id: "headphones",
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600",
    description: "Premium quality headphones for immersive sound",
    count: 38
  },
  {
    id: "chargers",
    name: "Chargers",
    image: "https://images.unsplash.com/photo-1583863788434-e62bd5126776?q=80&w=600",
    description: "Fast and reliable chargers for all your devices",
    count: 45
  },
  {
    id: "cables",
    name: "Cables",
    image: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=600",
    description: "Durable cables for charging and data transfer",
    count: 60
  },
  {
    id: "speakers",
    name: "Speakers",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=600",
    description: "Powerful speakers for crystal clear audio",
    count: 28
  },
  {
    id: "screen-protectors",
    name: "Screen Protectors",
    image: "https://images.unsplash.com/photo-1572345071877-afc5e2c5951e?q=80&w=600",
    description: "Tough screen protectors to prevent scratches",
    count: 35
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=600",
    description: "Essential tech accessories to enhance your digital experience",
    count: 25
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Silicone Phone Case",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=600",
    category: "phone-cases",
    description: "Ultra-slim silicone case that offers excellent protection without adding bulk. Features precise cutouts for buttons and ports.",
    featured: true,
    bestSeller: true,
    stock: 150,
    rating: 4.7,
    reviews: 253,
    colors: ["#000000", "#FFFFFF", "#3B82F6", "#EF4444"]
  },
  {
    id: "p2",
    name: "Wireless Bluetooth Earbuds",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=600",
    category: "headphones",
    description: "True wireless earbuds with active noise cancellation, touch controls, and up to 24 hours of battery life with the charging case.",
    featured: true,
    newArrival: true,
    stock: 78,
    rating: 4.5,
    reviews: 142,
    colors: ["#000000", "#FFFFFF"],
    discount: 15
  },
  {
    id: "p3",
    name: "65W GaN Fast Charger",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1601996759374-7d70656e812b?q=80&w=600",
    category: "chargers",
    description: "Compact GaN charger with 65W output, capable of charging laptops, tablets, and smartphones at high speeds.",
    featured: true,
    stock: 92,
    rating: 4.8,
    reviews: 87,
    colors: ["#000000", "#FFFFFF"],
    discount: 20
  },
  {
    id: "p4",
    name: "Braided USB-C to Lightning Cable",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1612539342553-669c7626e666?q=80&w=600",
    category: "cables",
    description: "Premium braided cable with USB-C to Lightning connectors, supporting fast charging and data transfer. Extra durable with a 10,000+ bend lifespan.",
    bestSeller: true,
    stock: 215,
    rating: 4.6,
    reviews: 194,
    colors: ["#000000", "#3B82F6", "#EF4444", "#10B981"]
  },
  {
    id: "p5",
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600",
    category: "speakers",
    description: "Waterproof portable speaker with 360° sound, 12-hour battery life, and built-in microphone for calls.",
    newArrival: true,
    stock: 63,
    rating: 4.4,
    reviews: 76,
    colors: ["#000000", "#3B82F6", "#EF4444"],
    discount: 10
  },
  {
    id: "p6",
    name: "Tempered Glass Screen Protector",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600",
    category: "screen-protectors",
    description: "9H hardness tempered glass screen protector with oleophobic coating to resist fingerprints and easy installation kit.",
    bestSeller: true,
    stock: 328,
    rating: 4.3,
    reviews: 309,
    discount: 25
  },
  {
    id: "p7",
    name: "Noise Cancelling Headphones",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600",
    category: "headphones",
    description: "Over-ear headphones with active noise cancellation, 30-hour battery life, and premium comfort for extended listening sessions.",
    featured: true,
    stock: 42,
    rating: 4.9,
    reviews: 118,
    colors: ["#000000", "#FFFFFF", "#10B981"]
  },
  {
    id: "p8",
    name: "Multi-Port Charging Station",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1573739122959-dd6e958e8efe?q=80&w=600",
    category: "chargers",
    description: "Charging station with multiple USB-A and USB-C ports to charge up to 6 devices simultaneously with smart power distribution.",
    stock: 84,
    rating: 4.5,
    reviews: 62,
    colors: ["#000000", "#FFFFFF"],
    discount: 15
  },
  {
    id: "p9",
    name: "Slim Wallet Phone Case",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586931775007-15a23142a605?q=80&w=600",
    category: "phone-cases",
    description: "Protective case with card slots to store your essential cards. Made from premium faux leather with precise cutouts.",
    stock: 127,
    rating: 4.4,
    reviews: 95,
    colors: ["#000000", "#7C3AED", "#78350F"]
  },
  {
    id: "p10",
    name: "Wireless Charging Pad",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1622963191254-d740149b11db?q=80&w=600",
    category: "chargers",
    description: "Slim wireless charging pad with fast 15W charging capability, compatible with all Qi-enabled devices.",
    newArrival: true,
    stock: 73,
    rating: 4.2,
    reviews: 58,
    colors: ["#000000", "#FFFFFF"],
    discount: 30
  },
  {
    id: "p11",
    name: "Gaming Earbuds with Mic",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1631176006936-2fa2003554e5?q=80&w=600",
    category: "headphones",
    description: "Low latency wireless earbuds optimized for gaming with detachable boom microphone and RGB lighting effects.",
    stock: 36,
    rating: 4.7,
    reviews: 49,
    colors: ["#000000", "#FF0000"],
    discount: 20
  },
  {
    id: "p12",
    name: "Power Bank 20000mAh",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=600",
    category: "chargers",
    description: "High-capacity power bank with 20000mAh, featuring fast charging for multiple devices with USB-A and USB-C ports.",
    bestSeller: true,
    stock: 98,
    rating: 4.6,
    reviews: 184,
    colors: ["#000000", "#FFFFFF", "#3B82F6"],
    discount: 10
  }
];

export const additionalProducts: Product[] = [
  {
    id: "p13",
    name: "Bluetooth Keyboard",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600",
    category: "accessories",
    description: "Compact Bluetooth keyboard with multi-device connectivity and backlit keys. Perfect for typing on tablets and smartphones.",
    stock: 65,
    rating: 4.3,
    reviews: 87,
    colors: ["#000000", "#FFFFFF"],
    discount: 15
  },
  {
    id: "p14",
    name: "Smartphone Gimbal",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1615210466415-8fc8a06e9b6e?q=80&w=600",
    category: "accessories",
    description: "3-axis gimbal stabilizer for smartphones. Capture smooth videos and professional-looking content with active tracking.",
    newArrival: true,
    stock: 42,
    rating: 4.7,
    reviews: 63,
    colors: ["#000000", "#FFFFFF"],
    discount: 25
  },
  {
    id: "p15",
    name: "LED Ring Light",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1582539514607-613aa70d9619?q=80&w=600",
    category: "accessories",
    description: "10-inch LED ring light with adjustable brightness levels and color temperature. Includes phone holder for perfect selfies and video calls.",
    stock: 58,
    rating: 4.4,
    reviews: 112,
    discount: 35
  },
  {
    id: "p16",
    name: "Waterproof Phone Pouch",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1602526429771-a852403730a3?q=80&w=600",
    category: "phone-cases",
    description: "Universal waterproof phone pouch that fits most smartphones. Perfect for beach days, swimming, and water activities.",
    stock: 195,
    rating: 4.1,
    reviews: 236,
    colors: ["#000000", "#3B82F6", "#EF4444"],
    discount: 40
  }
];

export const allProducts = [...products, ...additionalProducts];

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
