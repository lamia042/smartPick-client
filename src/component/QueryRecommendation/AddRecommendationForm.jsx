// components/AddRecommendationForm.jsx
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
const AddRecommendationForm = ({ queryId, queryTitle, queryProductName, queryUserEmail, queryUserName, refreshRecommendations }) => {
  const { user } = useContext(AuthContext);

  const handleAddRecommendation = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newRecommendation = {
      recommendationTitle: form.get("recommendationTitle"),
      recommendedProductName: form.get("recommendedProductName"),
      recommendedProductImage: form.get("recommendedProductImage"),
      recommendationReason: form.get("recommendationReason"),
      queryId,
      queryTitle,
      productName: queryProductName,
      userEmail: queryUserEmail,
      userName: queryUserName,
      recommenderEmail: user.email,
      recommenderName: user.displayName,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecommendation),
    })
      .then(res => res.json())
      .then(data => {
        Swal.fire({ icon: "success", title: "Recommendation Added", timer: 1500, showConfirmButton: false });
        e.target.reset();
        refreshRecommendations(); // refresh list
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">Add a Recommendation</h3>
      <form onSubmit={handleAddRecommendation} className="space-y-4">
        <input
          type="text"
          name="recommendationTitle"
          placeholder="Recommendation Title"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="recommendedProductName"
          placeholder="Recommended Product Name"
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          name="recommendedProductImage"
          placeholder="Recommended Product Image URL"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="recommendationReason"
          placeholder="Recommendation Reason"
          required
          rows="4"
          className="w-full border p-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Add Recommendation
        </button>
      </form>
    </div>
  );
};

export default AddRecommendationForm;
