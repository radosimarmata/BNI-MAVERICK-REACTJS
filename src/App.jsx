import React, { useState } from "react";
import Navbar from "./components/Navbar.component";
import Sidebar from "./components/Sidebar.component";
import Router from "./components/Router.component";
import Footer from "./components/Footer.component";
export default function App() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <Router />
          <Footer />
        </div>
      </div>
    </>
  );
}
