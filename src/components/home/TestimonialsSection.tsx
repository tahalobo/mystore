
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
    name: "أحمد خالد",
    role: "مهتم بالتكنولوجيا",
    image: "/placeholder.svg",
    comment: "سماعات الأذن اللاسلكية تجاوزت توقعاتي. جودة الصوت رائعة وعمر البطارية مثير للإعجاب. تستحق بالتأكيد كل دينار أنفقته!",
    rating: 5,
    product: "سماعات أذن بلوتوث لاسلكية",
    date: "15 مارس 2025"
  },
  {
    id: 2,
    name: "فاطمة المحمود",
    role: "طالبة",
    image: "/placeholder.svg",
    comment: "غطاء الهاتف هذا أنيق ومتين في نفس الوقت. لقد حمى هاتفي من عدة سقطات بالفعل! التصميم مطابق تمامًا لما هو موضح في الصور.",
    rating: 4,
    product: "غطاء هاتف سيليكون متميز",
    date: "28 فبراير 2025"
  },
  {
    id: 3,
    name: "محمد علي",
    role: "مصور فوتوغرافي",
    image: "/placeholder.svg",
    comment: "الشاحن السريع هو تغيير جذري. يشحن أجهزتي في نصف الوقت مقارنة بالشاحن القديم. مثالي لمعدات التصوير الخاصة بي عندما أكون في جولات التصوير.",
    rating: 5,
    product: "شاحن سريع 65 واط",
    date: "2 أبريل 2025"
  },
  {
    id: 4,
    name: "زينب حسن",
    role: "صاحبة أعمال",
    image: "/placeholder.svg",
    comment: "سماعات إلغاء الضوضاء هذه تساعدني على التركيز خلال يوم عملي. جودة الصوت ممتازة ومستوى الراحة مثالي للجلسات الطويلة.",
    rating: 5,
    product: "سماعات رأس متميزة بخاصية إلغاء الضوضاء",
    date: "20 مارس 2025"
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
          <h2 className="text-3xl font-bold mb-4">ماذا يقول عملاؤنا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            لا تأخذ كلامنا فقط. إليك ما يقوله عملاؤنا الراضون عن منتجاتنا.
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
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ml-3">
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
                      <span className="text-sm font-medium ml-2">التقييم:</span>
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">المنتج:</span> {testimonial.product}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <Calendar className="h-3.5 w-3.5 ml-1" />
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
