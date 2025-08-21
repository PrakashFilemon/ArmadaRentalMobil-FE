import MapComponent from "@/components/HomeComponent/MapComponent/MapComponent";
import CarComponent from "../components/HomeComponent/CarComponent/CarComponent";
import HeroComponent from "../components/HomeComponent/HeroComponent/Hero";
import ServiceComponent from "../components/HomeComponent/ServiceComponent/Service";
import FooterComponent from "@/components/HomeComponent/FooterComponent";

const HomePage = () => {
  return (
    <>
      <HeroComponent />
      <ServiceComponent />
      <CarComponent />
      <MapComponent />
      <FooterComponent />
    </>
  );
};

export default HomePage;
