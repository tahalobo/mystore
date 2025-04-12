
import React, { useState } from 'react';
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
import { useToast } from "@/components/ui/use-toast";
import { motion } from 'framer-motion';
import { CreditCard, Truck, User, MapPin, Box, Clock, ShoppingBag, ChevronRight } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value
        .replace(/\s/g, '')
        .match(/.{1,4}/g)
        ?.join(' ') || '';
      
      setFormData({
        ...formData,
        [name]: formattedValue
      });
      return;
    }
    
    // Format expiry date
    if (name === 'expiry') {
      const cleanValue = value.replace(/\D/g, '');
      let formattedValue = cleanValue;
      
      if (cleanValue.length > 2) {
        formattedValue = `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
      }
      
      setFormData({
        ...formData,
        [name]: formattedValue
      });
      return;
    }
    
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
        toast({
          title: "Missing information",
          description: "Please fill out all required fields.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      // Validate shipping information
      if (!formData.address || !formData.city || !formData.zipCode || !formData.country) {
        toast({
          title: "Missing shipping information",
          description: "Please fill out all required shipping fields.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const placeOrder = () => {
    // Validate payment information
    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
      toast({
        title: "Missing payment information",
        description: "Please fill out all required payment fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Process order
    setIsLoading(true);
    
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
    { number: 3, title: "Payment", icon: <CreditCard className="w-5 h-5" /> },
    { number: 4, title: "Review", icon: <ShoppingBag className="w-5 h-5" /> }
  ];
  
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
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
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1 && "Customer Information"}
                    {currentStep === 2 && "Shipping Information"}
                    {currentStep === 3 && "Payment Information"}
                    {currentStep === 4 && "Review Your Order"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "Please enter your contact details"}
                    {currentStep === 2 && "Where should we ship your order?"}
                    {currentStep === 3 && "Enter your payment details"}
                    {currentStep === 4 && "Please review your order before confirming"}
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
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="(123) 456-7890"
                          required
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Shipping Information */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange} 
                          placeholder="123 Main St"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleInputChange} 
                            placeholder="New York"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code *</Label>
                          <Input 
                            id="zipCode" 
                            name="zipCode" 
                            value={formData.zipCode} 
                            onChange={handleInputChange} 
                            placeholder="10001"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => handleSelectChange('country', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="US">United States</SelectItem>
                            <SelectItem value="CA">Canada</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="AU">Australia</SelectItem>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Payment Information */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <Input 
                          id="cardNumber" 
                          name="cardNumber" 
                          value={formData.cardNumber} 
                          onChange={handleInputChange} 
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card *</Label>
                        <Input 
                          id="cardName" 
                          name="cardName" 
                          value={formData.cardName} 
                          onChange={handleInputChange} 
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date (MM/YY) *</Label>
                          <Input 
                            id="expiry" 
                            name="expiry" 
                            value={formData.expiry} 
                            onChange={handleInputChange} 
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input 
                            id="cvv" 
                            name="cvv" 
                            value={formData.cvv} 
                            onChange={handleInputChange} 
                            placeholder="123"
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Review Order */}
                  {currentStep === 4 && (
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
                          <p>{formData.city}, {formData.zipCode}</p>
                          <p>{formData.country === 'US' ? 'United States' : 
                             formData.country === 'CA' ? 'Canada' : 
                             formData.country === 'UK' ? 'United Kingdom' : 
                             formData.country === 'AU' ? 'Australia' : 
                             formData.country === 'DE' ? 'Germany' : 
                             formData.country === 'FR' ? 'France' : formData.country}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg">Payment Method</h3>
                        <div className="mt-2 text-sm flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          <span>**** **** **** {formData.cardNumber.slice(-4)}</span>
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
                  
                  {currentStep < 4 ? (
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
                    <span className="font-medium">FREE</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span className="font-medium">${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(cartTotal + cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center text-sm text-green-600">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>Free shipping on all orders</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-blue-600">
                    <Box className="w-4 h-4 mr-2" />
                    <span>30-day easy returns</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-purple-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Ships within 24 hours</span>
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
