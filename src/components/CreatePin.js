import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";
import { SlCloudUpload } from "react-icons/si";
import { MdDeleteForever } from "react-icons/md";
import { categories } from "../data";

const CreatePin = ({ user }) => {
  //navigate
  const navigate = useNavigate();

  //useStates
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [web, setWeb] = useState("");
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImgType, setWrongImgType] = useState(false);

  //testing
  useEffect(() => {
    console.log(user);
    console.log(client);
    console.log(categories[1].name);
  }, []);

  return (
    <div className="flex justify-center items-center mt-3 lg:4/5">
      {fields && <p className="text-red-400">There are blank fields!</p>}
      <div className="flex flex-col lg:flex-row justify-center items-center p-3 lg:p-6 w-full lg:w-4/5">
        <div className="p-3 bg-secondaryColor w-full flex flex-0.7">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-500 p-3 w-full h-420">
            {loading && <div><Spinner /><h2 className="text-center">Loading...</h2></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
