import AboutUs from "../Components/AboutUs";
import Carousel from "../Components/Carousel";
import FeedbackSection from "../Components/FeedbackSection";
import FindSpecialist from "../Components/FindSpecialist";
import HowItWorks from "../Components/HowItWorks";
import MedicalServices from "../Components/MedicalServices";

import PopularCampsSection from "../Components/PopularCampsSection";
import Telemedicine from "../Components/Telemedicine";
import Testimonials from "../Components/Testimonials";
import WhyChooseUs from "../Components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <PopularCampsSection></PopularCampsSection>
      <MedicalServices></MedicalServices>
      <FeedbackSection></FeedbackSection>
      <AboutUs></AboutUs>
      <HowItWorks></HowItWorks>
      <FindSpecialist></FindSpecialist>
      <Telemedicine></Telemedicine>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
