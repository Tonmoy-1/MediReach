import AboutUs from "../Components/AboutUs";
import Carousel from "../Components/Carousel";
import EmergencyContacts from "../Components/EmergencyContacts";
import FaqSection from "../Components/FaqSection";
import FeedbackSection from "../Components/FeedbackSection";
import FindSpecialist from "../Components/FindSpecialist";
import HowItWorks from "../Components/HowItWorks";
import MedicalServices from "../Components/MedicalServices";
import PlanYourVisit from "../Components/PlanYourVisit";

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
      <PlanYourVisit></PlanYourVisit>
      <EmergencyContacts></EmergencyContacts>
      <Telemedicine></Telemedicine>
      <Testimonials></Testimonials>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-gray-100 px-4">
        <div>
          <WhyChooseUs />
        </div>
        <div>
          <FaqSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
