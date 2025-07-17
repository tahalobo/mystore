
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, ChevronLeft, Plus, Minus, Truck, ShoppingBag, Clock, Package, MapPin, Heart, Star, Gift, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getSavedOrders, Order } from "@/utils/orderStorage";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    clearCart 
  } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(() => getSavedOrders());
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  
  const applyCoupon = () => {
    const validCoupons = {
      "SAVE10": 10,
      "WELCOME20": 20,
      "NEWUSER15": 15
    };
    
    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setAppliedCoupon({
        code: couponCode,
        discount: validCoupons[couponCode as keyof typeof validCoupons]
      });
      toast.success(`تم تطبيق كود الخصم ${couponCode}!`);
      setCouponCode("");
    } else {
      toast.error("كود الخصم غير صالح");
    }
  };
  
  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info("تم إزالة كود الخصم");
  };
  
  const calculateDiscountAmount = () => {
    return appliedCoupon ? (cartTotal * appliedCoupon.discount) / 100 : 0;
  };
  
  const calculateShipping = () => {
    return cartTotal >= 50 ? 0 : 5;
  };
  
  const calculateTax = () => {
    return (cartTotal - calculateDiscountAmount()) * 0.07;
  };
  
  const calculateFinalTotal = () => {
    return cartTotal - calculateDiscountAmount() + calculateShipping() + calculateTax();
  };
  
  const freeShippingProgress = Math.min((cartTotal / 50) * 100, 100);
  
  const renderEmptyCart = () => (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="flex-grow pt-24 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center py-20">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <ShoppingBag className="h-12 w-12 text-primary" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            عربة التسوق الخاصة بك فارغة
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8 text-lg"
          >
            يبدو أنك لم تقم بإضافة أي منتجات إلى عربة التسوق الخاصة بك حتى الآن.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild size="lg" className="px-8">
              <Link to="/shop">
                <ShoppingBag className="ml-2 h-5 w-5" />
                مواصلة التسوق
              </Link>
            </Button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (cartItems.length === 0) {
    return renderEmptyCart();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="cart" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-12 bg-white shadow-sm">
                <TabsTrigger value="cart" className="text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white">
                  <ShoppingBag className="ml-2 h-4 w-4" />
                  عربة التسوق الحالية
                </TabsTrigger>
                <TabsTrigger value="orders" className="text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white">
                  <Package className="ml-2 h-4 w-4" />
                  سجل الطلبات
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="cart">
              <div className="mb-8">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                  عربة التسوق الخاصة بك
                </motion.h1>
                <p className="text-gray-600">لديك {cartItems.length} منتجات في عربة التسوق</p>
              </div>
              
              <div className="flex flex-col xl:flex-row gap-8">
                {/* Cart Items */}
                <div className="xl:w-2/3">
                  {/* Free Shipping Progress */}
                  <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Truck className="h-5 w-5 text-green-600 ml-2" />
                          <span className="font-medium text-green-800">
                            {cartTotal >= 50 ? "تهانينا! حصلت على شحن مجاني" : "احصل على شحن مجاني"}
                          </span>
                        </div>
                        {cartTotal < 50 && (
                          <span className="text-sm text-green-600 font-medium">
                            ${(50 - cartTotal).toFixed(2)} متبقي
                          </span>
                        )}
                      </div>
                      <Progress value={freeShippingProgress} className="h-2" />
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                    <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50">
                      <CardTitle className="flex items-center text-xl">
                        <ShoppingBag className="ml-2 h-5 w-5 text-primary" />
                        عناصر عربة التسوق ({cartItems.length})
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100">
                        {cartItems.map((item, index) => (
                          <motion.div 
                            key={`${item.product.id}-${item.color || 'default'}`}
                            className="p-6 hover:bg-gray-50/50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                              <div className="relative group">
                                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-md">
                                  <img 
                                    src={item.product.image} 
                                    alt={item.product.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div>
                                {item.product.discount && (
                                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">
                                    -{item.product.discount}%
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex-grow">
                                <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors cursor-pointer">
                                  {item.product.name}
                                </h3>
                                {item.color && (
                                  <div className="flex items-center mb-2">
                                    <span className="text-sm text-gray-600 ml-2">اللون:</span>
                                    <div className="flex items-center">
                                      <span 
                                        className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm" 
                                        style={{ backgroundColor: item.color }}
                                      />
                                      <span className="text-sm text-gray-600 mr-2">{item.color}</span>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center mb-2">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 mr-1">{item.product.rating}</span>
                                  <span className="text-xs text-gray-500 mr-2">({item.product.reviews} تقييم)</span>
                                </div>
                                <div className="text-primary font-bold text-lg">
                                  ${item.product.price.toFixed(2)}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-gray-200 rounded-full bg-white shadow-sm">
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-10 w-10 rounded-full hover:bg-red-50 hover:text-red-600"
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-12 text-center font-semibold">{item.quantity}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="h-10 w-10 rounded-full hover:bg-green-50 hover:text-green-600"
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    disabled={item.quantity >= item.product.stock}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                <div className="text-right">
                                  <div className="font-bold text-xl text-gray-900">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    ${item.product.price.toFixed(2)} لكل قطعة
                                  </div>
                                </div>
                                
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full h-10 w-10"
                                  onClick={() => removeFromCart(item.product.id)}
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </div>
                            </div>
                            
                            {item.quantity >= item.product.stock && (
                              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <p className="text-sm text-amber-700 flex items-center">
                                  <Package className="h-4 w-4 ml-2" />
                                  وصلت للحد الأقصى المتاح في المخزن
                                </p>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-blue-50">
                        <div className="flex flex-wrap justify-between gap-4">
                          <Button variant="outline" asChild className="flex-1 min-w-[200px]">
                            <Link to="/shop" className="flex items-center justify-center">
                              <ChevronLeft className="ml-2 h-4 w-4" />
                              مواصلة التسوق
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            onClick={clearCart} 
                            className="flex-1 min-w-[200px] text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 className="ml-2 h-4 w-4" />
                            مسح عربة التسوق
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Order Summary */}
                <div className="xl:w-1/3">
                  <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 sticky top-24">
                    <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-50 border-b">
                      <CardTitle className="flex items-center text-xl">
                        <CreditCard className="ml-2 h-5 w-5 text-primary" />
                        ملخص الطلب
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="p-6 space-y-6">
                      {/* Coupon Section */}
                      <div className="space-y-3">
                        <h3 className="font-medium text-gray-900">كود الخصم</h3>
                        {appliedCoupon ? (
                          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center">
                              <Gift className="h-4 w-4 text-green-600 ml-2" />
                              <span className="text-sm font-medium text-green-800">
                                {appliedCoupon.code} ({appliedCoupon.discount}%)
                              </span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={removeCoupon}
                              className="text-green-600 hover:text-green-700 h-auto p-1"
                            >
                              إزالة
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Input 
                              placeholder="أدخل كود الخصم" 
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              className="flex-1"
                            />
                            <Button 
                              onClick={applyCoupon} 
                              disabled={!couponCode.trim()}
                              className="px-6"
                            >
                              تطبيق
                            </Button>
                          </div>
                        )}
                        {!appliedCoupon && (
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>أكواد متاحة للتجربة:</p>
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="text-xs">SAVE10</Badge>
                              <Badge variant="outline" className="text-xs">WELCOME20</Badge>
                              <Badge variant="outline" className="text-xs">NEWUSER15</Badge>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-gray-600">
                          <span>المجموع الفرعي</span>
                          <span className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        
                        {appliedCoupon && (
                          <div className="flex justify-between text-green-600">
                            <span>الخصم ({appliedCoupon.discount}%)</span>
                            <span className="font-medium">-${calculateDiscountAmount().toFixed(2)}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-gray-600">
                          <span>التوصيل</span>
                          <span className="font-medium">
                            {calculateShipping() === 0 ? "مجاناً" : `$${calculateShipping().toFixed(2)}`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-gray-600">
                          <span>الضريبة (7%)</span>
                          <span className="font-medium">${calculateTax().toFixed(2)}</span>
                        </div>
                        
                        <div className="border-t pt-4 flex justify-between font-bold text-xl">
                          <span>المجموع</span>
                          <span className="text-primary">${calculateFinalTotal().toFixed(2)}</span>
                        </div>
                        
                        <div className="space-y-3 pt-4">
                          <Button 
                            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg"
                            onClick={() => navigate('/checkout')}
                          >
                            <CreditCard className="ml-2 h-5 w-5" />
                            إتمام الطلب
                          </Button>
                          
                          <div className="flex items-center justify-center text-sm text-gray-600 space-x-4">
                            <div className="flex items-center">
                              <Truck className="h-4 w-4 ml-1 text-green-500" />
                              <span>توصيل آمن</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 ml-1 text-blue-500" />
                              <span>5 أيام</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="max-w-4xl mx-auto">
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                >
                  سجل طلباتك
                </motion.h1>
                
                {orders.length === 0 ? (
                  <Card className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 border-0 shadow-xl">
                    <CardContent>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Package className="h-20 w-20 mx-auto text-gray-300 mb-6" />
                      </motion.div>
                      <h2 className="text-2xl font-bold mb-4">لا توجد طلبات</h2>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        لم تقم بتقديم أي طلبات حتى الآن. ابدأ التسوق وستظهر طلباتك هنا.
                      </p>
                      <Button asChild size="lg">
                        <Link to="/shop">
                          <ShoppingBag className="ml-2 h-5 w-5" />
                          تسوق المنتجات
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order, index) => (
                      <motion.div 
                        key={order.id}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-blue-50">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-bold text-lg">طلب #{order.id}</h3>
                                <Badge className={`${getStatusColor(order.status)} border`}>
                                  {order.status === 'delivered' ? 'تم التوصيل' : 
                                   order.status === 'cancelled' ? 'ملغى' : 'قيد المعالجة'}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{formatDate(order.date)}</p>
                            </div>
                            <div className="font-bold text-xl text-primary">${order.total.toFixed(2)}</div>
                          </div>
                        </div>
                        
                        <Accordion type="single" collapsible>
                          <AccordionItem value="items" className="border-none">
                            <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50/50">
                              <span className="font-medium">المنتجات ({order.items.length})</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="px-6 pb-4 divide-y divide-gray-100">
                                {order.items.map((item) => (
                                  <div key={item.product.id} className="py-4 flex items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
                                      <img 
                                        src={item.product.image} 
                                        alt={item.product.name}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="font-medium">{item.product.name}</h4>
                                      <div className="text-sm text-gray-500 mt-1">
                                        الكمية: {item.quantity} × ${item.product.price.toFixed(2)}
                                      </div>
                                    </div>
                                    <div className="font-bold text-primary">
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="shipping" className="border-none">
                            <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50/50">
                              <span className="font-medium">معلومات العميل</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="px-6 pb-4 space-y-4">
                                <div className="flex items-start gap-3">
                                  <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                                  <div>
                                    <p className="font-medium">{order.shippingAddress.name}</p>
                                    <p className="text-gray-600">{order.shippingAddress.address}</p>
                                    <p className="text-gray-600">{order.shippingAddress.city}</p>
                                    <p className="text-gray-600">{order.shippingAddress.phone}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-amber-50 border border-amber-200">
                                  <Clock className="h-4 w-4 text-amber-600" />
                                  <span className="text-amber-700 font-medium">
                                    {order.status === 'delivered' 
                                      ? 'تم التوصيل بنجاح' 
                                      : order.status === 'cancelled' 
                                        ? 'تم إلغاء الطلب' 
                                        : 'يتم التوصيل بمدة لا تزيد عن 5 أيام'}
                                  </span>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-blue-50">
                          <div className="flex justify-between items-center">
                            <Button variant="outline" size="sm" asChild>
                              <Link to="/shop">
                                <ShoppingBag className="ml-2 h-4 w-4" />
                                إعادة الطلب
                              </Link>
                            </Button>
                            {order.status === 'delivered' && (
                              <div className="flex items-center text-sm text-green-600">
                                <Package className="h-4 w-4 ml-1" />
                                <span>تم التوصيل</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
