import { useSelector } from "react-redux";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";

const Layout = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <>
      <section className="w-full fixed top-0">
        <Header darkMode={darkMode} />
      </section>
      <section className="">
        <Routers />
      </section>
    </>
  );
};

export default Layout;
