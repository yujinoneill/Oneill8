import { useEffect, useState } from "react";
import DetailMap from "../components/DetailMap";

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

const reviews = [
  {
    id: 0,
    username: "qwerty",
    rate: 5,
    comment: "존맛탱!",
  },
  {
    id: 1,
    username: "asdfg",
    rate: 3,
    comment: "그저 그럼",
  },
];

// Components
const ReviewBox = ({ username, rate, comment }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl mt-4">
      <div className="card-body">
        <h2 className="card-title">{rate}</h2>
        <p>
          {username} : {comment}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-sm btn-primary">수정</button>
          <button className="btn btn-sm btn-primary">삭제</button>
        </div>
      </div>
    </div>
  );
};

const Detail = () => {
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  useEffect(() => {
    setTitle(dummyData[0].name);
    setDesc(dummyData[0].desc);
  }, []);

  return (
    <div className="container xl:max-w-7xl grid grid-cols-1 lg:grid-cols-2 mx-auto">
      <div className="card w-[90%] h-max my-6 bg-base-100 shadow-xl justify-self-center lg:justify-self-end ">
        <figure>
          <img src={dummyData[0].img} alt="베비에르 빵집 사진" />
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
        <div className="review w-[90%] mb-6">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
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
                className="w-full textarea textarea-bordered"
                name="review"
                rows="3"
              ></textarea>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm">작성 완료</button>
              </div>
            </div>
          </div>
          {reviews.map((item) => {
            return <ReviewBox key={item.id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
