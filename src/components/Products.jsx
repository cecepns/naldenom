import React, { useState, useEffect } from 'react';
import { Package, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://api-inventory.isavralabel.com/api/naldenom/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  const ProductModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            {product.images && product.images.length > 0 && (
              <div className="mb-4">
                <img
                  src={`https://api-inventory.isavralabel.com/api/naldenom/uploads-naldenom/${product.images[0]}`}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">Product Code</h4>
                <p className="text-gray-600">{product.product_code}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">Category</h4>
                <p className="text-gray-600">{product.category_name}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">Description</h4>
                <div 
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: formatContent(product.description) }}
                />
              </div>
              
              {product.price && (
                <div>
                  <h4 className="font-semibold text-gray-900">Price</h4>
                  <p className="text-blue-600 font-bold">
                    Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <section id="products" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Available</h3>
            <p className="text-gray-500">Products will be displayed here once they are added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`https://api-inventory.isavralabel.com/api/naldenom/uploads-naldenom/${product.images[0]}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <span className="text-sm text-gray-500">{product.product_code}</span>
                  </div>
                  
                  <div 
                    className="text-gray-600 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: formatContent(product.description) }}
                  />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 font-medium">{product.category_name}</span>
                    <button
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      </div>
    </section>
  );
};

export default Products;