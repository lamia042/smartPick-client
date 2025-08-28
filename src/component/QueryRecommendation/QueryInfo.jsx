// components/QueryInfo.jsx
import React from "react";

const QueryInfo = ({ query }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      {query.productImage && (
        <img
          src={query.productImage}
          alt={query.productName}
          className="w-full h-64 object-cover rounded-2xl mb-4"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{query.queryTitle}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Product:</strong> {query.productName}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Brand:</strong> {query.productBrand}
      </p>
      <p className="text-gray-600">{query.boycottReason}</p>
    </div>
  );
};

export default QueryInfo;
