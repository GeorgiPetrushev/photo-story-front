import { useState, useEffect, useRef } from "react";
import { Route, Routes, Link } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import SideBar from "../components/SideBar";
import { client } from "../client";
import Pins from "./Pins";
import { AiOutlineClose } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import logo from "../media/logoBlack.png";
//getting data from sanity
import { userQuery } from "../data";

const Home = () => {
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [user, setUser] = useState("");
  const scrollRef = useRef(null);
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
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
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
        <SideBar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 shadow-lg w-full flex flex-row justify-between items-center ">
          <BiMenuAltLeft
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
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-lg z-10 animate-slide-in">
            <div
              className="absolute w-full flex justify-end items-center p-2"
              onClick={toggleSidebar}
            >
              <AiOutlineClose className="cursor-pointer" />
            </div>
            <SideBar user={user && user} closeToggle={setSideBarToggle} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
