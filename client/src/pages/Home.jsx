import { useState, useEffect } from "react";

import axios from "axios";
import HomeMap from "../components/HomeMap";
import Places from "../components/Places";

const Home = () => {
  const dummyData = [
    {
      _id: 0,
      placeName: "우동맛집",
      desc: "존맛탱",
    },
  ];

  const [data, setData] = useState(dummyData);

  useEffect(() => {
    axios
      .get("/api")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container w-[90%] xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 absolute top-14 bottom-0 left-0 right-0">
      <div className="col-span-2">
        <HomeMap height="95%" />
      </div>
      <div className="places col-span-1 mt-5 mb-3 mx-auto lg:mr-5 overflow-y-scroll">
        {data.map((item) => {
          return <Places key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
