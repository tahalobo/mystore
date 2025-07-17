
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, ChevronLeft, Trash, Clock, Star, Share2, Eye, Filter, Search, Grid, List } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion } from "framer-motion";
import ProductDetailModal from "@/components/ProductDetailModal";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Wishlist: React.FC = () => {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("newest");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeProductModal = () => {
    setIsModalOpen(false);
  };

  const handleShare = (product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `تحقق من هذا المنتج الرائع: ${product.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("تم نسخ الرابط");
    }
  };

  const handleBulkAddToCart = () => {
    selectedItems.forEach(itemId => {
      const wishlistItem = wishlistItems.find(item => item.product.id === itemId);
      if (wishlistItem) {
        addToCart(wishlistItem.product);
        removeFromWishlist(itemId);
      }
    });
    setSelectedItems([]);
    toast.success("تم إضافة المنتجات المحددة إلى السلة");
  };

  const handleBulkRemove = () => {
    selectedItems.forEach(itemId => removeFromWishlist(itemId));
    setSelectedItems([]);
    toast.success("تم حذف المنتجات المحددة");
  };

  const toggleItemSelection = (productId: string) => {
    setSelectedItems(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedItems(prev => 
      prev.length === filteredAndSortedItems.length 
        ? [] 
        : filteredAndSortedItems.map(item => item.product.id)
    );
  };

  // Filter and sort items
  const filteredAndSortedItems = React.useMemo(() => {
    let filtered = wishlistItems.filter(item =>
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
        break;
      case "oldest":
        filtered = filtered.sort((a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime());
        break;
      case "price-low":
        filtered = filtered.sort((a, b) => a.product.price - b.product.price);
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => b.product.price - a.product.price);
        break;
      case "name":
        filtered = filtered.sort((a, b) => a.product.name.localeCompare(b.product.name));
        break;
    }

    return filtered;
  }, [wishlistItems, searchTerm, sortBy]);
  
  if (wishlistItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-blue-50">
        <Header />
        
        <main className="container mx-auto flex-grow px-4 py-8 pt-24">
          <div className="mx-auto max-w-2xl py-20 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-primary/20"
            >
              <Heart className="h-12 w-12 text-primary" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              قائمة المفضلة فارغة
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8 text-gray-600 text-lg"
            >
              احفظ العناصر المفضلة لديك في قائمة المفضلة للعودة إليها لاحقاً.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button asChild size="lg" className="px-8">
                <Link to="/shop">
                  <Heart className="ml-2 h-5 w-5" />
                  استكشاف المنتجات
                </Link>
              </Button>
            </motion.div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              قائمة المفضلة
            </motion.h1>
            <p className="text-gray-600">لديك {wishlistItems.length} منتجات في قائمة المفضلة</p>
          </div>

          {/* Controls Section */}
          <Card className="mb-6 bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 items-center flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في المفضلة..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-10"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-40 h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">الأحدث</SelectItem>
                        <SelectItem value="oldest">الأقدم</SelectItem>
                        <SelectItem value="price-low">السعر: منخفض إلى عالي</SelectItem>
                        <SelectItem value="price-high">السعر: عالي إلى منخفض</SelectItem>
                        <SelectItem value="name">الاسم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center border rounded-lg p-1 bg-gray-100">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-8 w-8 p-0"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-8 w-8 p-0"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedItems.length > 0 && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleBulkAddToCart}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <ShoppingCart className="ml-2 h-4 w-4" />
                        إضافة إلى السلة ({selectedItems.length})
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleBulkRemove}
                        className="text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <Trash className="ml-2 h-4 w-4" />
                        حذف ({selectedItems.length})
                      </Button>
                    </>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearWishlist}
                    className="text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <Trash className="ml-2 h-4 w-4" />
                    مسح الكل
                  </Button>
                </div>
              </div>

              {filteredAndSortedItems.length > 0 && (
                <div className="mt-4 pt-4 border-t flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredAndSortedItems.length}
                    onChange={toggleSelectAll}
                    className="ml-2"
                  />
                  <label className="text-sm text-gray-600">
                    تحديد الكل ({filteredAndSortedItems.length} منتجات)
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {filteredAndSortedItems.length === 0 && searchTerm ? (
            <Card className="text-center py-16">
              <CardContent>
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
                <p className="text-gray-600">لم نجد أي منتجات تطابق بحثك "{searchTerm}"</p>
              </CardContent>
            </Card>
          ) : (
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "space-y-4"
            }>
              {filteredAndSortedItems.map((item, index) => (
                <motion.div 
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-all duration-300 ${
                    selectedItems.includes(item.product.id) ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative aspect-square group">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="h-full w-full cursor-pointer object-cover group-hover:scale-105 transition-transform duration-300"
                          onClick={() => openProductModal(item.product)}
                        />
                        
                        <div className="absolute top-3 left-3 flex gap-2">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.product.id)}
                            onChange={() => toggleItemSelection(item.product.id)}
                            className="rounded"
                          />
                        </div>

                        <div className="absolute top-3 right-3 flex gap-2">
                          <button 
                            className="rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-md transition-colors hover:bg-red-50 hover:text-red-500"
                            onClick={() => removeFromWishlist(item.product.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-md transition-colors hover:bg-blue-50 hover:text-blue-500"
                            onClick={() => handleShare(item.product)}
                          >
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {item.product.discount && (
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-red-500 text-white">
                              -{item.product.discount}%
                            </Badge>
                          </div>
                        )}
                        
                        <div className="absolute bottom-3 right-3 flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs">
                          <Clock className="ml-1 h-3 w-3 text-gray-500" />
                          <span>منذ {formatDistanceToNow(new Date(item.addedAt))}</span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 
                          className="line-clamp-2 cursor-pointer font-semibold text-lg hover:text-primary transition-colors mb-2"
                          onClick={() => openProductModal(item.product)}
                        >
                          {item.product.name}
                        </h3>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(item.product.rating) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 mr-2">
                            ({item.product.reviews} تقييم)
                          </span>
                        </div>
                        
                        <div className="mb-4 font-bold text-xl text-primary">
                          {item.product.discount ? (
                            <div className="flex items-center space-x-2">
                              <span>${(item.product.price * (1 - item.product.discount / 100)).toFixed(2)}</span>
                              <span className="text-sm text-gray-500 line-through">${item.product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span>${item.product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                            onClick={() => {
                              addToCart(item.product);
                              removeFromWishlist(item.product.id);
                            }}
                          >
                            <ShoppingCart className="ml-2 h-4 w-4" />
                            إضافة إلى السلة
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openProductModal(item.product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.product.id)}
                          onChange={() => toggleItemSelection(item.product.id)}
                          className="rounded"
                        />
                        
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => openProductModal(item.product)}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h3 
                            className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer mb-1"
                            onClick={() => openProductModal(item.product)}
                          >
                            {item.product.name}
                          </h3>
                          
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < Math.floor(item.product.rating) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600 mr-2">
                              ({item.product.reviews})
                            </span>
                          </div>
                          
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <Clock className="ml-1 h-3 w-3" />
                            <span>أضيف منذ {formatDistanceToNow(new Date(item.addedAt))}</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-xl text-primary mb-2">
                            {item.product.discount ? (
                              <div className="space-y-1">
                                <span>${(item.product.price * (1 - item.product.discount / 100)).toFixed(2)}</span>
                                <div className="text-sm text-gray-500 line-through">${item.product.price.toFixed(2)}</div>
                              </div>
                            ) : (
                              <span>${item.product.price.toFixed(2)}</span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => {
                                addToCart(item.product);
                                removeFromWishlist(item.product.id);
                              }}
                            >
                              <ShoppingCart className="ml-1 h-3 w-3" />
                              إضافة
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShare(item.product)}
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeFromWishlist(item.product.id)}
                              className="text-red-500 hover:bg-red-50"
                            >
                              <Trash className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <Button variant="outline" asChild>
              <Link to="/shop" className="flex items-center px-8">
                <ChevronLeft className="ml-2 h-4 w-4" />
                متابعة التسوق
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          isOpen={isModalOpen} 
          onClose={closeProductModal} 
        />
      )}
    </div>
  );
};

export default Wishlist;
