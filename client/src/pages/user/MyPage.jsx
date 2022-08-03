import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../../config";

const MyPage = () => {
  const [reviews, setReviews] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/mypage")
      .then((res) => setReviews(res.data))
      .catch((err) => alert(err));
  }, []);

  return (
    <div className="container w-[90%] xl:max-w-5xl flex flex-col items-center mx-auto mt-6">
      <h1 className="font-bold text-2xl mb-5">내가 쓴 리뷰 모아보기</h1>
      {reviews && reviews.length > 0 ? (
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
                <div class="card-actions justify-end">
                  <button
                    class="btn btn-sm btn-primary"
                    onClick={() => navigate(`/place/${el.place}`)}
                  >
                    보러 가기
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center">
          리뷰를 남기지 않으셨네요!
          <br />
          방문한 맛집이 있다면 의견을 남겨 보시는 건 어떨까요?
        </p>
      )}
    </div>
  );
};

export default MyPage;
