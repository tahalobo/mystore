
import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Truck, User, MapPin, Box, Clock, ShoppingBag, ChevronRight, CheckCircle } from 'lucide-react';
import { saveOrder, generateOrderId } from '@/utils/orderStorage';

// Iraq governorates
const iraqGovernorates = [
  "Baghdad", "Basra", "Erbil", "Sulaymaniyah", "Duhok", 
  "Kirkuk", "Nineveh", "Dhi Qar", "Babylon", "Diyala", 
  "Anbar", "Maysan", "Wasit", "Najaf", "Karbala", 
  "Saladin", "Muthanna", "Qadisiyyah"
];

// Districts for each governorate (simplified)
const districts: Record<string, string[]> = {
  "Baghdad": ["Adhamiyah", "Karkh", "Kadhimiya", "Mansour", "Sadr City", "Rusafa", "Dora"],
  "Basra": ["Basra City", "Abu Al-Khaseeb", "Al-Zubair", "Faw", "Shatt Al-Arab"],
  "Erbil": ["Erbil City", "Koya", "Soran", "Shaqlawa", "Choman"],
  "Sulaymaniyah": ["Sulaymaniyah City", "Halabja", "Rania", "Penjwin", "Darbandikhan"],
  "Duhok": ["Duhok City", "Zakho", "Amedi", "Akre", "Sheikhan"],
  "Kirkuk": ["Kirkuk City", "Hawija", "Daquq", "Dibis"],
  "Nineveh": ["Mosul", "Tal Afar", "Sinjar", "Al-Hamdaniya", "Telkef"],
  "Dhi Qar": ["Nasiriyah", "Al-Rifai", "Suq Al-Shuyukh", "Al-Chibayish"],
  "Babylon": ["Hillah", "Al-Mahawil", "Al-Musayab", "Al-Hashimiyah"],
  "Diyala": ["Baqubah", "Al-Muqdadiyah", "Khanaqin", "Kifri"],
  "Anbar": ["Ramadi", "Fallujah", "Hit", "Haditha", "Al-Qa'im"],
  "Maysan": ["Amarah", "Ali Al-Gharbi", "Al-Kahla", "Al-Maimouna"],
  "Wasit": ["Kut", "Al-Hay", "Al-Numaniyah", "Badra", "Al-Suwaira"],
  "Najaf": ["Najaf City", "Kufa", "Al-Manathira", "Al-Mishkhab"],
  "Karbala": ["Karbala City", "Al-Hindiya", "Ain Al-Tamur"],
  "Saladin": ["Tikrit", "Samarra", "Baiji", "Al-Shirqat", "Balad"],
  "Muthanna": ["Samawah", "Al-Rumaitha", "Al-Khidhir", "Al-Salman"],
  "Qadisiyyah": ["Diwaniyah", "Afaq", "Al-Shamiya", "Al-Hamza"]
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  governorate: string;
  district: string;
  notes: string;
}

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    governorate: '',
    district: '',
    notes: ''
  });
  
  // Update districts when governorate changes
  useEffect(() => {
    if (formData.governorate) {
      setAvailableDistricts(districts[formData.governorate] || []);
      setFormData(prev => ({ ...prev, district: '' }));
    } else {
      setAvailableDistricts([]);
    }
  }, [formData.governorate]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const nextStep = () => {
    // Validation for each step
    if (currentStep === 1) {
      // Validate customer information
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error("Please fill out all required customer information fields.");
        return;
      }
      
      if (!formData.phone.startsWith('07') || formData.phone.length !== 11) {
        toast.error("Please enter a valid Iraqi phone number (starts with 07 and 11 digits).");
        return;
      }
    } else if (currentStep === 2) {
      // Validate shipping information
      if (!formData.address || !formData.governorate || !formData.district) {
        toast.error("Please fill out all required shipping information fields.");
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const placeOrder = () => {
    // Process order
    setIsLoading(true);
    
    // Create order object
    const newOrder = {
      id: generateOrderId(),
      items: cartItems,
      total: cartTotal + (cartTotal >= 50 ? 0 : 5) + (cartTotal * 0.1),
      date: new Date().toISOString(),
      status: 'pending' as const,
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        city: `${formData.district}, ${formData.governorate}`,
        phone: formData.phone
      }
    };
    
    // Save order to local storage
    saveOrder(newOrder);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setIsLoading(false);
      navigate('/order-success');
    }, 2000);
  };
  
  // Show empty cart message if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Your cart is empty</CardTitle>
              <CardDescription>Add some products to your cart to continue checkout</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate('/shop')}
              >
                Continue Shopping
              </Button>
            </CardFooter>
          </Card>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  const steps = [
    { number: 1, title: "Customer Info", icon: <User className="w-5 h-5" /> },
    { number: 2, title: "Shipping", icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: "Review", icon: <ShoppingBag className="w-5 h-5" /> }
  ];
  
  const calculateDeliveryFee = () => {
    // Free shipping for orders over $50
    if (cartTotal >= 50) return 0;
    
    // Standard delivery fee
    return 5;
  };
  
  const calculateTax = () => {
    // 10% tax
    return cartTotal * 0.1;
  };
  
  const calculateTotal = () => {
    return cartTotal + calculateDeliveryFee() + calculateTax();
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="flex w-full max-w-3xl">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div 
                    className={`flex flex-col items-center ${
                      index > 0 ? 'flex-1' : ''
                    }`}
                  >
                    <div 
                      className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                        step.number === currentStep 
                          ? 'bg-primary text-white' 
                          : step.number < currentStep 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step.number < currentStep ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <span className={`text-sm mt-2 font-medium ${
                      step.number === currentStep ? 'text-primary' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 flex items-center max-w-[80px]`}>
                      <div 
                        className={`h-1 w-full ${
                          step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      ></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={currentStep}
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1 && "Customer Information"}
                    {currentStep === 2 && "Shipping Information"}
                    {currentStep === 3 && "Review Your Order"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Please enter your contact details"}
                    {currentStep === 2 && "Where should we ship your order?"}
                    {currentStep === 3 && "Please review your order before confirming"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Step 1: Customer Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                            placeholder="John"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange} 
                            placeholder="Doe"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="john.doe@example.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number * (Iraqi format, e.g., 07XXXXXXXXX)</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="07XXXXXXXXX"
                          required
                        />
                        <p className="text-xs text-gray-500">Start with 07, must be 11 digits</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Shipping Information */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address / Neighborhood *</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange} 
                          placeholder="Street name, building number, etc."
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="governorate">Governorate *</Label>
                          <Select
                            value={formData.governorate}
                            onValueChange={(value) => handleSelectChange('governorate', value)}
                          >
                            <SelectTrigger id="governorate">
                              <SelectValue placeholder="Select governorate" />
                            </SelectTrigger>
                            <SelectContent>
                              {iraqGovernorates.map(governorate => (
                                <SelectItem key={governorate} value={governorate}>
                                  {governorate}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="district">District *</Label>
                          <Select
                            value={formData.district}
                            onValueChange={(value) => handleSelectChange('district', value)}
                            disabled={!formData.governorate}
                          >
                            <SelectTrigger id="district">
                              <SelectValue placeholder={formData.governorate ? "Select district" : "Select governorate first"} />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDistricts.map(district => (
                                <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Input 
                          id="notes" 
                          name="notes" 
                          value={formData.notes} 
                          onChange={handleInputChange} 
                          placeholder="Delivery instructions, landmarks, etc."
                        />
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
                        <div className="flex items-start">
                          <Truck className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-amber-800">Payment Method</h4>
                            <p className="text-sm text-amber-700">
                              Payment is cash on delivery only. You will pay when your order arrives.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Review Order */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg">Customer Information</h3>
                        <div className="mt-2 text-sm">
                          <p>{formData.firstName} {formData.lastName}</p>
                          <p>{formData.email}</p>
                          <p>{formData.phone}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg">Shipping Address</h3>
                        <div className="mt-2 text-sm">
                          <p>{formData.address}</p>
                          <p>{formData.district}, {formData.governorate}</p>
                          <p>Iraq</p>
                          {formData.notes && (
                            <div className="mt-2">
                              <span className="font-medium">Notes: </span>
                              <span>{formData.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg flex items-center">
                          <Truck className="h-5 w-5 mr-2 text-primary" />
                          Payment Method
                        </h3>
                        <div className="mt-2 text-sm bg-gray-50 p-3 rounded-md">
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-gray-600 text-xs mt-1">
                            You'll pay when your order arrives. Please have the exact amount ready.
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg">Order Items</h3>
                        <ScrollArea className="h-[200px] mt-2">
                          <div className="space-y-4">
                            {cartItems.map((item) => (
                              <div key={item.product.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded overflow-hidden">
                                    <img 
                                      src={item.product.image} 
                                      alt={item.product.name} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium">{item.product.name}</p>
                                    <div className="text-xs text-gray-500">
                                      <span>Qty: {item.quantity}</span>
                                      {item.color && <span className="ml-2">Color: {item.color}</span>}
                                    </div>
                                  </div>
                                </div>
                                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  
                  {currentStep < 3 ? (
                    <Button onClick={nextStep} className={currentStep === 1 ? 'w-full' : ''}>
                      Continue
                    </Button>
                  ) : (
                    <Button disabled={isLoading} onClick={placeOrder}>
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="flex-1 truncate">{item.product.name} x{item.quantity}</span>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    
                    {cartItems.length > 3 && (
                      <div className="text-sm text-gray-500 italic">
                        + {cartItems.length - 3} more items
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {calculateDeliveryFee() === 0 ? "FREE" : `$${calculateDeliveryFee().toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax (10%)</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center text-sm text-green-600">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-blue-600">
                    <Box className="w-4 h-4 mr-2" />
                    <span>Cash on delivery in Iraq</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-purple-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Delivery within 3-7 business days</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
