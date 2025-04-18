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
  name: "أحمد خالد",
  role: "مهتم بالتكنولوجيا",
  image: "/placeholder.svg",
  comment: "سماعات الأذن اللاسلكية تجاوزت توقعاتي. جودة الصوت رائعة وعمر البطارية مثير للإعجاب. تستحق بالتأكيد كل دينار أنفقته!",
  rating: 5,
  product: "سماعات أذن بلوتوث لاسلكية",
  date: "15 مارس 2025"
}, {
  id: 2,
  name: "فاطمة المحمود",
  role: "طالبة",
  image: "/placeholder.svg",
  comment: "غطاء الهاتف هذا أنيق ومتين في نفس الوقت. لقد حمى هاتفي من عدة سقطات بالفعل! التصميم مطابق تمامًا لما هو موضح في الصور.",
  rating: 4,
  product: "غطاء هاتف سيليكون متميز",
  date: "28 فبراير 2025"
}, {
  id: 3,
  name: "محمد علي",
  role: "مصور فوتوغرافي",
  image: "/placeholder.svg",
  comment: "الشاحن السريع هو تغيير جذري. يشحن أجهزتي في نصف الوقت مقارنة بالشاحن القديم. مثالي لمعدات التصوير الخاصة بي عندما أكون في جولات التصوير.",
  rating: 5,
  product: "شاحن سريع 65 واط",
  date: "2 أبريل 2025"
}, {
  id: 4,
  name: "زينب حسن",
  role: "صاحبة أعمال",
  image: "/placeholder.svg",
  comment: "سماعات إلغاء الضوضاء هذه تساعدني على التركيز خلال يوم عملي. جودة الصوت ممتازة ومستوى الراحة مثالي للجلسات الطويلة.",
  rating: 5,
  product: "سماعات رأس متميزة بخاصية إلغاء الضوضاء",
  date: "20 مارس 2025"
}];
const TestimonialsSection: React.FC = () => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => <Star key={index} className={`w-4 h-4 ${index < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />);
  };
  return;
};
export default TestimonialsSection;