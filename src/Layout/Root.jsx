import { Outlet } from "react-router-dom";
import Navbar from "../Component/Shared/Navbar";
import Footer from "../Component/Shared/Footer";

const Root = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <Navbar/>
      <Outlet></Outlet>
      <Footer/>
    </div>
  );
};

export default Root;