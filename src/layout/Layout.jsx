import { useSelector } from "react-redux";
import Header from "../components/Header/NewHeader";
import Routers from "../routes/Routers";
import Footer2 from "../components/Footer/Footer2";

const Layout = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <>
      <section className="w-full fixed top-0">
        <Header darkMode={darkMode} />
      </section>
      <section className="min-h-[90vh]">
        <Routers />
      </section>
      <section>
        <Footer2 />
      </section>
    </>
  );
};

export default Layout;
