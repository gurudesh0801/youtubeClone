import React, { useEffect, useState, Suspense, lazy } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Video from "../src/Pages/Video/Video";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
const App = () => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
