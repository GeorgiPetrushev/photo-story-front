import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>

      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022 . All Rights Reserved. Powered by Georgi Petrushev.
      </span>
    </BrowserRouter>
  );
};

export default App;
