import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import QueryInfo from "../component/QueryRecommendation/QueryInfo";
import UserInfo from "../component/QueryRecommendation/UserInfo";
import AddRecommendationForm from "../component/QueryRecommendation/AddRecommendationForm";
import RecommendationList from "../component/QueryRecommendation/RecommendationList";

const Recommendation = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const fetchQuery = () => {
    fetch(`http://localhost:3000/queries/${id}`)
      .then(res => res.json())
      .then(data => setQuery(data))
      .catch(err => console.error(err));
  };

  const fetchRecommendations = () => {
    fetch(`http://localhost:3000/recommendations?queryId=${id}`)
      .then(res => res.json())
      .then(data => setRecommendations(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    console.log("Query ID:", id);
    fetchQuery();
    fetchRecommendations();
  }, [id]);

  if (!query) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <QueryInfo query={query} />
      <UserInfo user={{ name: query.name, email: query.email, profileImage: query.productImage }} />
      <AddRecommendationForm
        queryId={query._id}
        queryTitle={query.queryTitle}
        queryProductName={query.productName}
        queryUserEmail={query.email}
        queryUserName={query.name}
        refreshRecommendations={fetchRecommendations}
      />
      <RecommendationList recommendations={recommendations} />
    </div>
  );
};

export default Recommendation;
