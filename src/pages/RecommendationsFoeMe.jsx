import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const RecommendationsForMe = () => {
  const { user } = useContext(AuthContext);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `https://smart-pick-server.vercel.app/recommendationsForUser?userEmail=${user.email}`
      );
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [user]);

  if (loading) return <p className="text-center py-10">Loading recommendations...</p>;

  if (!recommendations.length)
    return <p className="text-center py-10 text-gray-500">No recommendations yet.</p>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Recommendations For Me</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Query Title</th>
            <th className="border p-2">Recommended By</th>
            <th className="border p-2">Recommendation</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec) => (
            <tr key={rec._id} className="text-center">
              <td className="border p-2">{rec.queryTitle}</td>
              <td className="border p-2">{rec.userName || "Anonymous"}</td>
              <td className="border p-2">{rec.recommendationText}</td>
              <td className="border p-2">{new Date(rec.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendationsForMe;
