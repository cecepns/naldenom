import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Calendar, User } from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api-inventory.isavralabel.com/api/naldenom/articles/${id}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Article not found');
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
        return `<p class="mb-4">${line}</p>`;
      })
      .join('');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading article details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div>
        <Header />
        <div className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
              <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate('/articles')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Articles
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="pt-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/articles')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Articles</span>
            </button>
          </div>

          {/* Article Details */}
          <div className="max-w-4xl mx-auto mb-12">
            <article className="bg-white rounded-lg overflow-hidden">
              {/* Article Header */}
              <div className="p-8 border-b border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                  {article.author && (
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>
                
                {article.excerpt && (
                  <div 
                    className="text-xl text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatContent(article.excerpt) }}
                  />
                )}
              </div>

              {/* Article Image */}
              {article.image_path && (
                <div className="w-full h-96 bg-gray-200">
                  <img
                    src={`https://api-inventory.isavralabel.com/api/naldenom/uploads-naldenom/${article.image_path}`}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
                  />
                </div>

                {/* Article Metadata */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Published:</span>
                      <p className="text-gray-600">{formatDate(article.created_at)}</p>
                    </div>
                    {article.updated_at && article.updated_at !== article.created_at && (
                      <div>
                        <span className="font-medium text-gray-700">Last Updated:</span>
                        <p className="text-gray-600">{formatDate(article.updated_at)}</p>
                      </div>
                    )}
                    {article.author && (
                      <div>
                        <span className="font-medium text-gray-700">Author:</span>
                        <p className="text-gray-600">{article.author}</p>
                      </div>
                    )}
                    {article.category && (
                      <div>
                        <span className="font-medium text-gray-700">Category:</span>
                        <p className="text-gray-600">{article.category}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticleDetailPage; 