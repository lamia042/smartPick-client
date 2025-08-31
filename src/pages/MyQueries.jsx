import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthProvider";

const MyQueries = () => {
  // ✅ Get the logged-in user
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyQueries = async () => {
    if (!userEmail) return; // wait until user loads
    try {
      const res = await fetch(`https://smart-pick-server-hvh8h7xzk-lamia042s-projects.vercel.app/queries`);
      const data = await res.json();
      const myQueries = data.filter((q) => q.email === userEmail);
      setQueries(myQueries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyQueries();
  }, [userEmail]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this query?");
    if (!confirm) return;

    try {
      await fetch(`https://smart-pick-server-hvh8h7xzk-lamia042s-projects.vercel.app/queries/${id}`, { method: "DELETE" });
      setQueries(queries.filter((q) => q._id !== id));
      alert("Query deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete query.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading your queries...</p>;

  if (!queries.length)
    return <p className="text-center py-10 text-gray-500">You have no queries yet.</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Queries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {queries.map((query) => (
          <div
            key={query._id}
            className="card bg-white border rounded-lg shadow-lg hover:shadow-xl overflow-hidden transition-transform hover:scale-105"
          >
            {query.productImage && (
              <img
                src={query.productImage}
                alt={query.productName}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 flex flex-col justify-between flex-1">
              <h2 className="text-xl font-semibold mb-3">{query.queryTitle}</h2>
              <p className="text-gray-500 mb-3">
                Created: {new Date(query.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 mb-4">Recommendations: {query.recommendationCount}</p>

              <div className="flex flex-col gap-2">
                <Link
                  to={`/recommendation/${query._id}`}
                  className="text-center font-bold text-white px-4 py-2 rounded hover:bg-[#be161e] bg-[#094fc9]"
                >
                  View Recommendations
                </Link>

                <button
                  onClick={() => handleDelete(query._id)}
                  className="text-center font-bold text-white px-4 py-2 rounded hover:bg-red-700 bg-red-500"
                >
                  Delete Query
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyQueries;
