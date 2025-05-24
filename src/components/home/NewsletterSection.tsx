
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <Mail className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Our Latest Offers
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Subscribe to our newsletter and never miss out on exclusive deals and new arrivals.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white text-gray-900"
            />
            <Button type="submit" variant="secondary" className="px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
