import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://api-inventory.isavralabel.com/api/naldenom/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content) => {
    if (!content) return '';
    // Convert newlines to <br> tags and preserve whitespace
    return content
      .split('\n')
      .map((line, index) => {
        if (line.trim() === '') {
          return '<br>';
        }
        return `<p class="mb-2">${line}</p>`;
      })
      .join('');
  };

  if (loading) {
    return (
      <section id="articles" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Articles Available</h3>
            <p className="text-gray-500">Articles will be displayed here once they are published.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {article.image_path ? (
                    <img
                      src={`https://api-inventory.isavralabel.com/api/naldenom/uploads-naldenom/${article.image_path}`}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{article.title}</h3>
                  
                  <div 
                    className="text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ 
                      __html: formatContent(article.excerpt || article.content.substring(0, 150) + '...') 
                    }}
                  />
                  
                  <button 
                    onClick={() => navigate(`/articles/${article.id}`)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span className="text-sm">Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;