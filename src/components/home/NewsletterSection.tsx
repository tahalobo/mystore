
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("تم الاشتراك بنجاح!");
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">اشترك في النشرة الإخبارية</h2>
          <p className="text-primary-foreground/80 mb-8">
            احصل على أحدث العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-gray-900"
              required
            />
            <Button type="submit" variant="secondary">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
