import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Package, Check, Truck, Calendar, DownloadIcon, ReceiptText, Banknote, MapPin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress: string;
  paymentMethod: string;
}

// Mock order data
const orders: Order[] = [
  {
    id: "ORD-7821",
    date: "April 12, 2025",
    status: "delivered",
    total: 129.99,
    items: [
      {
        id: "PRD-001",
        name: "Wireless Bluetooth Earbuds",
        price: 59.99,
        quantity: 1,
        image: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png"
      },
      {
        id: "PRD-002",
        name: "Premium Phone Case",
        price: 24.99,
        quantity: 1,
        image: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png"
      },
      {
        id: "PRD-003",
        name: "Fast Charging Cable",
        price: 15.99,
        quantity: 3,
        image: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png"
      }
    ],
    trackingNumber: "TRK12345678",
    estimatedDelivery: "April 10, 2025",
    shippingAddress: "123 Main St, Baghdad, Iraq",
    paymentMethod: "Cash on Delivery"
  },
  {
    id: "ORD-6549",
    date: "April 05, 2025",
    status: "shipped",
    total: 89.99,
    items: [
      {
        id: "PRD-004",
        name: "Bluetooth Speaker",
        price: 89.99,
        quantity: 1,
        image: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png"
      }
    ],
    trackingNumber: "TRK87654321",
    estimatedDelivery: "April 15, 2025",
    shippingAddress: "456 Oak Ave, Erbil, Iraq",
    paymentMethod: "Credit Card"
  },
  {
    id: "ORD-5421",
    date: "March 28, 2025",
    status: "processing",
    total: 45.98,
    items: [
      {
        id: "PRD-005",
        name: "Phone Screen Protector",
        price: 12.99,
        quantity: 2,
        image: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png"
      },
      {
        id: "PRD-006",
        name: "Phone Charging Stand",
        price: 19.99,
        quantity: 1,
        image: "/lovable-uploads/8c2df3b9-50c3-4839-b072-91db82a03f1d.png"
      }
    ],
    shippingAddress: "789 Pine Rd, Basra, Iraq",
    paymentMethod: "Cash on Delivery"
  }
];

const OrderHistorySection: React.FC = () => {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: message,
      });
    });
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-600";
      case "shipped":
        return "bg-amber-100 text-amber-600";
      case "delivered":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <Check className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">Order History</h2>
        <p className="text-gray-600 mt-1">Track and manage your previous orders</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="p-6 focus:outline-none">
          <div className="space-y-4">
            {orders.length > 0 ? (
              orders.map((order) => (
                <motion.div 
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 cursor-pointer"
                    onClick={() => toggleOrderExpand(order.id)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        <Badge className={`${getStatusColor(order.status)} capitalize flex items-center gap-1`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {order.date}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                      <span className="font-semibold">${order.total.toFixed(2)}</span>
                      <button 
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={expandedOrders[order.id] ? "Collapse order details" : "Expand order details"}
                      >
                        {expandedOrders[order.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  {expandedOrders[order.id] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 border-t"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Order Items</h4>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-3">
                                <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="h-12 w-12 object-contain" 
                                  />
                                </div>
                                <div className="flex-grow">
                                  <p className="font-medium line-clamp-1">{item.name}</p>
                                  <div className="flex justify-between text-sm text-gray-600">
                                    <span>Qty: {item.quantity}</span>
                                    <span>${item.price.toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-3">Order Details</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-gray-600">Shipping Address:</p>
                                <p className="font-medium">{order.shippingAddress}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-2">
                              <Banknote className="h-4 w-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-gray-600">Payment Method:</p>
                                <p className="font-medium">{order.paymentMethod}</p>
                              </div>
                            </div>
                            
                            {order.trackingNumber && (
                              <div className="flex items-start gap-2">
                                <Truck className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Tracking Number:</p>
                                  <div className="flex items-center">
                                    <p className="font-medium">{order.trackingNumber}</p>
                                    <button 
                                      className="ml-2 p-1 hover:bg-gray-100 rounded-full"
                                      onClick={() => copyToClipboard(order.trackingNumber!, "Tracking number copied to clipboard")}
                                    >
                                      <Copy className="h-3.5 w-3.5 text-gray-500" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {order.estimatedDelivery && (
                              <div className="flex items-start gap-2">
                                <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Estimated Delivery:</p>
                                  <p className="font-medium">{order.estimatedDelivery}</p>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-6 flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <ReceiptText className="h-4 w-4" />
                              View Invoice
                            </Button>
                            {order.status === "delivered" && (
                              <Button size="sm" className="flex items-center gap-2">
                                <DownloadIcon className="h-4 w-4" />
                                Download Receipt
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {order.status === "shipped" && (
                        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                          <p className="text-blue-700 font-medium flex items-center">
                            <Truck className="h-5 w-5 mr-2" />
                            Your order is on its way!
                          </p>
                          <p className="text-blue-600 text-sm mt-1">
                            Estimated delivery: {order.estimatedDelivery}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                <p className="text-gray-600 mb-6">
                  When you place your first order, it will appear here.
                </p>
                <Button asChild>
                  <a href="/shop">Start Shopping</a>
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="processing" className="p-6 focus:outline-none">
          <div className="space-y-4">
            {orders.filter(order => order.status === "processing").length > 0 ? (
              orders
                .filter(order => order.status === "processing")
                .map((order) => (
                  // ... same order component structure as above, just filtered
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Order header */}
                    <div 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 cursor-pointer"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      {/* Order header content - copy from above */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge className={`${getStatusColor(order.status)} capitalize flex items-center gap-1`}>
                            <Package className="h-4 w-4" />
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {order.date}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                        <button 
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                          aria-label={expandedOrders[order.id] ? "Collapse order details" : "Expand order details"}
                        >
                          {expandedOrders[order.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {/* Order details - will only show if expanded */}
                    {expandedOrders[order.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 border-t"
                      >
                        {/* Duplicate expanded content from above */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left column - items */}
                          <div>
                            <h4 className="font-medium mb-3">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="h-12 w-12 object-contain" 
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <p className="font-medium line-clamp-1">{item.name}</p>
                                    <div className="flex justify-between text-sm text-gray-600">
                                      <span>Qty: {item.quantity}</span>
                                      <span>${item.price.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Right column - order details */}
                          <div>
                            <h4 className="font-medium mb-3">Order Details</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Shipping Address:</p>
                                  <p className="font-medium">{order.shippingAddress}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-2">
                                <Banknote className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Payment Method:</p>
                                  <p className="font-medium">{order.paymentMethod}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-6 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <ReceiptText className="h-4 w-4" />
                                View Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                          <p className="text-blue-700 font-medium flex items-center">
                            <Package className="h-5 w-5 mr-2" />
                            Your order is being processed!
                          </p>
                          <p className="text-blue-600 text-sm mt-1">
                            We'll notify you once it ships.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
            ) : (
              <div className="text-center py-10">
                <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No processing orders</h3>
                <p className="text-gray-600">
                  You don't have any orders being processed at the moment.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="shipped" className="p-6 focus:outline-none">
          <div className="space-y-4">
            {orders.filter(order => order.status === "shipped").length > 0 ? (
              orders
                .filter(order => order.status === "shipped")
                .map((order) => (
                  // Similar structure for shipped orders...
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 cursor-pointer"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge className="bg-amber-100 text-amber-600 capitalize flex items-center gap-1">
                            <Truck className="h-4 w-4" />
                            Shipped
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {order.date}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                        <button 
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                          aria-label={expandedOrders[order.id] ? "Collapse order details" : "Expand order details"}
                        >
                          {expandedOrders[order.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {expandedOrders[order.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 border-t"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="h-12 w-12 object-contain" 
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <p className="font-medium line-clamp-1">{item.name}</p>
                                    <div className="flex justify-between text-sm text-gray-600">
                                      <span>Qty: {item.quantity}</span>
                                      <span>${item.price.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">Order Details</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Shipping Address:</p>
                                  <p className="font-medium">{order.shippingAddress}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-2">
                                <Banknote className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Payment Method:</p>
                                  <p className="font-medium">{order.paymentMethod}</p>
                                </div>
                              </div>
                              
                              {order.trackingNumber && (
                                <div className="flex items-start gap-2">
                                  <Truck className="h-4 w-4 text-gray-500 mt-0.5" />
                                  <div>
                                    <p className="text-gray-600">Tracking Number:</p>
                                    <div className="flex items-center">
                                      <p className="font-medium">{order.trackingNumber}</p>
                                      <button 
                                        className="ml-2 p-1 hover:bg-gray-100 rounded-full"
                                        onClick={() => copyToClipboard(order.trackingNumber!, "Tracking number copied to clipboard")}
                                      >
                                        <Copy className="h-3.5 w-3.5 text-gray-500" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {order.estimatedDelivery && (
                                <div className="flex items-start gap-2">
                                  <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                                  <div>
                                    <p className="text-gray-600">Estimated Delivery:</p>
                                    <p className="font-medium">{order.estimatedDelivery}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-6 flex flex-wrap gap-2">
                              <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <ReceiptText className="h-4 w-4" />
                                View Invoice
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-amber-50 p-4 rounded-lg">
                          <p className="text-amber-700 font-medium flex items-center">
                            <Truck className="h-5 w-5 mr-2" />
                            Your order is on its way!
                          </p>
                          <p className="text-amber-600 text-sm mt-1">
                            Estimated delivery: {order.estimatedDelivery}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
            ) : (
              <div className="text-center py-10">
                <Truck className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No shipped orders</h3>
                <p className="text-gray-600">
                  You don't have any orders being shipped at the moment.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="delivered" className="p-6 focus:outline-none">
          <div className="space-y-4">
            {orders.filter(order => order.status === "delivered").length > 0 ? (
              orders
                .filter(order => order.status === "delivered")
                .map((order) => (
                  // Similar structure for delivered orders...
                  <motion.div 
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 cursor-pointer"
                      onClick={() => toggleOrderExpand(order.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.id}</span>
                          <Badge className="bg-green-100 text-green-600 capitalize flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            Delivered
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          {order.date}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                        <button 
                          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                          aria-label={expandedOrders[order.id] ? "Collapse order details" : "Expand order details"}
                        >
                          {expandedOrders[order.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    {expandedOrders[order.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 border-t"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-3">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <div className="h-16 w-16 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="h-12 w-12 object-contain" 
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <p className="font-medium line-clamp-1">{item.name}</p>
                                    <div className="flex justify-between text-sm text-gray-600">
                                      <span>Qty: {item.quantity}</span>
                                      <span>${item.price.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-3">Order Details</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Shipping Address:</p>
                                  <p className="font-medium">{order.shippingAddress}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-2">
                                <Banknote className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <p className="text-gray-600">Payment Method:</p>
                                  <p className="font-medium">{order.paymentMethod}</p>
                                </div>
                              </div>
                              
                              {order.trackingNumber && (
                                <div className="flex items-start gap-2">
                                  <Truck className="h-4 w-4 text-gray-500 mt-0.5" />
                                  <div>
                                    <p className="text-gray-600">Tracking Number:</p>
                                    <div className="flex items-center">
                                      <p className="font-medium">{order.trackingNumber}</p>
                                      <button 
                                        className="ml-2 p-1 hover:bg-gray-100 rounded-full"
                                        onClick={() => copyToClipboard(order.trackingNumber!, "Tracking number copied to clipboard")}
                                      >
                                        <Copy className="h-3.5 w-3.5 text-gray-500" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="mt-6 flex flex
