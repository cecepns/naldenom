import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Truck, Shield, TrendingUp, Users, Award } from 'lucide-react';

const Hero = () => {
  return (
    <>
      {/* Main Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Your Trusted Partner in
                  <span className="text-blue-400 block"> Export Import</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light">
                  NALDENOM EXPORT IMPORT - Connecting Indonesia to the World
                </p>
                <p className="text-lg text-gray-400 max-w-xl">
                  A trusted export-import company serving various business needs 
                  with extensive international experience and network since 2025.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg"
                >
                  <span>View Products</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  to="/contact"
                  className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">2025</div>
                  <div className="text-sm text-gray-400">Established</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">7+</div>
                  <div className="text-sm text-gray-400">Business Areas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">100%</div>
                  <div className="text-sm text-gray-400">Trusted</div>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Export Import Business"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-bold text-lg">Global Trade</div>
                      <div className="text-sm text-gray-600">Worldwide Network</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-4 -right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg animate-bounce">
                <Globe className="h-6 w-6" />
              </div>
              <div className="absolute -top-4 left-1/2 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                <Award className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NALDENOM EXPORT IMPORT?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide reliable export-import services with international standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-blue-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Global Network</h3>
              <p className="text-gray-600 leading-relaxed">
                Extensive international network to meet your export-import needs worldwide
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-green-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Fast and secure delivery worldwide with real-time tracking and full insurance
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-purple-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Trusted Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Guaranteed quality with international standards and official certifications from various countries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Business Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Various business areas we serve with high professionalism
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Automotive Parts",
                description: "Wholesale trade of automotive spare parts and accessories",
                image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=400",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Wholesale Trade",
                description: "Wholesale trade on commission basis or contract",
                image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=400",
                color: "from-green-500 to-green-600"
              },
              {
                title: "Forestry Products",
                description: "Wholesale trade of forestry and hunting products",
                image: "https://images.pexels.com/photos/1268076/pexels-photo-1268076.jpeg?auto=compress&cs=tinysrgb&w=400",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                title: "Food & Beverages",
                description: "Wholesale trade of food and beverage ingredients",
                image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=400",
                color: "from-orange-500 to-orange-600"
              },
              {
                title: "Clothing & Accessories",
                description: "Retail trade of clothing and accessories",
                image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Various Products",
                description: "Wholesale trade of various types of goods",
                image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=400",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((area, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-t ${area.color} opacity-80`} />
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <h3 className="text-xl font-bold mb-2">{area.title}</h3>
                  <p className="text-sm opacity-90">{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Expand Your Business Globally?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join NALDENOM EXPORT IMPORT and realize your international business dreams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </Link>
              <Link 
                to="/products"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View Our Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;