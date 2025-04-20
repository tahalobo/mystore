import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Truck, User, MapPin, Box, Clock, ShoppingBag, ChevronRight, CheckCircle } from 'lucide-react';
import { saveOrder, generateOrderId } from '@/utils/orderStorage';

// Iraq governorates
const iraqGovernorates = ["Baghdad", "Basra", "Erbil", "Sulaymaniyah", "Duhok", "Kirkuk", "Nineveh", "Dhi Qar", "Babylon", "Diyala", "Anbar", "Maysan", "Wasit", "Najaf", "Karbala", "Saladin", "Muthanna", "Qadisiyyah"];
const districts: Record<string, string[]> = {
  "Baghdad": ["Adhamiyah", "Karkh", "Kadhimiya", "Mansour", "Sadr City", "Rusafa", "Dora", "New Baghdad", "Al-Amin", "Al-Mansour", "Al-Sha'ab", "Al-Sadr", "Al-Jadiriya", "Al-Waziriya", "Al-Rusafa", "Al-Khadhimiyah"],
  "Basra": ["Basra City", "Abu Al-Khaseeb", "Al-Zubair", "Faw", "Shatt Al-Arab", "Maysan", "Qurna", "Al-Maqal", "Al-Khobar", "Al-Jubayr", "Al-Dair", "Al-Qubla", "Al-Bakr", "Abu Flous", "Al-Shuaiba", "Al-Hartha"],
  "Erbil": ["Erbil City", "Koya", "Soran", "Shaqlawa", "Choman", "Hawler", "Makhmur", "Khabat", "Rawanduz", "Shaqlawa", "Kurkuk", "Shekhan"],
  "Sulaymaniyah": ["Sulaymaniyah City", "Halabja", "Rania", "Penjwin", "Darbandikhan", "Said Sadiq", "Sharbazher", "Kalar", "Qal'at Dizeh", "Al-Sadya", "Kewzha"],
  "Duhok": ["Duhok City", "Zakho", "Amedi", "Akre", "Sheikhan", "Sumel", "Bardarash", "Duhok", "Rabea", "Gurash", "Gulish"],
  "Kirkuk": ["Kirkuk City", "Hawija", "Daquq", "Dibis", "Riyadh", "Al-Tuz Khurmatu", "Al-Multaqa", "Al-Sharqat", "Abu Saida", "Khanaqin", "Qara Tapa", "Al-Bashir", "Al-Dor"],
  "Nineveh": ["Mosul", "Tal Afar", "Sinjar", "Al-Hamdaniya", "Telkef", "Al-Shoura", "Ba'aj", "Al-Qayyarah", "Hatra", "Khan Al-Baghdadi", "Al-Namrud", "Al-Mahmoudiya", "Al-Mohandesin"],
  "Dhi Qar": ["Nasiriyah", "Al-Rifai", "Suq Al-Shuyukh", "Al-Chibayish", "Al-Daraji", "Al-Fajr", "Al-Kahla", "Al-Tameem", "Al-Tajil", "Al-Nassiriya", "Al-Shatt", "Al-Diwaniyah", "Al-Qadisiya"],
  "Babylon": ["Hillah", "Al-Mahawil", "Al-Musayab", "Al-Hashimiyah", "Qasim", "Al-Suwaira", "Al-Jadidah", "Al-Talaba", "Al-Furat", "Al-Hillah", "Al-Baghdadi", "Al-Nukhayb"],
  "Diyala": ["Baqubah", "Al-Muqdadiyah", "Khanaqin", "Kifri", "Miqdadiyah", "Al-Hashimiyah", "Balad Ruz", "Al-Obaidi", "Al-Saadiyah", "Al-Tahrir", "Al-Makhmoor", "Al-Qara Tapa"],
  "Anbar": ["Ramadi", "Fallujah", "Hit", "Haditha", "Al-Qa'im", "Al-Rutbah", "Heet", "Ar-Ramadi", "Habbaniyah", "Al-Karmah", "Al-Saqlawiyah", "Al-Mahmudiya", "Al-Khamsa", "Tariq"],
  "Maysan": ["Amarah", "Ali Al-Gharbi", "Al-Kahla", "Al-Maimouna", "Al-Qurna", "Al-Jalawla", "Al-Hashimiyah", "Al-Diwaniyah", "Al-Kufa", "Shatrah"],
  "Wasit": ["Kut", "Al-Hay", "Al-Numaniyah", "Badra", "Al-Suwaira", "Zubaid", "Al-Mansour", "Al-Rashid", "Al-Qudus", "Al-Radhwan", "Al-Furat", "Al-Khalis"],
  "Najaf": ["Najaf City", "Kufa", "Al-Manathira", "Al-Mishkhab", "Al-Najaf Al-Ashraf", "Al-Hashimiyah", "Al-Furat", "Al-Sadr", "Al-Salam", "Al-Qadisiyyah"],
  "Karbala": ["Karbala City", "Al-Hindiya", "Ain Al-Tamur", "Al-Qasim", "Al-Karim", "Al-Tayr", "Al-Qadisiyyah"],
  "Saladin": ["Tikrit", "Samarra", "Baiji", "Al-Shirqat", "Balad", "Dujail", "Al-Dour", "Al-Ishaqi", "Al-Aitham", "Al-Mukhayyam", "Al-Bashir"],
  "Muthanna": ["Samawah", "Al-Rumaitha", "Al-Khidhir", "Al-Salman", "Al-Shatrah", "Al-Furat", "Al-Hilal", "Kifl", "Muthanna", "Al-Khales"],
  "Qadisiyyah": ["Diwaniyah", "Afaq", "Al-Shamiya", "Al-Hamza", "Al-Mukhayyam", "Al-Hilal", "Al-Rafidain", "Al-Jadidah", "Al-Saidiya"]
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
  const {
    cartItems,
    cartTotal,
    clearCart
  } = useCart();
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
      setFormData(prev => ({
        ...prev,
        district: ''
      }));
    } else {
      setAvailableDistricts([]);
    }
  }, [formData.governorate]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
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
        toast.error("يرجى ملء جميع حقول معلومات العميل المطلوبة.");
        return;
      }
      if (!formData.phone.startsWith('07') || formData.phone.length !== 11) {
        toast.error("يرجى إدخال رقم هاتف عراقي صالح (يبدأ بـ 07 و11 رقماً).");
        return;
      }
    } else if (currentStep === 2) {
      // Validate shipping information
      if (!formData.address || !formData.governorate || !formData.district) {
        toast.error("يرجى ملء جميع حقول معلومات الشحن المطلوبة.");
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
      total: cartTotal + (cartTotal >= 50 ? 0 : 5) + cartTotal * 0.1,
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
    return <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>عربة التسوق الخاصة بك فارغة</CardTitle>
              <CardDescription>أضف بعض المنتجات إلى سلة التسوق لمتابعة عملية الدفع</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/shop')}>
                مواصلة التسوق
              </Button>
            </CardFooter>
          </Card>
        </main>
        
        <Footer />
      </div>;
  }
  const steps = [{
    number: 1,
    title: "معلومات العميل",
    icon: <User className="w-5 h-5" />
  }, {
    number: 2,
    title: "الشحن",
    icon: <MapPin className="w-5 h-5" />
  }, {
    number: 3,
    title: "المراجعة",
    icon: <ShoppingBag className="w-5 h-5" />
  }];
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
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">الطلب</h1>
          
          {/* Checkout Steps */}
          <div className="flex justify-center mb-8 overflow-x-auto">
            <div className="flex w-full max-w-3xl">
              {steps.map((step, index) => <React.Fragment key={step.number}>
                  <div className={`flex flex-col items-center ${index > 0 ? 'flex-1' : ''}`}>
                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${step.number === currentStep ? 'bg-primary text-white' : step.number < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {step.number < currentStep ? <CheckCircle className="h-6 w-6" /> : step.icon}
                    </div>
                    <span className={`text-sm mt-2 font-medium ${step.number === currentStep ? 'text-primary' : 'text-gray-600'}`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && <div className={`flex-1 flex items-center max-w-[80px]`}>
                      <div className={`h-1 w-full ${step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                    </div>}
                </React.Fragment>)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <motion.div className="lg:col-span-2" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3
          }} key={currentStep}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1 && "معلومات العميل"}
                    {currentStep === 2 && "معلومات الشحن"}
                    {currentStep === 3 && "مراجعة طلبك"}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "الرجاء إدخال بيانات الاتصال الخاصة بك"}
                    {currentStep === 2 && "إلى أين يجب أن نشحن طلبك؟"}
                    {currentStep === 3 && "يُرجى مراجعة طلبك قبل التأكيد"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Step 1: Customer Information */}
                  {currentStep === 1 && <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">اسم العميل *</Label>
                          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="طه" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">اسم والد العميل *</Label>
                          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="عبدالرحمن" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">الايميل *</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@example.com" required />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف * (بالصيغة العراقية، على سبيل المثال، 07XXXXXXXXXXXXXXX)</Label>
                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="07XXXXXXXXX" required />
                        <p className="text-xs text-gray-500">يجب ان يبدأ الرقم ب 07 و متكون من 11 رقم</p>
                      </div>
                    </div>}
                  
                  {/* Step 2: Shipping Information */}
                  {currentStep === 2 && <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">عنوان الشارع والحي *</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="اسم الشارع، رقم المبنى، إلخ." required />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="governorate">المحافطة *</Label>
                          <Select value={formData.governorate} onValueChange={value => handleSelectChange('governorate', value)}>
                            <SelectTrigger id="governorate">
                              <SelectValue placeholder="اختر المحافظة" />
                            </SelectTrigger>
                            <SelectContent>
                              {iraqGovernorates.map(governorate => <SelectItem key={governorate} value={governorate}>
                                  {governorate}
                                </SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="district">اقرب منطقة لك *</Label>
                          <Select value={formData.district} onValueChange={value => handleSelectChange('district', value)} disabled={!formData.governorate}>
                            <SelectTrigger id="district">
                              <SelectValue placeholder={formData.governorate ? "حدد اقرب منطقة" : "حدد المحافظة اولا"} />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDistricts.map(district => <SelectItem key={district} value={district}>
                                  {district}
                                </SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">ملاحظات (يمكن ترك الحقل فارغ </Label>
                        <Input id="notes" name="notes" value={formData.notes} onChange={handleInputChange} placeholder="تعليمات التسليم، والمعالم، وما إلى ذلك." />
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
                        <div className="flex items-start">
                          <Truck className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-amber-800">طريقة الدفع</h4>
                            <p className="text-sm text-amber-700">
                              الدفع نقداً عند الاستلام فقط. ستدفع عند وصول طلبك.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>}
                  
                  {/* Step 3: Review Order */}
                  {currentStep === 3 && <div className="space-y-6">
                      <div>
                        <h3 className="font-medium text-lg">معلومات العميل</h3>
                        <div className="mt-2 text-sm">
                          <p>{formData.firstName} {formData.lastName}</p>
                          <p>{formData.email}</p>
                          <p>{formData.phone}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg">عنوان الشحن</h3>
                        <div className="mt-2 text-sm">
                          <p>{formData.address}</p>
                          <p>{formData.district}, {formData.governorate}</p>
                          <p>Iraq</p>
                          {formData.notes && <div className="mt-2">
                              <span className="font-medium">الملاحظات: </span>
                              <span>{formData.notes}</span>
                            </div>}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg flex items-center">
                          <Truck className="h-5 w-5 mr-2 text-primary" />
                          طريقة الدفع
                        </h3>
                        <div className="mt-2 text-sm bg-gray-50 p-3 rounded-md">
                          <p className="font-medium">الدفع عند الاستلام</p>
                          <p className="text-gray-600 text-xs mt-1">
ستدفع عند وصول طلبك. يرجى تجهيز المبلغ بالضبط.

                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-lg">المنتجات</h3>
                        <ScrollArea className="h-[200px] mt-2">
                          <div className="space-y-4">
                            {cartItems.map(item => <div key={item.product.id} className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="w-12 h-12 rounded overflow-hidden">
                                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium">{item.product.name}</p>
                                    <div className="text-xs text-gray-500">
                                      <span>Qty: {item.quantity}</span>
                                      {item.color && <span className="ml-2">اللون: {item.color}</span>}
                                    </div>
                                  </div>
                                </div>
                                <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                              </div>)}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  {currentStep > 1 && <Button variant="outline" onClick={prevStep}>
                      العودة
                    </Button>}
                  
                  {currentStep < 3 ? <Button onClick={nextStep} className={currentStep === 1 ? 'w-full' : ''}>التالي</Button> : <Button disabled={isLoading} onClick={placeOrder}>
                      {isLoading ? <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                 يرجى الانتظار....
                        </> : ' الطلب'}
                    </Button>}
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.3,
            delay: 0.2
          }}>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                  <CardDescription>
                    {cartItems.length} {cartItems.length === 1 ? 'منتج' : 'منتجات'} بطلبك
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.slice(0, 3).map(item => <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="flex-1 truncate">{item.product.name} x{item.quantity}</span>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>)}
                    
                    {cartItems.length > 3 && <div className="text-sm text-gray-500 italic">
                        + {cartItems.length - 3} منتجات
                      </div>}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-sm">
                    <span>المجموع الفرعي</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>التوصيل</span>
                    <span className="font-medium">
                      {calculateDeliveryFee() === 0 ? "FREE" : `$${calculateDeliveryFee().toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>الاجر (10%)</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>المجموع</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4">
                  <div className="flex items-center text-sm text-green-600">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>شحن مجاني على الطلبات التي تزيد قيمتها عن 50 دولار</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-blue-600">
                    <Box className="w-4 h-4 mr-2" />
                    <span>الدفع نقداً عند الاستلام في العراق</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-purple-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>التوصيل يتم بمدة لاتزيد عن 5 ايام</span>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Checkout;
