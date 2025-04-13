
import { CartItem } from "@/types";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    phone: string;
  };
}

// Get all saved orders
export const getSavedOrders = (): Order[] => {
  const savedOrders = localStorage.getItem('techHaven_orders');
  if (savedOrders) {
    return JSON.parse(savedOrders);
  }
  return [];
};

// Save a new order
export const saveOrder = (order: Order): void => {
  const existingOrders = getSavedOrders();
  const updatedOrders = [order, ...existingOrders];
  localStorage.setItem('techHaven_orders', JSON.stringify(updatedOrders));
};

// Get a specific order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  const allOrders = getSavedOrders();
  return allOrders.find(order => order.id === orderId);
};

// Update order status
export const updateOrderStatus = (orderId: string, status: 'pending' | 'delivered' | 'cancelled'): void => {
  const allOrders = getSavedOrders();
  const updatedOrders = allOrders.map(order => {
    if (order.id === orderId) {
      return { ...order, status };
    }
    return order;
  });
  localStorage.setItem('techHaven_orders', JSON.stringify(updatedOrders));
};

// Delete an order
export const deleteOrder = (orderId: string): void => {
  const allOrders = getSavedOrders();
  const updatedOrders = allOrders.filter(order => order.id !== orderId);
  localStorage.setItem('techHaven_orders', JSON.stringify(updatedOrders));
};

// Generate a random order ID
export const generateOrderId = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};
