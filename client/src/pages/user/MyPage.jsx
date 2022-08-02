import { useEffect } from "react";

import axios from "axios";
import { useState } from "react";

const MyPage = () => {
  const [reviews, setReviews] = useState();

  useEffect(() => {
    axios
      .get("/api/mypage")
      .then((res) => setReviews(res.data))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="container xl:max-w-5xl flex flex-col items-center mx-auto mt-6">
      <h1 className="font-bold text-2xl mb-5">내가 쓴 리뷰 모아보기</h1>
      {reviews &&
        reviews.map((el) => {
          return (
            <div className="card w-96 bg-base-100 shadow-xl mb-4" key={el._id}>
              <div className="card-body">
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((item) => {
                    return (
                      <input
                        key={item}
                        type="radio"
                        name={`rating-${item}`}
                        value={item}
                        checked={el.rate === String(item) ? true : false}
                        readOnly
                        className="mask mask-star-2 bg-secondary"
                      />
                    );
                  })}
                </div>
                <span className="text-xs text-base-300">{el.date}</span>
                <p>{el.review}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MyPage;
