import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';
import Footer from '../components/Footer';

const ProductsPage = () => {
  return (
    <div>
      <Header />
      <div className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Products</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our wide range of high-quality products for export and import business
            </p>
          </div>
        </div>
        <Products />
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;