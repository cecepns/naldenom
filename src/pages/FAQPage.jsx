import React from 'react';
import Header from '../components/Header';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const FAQPage = () => {
  return (
    <div>
      <Header />
      <div className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our export import services
            </p>
          </div>
        </div>
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default FAQPage;