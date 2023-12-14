"use client";

import { useState } from "react";
import { useGlobalContext } from "@/context/store";

const Reviews = ({ movie, reviews, setReviews }) => {
  const [newReview, setNewReview] = useState("");
  const [editReview, setEditReview] = useState("");
  const { userId, username } = useGlobalContext();
  const [editingReviewId, setEditingReviewId] = useState(null);

  const handleUpdate = async (id, reviewText) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/reviews/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reviewBody: reviewText,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        setReviews(reviews.map((review) => (review.id === id ? data : review)));
        setNewReview("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/reviews/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
          const data = await response.json();
          console.log(data);
        }
        setReviews(reviews.filter((review) => review.id !== id));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewBody: newReview,
        userId: userId,
        username: username,
        imdbId: movie?.imdbId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews((prevReviews) => [...prevReviews, data]);
        setNewReview("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-wrap justify-center bg-gray-100 shadow-lg rounded-lg overflow-hidden max-w-full mx-auto p-8">
      <div className="flex flex-wrap justify-between bg-white shadow-md rounded-lg overflow-hidden max-w-full mx-auto">
        <div className="w-full sm:w-1/2">
          <img
            className="h-48 w-full object-cover"
            src={movie?.poster}
            alt={movie?.title}
          />
        </div>
        <div className="w-full sm:w-1/2 p-6">
          <div className="flex justify-between items-baseline">
            <div className="text-2xl font-semibold text-black">
              {movie?.title}
            </div>
            <p className="text-sm text-gray-500">
              Release Date: {movie?.releaseDate}
            </p>
          </div>
          <p className="mt-2 text-gray-500">IMDB ID: {movie?.imdbId}</p>
          <a
            href={movie?.trailerLink}
            className="mt-4 inline-block text-blue-500 hover:text-blue-800"
          >
            Watch Trailer
          </a>
        </div>
      </div>
      <div className="w-full p-6">
        {reviews
          .sort((a, b) =>
            a.username === username ? -1 : b.username === username ? 1 : 0
          )
          .map((review, index) => (
            <div key={index} className="border-b border-gray-300 py-4 relative">
              {review.username === username && (
                <div className="absolute top-0 right-0 flex space-x-2">
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setEditingReviewId(review.id);
                      setEditReview(review.body);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(review.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
              <p className="text-sm font-semibold text-gray-700">
                {review.username}
              </p>
              {review.id === editingReviewId ? (
                <input
                  type="text"
                  value={editReview} // Use 'editReview' instead of 'newReview'
                  onChange={(e) => setEditReview(e.target.value)} // Use setEditReview instead of setNewReview
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out px-4 py-2"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-700">
                  {review.body}
                </p>
              )}
              {review.id === editingReviewId && (
                <button
                  className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  onClick={() => {
                    handleUpdate(review.id, editReview); // Pass 'editReview' to the update handler
                    setEditingReviewId(null);
                    setEditReview(""); // Reset 'editReview' after saving
                  }}
                >
                  Save
                </button>
              )}
              <p className="text-sm text-gray-500">
                Reviewed on: {new Date(review.created).toLocaleString()}
              </p>
            </div>
          ))}
        <form onSubmit={handleReviewSubmit} className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Review:
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out px-4 py-2"
            />
          </label>
          <input
            type="submit"
            value="Submit"
            className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
        </form>
      </div>
    </div>
  );
};

export default Reviews;
