
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Package, 
  CreditCard, 
  Heart, 
  MapPin, 
  Settings,
  LogOut,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Account: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    toast.success("Successfully logged in!");
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast.info("Successfully logged out!");
  };
  
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-primary p-6 text-white text-center">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p className="text-white/80 mt-1">Access your TechHaven account</p>
              </div>
              
              <form onSubmit={handleLogin} className="p-6 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a href="#" className="text-primary hover:underline">
                      Sign up
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex overflow-x-auto pb-2 mb-4">
              <TabsList className="bg-gray-100 p-1">
                <TabsTrigger value="profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Orders</span>
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Addresses</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Payment Methods</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Wishlist</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="bg-primary text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center mr-4">
                      JD
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">John Doe</h2>
                      <p className="text-gray-600">john@example.com</p>
                    </div>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Full Name</label>
                        <p>John Doe</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email Address</label>
                        <p>john@example.com</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone Number</label>
                        <p>+1 (555) 123-4567</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                        <p>January 15, 1990</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Account Information</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Member Since</label>
                        <p>March 12, 2022</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Account Type</label>
                        <p>Standard</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">Newsletter</label>
                        <p>Subscribed</p>
                      </div>
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      className="mt-4"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Orders Tab */}
            <TabsContent value="orders" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Your Orders</h2>
                  <p className="text-gray-600">Manage and track your orders</p>
                </div>
                
                <div className="divide-y">
                  {[
                    {
                      id: "ORD-8756",
                      date: "April 12, 2025",
                      items: 3,
                      total: 189.97,
                      status: "Delivered",
                      statusColor: "text-green-600",
                      statusIcon: CheckCircle
                    },
                    {
                      id: "ORD-8743",
                      date: "April 2, 2025",
                      items: 1,
                      total: 79.99,
                      status: "In Transit",
                      statusColor: "text-blue-600",
                      statusIcon: Truck
                    },
                    {
                      id: "ORD-8721",
                      date: "March 18, 2025",
                      items: 2,
                      total: 44.98,
                      status: "Processing",
                      statusColor: "text-amber-600",
                      statusIcon: Clock
                    },
                    {
                      id: "ORD-8712",
                      date: "March 5, 2025",
                      items: 4,
                      total: 249.96,
                      status: "Cancelled",
                      statusColor: "text-red-600",
                      statusIcon: AlertCircle
                    }
                  ].map((order, index) => (
                    <motion.div 
                      key={order.id} 
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      
                      <div className="mb-2 sm:mb-0 text-center">
                        <p className="text-sm text-gray-600">{order.items} items</p>
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center mb-2 sm:mb-0">
                        <order.statusIcon className={`h-4 w-4 ${order.statusColor} mr-1`} />
                        <span className={`text-sm ${order.statusColor}`}>{order.status}</span>
                      </div>
                      
                      <Button variant="outline" size="sm">View Details</Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Addresses Tab */}
            <TabsContent value="addresses" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Your Addresses</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2 bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      Default
                    </div>
                    <h3 className="font-semibold mb-1">Home</h3>
                    <p className="text-gray-600">John Doe</p>
                    <p className="text-gray-600">123 Main Street, Apt 4B</p>
                    <p className="text-gray-600">San Francisco, CA 94103</p>
                    <p className="text-gray-600">United States</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200">
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-1">Work</h3>
                    <p className="text-gray-600">John Doe</p>
                    <p className="text-gray-600">456 Tech Avenue, Floor 3</p>
                    <p className="text-gray-600">San Francisco, CA 94105</p>
                    <p className="text-gray-600">United States</p>
                    <p className="text-gray-600">+1 (555) 987-6543</p>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-200">
                        Delete
                      </Button>
                      <Button variant="outline" size="sm">
                        Set as Default
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Payment Methods Tab */}
            <TabsContent value="payment" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Payment Methods</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 relative bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                    <div className="absolute top-2 right-2 bg-white text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                      Default
                    </div>
                    <div className="mb-4">
                      <svg className="h-10 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="24" rx="4" fill="white"/>
                        <path d="M24.2976 15.5023H22.1976L23.4726 8.5H25.5726L24.2976 15.5023Z" fill="#00579F"/>
                        <path d="M31.5351 8.65384C31.106 8.49324 30.41 8.32227 29.5553 8.32227C27.6099 8.32227 26.2234 9.3244 26.2121 10.7752C26.1901 11.8347 27.2025 12.4177 27.9642 12.7683C28.7407 13.1248 28.9916 13.3556 28.9916 13.6773C28.9829 14.1746 28.3667 14.4034 27.7975 14.4034C26.9978 14.4034 26.57 14.2713 25.9216 13.976L25.6599 13.8422L25.3775 15.4996C25.8892 15.7118 26.8423 15.8962 27.8306 15.9075C29.9135 15.9075 31.2661 14.9223 31.2783 13.3822C31.2896 12.5378 30.8004 11.8739 29.6481 11.3324C28.9564 10.9767 28.5284 10.7351 28.5284 10.364C28.5376 10.0211 28.9109 9.67923 29.7199 9.67923C30.3883 9.66716 30.8825 9.83728 31.2661 10.0102L31.4514 10.1013L31.7351 8.5L31.5351 8.65384Z" fill="#00579F"/>
                        <path d="M33.7993 12.7561C33.9846 12.2649 34.6191 10.4519 34.6191 10.4519C34.6096 10.4699 34.7742 10.0112 34.8692 9.74469L34.9961 10.3747C34.9961 10.3747 35.3822 12.3321 35.4672 12.7561C35.1529 12.7561 34.2 12.7561 33.7993 12.7561ZM36.5775 8.5H35.0172C34.6191 8.5 34.3259 8.61108 34.1526 9.04775L31.4514 15.4996H33.5343C33.5343 15.4996 33.8814 14.499 33.949 14.2967C34.1707 14.2967 35.8422 14.2967 36.1203 14.2967C36.1733 14.5583 36.3586 15.4996 36.3586 15.4996H38.2001L36.5775 8.5Z" fill="#00579F"/>
                        <path d="M18.8049 8.5L16.8792 13.1883L16.6382 12.1006C16.2079 10.7759 14.9428 9.33461 13.5479 8.61207L15.3177 15.4896H17.4214L20.9088 8.5H18.8049Z" fill="#00579F"/>
                        <path d="M14.7362 8.5H11.5107L11.4893 8.65335C13.8652 9.31075 15.3985 10.6355 16.0054 12.2632L15.3985 9.04776C15.2762 8.61108 15.043 8.51049 14.7362 8.5Z" fill="#FAA61A"/>
                      </svg>
                    </div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <div className="mt-2 text-sm">
                      <p>John Doe</p>
                      <p>Expires 04/2026</p>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-300 border-red-500/30 hover:bg-red-500/10">
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                    <div className="mb-4">
                      <svg className="h-10 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="24" rx="4" fill="white"/>
                        <path d="M22.5523 15.4782C22.5412 15.9048 22.9195 16.1234 23.2033 16.2556C23.5034 16.3959 23.6136 16.4867 23.6106 16.6241C23.6046 16.8326 23.3522 16.9256 23.1184 16.9307C22.6944 16.9398 22.439 16.8145 22.2395 16.7176L22.0627 17.2892C22.262 17.3859 22.6283 17.4708 23.0096 17.4767C23.8439 17.4767 24.3694 17.0865 24.3754 16.4685C24.3816 15.6928 23.3039 15.6203 23.3155 15.2778C23.3216 15.1646 23.4287 15.0444 23.6654 15.0141C23.775 15.0011 24.078 14.9952 24.4263 15.1343L24.5971 14.5809C24.3952 14.5084 24.1343 14.4385 23.8074 14.4385C23.0236 14.4385 22.5639 14.8365 22.5521 15.4782H22.5523ZM27.2188 14.5084C27.0508 14.5084 26.9081 14.6078 26.843 14.7586L25.53 17.4223H26.3008L26.4775 16.942H27.5911L27.6892 17.4223H28.4066L27.7783 14.5084H27.2188ZM26.6701 16.3838L27.1017 15.3023L27.3268 16.3838H26.6701ZM17.8711 14.5084L17.1774 16.6183L16.9372 15.2445C16.8693 14.8093 16.5348 14.5084 16.1564 14.5084H14.2798L14.254 14.6344C14.6633 14.7348 15.1466 14.9068 15.4529 15.0928C15.6435 15.2115 15.685 15.3053 15.7677 15.5927L16.6017 17.4223H17.3751L18.6455 14.5084H17.8711ZM20.0418 14.5084L19.4545 17.4223H20.1933L20.7807 14.5084H20.0418ZM25.0674 14.5084L24.1383 17.4223H24.8484L25.7778 14.5084H25.0674Z" fill="#172B85"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.0736 15.4334L18.6308 17.4223H19.3815L19.824 15.4334H19.0736Z" fill="#172B85"/>
                        <path d="M29.5889 14.5084L28.5233 16.3809L28.1811 14.7616C28.1206 14.6085 27.9749 14.5084 27.8062 14.5084H26.8022L26.7764 14.6344C27.1161 14.7155 27.4973 14.8708 27.7601 15.0415C27.9046 15.1379 27.9717 15.2539 28.042 15.4334L28.7357 17.4223H29.5187L31.0877 14.5084H29.5889Z" fill="#172B85"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.2977 11.3291H20.3834C20.7618 11.3291 21.0964 11.63 21.1643 12.0652L21.4044 13.439L21.5812 12.2881C21.5812 11.7406 21.1729 11.3291 20.6445 11.3291H15.1002L15.2977 11.3291Z" fill="#F9A51A"/>
                      </svg>
                    </div>
                    <p className="font-medium">•••• •••• •••• 5555</p>
                    <div className="mt-2 text-sm">
                      <p>John Doe</p>
                      <p>Expires 08/2027</p>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-300 border-red-500/30 hover:bg-red-500/10">
                        Delete
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                        Set as Default
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Your Wishlist</h2>
                    <p className="text-gray-600">Items you're interested in</p>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/wishlist">View Full Wishlist</Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    {
                      id: "p2",
                      name: "Wireless Bluetooth Earbuds",
                      price: 79.99,
                      image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=300"
                    },
                    {
                      id: "p7",
                      name: "Noise Cancelling Headphones",
                      price: 149.99,
                      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300"
                    },
                    {
                      id: "p5",
                      name: "Portable Bluetooth Speaker",
                      price: 59.99,
                      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=300"
                    }
                  ].map((item, index) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden">
                      <div className="aspect-square">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium line-clamp-1">{item.name}</h3>
                        <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="animate-fade-in">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive emails about your orders and account activity</p>
                        </div>
                        <input
                          type="checkbox"
                          checked
                          className="toggle toggle-primary"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-600">Receive emails about promotions and new products</p>
                        </div>
                        <input
                          type="checkbox"
                          checked
                          className="toggle toggle-primary"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Security</h3>
                    <div className="space-y-4">
                      <Button variant="outline">Change Password</Button>
                      <Button variant="outline">Enable Two-Factor Authentication</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Account Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Language</p>
                          <p className="text-sm text-gray-600">Select your preferred language</p>
                        </div>
                        <select className="border rounded-md px-3 py-1">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Currency</p>
                          <p className="text-sm text-gray-600">Select your preferred currency</p>
                        </div>
                        <select className="border rounded-md px-3 py-1">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button 
                      variant="destructive" 
                      className="w-full md:w-auto"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
