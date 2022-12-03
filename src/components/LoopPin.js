import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { urlFor, client } from "../client";
import { v4 as uuidv4 } from "uuid";
import {
  MdDeleteForever,
  MdDownloadForOffline,
  MdArrowForward,
} from "react-icons/md";

const LoopPin = ({ pin: { image, postedBy, _id, destination, save } }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [savePost, setSavePost] = useState(false);
  //getting googleId
  const user =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  //checking to see if user save the picture
  const saved = !!save?.save?.filter(
    (item) => item.postedBy._id === user.googleId
  )?.length;

  const savePin = (id) => {
    if (!saved) {
      setSavePost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: user.googleId,
            postedBy: {
              _type: "postedBy",
              _ref: user.googleId,
            },
          },
        ])
        .commit().then(() =>{
          window.location.reload();
          setSavePost(false);
        });
    }
  };

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
        {hover && (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between z-30 p-2">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <a
                  className="bg-white w-7 h-7 hover:opacity-100 hover:shadow-sm hover:duration-300 hover:scale-125 outline-none  rounded-full flex justify-center items-center text-3xl text-black opacity-40"
                  download
                  href={`${image?.asset?.url}?dl=`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {saved ? (
                <button className="bg-red-600">{save?.length}Saved</button>
              ) : (
                <button
                  className="bg-red-500 scale-90 hover:scale-100 hover:duration-300 text-sm outline-none opacity-60  hover:opacity-100 hover:shadow-md px-5 py-1 rounded-3xl "
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoopPin;
