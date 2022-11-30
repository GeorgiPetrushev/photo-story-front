import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import Layout from "./Layout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(true);

  return loading ? <Spinner message='Loading...'></Spinner> : <div></div>;
};

export default Feed;
