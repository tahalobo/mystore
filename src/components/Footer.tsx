import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Phone as WhatsApp, Clock } from "lucide-react";
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
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-primary"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Fast Shipping</h3>
              <p className="text-sm text-gray-400">Throughout all Iraqi provinces</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-800 p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-primary"
              >
                <circle cx="12" cy="12" r="8"></circle>
                <path d="m12 8 4 4"></path>
                <path d="m12 8-4 4"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Quality Assurance</h3>
              <p className="text-sm text-gray-400">Authentic products, guaranteed</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-gray-800 p-3 rounded-full">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-6 w-6 text-primary"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Customer Support</h3>
              <p className="text-sm text-gray-400">7 days a week, 9AM - 9PM</p>
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">TechHaven Iraq</h2>
            <p className="text-gray-400 max-w-xs">
              Your trusted destination for premium tech products in Iraq. We offer a wide selection of authentic gadgets and accessories delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://wa.me/9647XXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <WhatsApp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold border-b border-gray-800 pb-2">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2">
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
                  <Link to="/brands" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="h-1 w-1 bg-gray-500 rounded-full mr-2"></span>
                    Brands
                  </Link>
                </li>
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
                  Baghdad Mall, Al-Mansour District, Baghdad, Iraq
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">+964 750 123 4567</span>
              </li>
              <li className="flex items-center">
                <WhatsApp className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">+964 770 987 6543</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary" />
                <span className="text-gray-400">support@techhaven-iraq.com</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <h4 className="text-white font-medium mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                Business Hours:
              </h4>
              <p className="text-gray-400 text-sm">
                Saturday - Thursday: 10AM - 9PM<br />
                Friday: 2PM - 9PM
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
            &copy; {new Date().getFullYear()} TechHaven Iraq. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
