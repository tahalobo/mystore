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
  // Animations
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
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-blue-50 py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6
            }}>
                <span className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-6">
                  Our Story
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                  Enhancing Your Digital Lifestyle
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  We're dedicated to providing high-quality tech accessories that make your digital experience seamless, stylish, and enjoyable.
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
              
              <motion.div className="relative" initial={{
              opacity: 0,
              scale: 0.9
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
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
          
          {/* Decorative elements */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        </section>
        
        {/* Company Statistics */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{
              number: "10+",
              label: "Years Experience",
              icon: <Landmark className="h-6 w-6" />
            }, {
              number: "500K+",
              label: "Happy Customers",
              icon: <Smile className="h-6 w-6" />
            }, {
              number: "1000+",
              label: "Products",
              icon: <Package className="h-6 w-6" />
            }, {
              number: "30+",
              label: "Countries Served",
              icon: <Globe className="h-6 w-6" />
            }].map((stat, index) => <motion.div key={index} className="text-center" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                  <div className="bg-primary/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center text-primary mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>)}
            </div>
          </div>
        </section>
        
        {/* Our Story Tabs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
              <p className="text-gray-600">
                From humble beginnings to becoming a trusted tech accessories brand, discover the TechHaven story.
              </p>
            </div>
            
            <Tabs defaultValue="story" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="story">Our Story</TabsTrigger>
                <TabsTrigger value="mission">Mission</TabsTrigger>
                <TabsTrigger value="vision">As word spread, he brought together a small team of like-minded creators who shared his vision for better tech accessories. Together, they expanded the product line to include headphones, chargers, and other essential tech accessories.</TabsTrigger>
              </TabsList>
              
              
              
              <TabsContent value="mission">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Rocket className="h-6 w-6 text-primary mr-2" />
                    Our Mission
                  </h3>
                  <p className="text-gray-700 mb-6">
                    At TechHaven, our mission is to enhance people's digital lives through thoughtfully designed, high-quality tech accessories that blend functionality, durability, and style. We're committed to:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[{
                    title: "Creating Lasting Quality",
                    description: "We design products that stand the test of time, reducing waste and providing better value."
                  }, {
                    title: "Innovation and Improvement",
                    description: "We continuously evolve our products based on customer feedback and emerging technologies."
                  }, {
                    title: "Customer Satisfaction",
                    description: "We prioritize exceptional service and support throughout the customer journey."
                  }, {
                    title: "Responsible Practices",
                    description: "We strive to minimize our environmental impact through sustainable materials and processes."
                  }].map((item, index) => <div key={index} className="flex">
                        <Check className="h-5 w-5 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="vision">
                <div className="bg-primary/5 p-8 rounded-xl border border-primary/10">
                  <h3 className="text-2xl font-bold mb-4 text-center">Our Vision</h3>
                  <div className="text-center mb-8 max-w-2xl mx-auto">
                    <p className="text-lg text-gray-700 italic">
                      "To be the world's most trusted brand for tech accessories, known for products that enhance and protect the devices people rely on every day."
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {[{
                    icon: <Globe className="h-8 w-8 text-primary" />,
                    title: "Global Reach",
                    description: "Bringing our products to tech enthusiasts around the world, regardless of location."
                  }, {
                    icon: <Sparkles className="h-8 w-8 text-primary" />,
                    title: "Industry Leadership",
                    description: "Setting the standard for innovation and quality in tech accessories."
                  }, {
                    icon: <HeartHandshake className="h-8 w-8 text-primary" />,
                    title: "Community Impact",
                    description: "Creating positive change through ethical business practices and giving back."
                  }].map((item, index) => <Card key={index}>
                        <CardHeader>
                          <div className="mb-2">{item.icon}</div>
                          <CardTitle>{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">{item.description}</p>
                        </CardContent>
                      </Card>)}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Values Section */}
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
        
        {/* Team Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block bg-primary/10 text-primary font-medium px-4 py-1.5 rounded-full text-sm mb-4">
                The Faces Behind TechHaven
              </span>
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600">
                The talented individuals working behind the scenes to bring you exceptional tech accessories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
              name: "Alex Chen",
              role: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400",
              bio: "Tech enthusiast who started TechHaven from his garage in 2015. Passionate about merging functionality with design.",
              delay: 0.1
            }, {
              name: "Sarah Johnson",
              role: "Head of Product Design",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
              bio: "Former industrial designer with 10+ years of experience creating products that balance beauty and function.",
              delay: 0.2
            }, {
              name: "Michael Lee",
              role: "Chief Technology Officer",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400",
              bio: "Tech innovator who oversees product development and ensures all accessories meet our high performance standards.",
              delay: 0.3
            }, {
              name: "Emma Wilson",
              role: "Customer Experience Director",
              image: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=400",
              bio: "Dedicated to creating the best possible experience for our customers, from browsing to unboxing.",
              delay: 0.4
            }].map((member, index) => <motion.div key={index} className="bg-white rounded-xl overflow-hidden shadow-md group" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: member.delay
            }}>
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
        
        {/* Partners and Certification */}
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
              }).map((_, index) => <motion.div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all p-4" initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }}>
                    <div className="bg-gray-100 h-20 w-full rounded-md flex items-center justify-center">
                      <span className="text-gray-400 font-medium">Partner {index + 1}</span>
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
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
    </div>;
};
export default About;