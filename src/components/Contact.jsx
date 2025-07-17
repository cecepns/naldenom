import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import axios from 'axios';

const Contact = () => {
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get('https://api-inventory.isavralabel.com/api/naldenom/company');
      setCompany(response.data);
    } catch (error) {
      console.error('Error fetching company info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contact information...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">{company.phone || '082180297185'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">{company.email || 'info@naldenom.com'}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      {company.address || 'Simpang Ampek, Abai, Sangir Batang Hari, Kabupaten Solok Selatan, Sumatera Barat'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Business Hours</h4>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Company Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Company Name</h4>
                  <p className="text-gray-600">{company.company_name || 'NALDENOM EXPORT IMPORT'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">President Director</h4>
                  <p className="text-gray-600">{company.president_director || 'Yati Marlina'}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900">Director</h4>
                  <p className="text-gray-600">{company.director || 'WARNERI PUTERA SH.M.Kn.'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Established</h4>
                  <p className="text-gray-600">{company.established_year || '2025'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-gray-600">{company.location || 'Kabupaten Solok Selatan, Sumatera Barat'}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">About</h4>
                  <p className="text-gray-600">
                    {company.description || 'NALDENOM EXPORT IMPORT is a national private company engaged in export and import business with various business activities including wholesale trade of automotive spare parts and accessories, wholesale trade on a commission basis, forestry and hunting products, and various other products.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;