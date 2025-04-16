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
  return;
};
export default NewsletterSection;