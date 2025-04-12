
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, 
  Users, 
  Package, 
  Truck, 
  HeartHandshake, 
  PlayCircle,
  ChevronRight
} from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About TechHaven</h1>
                <p className="text-gray-600 text-lg mb-6">
                  We're dedicated to providing high-quality tech accessories that enhance your digital lifestyle.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link to="/shop">Browse Products</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative animate-fade-in [animation-delay:200ms]">
                <img 
                  src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800" 
                  alt="Our Team" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <Award className="h-8 w-8 text-amber-500" />
                    <div>
                      <h3 className="font-semibold">Premium Quality</h3>
                      <p className="text-sm text-gray-600">Since 2015</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="relative animate-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800" 
                  alt="Our Store" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-16 w-16 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 border-0"
                  >
                    <PlayCircle className="h-10 w-10 text-primary" />
                  </Button>
                </div>
              </div>
              <div className="animate-fade-in [animation-delay:200ms]">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    TechHaven was founded in 2015 with a simple mission: to provide high-quality tech accessories that enhance your digital experience without breaking the bank.
                  </p>
                  <p>
                    What started as a small online store has grown into a trusted brand with customers all over the world. Our founder, Alex Chen, noticed a gap in the market for affordable yet premium tech accessories and decided to bridge that gap.
                  </p>
                  <p>
                    Today, we offer a wide range of products from phone cases to headphones, all carefully curated to meet our strict quality standards. We work directly with manufacturers to ensure that each product meets our specifications.
                  </p>
                  <p>
                    Our team of tech enthusiasts tests every product before it reaches our shelves, ensuring that you get nothing but the best. We take pride in our customer service and are always looking for ways to improve your shopping experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-gray-600">
                At TechHaven, we're guided by a set of core values that define who we are and how we operate.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md animate-fade-in [animation-delay:200ms]">
                <div className="bg-primary/10 p-3 inline-flex rounded-full mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer First</h3>
                <p className="text-gray-600">
                  We put our customers at the center of everything we do. Your satisfaction is our top priority.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md animate-fade-in [animation-delay:300ms]">
                <div className="bg-primary/10 p-3 inline-flex rounded-full mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Products</h3>
                <p className="text-gray-600">
                  We're committed to offering products that meet the highest quality standards and exceed expectations.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md animate-fade-in [animation-delay:400ms]">
                <div className="bg-primary/10 p-3 inline-flex rounded-full mb-4">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integrity</h3>
                <p className="text-gray-600">
                  We operate with honesty and transparency, building trust with our customers and partners.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600">
                The passionate individuals behind TechHaven who work hard to bring you the best tech accessories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Chen",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
                  delay: 200
                },
                {
                  name: "Sarah Johnson",
                  role: "Head of Product",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
                  delay: 300
                },
                {
                  name: "Michael Lee",
                  role: "Tech Specialist",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
                  delay: 400
                },
                {
                  name: "Emma Wilson",
                  role: "Customer Support Lead",
                  image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400",
                  delay: 500
                }
              ].map((member, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-lg overflow-hidden shadow-md animate-fade-in [animation-delay:${member.delay}ms]`}
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="container mx-auto px-4 text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Tech Experience?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Explore our wide range of premium tech accessories and elevate your digital lifestyle.
            </p>
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/shop" className="flex items-center">
                Shop Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
