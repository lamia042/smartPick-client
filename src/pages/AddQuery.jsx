// pages/AddQuery.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddQuery = () => {
  const { user } = useContext(AuthContext);
  const navigate=useNavigate();

  const handleAddQuery = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const newQuery = {
      productName: form.get("productName"),
      productBrand: form.get("productBrand"),
      productImage: form.get("productImage"),
      queryTitle: form.get("queryTitle"),
      boycottReason: form.get("boycottReason"),

      // extra user info
      email: user?.email,
      name: user?.displayName,
      profileImage: user?.photoURL,
      date: new Date().toISOString(),
      recommendationCount: 0,
    };

    console.log(newQuery); // check before sending

    // TODO: send to backend / firebase
    fetch("http://localhost:3000/queries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Query Added Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        e.target.reset();
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-blue-50 rounded-2xl shadow-lg border border-gray-100 mt-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add Your Product Query!
      </h2>
      <form onSubmit={handleAddQuery} className="space-y-5">
        {/* Product Name */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Product Brand */}
        <div>
          <label
            htmlFor="productBrand"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Brand
          </label>
          <input
            type="text"
            id="productBrand"
            name="productBrand"
            placeholder="Enter brand name"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Product Image */}
        <div>
          <label
            htmlFor="productImage"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Image URL
          </label>
          <input
            type="url"
            id="productImage"
            name="productImage"
            placeholder="https://example.com/image.jpg"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Query Title */}
        <div>
          <label
            htmlFor="queryTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Query Title
          </label>
          <input
            type="text"
            id="queryTitle"
            name="queryTitle"
            placeholder="e.g. Is there any better product that gives me the same quality?"
            required
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          />
        </div>

        {/* Boycotting Reason */}
        <div>
          <label
            htmlFor="boycottReason"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Boycotting Reason Details
          </label>
          <textarea
            id="boycottReason"
            name="boycottReason"
            placeholder="Write your reason for boycotting this product..."
            required
            rows="4"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2.5"
          ></textarea>
        </div>

        {/* Submit Button */}
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
