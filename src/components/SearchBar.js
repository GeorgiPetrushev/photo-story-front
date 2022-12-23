import { useEffect, useState } from "react";
import { client } from "../client";
import Layout from "./Layout";
import { feedQuery, searchQuery } from "../data";
import Spinner from "./Spinner";

const SearchBar = ({ search, setSearch }) => {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState("");

  useEffect(() => {
    if (search) {
      setLoading(true);
      const query = searchQuery(search.toLowerCase());

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
  }, [search]);

  return (
    <div>
      {loading && <Spinner message="Please wait. Searching... " />}
      {pins.length !== 0 && <Layout pins={pins} />}
      {pins.length === 0 && search !== "" && !loading && (
        <div className="mt-9 text-xl text-center"> No Photo Found</div>
      )}
    </div>
  );
};

export default SearchBar;
