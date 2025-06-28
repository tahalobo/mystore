
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast.success("تم الاشتراك بنجاح في النشرة الإخبارية!");
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center ml-3">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">اشترك في النشرة الإخبارية</h2>
          </div>
          
          <p className="text-gray-600 mb-8 text-lg">
            احصل على آخر الأخبار والعروض الخاصة مباشرة في بريدك الإلكتروني
          </p>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
                اشترك الآن
              </Button>
            </form>
          ) : (
            <div className="flex items-center justify-center text-emerald-600">
              <CheckCircle className="h-6 w-6 ml-2" />
              <span className="text-lg font-medium">تم الاشتراك بنجاح!</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
