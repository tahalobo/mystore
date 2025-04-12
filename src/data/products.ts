
import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "phone-cases",
    name: "Phone Cases",
    image: "/placeholder.svg",
    description: "Stylish and protective cases for your phone"
  },
  {
    id: "headphones",
    name: "Headphones",
    image: "/placeholder.svg",
    description: "Premium quality headphones for immersive sound"
  },
  {
    id: "chargers",
    name: "Chargers",
    image: "/placeholder.svg",
    description: "Fast and reliable chargers for all your devices"
  },
  {
    id: "cables",
    name: "Cables",
    image: "/placeholder.svg",
    description: "Durable cables for charging and data transfer"
  },
  {
    id: "speakers",
    name: "Speakers",
    image: "/placeholder.svg",
    description: "Powerful speakers for crystal clear audio"
  },
  {
    id: "screen-protectors",
    name: "Screen Protectors",
    image: "/placeholder.svg",
    description: "Tough screen protectors to prevent scratches"
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Silicone Phone Case",
    price: 24.99,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "headphones",
    description: "True wireless earbuds with active noise cancellation, touch controls, and up to 24 hours of battery life with the charging case.",
    featured: true,
    newArrival: true,
    stock: 78,
    rating: 4.5,
    reviews: 142,
    colors: ["#000000", "#FFFFFF"]
  },
  {
    id: "p3",
    name: "65W GaN Fast Charger",
    price: 39.99,
    image: "/placeholder.svg",
    category: "chargers",
    description: "Compact GaN charger with 65W output, capable of charging laptops, tablets, and smartphones at high speeds.",
    featured: true,
    stock: 92,
    rating: 4.8,
    reviews: 87,
    colors: ["#000000", "#FFFFFF"]
  },
  {
    id: "p4",
    name: "Braided USB-C to Lightning Cable",
    price: 19.99,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "speakers",
    description: "Waterproof portable speaker with 360° sound, 12-hour battery life, and built-in microphone for calls.",
    newArrival: true,
    stock: 63,
    rating: 4.4,
    reviews: 76,
    colors: ["#000000", "#3B82F6", "#EF4444"]
  },
  {
    id: "p6",
    name: "Tempered Glass Screen Protector",
    price: 14.99,
    image: "/placeholder.svg",
    category: "screen-protectors",
    description: "9H hardness tempered glass screen protector with oleophobic coating to resist fingerprints and easy installation kit.",
    bestSeller: true,
    stock: 328,
    rating: 4.3,
    reviews: 309,
  },
  {
    id: "p7",
    name: "Noise Cancelling Headphones",
    price: 149.99,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "chargers",
    description: "Charging station with multiple USB-A and USB-C ports to charge up to 6 devices simultaneously with smart power distribution.",
    stock: 84,
    rating: 4.5,
    reviews: 62,
    colors: ["#000000", "#FFFFFF"]
  },
  {
    id: "p9",
    name: "Slim Wallet Phone Case",
    price: 29.99,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "chargers",
    description: "Slim wireless charging pad with fast 15W charging capability, compatible with all Qi-enabled devices.",
    newArrival: true,
    stock: 73,
    rating: 4.2,
    reviews: 58,
    colors: ["#000000", "#FFFFFF"]
  },
  {
    id: "p11",
    name: "Gaming Earbuds with Mic",
    price: 89.99,
    image: "/placeholder.svg",
    category: "headphones",
    description: "Low latency wireless earbuds optimized for gaming with detachable boom microphone and RGB lighting effects.",
    stock: 36,
    rating: 4.7,
    reviews: 49,
    colors: ["#000000", "#FF0000"]
  },
  {
    id: "p12",
    name: "Power Bank 20000mAh",
    price: 44.99,
    image: "/placeholder.svg",
    category: "chargers",
    description: "High-capacity power bank with 20000mAh, featuring fast charging for multiple devices with USB-A and USB-C ports.",
    bestSeller: true,
    stock: 98,
    rating: 4.6,
    reviews: 184,
    colors: ["#000000", "#FFFFFF", "#3B82F6"]
  }
];

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
  return products.filter(product => product.category === categoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
