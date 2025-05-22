
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Heart, Share2, Star, Shield, Truck, Package, RefreshCw, ChevronDown, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { getProductById, getRelatedProducts } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]); // Ensure this is initialized as an array
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Fetch product details
    setIsLoading(true);
    
    if (productId) {
      const fetchedProduct = getProductById(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // Get related products (same category)
        const related = getRelatedProducts(fetchedProduct); // Changed to use the correct function
        setRelatedProducts(related || []); // Ensure we always set an array
      }
    }
    
    setIsLoading(false);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      if (product.stock === 0) {
        toast.error("عذراً، المنتج غير متوفر حالياً");
        return;
      }

      addToCart({
        ...product,
        quantity
      });
      toast.success(`تمت إضافة ${product.name} إلى سلة التسوق`);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} تمت إزالتها من قائمة الرغبات`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} أضيفت إلى قائمة الأمنيات!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto mt-28 mb-8 flex justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto mt-28 mb-8 p-4">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-700">عذراً، لم يتم العثور على المنتج</h1>
            <p className="mt-4 mb-8">المنتج الذي تبحث عنه غير موجود أو تم إزالته</p>
            <Button asChild>
              <Link to="/shop">العودة إلى المتجر</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const productImages = [
    "/lovable-uploads/e9f3b555-0da2-47b3-a199-b5ee1fced447.png",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  ];

  const discountedPrice = product.discount 
    ? (product.price * (1 - product.discount / 100)).toFixed(2) 
    : product.price.toFixed(2);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto mt-24 mb-8 px-4">
        <div className="flex items-center mb-4 text-sm breadcrumbs">
          <Link to="/" className="text-gray-500 hover:text-primary">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="text-gray-500 hover:text-primary">المتجر</Link>
          <span className="mx-2">/</span>
          <Link to={`/category/${product.category}`} className="text-gray-500 hover:text-primary">
            {product.category.replace('-', ' ')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl overflow-hidden"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100 mb-4 rounded-lg">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              
              {product.discount > 0 && (
                <div className="absolute top-4 right-4">
                  <Badge variant="destructive" className="rounded-full px-2 py-1">
                    خصم {product.discount}%
                  </Badge>
                </div>
              )}
              
              {product.newArrival && (
                <div className="absolute top-4 left-4">
                  <Badge variant="default" className="bg-emerald-500 text-white hover:bg-emerald-600 rounded-full px-2 py-1">
                    جديد
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} - صورة ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center">
                <Badge 
                  variant="outline" 
                  className="mb-2 text-primary border-primary/30"
                >
                  {product.category.replace('-', ' ')}
                </Badge>
                {product.bestSeller && (
                  <Badge className="ml-2 mb-2 bg-amber-500 hover:bg-amber-600">الأكثر مبيعاً</Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-2">
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating}/5 ({Math.floor(Math.random() * 50) + 10} تقييم)
                </span>
              </div>
              
              <div className="flex items-baseline mb-4">
                {product.discount ? (
                  <>
                    <span className="text-3xl font-bold text-primary">
                      ${discountedPrice}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-2">الوصف</h3>
              <p className="text-gray-600">
                {product.description || `${product.name} هو منتج عالي الجودة يتميز بتصميم عصري وأداء ممتاز. 
                تم تصنيعه باستخدام أفضل المواد لضمان المتانة والموثوقية. مثالي للاستخدام اليومي، 
                يوفر ${product.name} تجربة استخدام سلسة ومريحة.`}
              </p>
            </div>
            
            {product.stock > 0 ? (
              <div className="text-green-600 flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-600 mr-2"></div>
                متوفر في المخزون ({product.stock} قطعة)
              </div>
            ) : (
              <div className="text-red-600 flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                غير متوفر حالياً
              </div>
            )}
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center border rounded-md">
                <button 
                  className="px-3 py-2 text-gray-600"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button 
                  className="px-3 py-2 text-gray-600"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <Button 
                size="lg" 
                className="flex-grow"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                إضافة إلى السلة
              </Button>
              
              <Button 
                size="icon" 
                variant="outline" 
                className="h-12 w-12"
                onClick={toggleWishlist}
              >
                <Heart 
                  className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
              
              <Button 
                size="icon" 
                variant="outline" 
                className="h-12 w-12"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center p-3 rounded-lg bg-gray-50">
                <Shield className="h-5 w-5 text-primary mr-2" />
                <span>ضمان لمدة عام</span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-gray-50">
                <Truck className="h-5 w-5 text-primary mr-2" />
                <span>شحن مجاني</span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-gray-50">
                <Package className="h-5 w-5 text-primary mr-2" />
                <span>منتج أصلي</span>
              </div>
              <div className="flex items-center p-3 rounded-lg bg-gray-50">
                <RefreshCw className="h-5 w-5 text-primary mr-2" />
                <span>استبدال سهل</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Product Details Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">المواصفات</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              <TabsTrigger value="shipping">الشحن والإرجاع</TabsTrigger>
              <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-6 bg-white rounded-b-lg shadow-sm">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">المواصفات التقنية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">الأبعاد والوزن</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>الأبعاد:</span>
                        <span>15 × 10 × 5 سم</span>
                      </li>
                      <li className="flex justify-between">
                        <span>الوزن:</span>
                        <span>350 جرام</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">المواصفات العامة</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>بلد المنشأ:</span>
                        <span>اليابان</span>
                      </li>
                      <li className="flex justify-between">
                        <span>اللون:</span>
                        <span>أسود / فضي</span>
                      </li>
                      <li className="flex justify-between">
                        <span>المواد:</span>
                        <span>بلاستيك، معدن، سيليكون</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                    className="flex items-center text-primary font-medium"
                  >
                    عرض المزيد من المواصفات
                    <ChevronDown className={`ml-1 h-5 w-5 transform transition-transform ${isSpecsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isSpecsOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">المواصفات التقنية</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex justify-between">
                            <span>المعالج:</span>
                            <span>Dual Core 1.8GHz</span>
                          </li>
                          <li className="flex justify-between">
                            <span>الذاكرة:</span>
                            <span>4GB RAM</span>
                          </li>
                          <li className="flex justify-between">
                            <span>التخزين:</span>
                            <span>64GB</span>
                          </li>
                          <li className="flex justify-between">
                            <span>البطارية:</span>
                            <span>3500mAh</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">الاتصالات</h4>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex justify-between">
                            <span>Wi-Fi:</span>
                            <span>802.11a/b/g/n/ac</span>
                          </li>
                          <li className="flex justify-between">
                            <span>Bluetooth:</span>
                            <span>5.0</span>
                          </li>
                          <li className="flex justify-between">
                            <span>USB:</span>
                            <span>Type-C</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 bg-white rounded-b-lg shadow-sm">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">تقييمات العملاء</h3>
                <div className="flex items-center">
                  <div className="text-5xl font-bold text-primary">{product.rating.toFixed(1)}</div>
                  <div className="ml-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < product.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                      بناءً على {Math.floor(Math.random() * 50) + 10} تقييم
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">
                          {["أحمد محمد", "سارة علي", "فهد العتيبي"][i]}
                        </div>
                        <div className="text-gray-500 text-sm">
                          قبل {[3, 7, 14][i]} أيام
                        </div>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star 
                            key={j} 
                            className={`h-4 w-4 ${j < [5, 4, 5][i] ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        {[
                          "منتج رائع جداً، أنا سعيد جداً بالشراء. الجودة ممتازة والتوصيل كان سريع.",
                          "تجربة شراء ممتازة، المنتج كما هو موصوف تماماً. أنصح به بشدة.",
                          "منتج ممتاز بجودة عالية ويستحق السعر. سأشتري منه مرة أخرى بالتأكيد."
                        ][i]}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full">عرض كل التقييمات</Button>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="p-6 bg-white rounded-b-lg shadow-sm">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">معلومات الشحن والإرجاع</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center">
                      <Truck className="mr-2 h-5 w-5 text-primary" />
                      الشحن
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>شحن مجاني لجميع الطلبات فوق 200$</li>
                      <li>التوصيل خلال 3-7 أيام عمل</li>
                      <li>خدمة التتبع متاحة لجميع الشحنات</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center">
                      <RefreshCw className="mr-2 h-5 w-5 text-primary" />
                      الإرجاع والاستبدال
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>استرجاع مجاني خلال 14 يوم</li>
                      <li>يجب أن تكون المنتجات في حالتها الأصلية</li>
                      <li>ضمان لمدة عام ضد عيوب التصنيع</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="faq" className="p-6 bg-white rounded-b-lg shadow-sm">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">الأسئلة الشائعة</h3>
                <div className="space-y-3">
                  {[
                    {
                      q: "هل المنتج يأتي مع ضمان؟",
                      a: "نعم، جميع منتجاتنا تأتي مع ضمان لمدة عام ضد عيوب التصنيع."
                    },
                    {
                      q: "هل يمكنني إلغاء الطلب بعد الشراء؟",
                      a: "نعم، يمكنك إلغاء الطلب في غضون 24 ساعة من وقت الشراء."
                    },
                    {
                      q: "كيف يمكنني تتبع طلبي؟",
                      a: "ستتلقى بريدًا إلكترونيًا يحتوي على رقم التتبع بمجرد شحن طلبك."
                    },
                    {
                      q: "هل المنتج متوافق مع جميع الأجهزة؟",
                      a: "المنتج متوافق مع معظم الأجهزة الحديثة. يرجى التحقق من مواصفات التوافق للتأكد."
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">{item.q}</h4>
                      <p className="text-gray-700">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Related Products */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">منتجات ذات صلة</h2>
            <Button variant="link" asChild>
              <Link to={`/category/${product.category}`}>عرض المزيد</Link>
            </Button>
          </div>
          
          {/* Ensure relatedProducts is an array before using slice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(relatedProducts) && relatedProducts.slice(0, 4).map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
