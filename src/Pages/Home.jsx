import AboutUs from "../Components/AboutUs";
import Carousel from "../Components/Carousel";
import FeedbackSection from "../Components/FeedbackSection";
import FindSpecialist from "../Components/FindSpecialist";
import HowItWorks from "../Components/HowItWorks";
import MedicalServices from "../Components/MedicalServices";
import PartnerHospitals from "../Components/PartnerHospitals";
import PopularCampsSection from "../Components/PopularCampsSection";
import Telemedicine from "../Components/Telemedicine";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <div>
      <Carousel></Carousel>
      <PopularCampsSection></PopularCampsSection>
      <MedicalServices></MedicalServices>
      <FeedbackSection></FeedbackSection>
      <AboutUs></AboutUs>
      <PartnerHospitals></PartnerHospitals>
      <HowItWorks></HowItWorks>
      <FindSpecialist></FindSpecialist>
      <Telemedicine></Telemedicine>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;
