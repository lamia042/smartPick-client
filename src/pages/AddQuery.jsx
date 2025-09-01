import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { authFetch } from "../utils/authFetch";

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddQuery = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Not logged in",
        text: "You must be logged in to add a query",
      });
      return;
    }

    const form = new FormData(e.target);
    const newQuery = {
      productName: form.get("productName"),
      productBrand: form.get("productBrand"),
      productImage: form.get("productImage"),
      queryTitle: form.get("queryTitle"),
      boycottReason: form.get("boycottReason"),
      date: new Date().toISOString(),
      recommendationCount: 0,
    };

    try {
      await authFetch("https://smart-pick-server.vercel.app/queries", {
        method: "POST",
        body: JSON.stringify(newQuery),
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire({
        icon: "success",
        title: "Query Added Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      e.target.reset();
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-blue-50 rounded-2xl shadow-lg border border-gray-100 mt-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add Your Product Query!
      </h2>
      <form onSubmit={handleAddQuery} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            placeholder="Enter product name"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Product Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Brand
          </label>
          <input
            type="text"
            name="productBrand"
            placeholder="Enter brand name"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Product Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image URL
          </label>
          <input
            type="url"
            name="productImage"
            placeholder="https://example.com/image.jpg"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Query Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Query Title
          </label>
          <input
            type="text"
            name="queryTitle"
            placeholder="Is there any better product with same quality?"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Boycott Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Boycotting Reason Details
          </label>
          <textarea
            name="boycottReason"
            placeholder="Write your reason for boycotting this product..."
            required
            rows="4"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          ➕ Add Query
        </button>
      </form>
    </div>
  );
};

export default AddQuery;
