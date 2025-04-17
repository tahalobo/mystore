
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';

const OrderSuccess: React.FC = () => {
  // Generate a random order number
  const orderNumber = React.useMemo(() => {
    return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              تم تأكيد الطلب!
            </motion.h1>
            
            <motion.p 
              className="text-gray-600 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              شكراً لك على شرائك. تم تأكيد طلبك بنجاح.
            </motion.p>
            
            <motion.div
              className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <p className="font-medium mb-1">رقم الطلب:</p>
              <p className="text-lg font-bold text-primary">{orderNumber}</p>
            </motion.div>
            
            <motion.p 
              className="text-sm text-gray-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              ستتلقى تأكيداً عبر البريد الإلكتروني يتضمن تفاصيل الطلب ومعلومات التتبع قريباً.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button asChild className="flex items-center">
                <Link to="/">
                  <Home className="w-4 h-4 ml-2" />
                  العودة للرئيسية
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link to="/shop">
                  <ShoppingBag className="w-4 h-4 ml-2" />
                  متابعة التسوق
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
