// src/components/QueryCard.jsx
import React from "react";
import { Link } from "react-router";

const QueryCard = ({ query }) => {
  return (
    <div className="card bg-white border rounded-lg shadow-lg hover:shadow-xl overflow-hidden transition-transform hover:scale-105">
      {query.productImage && (
        <img src={query.productImage} alt={query.productName} className="w-full h-48 object-cover" />
      )}

      <div className="p-6 flex flex-col justify-between flex-1">
        <h2 className="text-xl font-semibold mb-3">{query.queryTitle}</h2>

        <div className="text-sm text-gray-500 mb-4">
          <p>Created At: {new Date(query.date).toLocaleDateString()}</p>
          <p>Author: {query.name || "Anonymous"}</p>
        </div>

        <div className="text-lg font-medium mb-4">
          Recommendations: <span className="text-blue-600">{query.recommendationCount}</span>
        </div>

        {/* ✅ Link with _id */}
        <Link to={`/recommendation/${query._id}`}>
          <button className="font-bold text-white px-4 py-2 rounded hover:bg-[#be161e] bg-[#094fc9] w-full">
            View Recommendation
          </button>
        </Link>
      </div>
    </div>
  );
};

export default QueryCard;
