import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { urlFor, client } from "../client";
import { v4 as uuidv4 } from "uuid";
import {
  MdDeleteForever,
  MdDownloadForOffline,
  MdArrowForward,
} from "react-icons/md";

const LoopPin = ({ pin: { image, postedBy, _id, destination } }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-md rounded-xl overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          className="rounded-lg w-full"
          alt="user"
        ></img>
      </div>
    </div>
  );
};

export default LoopPin;
