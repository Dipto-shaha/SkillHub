import { Outlet } from "react-router-dom";
import Navber from "./Navber";
import Footer from "./Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>SkillHub | Home</title>
            </Helmet>
            <Navber></Navber>
            <div className="mx-20 my-5">
                <Outlet ></Outlet>
            </div>
            <Footer></Footer>
        </>
    );
};

export default Home;