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
  return;
};
export default TestimonialsSection;