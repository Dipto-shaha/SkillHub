import { Outlet } from "react-router-dom";
import Navber from "./Navber";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <Navber></Navber>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Home;