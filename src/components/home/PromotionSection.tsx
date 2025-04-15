
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PromotionSection: React.FC = () => {
  return (
    <section className="py-16 bg-primary text-white overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-block py-1 px-3 bg-white/20 text-white rounded-full text-sm font-medium">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Summer Sale
            </h2>
            <p className="text-white/80 text-lg">
              Get up to 50% off on selected accessories. Hurry, offer ends soon!
            </p>
            <div className="flex space-x-4 pt-2">
              <Button 
                asChild 
                variant="secondary"
                className="bg-white text-black hover:bg-gray-100 btn-hover-effect"
              >
                <Link to="/deals">
                  Shop Deals
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="border-white text-black bg-white hover:bg-gray-100 btn-hover-effect"
              >
                <Link to="/shop">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-4 animate-float">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 rotate-3">
                <img src="/placeholder.svg" alt="Promotion product" className="w-full h-auto rounded" />
                <div className="mt-2 text-center">
                  <div className="font-medium">Wireless Earbuds</div>
                  <div className="flex justify-center space-x-2">
                    <span className="line-through text-white/60">$99.99</span>
                    <span className="font-bold">$49.99</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 -rotate-3 mt-8">
                <img src="/placeholder.svg" alt="Promotion product" className="w-full h-auto rounded" />
                <div className="mt-2 text-center">
                  <div className="font-medium">Fast Charger</div>
                  <div className="flex justify-center space-x-2">
                    <span className="line-through text-white/60">$39.99</span>
                    <span className="font-bold">$24.99</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionSection;
