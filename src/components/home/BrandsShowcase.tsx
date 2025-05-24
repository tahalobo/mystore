
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const BrandsShowcase: React.FC = () => {
  const brands = [
    { name: "Brand 1", logo: "/placeholder.svg" },
    { name: "Brand 2", logo: "/placeholder.svg" },
    { name: "Brand 3", logo: "/placeholder.svg" },
    { name: "Brand 4", logo: "/placeholder.svg" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-24 h-24 mx-auto mb-4 object-contain"
                />
                <h3 className="font-semibold">{brand.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsShowcase;
