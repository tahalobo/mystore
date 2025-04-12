
import React from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  comment: string;
  rating: number;
  product: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Tech Enthusiast",
    image: "/placeholder.svg",
    comment: "The wireless earbuds exceeded my expectations. Great sound quality and battery life is impressive.",
    rating: 5,
    product: "Wireless Bluetooth Earbuds"
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Student",
    image: "/placeholder.svg",
    comment: "This phone case is both stylish and durable. Has protected my phone from several drops already!",
    rating: 4,
    product: "Premium Silicone Phone Case"
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Photographer",
    image: "/placeholder.svg",
    comment: "The fast charger is a game-changer. Charges my devices in half the time of my old charger.",
    rating: 5,
    product: "65W GaN Fast Charger"
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
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Real experiences from our satisfied customers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`bg-white rounded-lg shadow-md p-6 relative animate-fade-up [animation-delay:${index * 200}ms]`}
            >
              <Quote className="absolute top-4 right-4 w-10 h-10 text-gray-100" />
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {renderStars(testimonial.rating)}
              </div>
              <p className="text-gray-600 mb-3">"{testimonial.comment}"</p>
              <p className="text-sm text-gray-500 mt-2">
                Purchased: <span className="font-medium">{testimonial.product}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
