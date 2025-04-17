
import React, { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("شكراً لاشتراكك في نشرتنا الإخبارية!", {
        description: "ستتلقى آخر التحديثات والعروض الحصرية مباشرة في بريدك الإلكتروني."
      });
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">ابق على اطلاع</h2>
          <p className="text-gray-600 mb-8">
            اشترك في نشرتنا الإخبارية لتلقي التحديثات حول المنتجات الجديدة والعروض الخاصة ونصائح التقنية.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                "جاري الاشتراك..."
              ) : (
                <>
                  اشترك <Send className="mr-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
