import Carousel from "../Components/Carousel";
import FeedbackSection from "../Components/FeedbackSection";
import PopularCampsSection from "../Components/PopularCampsSection";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <PopularCampsSection></PopularCampsSection>
      <FeedbackSection></FeedbackSection>
    </div>
  );
};

export default Home;
