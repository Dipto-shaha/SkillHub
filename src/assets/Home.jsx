import { Outlet } from "react-router-dom";
import Navber from "./Navber";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>SkillHub | Home</title>
      </Helmet>
      <Navber></Navber>
      <div className="mx-5 lg:mx-20 md:mx-10 my-5 flex-1">
        <Outlet></Outlet>
      </div>
      <div className="mt-auto">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
