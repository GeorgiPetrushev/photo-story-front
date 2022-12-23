import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";

const App = () => {


  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);


  return (
    
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>

      // <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
      //   © 2022 . All Rights Reserved. Powered by Georgi Petrushev.
      // </span>
 
  );
};

export default App;
