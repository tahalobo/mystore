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
      toast.success("Thank you for subscribing to our newsletter!", {
        description: "You'll receive our latest updates and exclusive offers directly to your inbox."
      });
      setEmail("");
      setLoading(false);
    }, 1000);
  };
  return <section className="section-padding bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Subscribe to our newsletter and stay updated with the latest products and exclusive offers.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" className="flex-grow" required />
            <Button type="submit" className="bg-primary hover:bg-primary/90 btn-hover-effect" disabled={loading}>
              {loading ? "Subscribing..." : <>
                  Subscribe
                  <Send className="ml-2 h-4 w-4" />
                </>}
            </Button>
          </form>
          
          <p className="text-gray-500 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive marketing emails.
          </p>
        </div>
      </div>
    </section>;
};
export default NewsletterSection;