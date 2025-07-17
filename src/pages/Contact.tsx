
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Sparkles, ChevronRight, MessageCircle, Headphones, Star, Zap } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const contactInfo = {
  address: {
    street: "شارع 18 الصناعة",
    city: "بغداد",
    country: "العراق"
  },
  phone: {
    sales: "0780 722 2333",
    support: "0780 722 2333"
  },
  email: {
    general: "Suhah08@gmail.com",
    support: "Suhah08@gmail.com",
    sales: "Suhah08@gmail.com"
  },
  hours: {
    weekdays: "السبت - الخميس: 9:00 صباحاً - 10:00 مساءً",
    weekend: "الجمعة: 2:00 مساءً - 10:00 مساءً"
  }
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formSubmitting, setFormSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);

    setTimeout(() => {
      toast.success("تم إرسال رسالتك بنجاح! سنعاود الاتصال بك قريباً.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormSubmitting(false);
    }, 1500);
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Modern Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-purple-50 py-24">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 right-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 mb-8">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">نحن هنا لمساعدتك</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
                  تواصل معنا
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                نحن متحمسون للسماع منك! سواء كان لديك سؤال أو تحتاج إلى مساعدة، فريقنا جاهز لخدمتك
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button size="lg" className="group bg-gradient-to-r from-primary to-accent hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Phone className="h-5 w-5 mr-2" />
                اتصل بنا الآن
                <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 hover:bg-primary/5 hover:border-primary transition-all duration-300">
                <Mail className="h-5 w-5 mr-2" />
                راسلنا
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Modern Contact Methods */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-6xl mx-auto"
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
            >
              <div className="text-center mb-20">
                <motion.div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-8">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-primary font-semibold">طرق التواصل</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  اختر طريقتك المفضلة
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  متعدد الطرق للوصول إلينا، اختر ما يناسبك
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Phone className="h-8 w-8" />,
                    title: "مكالمة مباشرة",
                    description: "تحدث مع فريق الدعم فوراً",
                    info: contactInfo.phone.support,
                    color: "from-green-400 to-emerald-500",
                    action: "اتصل الآن"
                  },
                  {
                    icon: <Mail className="h-8 w-8" />,
                    title: "البريد الإلكتروني",
                    description: "أرسل رسالة مفصلة في أي وقت",
                    info: contactInfo.email.support,
                    color: "from-blue-400 to-cyan-500",
                    action: "إرسال إيميل"
                  },
                  {
                    icon: <Headphones className="h-8 w-8" />,
                    title: "الدعم الفني",
                    description: "مساعدة متخصصة للمشاكل التقنية",
                    info: "متاح 24/7",
                    color: "from-purple-400 to-indigo-500",
                    action: "احصل على المساعدة"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemAnimation}
                    className="group"
                    whileHover={{ y: -10 }}
                  >
                    <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <CardHeader className="relative z-10">
                        <div className={`bg-gradient-to-r ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                          {item.icon}
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-gray-600 text-base">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <div className="font-bold text-gray-900 text-lg mb-6">{item.info}</div>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                          {item.action}
                          <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Modern Contact Form */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Form Section */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="mb-12">
                    <motion.div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-8">
                      <Send className="w-5 h-5 text-primary" />
                      <span className="text-primary font-semibold">أرسل رسالتك</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                      نحن نستمع إليك
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      املأ النموذج وسنعاود الاتصال بك في أسرع وقت ممكن
                    </p>
                  </div>
                  
                  <Tabs defaultValue="support" className="mb-8">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
                      <TabsTrigger value="support" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Headphones className="w-4 h-4 ml-2" />
                        دعم
                      </TabsTrigger>
                      <TabsTrigger value="sales" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <Star className="w-4 h-4 ml-2" />
                        مبيعات
                      </TabsTrigger>
                      <TabsTrigger value="feedback" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                        <MessageSquare className="w-4 h-4 ml-2" />
                        اقتراحات
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="support" className="mt-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Headphones className="w-6 h-6 text-blue-600" />
                          <h3 className="font-bold text-blue-900">الدعم الفني</h3>
                        </div>
                        <p className="text-blue-700">
                          هل تحتاج مساعدة في منتجك أو طلبك؟ فريق الدعم جاهز لحل أي مشكلة تقنية.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="sales" className="mt-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <Star className="w-6 h-6 text-green-600" />
                          <h3 className="font-bold text-green-900">المبيعات</h3>
                        </div>
                        <p className="text-green-700">
                          مهتم بالطلبات الكبيرة أو الشراكات؟ فريق المبيعات يود مناقشة احتياجاتك.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="feedback" className="mt-6">
                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <MessageSquare className="w-6 h-6 text-purple-600" />
                          <h3 className="font-bold text-purple-900">اقتراحات ومراجعات</h3>
                        </div>
                        <p className="text-purple-700">
                          شاركنا تجربتك أو اقترح تحسينات. رأيك مهم لنا!
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label htmlFor="name" className="text-sm font-bold text-gray-700">
                              الاسم الكامل *
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="أدخل اسمك الكامل"
                              className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                              required
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <label htmlFor="email" className="text-sm font-bold text-gray-700">
                              البريد الإلكتروني *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="example@email.com"
                              className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="subject" className="text-sm font-bold text-gray-700">
                            الموضوع *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="عنوان الموضوع"
                            className="h-12 border-2 border-gray-200 focus:border-primary rounded-xl"
                            required
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <label htmlFor="message" className="text-sm font-bold text-gray-700">
                            الرسالة *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="اكتب رسالتك هنا..."
                            rows={5}
                            className="border-2 border-gray-200 focus:border-primary rounded-xl resize-none"
                            required
                          />
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full h-14 bg-gradient-to-r from-primary to-accent hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold text-lg"
                          disabled={formSubmitting}
                        >
                          {formSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              جاري الإرسال...
                            </>
                          ) : (
                            <>
                              <Send className="mr-3 h-5 w-5" />
                              إرسال الرسالة
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
                
                {/* Info & Map Section */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="space-y-8"
                >
                  {/* Contact Info Cards */}
                  <div className="space-y-6">
                    {[
                      {
                        icon: <MapPin className="h-6 w-6" />,
                        title: "موقعنا",
                        info: `${contactInfo.address.street}, ${contactInfo.address.city}`,
                        color: "from-red-400 to-pink-500"
                      },
                      {
                        icon: <Phone className="h-6 w-6" />,
                        title: "رقم الهاتف",
                        info: contactInfo.phone.support,
                        color: "from-green-400 to-emerald-500"
                      },
                      {
                        icon: <Clock className="h-6 w-6" />,
                        title: "ساعات العمل",
                        info: contactInfo.hours.weekdays,
                        color: "from-blue-400 to-cyan-500"
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`bg-gradient-to-r ${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-gray-600">{item.info}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Map */}
                  <Card className="border-0 shadow-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        موقع المتجر
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="aspect-video w-full">
                        <iframe 
                          src="https://www.google.pl/maps/place/%D8%B4%D8%B1%D9%83%D8%A9+%D8%B3%D9%85%D8%A7+%D8%A7%D9%88%D8%B1+%D9%84%D8%AA%D9%82%D9%86%D9%8A%D8%A9+%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%88%D9%85%D8%A7%D8%AA%E2%80%AD/@33.3074457,44.4512219,17z/data=!4m6!3m5!1s0x155781f525e1071d:0xd3e7eb7dc833043!8m2!3d33.3074457!4d44.448647!16s%2Fg%2F11rsv87jp7?entry=ttu&g_ep=EgoyMDI1MDQxMy4wIKXMDSoASAFQAw%3D%3D"
                          className="w-full h-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="موقع المتجر"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <motion.div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-3 mb-8">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-primary font-semibold">أسئلة شائعة</span>
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
                  إجابات سريعة
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  اعثر على إجابات للأسئلة الأكثر شيوعاً
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    question: "ما هي طرق الدفع المتاحة؟",
                    answer: "نقبل الدفع نقداً عند الاستلام فقط حالياً."
                  },
                  {
                    question: "كم يستغرق التوصيل؟",
                    answer: "التوصيل داخل بغداد يستغرق 1-2 يوم، وخارج بغداد 3-5 أيام عمل."
                  },
                  {
                    question: "هل يمكنني إرجاع المنتج؟",
                    answer: "نعم، لديك 30 يوماً لإرجاع المنتج بشرط أن يكون في حالته الأصلية."
                  },
                  {
                    question: "هل تقدمون ضماناً؟",
                    answer: "جميع منتجاتنا تأتي مع ضمان من الشركة المصنعة."
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg hover:bg-gray-50 transition-colors">
                        {faq.question}
                        <span className="transition group-open:rotate-180">
                          <ChevronRight className="h-5 w-5" />
                        </span>
                      </summary>
                      <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </details>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
