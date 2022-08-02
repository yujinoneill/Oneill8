import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import DetailMap from "../../components/DetailMap";
import Reviews from "../../components/Reviews";
import { isLoggedIn, loggedInUsername } from "../../utils/cookies";

// Data
const dummyData = [
  {
    id: 1,
    roadAddress: "광주 동구 서석로 36",
    lat: 35.146148577409,
    lng: 126.91751491905569,
    name: "베비에르 문화의전당점",
    img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190129_56%2F1548721018631t8U40_JPEG%2FlvV2ykQatYjEg74JsSnmxrAU.JPG.jpg",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate perspiciatis ab nam corporis, expedita praesentium repellat totam, eum fugit, modi necessitatibus. Sequi unde veniam quisquam facere corrupti aliquid sapiente!",
  },
];

const Detail = () => {
  const [data, setData] = useState(dummyData);
  const [placeName, setPlaceName] = useState();
  const [roadAddress, setRoadAddress] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/place/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => alert(err));
  }, [id, data]);

  useEffect(() => {
    setPlaceName(data.placeName);
    setRoadAddress(data.roadAddress);
    setDesc(data.desc);
    setImage(data.image);
  }, [data.placeName, data.roadAddress, data.desc, data.image]);

  const placeDeleteHandler = () => {
    if (window.confirm("맛집을 삭제하시겠어요?")) {
      axios
        .delete(`/api/place/${id}`)
        .then((res) => alert(res.data))
        .then(() => navigate("/"))
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="container xl:max-w-7xl grid grid-cols-1 lg:grid-cols-2 mx-auto">
      <div className="card w-[90%] h-max my-6 bg-base-100 shadow-xl justify-self-center lg:justify-self-end ">
        <figure>
          <img src={image} alt={`${placeName} 대표 사진`} />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-2xl justify-center">{placeName}</h1>
          <h2 className="location-logo text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {roadAddress}
          </h2>
          <p className="text-center">{desc}</p>
          {isLoggedIn() && loggedInUsername() === "oneill" && (
            <div className="card-actions justify-end">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate(`/place/${id}/edit`)}
              >
                수정
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={placeDeleteHandler}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <DetailMap width="90%" height="250px" {...data} />
        <Reviews data={data} />
      </div>
    </div>
  );
};

export default Detail;
