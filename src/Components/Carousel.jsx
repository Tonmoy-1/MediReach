import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

export default function Carousel() {
  return (
    <div className="container px-4 md:px-8 py-6 mx-auto rounded-lg shadow-lg overflow-hidden">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[img1, img2, img3, img4].map((image, index) => (
          <SwiperSlide key={index}>
            <Slide
              image={image}
              text="Join Our Mission to Provide Free Medical Care to Communities in Need"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
