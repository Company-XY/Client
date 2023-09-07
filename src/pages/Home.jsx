import Hero from "../components/Home/Hero";
import Section1 from "../components/Home/Section1";
import Services from "../components/Home/Services";
import Testimonial from "../components/Home/Testimonials";
import Section2 from "../components/Home/Section2";
import FAQ from "../components/Home/FAQ";
import Section3 from "../components/Home/Section3";
import Footer from "../components/Footer/Footer";
import { useSelector } from "react-redux";
import BackToTop from "../components/Home/BackToTop";
import Bot from "../components/bot";

const Home = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Hero />
      <Bot />
      <Section1 />
      <BackToTop />
      <Services />
      <Testimonial />
      <Section2 />
      <FAQ />
      <Section3 />
      <Footer />
    </div>
  );
};

export default Home;
