import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router";
import Chatbot from "./Components/Chatbot/Chatbot";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Chatbot />
      <Footer />
    </>
  );
};

export default Layout;
