import { useState, useEffect, useRef } from "react";
import { Route, Routes, Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import SideBar from "../components/SideBar";
import { client } from "../client";
import Pins from "../components/Pins";
import { HiMenuAlt2 } from "react-icons/hi";
import {AiOutlineClose} from "react-icons/ai"
import logo from "../media/logoBlack.png";
//getting data from sanity
import { userQuery } from "../data";

const Home = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [user, setUser] = useState(null);
  //
  //
  //

  //getting googleId
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  //
  //
  //

  useEffect(() => {
    //pulling data from sanity
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      const getData = data[0];
      setUser(getData);
      console.log(getData);
    });
  }, []);
  //
  //
  //

  const toggleSidebar = () => {
    setSideBarToggle((prev) => !prev);
  };

  //
  //
  //

  return (
    <div className="flex bg-gray md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <SideBar />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenuAlt2
          className="cursor-pointer text-4xl"
          onClick={toggleSidebar}
        />
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 fill-black" />
        </Link>
        <Link to={`user-profile/${user?.id}`}>
          <img src={user.image} alt="logo" className="w-28 fill-black" />
        </Link>
      </div>
      {sideBarToggle && (
        <div className="flex w-4/5 bg-yellow-50 h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end item-center p-2" onClick={toggleSidebar}><AiOutlineClose /></div>
          <SideBar />
        </div>
      )}
    </div>
  );
};

export default Home;
