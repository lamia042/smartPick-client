import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TopRecommendedQueries = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch(
          "https://smart-pick-server.vercel.app/top-queries"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setTopProducts(data);
      } catch (err) {
        console.error("Error fetching top products:", err);
        setError(err.message);
      }
    };

    fetchTopProducts();
  }, []);

  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (!topProducts.length)
    return <p className="text-center py-10">Loading top products...</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="bg-gray-100 py-16"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          🏆 Top Recommended Products
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Based on community recommendations, here are the top products you
          should check out.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {topProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center"
            >
              {product.productImage && (
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-32 h-32 object-cover rounded-sm mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                {product.productName}
              </h3>
              <span className="px-3 mt-2 py-1 bg-indigo-100 text-indigo-900 font-semibold rounded-">
                {product.recommendationCount} Recommendations
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TopRecommendedQueries;
