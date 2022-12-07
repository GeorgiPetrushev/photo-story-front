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

  //testing
  useEffect(() => {
    console.log(user);
    console.log(client);
    console.log(categories[1].name);
  }, []);

  //uploadImage
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImgType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImgType(true);
    }
  };

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
                  onClick={()=> { setImageAsset(null)}}
                >
                  {" "}
                  <MdDeleteForever  className='hover:scale-125 duration-500'/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
