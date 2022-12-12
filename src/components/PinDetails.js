import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RiFolderDownloadFill } from "react-icons/ri";
import { client, urlFor } from "../client";
import Spinner from "./Spinner";
import Layout from "./Layout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../data";

const PinDetails = ({ user }) => {
  const [pins, setPins] = useState(null);
  const [pinDetails, setPinDetails] = useState(null);
  const [addingComment, setAddingComment] = useState(false);
  const [comment, setComment] = useState("");
  const { pinId } = useParams();

  // getting details from sanity
  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetails(data[0]);
        // data[0] nee to get the fist arr only
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setPins(res);
          });
        }
      });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  return (
    <div className="flex xl-flex-row flex-col m-auto">
      {" "}
      {!pinDetails ? (
        <Spinner message={"Loading"} />
      ) : (
        <div className="flex xl-flex-row flex-col m-auto">
          <div className="flex items-center justify-center md:items-start flex-initial">
            <img
              className="rounded-3xl"
              src={pinDetails?.image && urlFor(pinDetails.image).url()}
              alt="img-details"
            />
          </div>
          <div className="w-full p-4 flex-1 xl:min-w-620">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {" "}
                <a
                  href={`${pinDetails.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <RiFolderDownloadFill />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PinDetails;
