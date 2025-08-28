// components/RecommendationList.jsx
import React from "react";

const RecommendationList = ({ recommendations }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-2">All Recommendations</h3>
      {recommendations.map((rec) => (
        <div key={rec._id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex gap-4">
          {rec.recommendedProductImage && (
            <img
              src={rec.recommendedProductImage}
              alt={rec.recommendedProductName}
              className="w-16 h-16 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <p className="font-semibold">{rec.recommendationTitle}</p>
            <p className="text-gray-600">{rec.recommendedProductName}</p>
            <p className="text-gray-500 text-sm">{rec.recommendationReason}</p>
            <p className="text-xs text-gray-400 mt-1">
              By {rec.recommenderName} on {new Date(rec.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationList;
