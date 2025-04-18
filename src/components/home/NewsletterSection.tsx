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
  return;
};
export default NewsletterSection;