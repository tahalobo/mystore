
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "كم من الوقت تستغرق عملية الشحن؟",
    answer: "يستغرق الشحن القياسي عادةً 3-5 أيام عمل داخل البلاد. تتوفر خيارات الشحن السريع عند الدفع للتوصيل الأسرع."
  },
  {
    question: "ما هي سياسة الإرجاع الخاصة بكم؟",
    answer: "نقدم سياسة إرجاع لمدة 30 يومًا لمعظم العناصر. يجب أن تكون المنتجات في حالتها الأصلية مع جميع العبوات. قد تنطبق بعض الاستثناءات على فئات منتجات معينة."
  },
  {
    question: "هل تشحنون دوليًا؟",
    answer: "نعم، نشحن إلى معظم البلدان في جميع أنحاء العالم. تختلف أوقات الشحن الدولي حسب الموقع، وتتراوح عادةً بين 7-14 يوم عمل. قد تنطبق رسوم جمركية إضافية."
  },
  {
    question: "كيف يمكنني تتبع طلبي؟",
    answer: "بمجرد شحن طلبك، ستتلقى رقم تتبع عبر البريد الإلكتروني. يمكنك أيضًا تتبع طلبك عن طريق تسجيل الدخول إلى حسابك وعرض سجل طلباتك."
  },
  {
    question: "هل منتجاتكم مشمولة بالضمان؟",
    answer: "تأتي معظم منتجاتنا مع ضمان المصنّع. تختلف فترة الضمان حسب المنتج والعلامة التجارية. تتوفر خيارات الضمان الممتد لبعض العناصر عند الدفع."
  },
  {
    question: "هل تقدمون مطابقة الأسعار؟",
    answer: "نعم، نقدم مطابقة الأسعار للمنتجات المتطابقة التي تبيعها متاجر التجزئة الرئيسية. اتصل بفريق خدمة العملاء لدينا مع معلومات سعر المنافس لطلب مطابقة السعر."
  }
];

const FAQSection: React.FC = () => {
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
          <h2 className="text-3xl font-bold mb-2">الأسئلة المتكررة</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اعثر على إجابات للأسئلة الأكثر شيوعًا حول منتجاتنا وخدماتنا
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full divide-y">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border-none py-2">
                  <AccordionTrigger className="text-right text-lg font-medium hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-right">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600">
            لم تجد ما تبحث عنه؟{" "}
            <a href="/contact" className="text-primary font-medium hover:underline">
              تواصل مع فريق الدعم لدينا
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
