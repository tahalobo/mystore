import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, Users, Package, Truck, HeartHandshake, PlayCircle, ChevronRight, Sparkles, Shield, Globe, Check, Rocket, Landmark, Smile } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const About: React.FC = () => {
  const containerAnimation = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  const itemAnimation = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-blue-50 py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-6">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  Leading Tech in Iraq
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Since 2015, MyStore has been Iraq's trusted destination for premium tech products and accessories, serving customers with authentic products and exceptional service.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/shop">Explore Products</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/contact">Get in Touch</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div className="relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=1000" alt="Our Team" className="w-full h-auto" />
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <Award className="h-10 w-10 text-amber-500" />
                    <div>
                      <h3 className="font-semibold">Quality Assured</h3>
                      <p className="text-sm text-gray-600">Since 2015</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-10 w-10 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Customer Satisfaction</h3>
                      <p className="text-sm text-gray-600">Guaranteed</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  number: "8+",
                  label: "Years Experience",
                  icon: <Landmark className="h-6 w-6" />
                },
                {
                  number: "100K+",
                  label: "Happy Customers",
                  icon: <Smile className="h-6 w-6" />
                },
                {
                  number: "500+",
                  label: "Products",
                  icon: <Package className="h-6 w-6" />
                },
                {
                  number: "18+",
                  label: "Provinces Served",
                  icon: <Globe className="h-6 w-6" />
                }
              ].map((stat, index) => (
                <motion.div key={index} className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-primary mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">The MyStore Story</h2>
              <p className="text-gray-600">
                From humble beginnings to becoming Iraq's most trusted tech accessories brand.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/80 to-indigo-600/80 hidden md:block"></div>
              
              <div className="space-y-24 relative">
                {[
                  {
                    year: "2015",
                    title: "The Beginning",
                    description: "MyStore was founded in Baghdad with a simple mission: to provide authentic tech products to Iraqi consumers who were struggling to find reliable sources.",
                    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500",
                    position: "left"
                  },
                  {
                    year: "2017",
                    title: "Expansion Begins",
                    description: "After establishing trust in Baghdad, we expanded to three more cities in Iraq, bringing our authentic tech accessories to more customers across the country.",
                    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500",
                    position: "right"
                  },
                  {
                    year: "2020",
                    title: "Digital Transformation",
                    description: "We launched our online store during the pandemic, allowing customers from all over Iraq to access our products from the safety of their homes.",
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500",
                    position: "left"
                  },
                  {
                    year: "2023",
                    title: "National Reach",
                    description: "MyStore now serves customers in all 18 provinces of Iraq, with a diverse catalog of over 500 premium tech products and accessories.",
                    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500",
                    position: "right"
                  }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-primary z-10 shadow-md hidden md:block"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      {item.position === "left" ? (
                        <>
                          <motion.div 
                            initial={{ opacity: 0, x: -30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="md:text-right"
                          >
                            <span className="inline-block text-primary font-bold text-4xl mb-2">{item.year}</span>
                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            <div className="rounded-xl overflow-hidden shadow-lg transform md:translate-x-4">
                              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                            </div>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="md:order-1 order-2"
                          >
                            <div className="rounded-xl overflow-hidden shadow-lg transform md:-translate-x-4">
                              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
                            </div>
                          </motion.div>
                          
                          <motion.div 
                            initial={{ opacity: 0, x: 30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="md:order-2 order-1"
                          >
                            <span className="inline-block text-primary font-bold text-4xl mb-2">{item.year}</span>
                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-16 relative z-10"
              >
                <span className="inline-block px-6 py-2 rounded-full bg-primary text-white font-medium">Present Day</span>
                <h3 className="text-2xl font-bold mt-4 mb-2">Looking to the Future</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Today, MyStore continues to innovate and grow, committed to bringing the latest and best tech products to the Iraqi market while maintaining our core values of authenticity, quality, and exceptional customer service.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div variants={containerAnimation} initial="hidden" animate="visible" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-600">
                These principles guide our decisions, shape our culture, and define who we are as a company.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
                icon: <Users className="h-8 w-8 text-amber-500" />,
                title: "Customer Obsession",
                description: "We start with the customer and work backwards. We work vigorously to earn and keep customer trust."
              }, {
                icon: <Shield className="h-8 w-8 text-green-500" />,
                title: "Quality Excellence",
                description: "We don't compromise on quality. Every product we create meets rigorous standards for materials, design, and durability."
              }, {
                icon: <HeartHandshake className="h-8 w-8 text-blue-500" />,
                title: "Integrity",
                description: "We do what we say and say what we do. Honesty and transparency are fundamental to how we operate."
              }, {
                icon: <Rocket className="h-8 w-8 text-purple-500" />,
                title: "Innovation",
                description: "We embrace change and continuously seek ways to improve our products and processes."
              }, {
                icon: <Sparkles className="h-8 w-8 text-pink-500" />,
                title: "Passion",
                description: "We're genuinely excited about technology and creating products that make digital life better."
              }, {
                icon: <Globe className="h-8 w-8 text-teal-500" />,
                title: "Sustainability",
                description: "We aim to minimize our environmental impact and promote sustainable practices in everything we do."
              }].map((value, index) => <motion.div key={index} variants={itemAnimation} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-sm mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </motion.div>)}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-4">
                The Faces Behind MyStore
              </span>
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600">
                The dedicated individuals working to bring you the best tech products in Iraq.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Ahmed Al-Saadi",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
                  bio: "Tech enthusiast who founded MyStore with a vision to bring authentic tech products to Iraq.",
                  delay: 0.1
                },
                {
                  name: "Zainab Khalil",
                  role: "Head of Operations",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
                  bio: "Operations expert ensuring smooth delivery and customer satisfaction across Iraq.",
                  delay: 0.2
                },
                {
                  name: "Mohammed Hassan",
                  role: "Technical Director",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
                  bio: "Tech expert ensuring all products meet our quality standards.",
                  delay: 0.3
                },
                {
                  name: "Noor Abbas",
                  role: "Customer Experience Manager",
                  image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400",
                  bio: "Dedicated to providing the best shopping experience for our customers.",
                  delay: 0.4
                }
              ].map((member, index) => <motion.div key={index} className="bg-white rounded-xl overflow-hidden shadow-md group" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: member.delay }}>
                    <div className="relative overflow-hidden">
                      <img src={member.image} alt={member.name} className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="text-white text-sm">{member.bio}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </motion.div>)}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Partners & Certifications</h2>
                <p className="text-gray-600">
                  We work with leading companies and organizations to ensure the highest quality standards.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({
                  length: 8
                }).map((_, index) => <motion.div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all p-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                    <div className="bg-gray-100 h-20 w-full rounded-md flex items-center justify-center">
                      <span className="text-gray-400 font-medium">Partner {index + 1}</span>
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enhance Your Tech Experience?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Explore our wide range of premium tech accessories and elevate your digital lifestyle.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/shop" className="flex items-center">
                    Shop Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
