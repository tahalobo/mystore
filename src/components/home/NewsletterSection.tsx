
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">اشترك في نشرتنا الإخبارية</h2>
          <p className="text-gray-600 mb-8">احصل على أحدث العروض والأخبار والتحديثات مباشرة إلى بريدك الإلكتروني</p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-grow"
            />
            <Button type="submit" className="whitespace-nowrap">
              اشترك الآن
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            من خلال الاشتراك، أنت توافق على تلقي رسائل البريد الإلكتروني التسويقية منا.
            يمكنك إلغاء الاشتراك في أي وقت.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
