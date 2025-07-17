import React from 'react';
import Header from '../components/Header';
import Articles from '../components/Articles';
import Footer from '../components/Footer';

const ArticlesPage = () => {
  return (
    <div>
      <Header />
      <div className="pt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest Articles</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news and insights from the world of international trade
            </p>
          </div>
        </div>
        <Articles />
      </div>
      <Footer />
    </div>
  );
};

export default ArticlesPage;