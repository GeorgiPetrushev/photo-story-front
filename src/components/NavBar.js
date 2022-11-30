import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { RiAddFill } from "react-icons/ri";

const NavBar = ({ user, search, setSearch }) => {
  const navigate = useNavigate();

  return (
    user && (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
        <div className="flex justify-start items-center w-full px-2 rounded-lg bg-white border-none outline-none focus-within:shadow-sm">
          <BiSearchAlt className="text-lg ml-1" />
          <input
          placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            className='p-2 w-full bg-white outline-none'
            onFocus={() => navigate('/search')}
          />
        </div>
      </div>
    )
  );
};

export default NavBar;
