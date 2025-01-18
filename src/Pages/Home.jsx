import Carousel from "../Components/Carousel";
import FeedbackSection from "../Components/FeedbackSection";
import MedicalServices from "../Components/MedicalServices";
import PopularCampsSection from "../Components/PopularCampsSection";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <PopularCampsSection></PopularCampsSection>
      <MedicalServices></MedicalServices>
      <FeedbackSection></FeedbackSection>
    </div>
  );
};

export default Home;
