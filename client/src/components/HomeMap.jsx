import { useEffect } from "react";
import { MapContainer } from "../utils/MapContainer";

const HomeMap = (props) => {
  useEffect(() => {
    MapContainer();
  }, []);

  return (
    <div
      className="rounded-xl mt-6 mx-6"
      id="map"
      style={{ width: `${props.width || "auto"}`, height: `${props.height}` }}
    />
  );
};

export default HomeMap;
