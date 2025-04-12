import React from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronLeft, Plus, Minus, Truck, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    clearCart 
  } = useCart();
  const navigate = useNavigate();
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-24 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Cart Items ({cartItems.length})</h2>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item, index) => (
                    <motion.div 
                      key={`${item.product.id}-${item.color || 'default'}`}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.product.name}</h3>
                        {item.color && (
                          <div className="flex items-center mt-1">
                            <span className="text-sm text-gray-600 mr-2">Color:</span>
                            <span 
                              className="w-4 h-4 rounded-full border border-gray-300" 
                              style={{ backgroundColor: item.color }}
                            />
                          </div>
                        )}
                        <div className="text-primary font-medium mt-1">
                          ${item.product.price.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-gray-500 hover:text-red-500"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="p-4 border-t flex flex-wrap justify-between gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/shop" className="flex items-center">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                  
                  <Button variant="outline" onClick={clearCart} className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Order Summary</h2>
                </div>
                
                <div className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{cartTotal >= 50 ? "Free" : "$5.00"}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>${(cartTotal * 0.07).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(cartTotal + (cartTotal >= 50 ? 0 : 5) + (cartTotal * 0.07)).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Truck className="h-4 w-4 mr-2 text-green-500" />
                    {cartTotal >= 50 ? (
                      <span>Free shipping applied</span>
                    ) : (
                      <span>Add ${(50 - cartTotal).toFixed(2)} more for free shipping</span>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      className="w-full"
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                  
                  <div className="pt-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">or</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex gap-2 mb-4">
                        <Input placeholder="Coupon code" />
                        <Button variant="outline">Apply</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
