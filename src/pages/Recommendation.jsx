// src/pages/Recommendation.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAuth } from "firebase/auth";
import QueryInfo from "../component/QueryRecommendation/QueryInfo";
import UserInfo from "../component/QueryRecommendation/UserInfo";
import AddRecommendationForm from "../component/QueryRecommendation/AddRecommendationForm";
import RecommendationList from "../component/QueryRecommendation/RecommendationList";

// Utility fetch with Firebase ID token
const authFetch = async (url, options = {}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
};

const Recommendation = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingQuery, setLoadingQuery] = useState(true);
  const [loadingRecs, setLoadingRecs] = useState(true);
  const [error, setError] = useState(null);

  // Fetch query details
  const fetchQuery = async () => {
    setLoadingQuery(true);
    try {
      const data = await fetch(`https://smart-pick-server-hvh8h7xzk-lamia042s-projects.vercel.app/queries/${id}`).then(res => {
        if (!res.ok) throw new Error("Failed to fetch query");
        return res.json();
      });
      setQuery(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingQuery(false);
    }
  };

  // Fetch recommendations
  const fetchRecommendations = async () => {
    setLoadingRecs(true);
    try {
      const data = await fetch(`https://smart-pick-server-hvh8h7xzk-lamia042s-projects.vercel.app/recommendations?queryId=${id}`).then(res => {
        if (!res.ok) throw new Error("Failed to fetch recommendations");
        return res.json();
      });
      setRecommendations(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoadingRecs(false);
    }
  };

  useEffect(() => {
    fetchQuery();
    fetchRecommendations();
  }, [id]);

  if (loadingQuery) return <p className="text-center py-10">Loading query details...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;
  if (!query) return <p className="text-center py-10">Query not found</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <QueryInfo query={query} />
      <UserInfo
        user={{
          name: query.name,
          email: query.email,
          profileImage: query.profileImage || query.productImage,
        }}
      />
      <AddRecommendationForm
        queryId={query._id}
        queryTitle={query.queryTitle}
        queryProductName={query.productName}
        queryUserEmail={query.email}
        queryUserName={query.name}
        refreshRecommendations={fetchRecommendations}
        authFetch={authFetch}
      />
      {loadingRecs ? (
        <p className="text-center py-4">Loading recommendations...</p>
      ) : (
        <RecommendationList recommendations={recommendations} />
      )}
    </div>
  );
};

export default Recommendation;
