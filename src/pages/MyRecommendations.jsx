import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthProvider"; // make sure AuthProvider is correct

const MyRecommendations = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);

  const fetchMyRecommendations = () => {
    fetch(`https://smart-pick-server-hvh8h7xzk-lamia042s-projects.vercel.app/recommendations?userEmail=${user.email}`)
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyRecommendations();
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://smart-pick-server-hvh8h7xzk-lamia042s-projects.vercel.app/recommendations/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your recommendation has been deleted.", "success");
            fetchMyRecommendations(); // refresh
          })
          .catch(err => console.error(err));
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6">My Recommendations</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Query Title</th>
              <th className="border p-2">Recommended Product</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((rec) => (
              <tr key={rec._id}>
                <td className="border p-2">{rec.productName}</td>
                <td className="border p-2">{rec.queryTitle}</td>
                <td className="border p-2">{rec.recommendedProductName}</td>
                <td className="border p-2">{new Date(rec.date).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(rec._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyRecommendations;
