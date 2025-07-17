import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Eye } from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api-inventory.isavralabel.com/api/naldenom/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
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
      <div>
        <Header />
        <div className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading product details...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Header />
        <div className="pt-8">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
              <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate('/products')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Products
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
              onClick={() => navigate('/products')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="p-8">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`https://api-inventory.isavralabel.com/api/naldenom/uploads-naldenom/${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="h-24 w-24 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Product Information */}
              <div className="p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-blue-600 font-medium">Product Code: {product.product_code}</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
                    <p className="text-gray-600">{product.category_name}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <div 
                      className="text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatContent(product.description) }}
                    />
                  </div>

                  {product.price && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Price</h3>
                      <p className="text-2xl text-blue-600 font-bold">
                        Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Specifications</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Product Code:</span>
                          <p className="text-gray-600">{product.product_code}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Category:</span>
                          <p className="text-gray-600">{product.category_name}</p>
                        </div>
                        {product.created_at && (
                          <div>
                            <span className="font-medium text-gray-700">Added:</span>
                            <p className="text-gray-600">
                              {new Date(product.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage; 