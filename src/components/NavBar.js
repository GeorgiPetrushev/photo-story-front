import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";

const NavBar = ({ user, search, setSearch }) => {
  const navigate = useNavigate();

  return (
    user && (
      <div className="flex gap-2 md:gap-5 w-full mt-5 py-5 px-3">
        <div className="flex justify-start items-center w-full px-2 rounded-lg bg-white border-none outline-none focus-within:shadow-md">
          <BiSearchAlt className="text-lg ml-1" />
          <input
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className="p-2 w-full bg-white outline-none"
            onFocus={() => navigate("/search")}
          />
        </div>
        <div className="flex gap-2">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block ">
            <img
              src={user.image}
              alt="user-img"
              className="w-10 h-10  rounded-lg "
            />
          </Link>
          <Link
            to="create-pin"
            className="bg-black text-white text-lg rounded-lg h-10 w-10 flex justify-center items-center"
          >
            <RiAddFill />
          </Link>
        </div>
      </div>
    )
  );
};

export default NavBar;
