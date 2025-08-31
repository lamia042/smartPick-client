// components/AddRecommendationForm.jsx
import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import { getAuth } from "firebase/auth";

const AddRecommendationForm = ({
  queryId,
  queryTitle,
  queryProductName,
  queryUserEmail,
  queryUserName,
  refreshRecommendations,
}) => {
  const { user } = useContext(AuthContext);
  const auth = getAuth();

  const handleAddRecommendation = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not logged in",
        text: "You must be logged in to add a recommendation",
      });
      return;
    }

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

    try {
      // Get Firebase ID token
      const idToken = await auth.currentUser.getIdToken();

      const res = await fetch("https://smart-pick-server-hvh8h7xzk-lamia042s-projects.vercel.app/recommendations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`, // Firebase JWT
        },
        body: JSON.stringify(newRecommendation),
      });

      if (!res.ok) throw new Error("Failed to add recommendation");
      await res.json();

      Swal.fire({
        icon: "success",
        title: "Recommendation Added",
        timer: 1500,
        showConfirmButton: false,
      });

      e.target.reset();
      refreshRecommendations(); // refresh the list
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
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
