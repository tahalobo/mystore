
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="mt-16 hero-gradient overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Upgrade Your <span className="text-gradient">Tech Experience</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-md">
            Discover premium accessories that enhance your devices and elevate your digital lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white btn-hover-effect"
            >
              <Link to="/shop">
                Shop Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              size="lg"
              className="btn-hover-effect"
            >
              <Link to="/category/new-arrivals">
                New Arrivals
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-4 pt-4">
            <div className="flex -space-x-2">
              <img src="/placeholder.svg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="/placeholder.svg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="/placeholder.svg" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
            </div>
            <div className="text-sm">
              <span className="font-semibold text-primary">500+</span> happy customers
            </div>
          </div>
        </div>
        
        <div className="relative flex justify-center animate-float">
          <div className="bg-white rounded-lg shadow-xl p-4 relative z-10 rotate-3 animate-pulse-slow">
            <img 
              src="/placeholder.svg" 
              alt="Featured Product" 
              className="w-full h-auto rounded"
            />
          </div>
          <div className="absolute top-6 -left-4 bg-accent rounded-lg shadow-lg p-3 rotate-6 animate-float">
            <img 
              src="/placeholder.svg" 
              alt="Product 2" 
              className="w-24 h-24 object-cover rounded"
            />
          </div>
          <div className="absolute bottom-6 -right-4 bg-primary/10 rounded-lg shadow-lg p-3 -rotate-6 animate-float">
            <img 
              src="/placeholder.svg" 
              alt="Product 3" 
              className="w-24 h-24 object-cover rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
