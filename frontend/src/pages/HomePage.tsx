import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

const HomePage: React.FC = () => {
  const categories = [
    {
      name: "Women's Collection",
      path: "/category/women",
      image: "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Elegant jewelry for every woman"
    },
    {
      name: "Men's Collection",
      path: "/category/men",
      image: "https://images.pexels.com/photos/1454169/pexels-photo-1454169.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Sophisticated accessories for men"
    },
    {
      name: "Kids' Collection",
      path: "/category/kids",
      image: "https://images.pexels.com/photos/1454172/pexels-photo-1454172.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Adorable jewelry for little ones"
    },
    {
      name: "Bridal Collection",
      path: "/category/bridal",
      image: "https://images.pexels.com/photos/1454173/pexels-photo-1454173.jpeg?auto=compress&cs=tinysrgb&w=500",
      description: "Perfect pieces for your special day"
    }
  ];

  const features = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Quality",
      description: "High-quality imitation jewelry that looks and feels luxurious"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Shopping",
      description: "Your data and payments are protected with advanced encryption"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to your doorstep"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gold-50 via-white to-silver-50">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 via-transparent to-silver-400/5"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-secondary-800">
            Dream <span className="text-gold-500">Collections</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-secondary-700">
            Discover stunning imitation jewelry that combines elegance with affordability. 
            Perfect for every occasion.
          </p>
          <button className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 flex items-center mx-auto space-x-2 shadow-lg">
            <span>Shop Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-800 mb-4">Our Collections</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Explore our carefully curated collections designed for every style and occasion.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-silver-400 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                      <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-2 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-silver-50 to-gold-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-800 mb-4">Why Choose Us</h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              We're committed to providing you with the best jewelry shopping experience.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-silver-400 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-silver-200">
                <div className="text-gold-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
                <div className="w-8 h-0.5 bg-gold-400 mx-auto mt-4 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-800 to-secondary-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-secondary-200 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers and new collection updates.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-silver-400 mx-auto mb-8 rounded-full"></div>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 border border-silver-300"
            />
            <button className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;