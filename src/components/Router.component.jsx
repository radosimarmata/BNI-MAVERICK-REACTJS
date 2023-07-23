import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home.page";
import Data from "../pages/Data.page";
export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data" element={<Data />} />
    </Routes>
  );
}
