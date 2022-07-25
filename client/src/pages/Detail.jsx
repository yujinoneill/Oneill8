import { useEffect, useState } from "react";
import DetailMap from "../components/DetailMap";

const dummyData = [
  {
    id: 1,
    roadAddress: "광주 북구 첨단연신로107번길 6",
    lat: 35.2077048085125,
    lng: 126.863858013679,
    name: "뚜레주르 첨단신용점",
    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident cupiditate perspiciatis ab nam corporis, expedita praesentium repellat totam, eum fugit, modi necessitatibus. Sequi unde veniam quisquam facere corrupti aliquid sapiente!",
  },
];

const reviews = [
  {
    rate: 5,
    comment: "존맛탱!",
  },
];

const Detail = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  useEffect(() => {
    setTitle(dummyData[0].name);
    setDesc(dummyData[0].desc);
  }, []);

  return (
    <div className="container xl:max-w-7xl grid grid-cols-1 lg:grid-cols-2 mx-auto">
      <div className="card w-[90%] my-6 bg-base-100 shadow-xl justify-self-center lg:justify-self-end ">
        <figure>
          <img
            src="https://www.tlj.co.kr:7008/static/images/main/img_main2.jpg?v181022"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-2xl justify-center">{title}</h1>
          <h2 className="text-center">
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
            {dummyData[0].roadAddress}
          </h2>
          <p>{desc}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <DetailMap width="90%" height="250px" {...dummyData[0]} />
        <div className="review w-[90%] mt-4">
          <div class="card w-full bg-base-100 shadow-xl">
            <div class="card-body">
              <h4 className="font-bold">이미 다녀왔다면 후기를 남겨 보세요!</h4>
              <div className="rating gap-1">
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-red-400"
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-yellow-400"
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-lime-400"
                />
                <input
                  type="radio"
                  name="rating-3"
                  className="mask mask-heart bg-green-400"
                  checked
                />
              </div>
              <textarea
                className="border w-full"
                name="review"
                rows="4"
              ></textarea>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">작성 완료</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;