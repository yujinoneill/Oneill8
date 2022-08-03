import { useState, useEffect } from "react";

import { axiosInstance } from "../../config";
import PlacesMap from "../../components/PlacesMap";
import Place from "../../components/Place";

const dummyData = [
  {
    _id: 0,
    placeName: "우동맛집",
    desc: "존맛탱",
  },
];

const Plcaes = () => {
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    axiosInstance
      .get("/place")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container w-[90%] xl:max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 absolute top-14 bottom-0 left-0 right-0">
      <div className="col-span-2 min-h-[30vh]">
        <PlacesMap height="95%" data={data} />
      </div>
      <div className="places col-span-1 mt-5 mb-3 mx-auto lg:mr-5 overflow-y-scroll">
        {data.map((item) => {
          return <Place key={item._id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Plcaes;
