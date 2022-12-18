import React from "react";
import { Link, NavLink } from "react-router-dom";
import { RiHome2Line } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import logo from "../media/logoBlack.png";
import { categories } from "../data";

const SideBar = ({ user, closeToggle }) => {
  const closeSideBar = () => {
    if (closeToggle) closeToggle(false);
  };

//  
//
// 

  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize ";
  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar shadow-xl">
      <div className="flex flex-col">
        <Link
          className="flex px-5 gap-2 my-6 pt-1 w-210 items-center"
          to="/"
          onClick={closeSideBar}
        >
          <img src={logo} alt="logo" className="w-full"></img>
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            onClick={closeSideBar}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <RiHome2Line /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              key={category.name}
              to={`category/${category.name}`}
              onClick={closeSideBar}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            ><img src={category.image} alt='category-img' className='w-10 h-10 rounded-md'></img>{category.name}</NavLink>
          ))}
        </div>
        {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={closeSideBar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" alt="userProfile" />
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
      </div>
    </div>
  );
};

export default SideBar;
