import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import { searchQuery, feedQuery } from "../data";
import Layout from "./Layout";
import Spinner from "./Spinner";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  return loading ? (
    <Spinner message="Loading..."></Spinner>
  ) : (
    <div>{pins && <Layout pins={pins} />}</div>
  );
};

export default Feed;
