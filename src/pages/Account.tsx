
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Heart, 
  LogOut, 
  Eye, 
  Package, 
  TruckIcon, 
  Check, 
  MapPin 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Account: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock data for demo purposes
  const userProfile = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=120",
    address: {
      street: "123 Tech Street",
      city: "Digital City",
      state: "California",
      zip: "90210",
      country: "United States"
    }
  };
  
  const orders = [
    {
      id: "ORD-12345",
      date: "May 12, 2023",
      total: 178.99,
      status: "Delivered",
      items: [
        {
          id: "p1",
          name: "Wireless Charger",
          price: 49.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=100"
        },
        {
          id: "p3",
          name: "Premium Phone Case",
          price: 29.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=100"
        },
        {
          id: "p5",
          name: "Portable Bluetooth Speaker",
          price: 59.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=100"
        }
      ]
    },
    {
      id: "ORD-67890",
      date: "April 28, 2023",
      total: 129.98,
      status: "Processing",
      items: [
        {
          id: "p2",
          name: "Wireless Bluetooth Earbuds",
          price: 79.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=100"
        },
        {
          id: "p8",
          name: "Fast Charging Cable",
          price: 24.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1583394838336-acd977428655?q=80&w=100"
        }
      ]
    }
  ];
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="md:w-1/4 space-y-4">
              <Card className="overflow-hidden">
                <CardHeader className="bg-primary/5 flex flex-row items-center space-y-0 gap-4">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{userProfile.name}</CardTitle>
                    <CardDescription>{userProfile.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <TabsList className="w-full flex flex-col rounded-none h-auto bg-transparent">
                    <TabsTrigger 
                      value="profile" 
                      onClick={() => setActiveTab("profile")}
                      className={`justify-start px-4 py-3 ${activeTab === "profile" ? "bg-primary/10" : ""}`}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger 
                      value="orders" 
                      onClick={() => setActiveTab("orders")}
                      className={`justify-start px-4 py-3 ${activeTab === "orders" ? "bg-primary/10" : ""}`}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger 
                      value="wishlist" 
                      onClick={() => setActiveTab("wishlist")}
                      className={`justify-start px-4 py-3 ${activeTab === "wishlist" ? "bg-primary/10" : ""}`}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </TabsTrigger>
                    <TabsTrigger 
                      value="settings" 
                      onClick={() => setActiveTab("settings")}
                      className={`justify-start px-4 py-3 ${activeTab === "settings" ? "bg-primary/10" : ""}`}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
                <CardFooter className="border-t">
                  <Button variant="ghost" className="w-full justify-start text-red-500" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>Contact our customer support</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    If you have any questions or need assistance, our support team is available 24/7.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content */}
            <div className="md:w-3/4">
              <Tabs value={activeTab} className="w-full">
                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <Input id="name" defaultValue={userProfile.name} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                            <Input id="email" type="email" defaultValue={userProfile.email} />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                            <Input id="phone" defaultValue={userProfile.phone} />
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                              <Input id="street" defaultValue={userProfile.address.street} />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="city" className="text-sm font-medium">City</label>
                              <Input id="city" defaultValue={userProfile.address.city} />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="state" className="text-sm font-medium">State</label>
                              <Input id="state" defaultValue={userProfile.address.state} />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                              <Input id="zip" defaultValue={userProfile.address.zip} />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="country" className="text-sm font-medium">Country</label>
                              <Input id="country" defaultValue={userProfile.address.country} />
                            </div>
                          </div>
                        </div>
                      
                        <Button type="submit" className="mt-4">Save Changes</Button>
                      </form>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>Update your password to enhance security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handlePasswordChange} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button type="submit">Update Password</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View and track your recent orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-md p-4">
                            <div className="flex flex-wrap items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold">Order #{order.id}</h3>
                                <p className="text-sm text-gray-500">{order.date}</p>
                              </div>
                              <div className="flex items-center">
                                <Badge className={
                                  order.status === "Delivered" 
                                    ? "bg-green-500" 
                                    : order.status === "Processing" 
                                    ? "bg-blue-500" 
                                    : "bg-yellow-500"
                                }>
                                  {order.status}
                                </Badge>
                                <Button variant="ghost" size="sm" className="ml-2">
                                  <Eye className="mr-1 h-4 w-4" />
                                  Details
                                </Button>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="h-16 w-16 object-cover rounded-md"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-500">
                                      Qty: {item.quantity} × ${item.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <div className="font-semibold">
                                    ${(item.quantity * item.price).toFixed(2)}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                              <div className="flex items-center text-sm">
                                {order.status === "Delivered" ? (
                                  <Check className="mr-1 h-4 w-4 text-green-500" />
                                ) : (
                                  <TruckIcon className="mr-1 h-4 w-4 text-blue-500" />
                                )}
                                <span>
                                  {order.status === "Delivered" 
                                    ? "Delivered on May 15, 2023" 
                                    : "Estimated delivery: May 20, 2023"}
                                </span>
                              </div>
                              <div className="font-bold">
                                Total: ${order.total.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Wishlist Tab */}
                <TabsContent value="wishlist" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                      <CardDescription>Products you've saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="border rounded-md overflow-hidden group hover:shadow-md transition-all">
                          <div className="relative aspect-square">
                            <img 
                              src="https://images.unsplash.com/photo-1606471191009-63994c53433b?q=80&w=300" 
                              alt="Wireless Earbuds" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">Wireless Bluetooth Earbuds</h3>
                            <p className="text-sm text-gray-500">Premium Sound Quality</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-semibold">$79.99</span>
                              <Button size="sm">Add to Cart</Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md overflow-hidden group hover:shadow-md transition-all">
                          <div className="relative aspect-square">
                            <img 
                              src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300" 
                              alt="Headphones" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">Noise Cancelling Headphones</h3>
                            <p className="text-sm text-gray-500">Immersive Audio Experience</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-semibold">$149.99</span>
                              <Button size="sm">Add to Cart</Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md overflow-hidden group hover:shadow-md transition-all">
                          <div className="relative aspect-square">
                            <img 
                              src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=300" 
                              alt="Portable Speaker" 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                            >
                              <Heart className="h-4 w-4 fill-current" />
                            </Button>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">Portable Bluetooth Speaker</h3>
                            <p className="text-sm text-gray-500">Waterproof & Durable</p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="font-semibold">$59.99</span>
                              <Button size="sm">Add to Cart</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center mt-6">
                        <Link to="/shop" className="text-primary hover:underline">
                          Browse more products
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Order Updates</h3>
                            <p className="text-sm text-gray-500">Receive notifications about your orders</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="order-email" className="rounded" defaultChecked />
                            <label htmlFor="order-email" className="text-sm">Email</label>
                            
                            <input type="checkbox" id="order-sms" className="rounded ml-4" defaultChecked />
                            <label htmlFor="order-sms" className="text-sm">SMS</label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Promotions & Deals</h3>
                            <p className="text-sm text-gray-500">Get notified about special offers</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="promo-email" className="rounded" defaultChecked />
                            <label htmlFor="promo-email" className="text-sm">Email</label>
                            
                            <input type="checkbox" id="promo-sms" className="rounded ml-4" />
                            <label htmlFor="promo-sms" className="text-sm">SMS</label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Product Recommendations</h3>
                            <p className="text-sm text-gray-500">Personalized product suggestions</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="rec-email" className="rounded" />
                            <label htmlFor="rec-email" className="text-sm">Email</label>
                            
                            <input type="checkbox" id="rec-sms" className="rounded ml-4" />
                            <label htmlFor="rec-sms" className="text-sm">SMS</label>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="mt-6">Save Preferences</Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Security</CardTitle>
                      <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Two-Factor Authentication</h3>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                          </div>
                          <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Login History</h3>
                            <p className="text-sm text-gray-500">View recent account activity</p>
                          </div>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-red-500">Delete Account</h3>
                            <p className="text-sm text-gray-500">Permanently delete your account</p>
                          </div>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
