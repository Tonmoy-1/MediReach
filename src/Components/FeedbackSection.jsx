import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Rating from "react-rating-stars-component";
import Spinner from "../Pages/Spinner";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const FeedbackSection = () => {
  const axiosSecure = useAxiosSecure();
  // get feedback data using tanstack
  const { data: feedBackData = [], isLoading } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/feedback`);
      return data;
    },
  });
  if (isLoading) return <Spinner />;

  return (
    <div className="w-11/12 mx-auto px-4 md:px-8 py-8">
      {/* Header Section */}
      <div className="text-center md:text-left md:max-w-lg mb-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white leading-tight">
          Hear From <span className="text-teal-500">Our Participants</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Discover what our participants have to say about their experience at
          our medical camps. Inspiring stories and heartfelt feedback await!
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Feedback Swiper */}
        <div className="w-full md:w-1/2">
          <Swiper
            spaceBetween={30}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {feedBackData.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={item.userProfile}
                      alt={item.userEmail}
                      className="w-14 h-14 rounded-full border-2 border-teal-500 shadow-md"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {item.userEmail}
                      </p>
                      <Rating
                        count={5}
                        value={item.rating}
                        size={24}
                        activeColor="#ffd700"
                        edit={false}
                      />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    {item.feedback}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Static Image */}
        <div className="w-full md:w-1/2 relative">
          <img
            src="https://i.ibb.co.com/0tYBhRT/pexels-rdne-7581108.jpg"
            alt="Feedback Illustration"
            className="w-full h-auto rounded-lg shadow-lg object-cover transition-transform duration-500 ease-in-out hover:scale-105"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-teal-500 bg-opacity-30 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;
