
import React from "react";
import { Star, Quote, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Here's what our valued customers in Iraq have to say about their shopping experience with us
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="relative mb-4">
                  <Quote className="absolute top-0 left-0 h-8 w-8 text-primary/10 -translate-x-2 -translate-y-1" />
                  <p className="text-gray-700 pl-4 italic">{testimonial.comment}</p>
                </div>
                
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-sm font-medium text-primary">
                    {testimonial.product}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {testimonial.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-600 mb-4">Want to share your experience with our products?</p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit Your Review
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
