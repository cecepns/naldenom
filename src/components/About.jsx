import React, { useState, useEffect } from "react";
import {
  Building,
  Users,
  Award,
  Target,
  MapPin,
  Calendar,
  User,
} from "lucide-react";
import axios from "axios";

const About = () => {
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get(
        "https://api-inventory.isavralabel.com/api/naldenom/company"
      );
      setCompany(response.data);
    } catch (error) {
      console.error("Error fetching company info:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading company information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            About NALDENOM EXPORT IMPORT
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A national private company engaged in export-import business with a
            commitment to providing the best service
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Company Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="NALDENOM Office"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-xl shadow-xl">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {company.established_year || "2025"}
                </div>
                <div className="text-sm">Established</div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              {company.description ||
                "NALDENOM EXPORT IMPORT is a company established in 2025 with a vision to become a trusted partner in international trade. We are committed to connecting Indonesia with the global market through professional and quality export-import services."}
            </p>
            <p className="text-gray-600 leading-relaxed">
              With a strategic location in South Solok Regency, West Sumatra, we
              serve various trading needs from automotive spare parts, forestry
              products, food ingredients, to textile products and accessories.
            </p>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        President Director
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {company.president_director || "Yati Marlina"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Director</h4>
                      <p className="text-gray-600 text-sm">
                        {company.director || "WARNERI PUTERA SH.M.Kn."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 max-h-fit p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Location</h4>
                    <p className="text-gray-600 text-sm">
                      {company.location || "Solok Selatan, Sumatera Barat"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Established</h4>
            <p className="text-2xl font-bold text-blue-600">
              {company.established_year || "2025"}
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Team</h4>
            <p className="text-2xl font-bold text-green-600">Expert</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Quality</h4>
            <p className="text-2xl font-bold text-purple-600">Certified</p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
            <Target className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Mission</h4>
            <p className="text-2xl font-bold text-orange-600">Global</p>
          </div>
        </div>

        {/* Business Activities */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Business Activities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Automotive Parts",
                description:
                  "Wholesale trade of automotive spare parts and accessories",
                icon: "🚗",
              },
              {
                title: "Wholesale Trade",
                description: "Wholesale trade on commission basis or contract",
                icon: "🤝",
              },
              {
                title: "Forestry Products",
                description: "Wholesale trade of forestry and hunting products",
                icon: "🌲",
              },
              {
                title: "Food & Beverages",
                description: "Wholesale trade of food and beverage ingredients",
                icon: "🍽️",
              },
              {
                title: "Clothing",
                description: "Retail trade of clothing and accessories",
                icon: "👕",
              },
              {
                title: "Various Products",
                description: "Wholesale trade of various types of goods",
                icon: "📦",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{activity.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {activity.title}
                </h4>
                <p className="text-gray-600 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
