
import React from "react";

const brands = [
  { name: "Sony", logo: "https://images.unsplash.com/photo-1511268011861-691ed210aae8?q=80&w=200&h=100&fit=crop" },
  { name: "Apple", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=200&h=100&fit=crop" },
  { name: "Samsung", logo: "https://images.unsplash.com/photo-1587817229766-65fa3f8fda08?q=80&w=200&h=100&fit=crop" },
  { name: "Bose", logo: "https://images.unsplash.com/photo-1558741181-501bbbb2dda3?q=80&w=200&h=100&fit=crop" },
  { name: "JBL", logo: "https://images.unsplash.com/photo-1548921441-89c8bd86ffb7?q=80&w=200&h=100&fit=crop" },
  { name: "Anker", logo: "https://images.unsplash.com/photo-1601999009162-2459b78386c9?q=80&w=200&h=100&fit=crop" },
];

const BrandsSection: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2">Top Brands</h2>
          <p className="text-gray-600">We partner with the best in the industry</p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div 
              key={brand.name} 
              className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 animate-fade-in [animation-delay:100ms]"
            >
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`} 
                className="max-w-full max-h-full object-contain" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;
