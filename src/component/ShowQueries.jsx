// src/pages/ShowQueries.jsx
import React, { useEffect, useState } from "react";
import QueryCard from "./QueryCard";


const ShowQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/queries")
      .then(res => res.json())
      .then(data => setQueries(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Recent Queries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queries.map(query => (
          <QueryCard key={query._id} query={query} />
        ))}
      </div>
    </div>
  );
};

export default ShowQueries;
