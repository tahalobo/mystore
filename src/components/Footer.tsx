
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin, CreditCard, LockKeyhole, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    if (email) {
      toast({
        title: "Subscription Successful",
        description: `Thank you for subscribing with ${email}. You'll receive our newsletter soon.`,
      });
      form.reset();
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-200">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-800 pb-12">
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gray-800 p-3 rounded-full">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Premium Quality</h3>
              <p className="text-sm text-gray-400">All products are quality tested</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-800 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Secure Payment</h3>
              <p className="text-sm text-gray-400">Multiple payment methods</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-800 p-3 rounded-full">
              <LockKeyhole className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-white">30-Day Returns</h3>
              <p className="text-sm text-gray-400">Shop with confidence</p>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">TechHaven</h2>
            <p className="text-gray-400 max-w-xs">
              Your one-stop shop for premium tech accessories. Discover quality products that enhance your digital lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold border-b border-gray-800 pb-2">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <ul className="space-y-2">
                <li>
                  <Link to="/shop" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    Deals
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link to="/wishlist" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold border-b border-gray-800 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                <span className="text-gray-400">
                  123 Tech Street, Digital City, IC 10101
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">support@techhaven.com</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <h4 className="text-white font-medium mb-2">Business Hours:</h4>
              <p className="text-gray-400 text-sm">
                Monday - Friday: 9AM - 6PM<br />
                Saturday: 10AM - 4PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold border-b border-gray-800 pb-2">Newsletter</h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-gray-300 pr-12"
                  required
                />
                <Button 
                  type="submit" 
                  className="absolute right-0 top-0 bottom-0 bg-primary hover:bg-primary/90 text-white rounded-l-none"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TechHaven. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="https://placehold.co/60x30/2d2d2d/white?text=Visa" alt="Visa" className="h-8 w-auto rounded" />
            <img src="https://placehold.co/60x30/2d2d2d/white?text=MasterCard" alt="Mastercard" className="h-8 w-auto rounded" />
            <img src="https://placehold.co/60x30/2d2d2d/white?text=PayPal" alt="PayPal" className="h-8 w-auto rounded" />
            <img src="https://placehold.co/60x30/2d2d2d/white?text=ApplePay" alt="Apple Pay" className="h-8 w-auto rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
