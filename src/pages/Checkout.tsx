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
import { Truck, User, MapPin, Box, Clock, ShoppingBag, ChevronRight, CheckCircle, Shield, CreditCard, Phone, Mail, Home } from 'lucide-react';
import { saveOrder, generateOrderId } from '@/utils/orderStorage';
import { Progress } from '@/components/ui/progress';

// Iraq governorates
const iraqGovernorates = [
  "بغداد", "البصرة", "أربيل", "السليمانية", "دهوك", "كركوك", "نينوى", "ذي قار",
  "بابل", "واسط", "القادسية", "المثنى", "ميسان", "النجف", "كربلاء", "صلاح الدين", "ديالى", "الأنبار"
];

const districts: Record<string, string[]> = {
  "بغداد": ["الأعظمية", "الكرخ", "الكاظمية", "المنصور", "مدينة الصدر", "الرصافة", "الدورة", "بغداد الجديدة", "الأمين", "الشعب", "الجادرية", "الوزيرية"],
  "البصرة": ["مدينة البصرة", "أبو الخصيب", "الزبير", "الفاو", "شط العرب", "القرنة", "المعقل", "الجبيلة", "الدير", "القبلة", "أبو فلوس", "الشعيبة", "الهارثة"],
  "أربيل": ["مدينة أربيل", "كويسنجق", "سوران", "شقلاوة", "جومان", "هولير", "مخمور", "خبات", "رواندوز", "الشيخان"],
  "السليمانية": ["مدينة السليمانية", "حلبجة", "رانية", "بنجوين", "دربندخان", "سعيد صادق", "شاربازير", "كلار", "قلعة دزة", "السعدية", "كيوةجه"],
  "دهوك": ["مدينة دهوك", "زاخو", "العمادية", "عقرة", "الشيخان", "سيميل", "بردرش", "ربيعة", "كوراش", "كوليش"],
  "كركوك": ["مدينة كركوك", "الحويجة", "داقوق", "الدبس", "الرياض", "طوز خورماتو", "الملتقى", "البشير"],
  "نينوى": ["الموصل", "تلعفر", "سنجار", "الحمدانية", "تلكيف", "الشورة", "البعاج", "القيارة", "الحضر", "النمرود", "المهندسين"],
  "ذي قار": ["الناصرية", "الرفاعي", "سوق الشيوخ", "الجبايش", "الدراجي", "الفجر", "الشط", "الإصلاح"],
  "بابل": ["الحلة", "المحاويل", "المسيب", "الهاشمية", "القاسم", "المدحتية"],
  "ديالى": ["بعقوبة", "المقدادية", "خانقين", "كفري", "بلدروز", "العبيدي", "السعدية", "قره تبة"],
  "الأنبار": ["الرمادي", "الفلوجة", "هيت", "حديثة", "القائم", "الرطبة", "الحبانية", "الكرمة", "الصقلاوية"],
  "ميسان": ["العمارة", "علي الغربي", "الكحلاء", "الميمونة", "المشرح", "قلعة صالح"],
  "واسط": ["الكوت", "الحي", "النعمانية", "بدرة", "الصويرة", "الزبيدية"],
  "النجف": ["النجف", "الكوفة", "المناذرة", "المشخاب"],
  "كربلاء": ["كربلاء", "عين التمر", "الهندية"],
  "صلاح الدين": ["تكريت", "سامراء", "بيجي", "الشرقاط", "بلد", "الدجيل", "الدور", "الإسحاقي"],
  "المثنى": ["السماوة", "الرميثة", "الخضر", "السلمان"],
  "القادسية": ["الديوانية", "عفك", "الشامية", "الحمزة"]


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
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        toast.error("يرجى ملء جميع حقول معلومات العميل المطلوبة.");
        return;
      }
      if (!formData.phone.startsWith('07') || formData.phone.length !== 11) {
        toast.error("يرجى إدخال رقم هاتف عراقي صالح (يبدأ بـ 07 و11 رقماً).");
        return;
      }
    } else if (currentStep === 2) {
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
    setIsLoading(true);

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

    saveOrder(newOrder);

    setTimeout(() => {
      clearCart();
      setIsLoading(false);
      navigate('/order-success');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">عربة التسوق الخاصة بك فارغة</CardTitle>
              <CardDescription>أضف بعض المنتجات إلى سلة التسوق لمتابعة عملية الدفع</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate('/shop')}>
                <ShoppingBag className="ml-2 h-4 w-4" />
                مواصلة التسوق
              </Button>
            </CardFooter>
          </Card>
        </main>
        
        <Footer />
      </div>
    );
  }

  const steps = [
    { number: 1, title: "معلومات العميل", icon: <User className="w-5 h-5" /> },
    { number: 2, title: "الشحن", icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: "المراجعة", icon: <ShoppingBag className="w-5 h-5" /> }
  ];

  const calculateDeliveryFee = () => cartTotal >= 50 ? 0 : 5;
  const calculateTax = () => cartTotal * 0.1;
  const calculateTotal = () => cartTotal + calculateDeliveryFee() + calculateTax();
  const stepProgress = (currentStep / steps.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              إتمام الطلب
            </h1>
            <p className="text-gray-600">أكمل معلوماتك لإتمام عملية الشراء</p>
          </motion.div>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">الخطوة {currentStep} من {steps.length}</span>
              <span className="text-sm font-medium text-primary">{Math.round(stepProgress)}%</span>
            </div>
            <Progress value={stepProgress} className="h-2" />
          </div>

          {/* Checkout Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex w-full max-w-2xl items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <motion.div 
                    className="flex flex-col items-center"
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ 
                      scale: step.number === currentStep ? 1.1 : step.number < currentStep ? 1 : 0.8,
                      opacity: step.number <= currentStep ? 1 : 0.5
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      step.number === currentStep 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25' 
                        : step.number < currentStep 
                          ? 'bg-green-500 text-white border-green-500' 
                          : 'bg-white text-gray-400 border-gray-300'
                    }`}>
                      {step.number < currentStep ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        step.icon
                      )}
                      {step.number === currentStep && (
                        <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-25"></div>
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium transition-colors ${
                      step.number === currentStep ? 'text-primary' : 'text-gray-600'
                    }`}>
                      {step.title}
                    </span>
                  </motion.div>
                  
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <div className={`h-1 rounded-full transition-all duration-500 ${
                        step.number < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
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
              key={currentStep}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-50 border-b">
                  <CardTitle className="flex items-center text-xl">
                    {currentStep === 1 && <><User className="ml-2 h-5 w-5 text-primary" />معلومات العميل</>}
                    {currentStep === 2 && <><MapPin className="ml-2 h-5 w-5 text-primary" />معلومات الشحن</>}
                    {currentStep === 3 && <><ShoppingBag className="ml-2 h-5 w-5 text-primary" />مراجعة طلبك</>}
                  </CardTitle>
                  <CardDescription>
                    {currentStep === 1 && "الرجاء إدخال بيانات الاتصال الخاصة بك"}
                    {currentStep === 2 && "إلى أين يجب أن نشحن طلبك؟"}
                    {currentStep === 3 && "يُرجى مراجعة طلبك قبل التأكيد"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                  {/* Step 1: Customer Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="flex items-center">
                            <User className="h-4 w-4 ml-1 text-gray-500" />
                            اسم العميل *
                          </Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                            placeholder="طه" 
                            required 
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="flex items-center">
                            <User className="h-4 w-4 ml-1 text-gray-500" />
                            اسم والد العميل *
                          </Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange} 
                            placeholder="عبدالرحمن" 
                            required 
                            className="h-12"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center">
                          <Mail className="h-4 w-4 ml-1 text-gray-500" />
                          الايميل *
                        </Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="john.doe@example.com" 
                          required 
                          className="h-12"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center">
                          <Phone className="h-4 w-4 ml-1 text-gray-500" />
                          رقم الهاتف *
                        </Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="07XXXXXXXXX" 
                          required 
                          className="h-12"
                        />
                        <p className="text-xs text-gray-500 flex items-center">
                          <Shield className="h-3 w-3 ml-1" />
                          يجب ان يبدأ الرقم ب 07 و متكون من 11 رقم
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Shipping Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center">
                          <Home className="h-4 w-4 ml-1 text-gray-500" />
                          عنوان الشارع والحي *
                        </Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange} 
                          placeholder="اسم الشارع، رقم المبنى، إلخ." 
                          required 
                          className="h-12"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="governorate" className="flex items-center">
                            <MapPin className="h-4 w-4 ml-1 text-gray-500" />
                            المحافطة *
                          </Label>
                          <Select 
                            value={formData.governorate} 
                            onValueChange={value => handleSelectChange('governorate', value)}
                          >
                            <SelectTrigger id="governorate" className="h-12">
                              <SelectValue placeholder="اختر المحافظة" />
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
                          <Label htmlFor="district">اقرب منطقة لك *</Label>
                          <Select 
                            value={formData.district} 
                            onValueChange={value => handleSelectChange('district', value)} 
                            disabled={!formData.governorate}
                          >
                            <SelectTrigger id="district" className="h-12">
                              <SelectValue placeholder={formData.governorate ? "حدد اقرب منطقة" : "حدد المحافظة اولا"} />
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
                        <Label htmlFor="notes">ملاحظات (اختياري)</Label>
                        <Input 
                          id="notes" 
                          name="notes" 
                          value={formData.notes} 
                          onChange={handleInputChange} 
                          placeholder="تعليمات التسليم، والمعالم، وما إلى ذلك." 
                          className="h-12"
                        />
                      </div>
                      
                      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                        <CardContent className="p-4">
                          <div className="flex items-start">
                            <CreditCard className="h-5 w-5 text-amber-600 mt-0.5 ml-2 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-amber-800">طريقة الدفع</h4>
                              <p className="text-sm text-amber-700 mt-1">
                                الدفع نقداً عند الاستلام فقط. ستدفع عند وصول طلبك.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  
                  {/* Step 3: Review Order */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <User className="h-5 w-5 ml-2 text-blue-600" />
                            معلومات العميل
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">الاسم:</span>
                              <p>{formData.firstName} {formData.lastName}</p>
                            </div>
                            <div>
                              <span className="font-medium">الإيميل:</span>
                              <p>{formData.email}</p>
                            </div>
                            <div>
                              <span className="font-medium">الهاتف:</span>
                              <p>{formData.phone}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <MapPin className="h-5 w-5 ml-2 text-green-600" />
                            عنوان الشحن
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm space-y-1">
                            <p>{formData.address}</p>
                            <p>{formData.district}, {formData.governorate}</p>
                            <p>العراق</p>
                            {formData.notes && (
                              <div className="mt-2 pt-2 border-t border-green-200">
                                <span className="font-medium">الملاحظات: </span> 
                                <span>{formData.notes}</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center">
                            <ShoppingBag className="h-5 w-5 ml-2 text-purple-600" />
                            المنتجات ({cartItems.length})
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ScrollArea className="h-[200px]">
                            <div className="space-y-3">
                              {cartItems.map(item => (
                                <div key={item.product.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                      <img 
                                        src={item.product.image} 
                                        alt={item.product.name} 
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div>
                                      <p className="font-medium text-sm">{item.product.name}</p>
                                      <div className="text-xs text-gray-500">
                                        <span>الكمية: {item.quantity}</span>
                                        {item.color && <span className="mr-2">اللون: {item.color}</span>}
                                      </div>
                                    </div>
                                  </div>
                                  <p className="font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-between bg-gradient-to-r from-gray-50 to-blue-50 border-t">
                  {currentStep > 1 && (
                    <Button variant="outline" onClick={prevStep} className="px-8">
                      <ChevronRight className="ml-2 h-4 w-4 rotate-180" />
                      العودة
                    </Button>
                  )}
                  
                  <div className="flex-1"></div>
                  
                  {currentStep < 3 ? (
                    <Button onClick={nextStep} className="px-8">
                      التالي
                      <ChevronRight className="mr-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      disabled={isLoading} 
                      onClick={placeOrder}
                      className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                          يرجى الانتظار...
                        </>
                      ) : (
                        <>
                          <CreditCard className="ml-2 h-4 w-4" />
                          تأكيد الطلب
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <CreditCard className="ml-2 h-5 w-5 text-primary" />
                    ملخص الطلب
                  </CardTitle>
                  <CardDescription>
                    {cartItems.length} {cartItems.length === 1 ? 'منتج' : 'منتجات'} بطلبك
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <ScrollArea className="max-h-[200px]">
                    <div className="space-y-2">
                      {cartItems.slice(0, 3).map(item => (
                        <div key={item.product.id} className="flex justify-between text-sm py-2">
                          <span className="flex-1 truncate">{item.product.name} x{item.quantity}</span>
                          <span className="font-medium text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      
                      {cartItems.length > 3 && (
                        <div className="text-sm text-gray-500 italic py-2">
                          + {cartItems.length - 3} منتجات أخرى
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">المجموع الفرعي</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">التوصيل</span>
                      <span className="font-medium text-green-600">
                        {calculateDeliveryFee() === 0 ? "مجاناً" : `$${calculateDeliveryFee().toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">الضريبة (10%)</span>
                      <span className="font-medium">${calculateTax().toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>المجموع</span>
                      <span className="text-primary text-xl">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="w-full space-y-3 text-sm">
                    <div className="flex items-center text-green-600">
                      <Truck className="w-4 h-4 ml-2" />
                      <span>شحن مجاني على الطلبات التي تزيد قيمتها عن 50 دولار</span>
                    </div>
                    
                    <div className="flex items-center text-blue-600">
                      <Shield className="w-4 h-4 ml-2" />
                      <span>الدفع نقداً عند الاستلام في العراق</span>
                    </div>
                    
                    <div className="flex items-center text-purple-600">
                      <Clock className="w-4 h-4 ml-2" />
                      <span>التوصيل يتم بمدة لا تزيد عن 5 أيام</span>
                    </div>
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
