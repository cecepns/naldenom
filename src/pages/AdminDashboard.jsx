import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { Package, FileText, HelpCircle, BarChart3 } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    articles: 0,
    faqs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const [productsRes, articlesRes, faqsRes] = await Promise.all([
        axios.get('https://api-inventory.isavralabel.com/api/naldenom/admin/products'),
        axios.get('https://api-inventory.isavralabel.com/api/naldenom/admin/articles'),
        axios.get('https://api-inventory.isavralabel.com/api/naldenom/admin/faqs')
      ]);

      setStats({
        products: productsRes.data.length,
        articles: articlesRes.data.length,
        faqs: faqsRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, onClick }) => (
    <div 
      className={`bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow ${onClick ? 'hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{loading ? '...' : value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
    </div>
  );

  if (!user) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome back, {user.username}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats.products}
            icon={Package}
            color="bg-blue-500"
            onClick={() => navigate('/admin/products')}
          />
          <StatCard
            title="Total Articles"
            value={stats.articles}
            icon={FileText}
            color="bg-green-500"
            onClick={() => navigate('/admin/articles')}
          />
          <StatCard
            title="Total FAQs"
            value={stats.faqs}
            icon={HelpCircle}
            color="bg-yellow-500"
            onClick={() => navigate('/admin/faqs')}
          />
          <StatCard
            title="Analytics"
            value="View"
            icon={BarChart3}
            color="bg-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={() => navigate('/admin/products')}
              className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Package className="h-8 w-8 text-blue-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Manage Products</div>
                <div className="text-sm text-gray-600">Add, edit, or delete products</div>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/articles')}
              className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-green-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Manage Articles</div>
                <div className="text-sm text-gray-600">Create and publish articles</div>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/admin/faqs')}
              className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <HelpCircle className="h-8 w-8 text-yellow-600" />
              <div className="text-left">
                <div className="font-medium text-gray-900">Manage FAQs</div>
                <div className="text-sm text-gray-600">Update frequently asked questions</div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <div className="text-sm font-medium text-gray-900">Dashboard accessed</div>
                <div className="text-xs text-gray-500">Just now</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;