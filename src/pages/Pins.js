import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Pin from "../components/Pin";
import PinDetails from "../components/PinDetails";
import SearchBar from "../components/SearchBar";
import Feed from "../components/Feed";

const Pins = ({ user }) => {
  const [search, setSearch] = useState("");



  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <NavBar search={search} setSearch={setSearch} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetails user={user && user} />} />
          <Route path="/create-pin" element={<Pin user={user && user} />} />
          <Route path="/search" element={<SearchBar search={search} setSearch={setSearch} />} />
        </Routes>
      </div>
    </div>
  );


};

export default Pins;
