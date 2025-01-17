import { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const FeedbackSubmitPage = () => {
  const [feedback, setFeedback] = useState(""); // To store feedback text
  const [rating, setRating] = useState(0); // To store the rating value

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Update rating state when stars are clicked
  };
  const { user } = useContext(AuthContext);

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user-data/${user?.email}`
      );
      return data;
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userProfile = userData?.image;
    const userEmail = userData?.email;
    const feedbackData = {
      rating,
      feedback,
      userProfile,
      userEmail,
    };

    console.log("Submitted Feedback:", feedbackData);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/feedback`,
        feedbackData
      );
      Swal.fire("Success", "Thaks For Giving Feedback!", "success");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center py-10 px-6">
      {/* Heading and Slogan */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          We Value Your Feedback
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Let us know how we can improve your experience.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          {/* Rating Section */}
          <div className="mb-6">
            <label
              htmlFor="rating"
              className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Rate Your Experience
            </label>
            <ReactStars
              count={5}
              size={30}
              isHalf={true}
              activeColor="#ffd700"
              onChange={handleRatingChange}
            />
          </div>

          {/* Feedback Textarea */}
          <div className="mb-6">
            <label
              htmlFor="feedback"
              className="block text-lg font-medium text-gray-600 dark:text-gray-300 mb-2"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              rows="6"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Write your feedback here..."
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackSubmitPage;
