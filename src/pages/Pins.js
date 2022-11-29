import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Pin from "../components/Pin";
import PinDetails from "../components/PinDetails";
import SearchBar from "../components/SearchBar";
import Feed from "../components/Feed";


const Pins = () => {

  const [serach,setSeatch] =useState('');
  
  return <div>Pins</div>;
};

export default Pins;
