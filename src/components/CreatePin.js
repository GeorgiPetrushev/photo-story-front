import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import Spinner from "./Spinner";
import { SlCloudUpload } from "react-icons/sl";
import { MdDeleteForever } from "react-icons/md";
import { categories } from "../data";

const CreatePin = ({ user }) => {
  //navigate
  const navigate = useNavigate();
  //useStates
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [web, setWeb] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(false);
  const [imageAsset, setImageAsset] = useState(false);
  const [wrongImgType, setWrongImgType] = useState(false);
  //
  //
  //
  //testing
  useEffect(() => {
    console.log(user);
    console.log(client);
    console.log(categories[1].name);
  }, []);
  //
  //
  //
  //uploadImage
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setWrongImgType(false);
      setLoading(true);
      client.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
      setWrongImgType(true);
    }
  };
  //
  //
  //
  //
  //Save
  const savePin = () => {
    if(title && about && web && imageAsset?._id && category){
      console.log('yes');
    }
    else{console.log('no')}
  };
  //
  //
  //
  //
  //return
  return (
    <div className="flex justify-center items-center mt-3 lg:4/5">
      {fields && <p className="text-red-400">There are blank fields!</p>}
      <div className="flex flex-col lg:flex-row justify-center items-center p-3 lg:p-6 w-full lg:w-4/5">
        <div className="p-3 bg-secondaryColor w-full flex flex-0.7">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-500 p-3 w-full h-420">
            {loading && (
              <div>
                <Spinner />
                <h2 className="text-center">Loading...</h2>
              </div>
            )}
            {wrongImgType && <h3>Wrong image type.</h3>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center">
                    <h3 className="font-bold text-5xl">
                      <SlCloudUpload />
                    </h3>
                    <h3 className="text-lg"> Click to upload</h3>
                  </div>
                  <h3 className="mt-20 text-gray-500">
                    Image Type JPG, SVG, PNG, GIF less than 20MB
                  </h3>
                </div>
                <input
                  name="upload-image"
                  type="file"
                  className="w-0 h-0"
                  onChange={uploadImage}
                ></input>
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  className="h-full w-full"
                  alt="Error pic"
                />
                <button
                  className="absolute bottom-2 right-2 p-4 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-lg hover:bg-red-400 transition-all duration-700 ease-in-out"
                  type="button"
                  onClick={() => {
                    setImageAsset(null);
                  }}
                >
                  {" "}
                  <MdDeleteForever className="hover:scale-125 duration-500" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-6 w-full">
          <input
            placeholder="Add title "
            type="text"
            className="outline-none text-2xl sm:text-4xl font-bold border-b-2 border-gray-400 p-3"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          ></input>
          {user && (
            <div className="flex gap-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                className="w-12 h-12 rounded-full"
                alt="user-img"
              />
              <h3 className="text-xl font-bold">{user.userName}</h3>
            </div>
          )}
          <input
            placeholder="Describe your photo"
            type="text"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-400 p-3"
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            value={about}
          ></input>
          <input
            placeholder="Add a link"
            type="text"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-400 p-3"
            onChange={(e) => {
              setWeb(e.target.value);
            }}
            value={web}
          ></input>
          <div className="flex flex-col">
            <div>
              <h3 className="mb-3 font=semibold  text-lg ">Select Category</h3>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 rounded-sm outline-none w-4/5 cursor-pointer border-b-2 border-gray-300"
              >
                <option>Select</option>
                {categories.map((category) => (
                  <option
                    className="text-base outline-none border-none capitalize bg-white text-black"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                className="p-2 bg-red-400 text-white rounded-full w-28 outline-none"
                onClick={savePin}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
