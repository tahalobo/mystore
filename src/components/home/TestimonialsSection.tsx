
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "محمد علي",
    role: "مهندس برمجيات",
    content: "منتجات عالية الجودة وأسعار منافسة. التوصيل كان سريعًا والخدمة ممتازة. سأعود للتسوق مرة أخرى بكل تأكيد.",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5
  },
  {
    id: 2,
    name: "فاطمة محمد",
    role: "مصممة جرافيك",
    content: "أنا زبون دائم لهذا المتجر. دائمًا ما أجد ما أحتاجه من منتجات تقنية بأفضل الأسعار. فريق الدعم متعاون للغاية.",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5
  },
  {
    id: 3,
    name: "أحمد خالد",
    role: "طالب جامعي",
    content: "اشتريت سماعات وكابل شحن، وكلاهما ذو جودة ممتازة. التغليف آمن والتوصيل كان في الموعد المحدد تمامًا.",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 4
  },
  {
    id: 4,
    name: "سارة أحمد",
    role: "محاسبة",
    content: "تجربتي مع هذا المتجر كانت رائعة. المنتجات أصلية وموثوقة، والأسعار تنافسية جدًا. أنصح الجميع بالتسوق هنا.",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">آراء العملاء</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">نفخر بثقة عملائنا ورضاهم عن خدماتنا ومنتجاتنا</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {Array(testimonial.rating).fill(null).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  {Array(5 - testimonial.rating).fill(null).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-sm">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
