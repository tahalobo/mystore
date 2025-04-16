
import React from "react";
import { Star, Quote, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  comment: string;
  rating: number;
  product: string;
  date: string;
}

const testimonials: Testimonial[] = [{
  id: 1,
  name: "Ahmed Khalid",
  role: "Tech Enthusiast",
  image: "/placeholder.svg",
  comment: "The wireless earbuds exceeded my expectations. Great sound quality and battery life is impressive. Definitely worth every dinar spent!",
  rating: 5,
  product: "Wireless Bluetooth Earbuds",
  date: "March 15, 2025"
}, {
  id: 2,
  name: "Fatima Al-Mahmoud",
  role: "Student",
  image: "/placeholder.svg",
  comment: "This phone case is both stylish and durable. Has protected my phone from several drops already! The design is exactly as shown in pictures.",
  rating: 4,
  product: "Premium Silicone Phone Case",
  date: "February 28, 2025"
}, {
  id: 3,
  name: "Mohammed Ali",
  role: "Photographer",
  image: "/placeholder.svg",
  comment: "The fast charger is a game-changer. Charges my devices in half the time of my old charger. Perfect for my photography gear when I'm out on shoots.",
  rating: 5,
  product: "65W GaN Fast Charger",
  date: "April 2, 2025"
}, {
  id: 4,
  name: "Zainab Hassan",
  role: "Business Owner",
  image: "/placeholder.svg",
  comment: "These noise-cancelling headphones help me focus during my workday. The sound quality is excellent and the comfort level is perfect for long sessions.",
  rating: 5,
  product: "Premium Noise-Cancelling Headphones",
  date: "March 20, 2025"
}];

const TestimonialsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />);
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-4">
            Customer Testimonials
          </span>
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">
            Don't just take our word for it - hear from our satisfied customers across Iraq.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: testimonial.id * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="mb-4 flex items-center">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  <div className="relative mb-6 flex-grow">
                    <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                    <p className="text-gray-700 relative z-10 pl-2">
                      {testimonial.comment}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {testimonial.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
