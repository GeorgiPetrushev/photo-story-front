import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full mt-11">
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
      <h3 className="text-lg text-center px-2 pt-5"> {message}</h3>
    </div>
  );
};

export default Spinner;
