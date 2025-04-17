
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

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ahmed Khalid",
    role: "Tech Enthusiast",
    image: "/placeholder.svg",
    comment: "The wireless earbuds exceeded my expectations. Great sound quality and battery life is impressive. Definitely worth every dinar spent!",
    rating: 5,
    product: "Wireless Bluetooth Earbuds",
    date: "March 15, 2025"
  },
  {
    id: 2,
    name: "Fatima Al-Mahmoud",
    role: "Student",
    image: "/placeholder.svg",
    comment: "This phone case is both stylish and durable. Has protected my phone from several drops already! The design is exactly as shown in pictures.",
    rating: 4,
    product: "Premium Silicone Phone Case",
    date: "February 28, 2025"
  },
  {
    id: 3,
    name: "Mohammed Ali",
    role: "Photographer",
    image: "/placeholder.svg",
    comment: "The fast charger is a game-changer. Charges my devices in half the time of my old charger. Perfect for my photography gear when I'm out on shoots.",
    rating: 5,
    product: "65W GaN Fast Charger",
    date: "April 2, 2025"
  },
  {
    id: 4,
    name: "Zainab Hassan",
    role: "Business Owner",
    image: "/placeholder.svg",
    comment: "These noise-cancelling headphones help me focus during my workday. The sound quality is excellent and the comfort level is perfect for long sessions.",
    rating: 5,
    product: "Premium Noise-Cancelling Headphones",
    date: "March 20, 2025"
  }
];

const TestimonialsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our products.
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
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                  
                  <p className="text-gray-700 mb-4">{testimonial.comment}</p>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium mr-2">Rating:</span>
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Product:</span> {testimonial.product}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
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
