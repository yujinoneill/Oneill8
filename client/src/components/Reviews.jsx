import { useRef, useState } from "react";
import { useParams } from "react-router";

import axios from "axios";
import { isLoggedIn, loggedInUsername } from "../utils/cookies";

import { getStringDate } from "../utils/date";

const ReviewBox = ({ placeId, _id, author, rate, review, date }) => {
  const reviewId = _id;

  const reviewDeleteHandler = () => {
    if (window.confirm("리뷰를 삭제하시겠어요?")) {
      axios
        .delete(`/api/place/${placeId}/reviews/${reviewId}`)
        .then((res) => alert(res.data))
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl mt-4">
      <div className="card-body">
        <div className="rating">
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <input
                key={item}
                type="radio"
                name={`rating-${item}`}
                value={item}
                checked={rate === String(item) ? true : false}
                readOnly
                className="mask mask-star-2 bg-secondary"
              />
            );
          })}
        </div>
        <p>
          <span className="text-sm font-bold">{author.username}</span>
          <span className="text-xs text-base-300"> | {date}</span>
        </p>
        <p>{review}</p>
        {isLoggedIn() && loggedInUsername() === author.username && (
          <div className="card-actions justify-end">
            <button
              className="btn btn-sm btn-primary"
              onClick={reviewDeleteHandler}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Reviews = ({ data }) => {
  const [rate, setRate] = useState("5");
  const reviewRef = useRef();

  const { id } = useParams();

  const rateHandler = (e) => {
    setRate(e.target.value);
  };

  const reviewSubmitHandler = () => {
    if (reviewRef.current.value.length < 1) {
      return alert("리뷰를 작성해 주세요!");
    } else {
      axios
        .post(`/api/place/${id}/reviews`, {
          rate,
          review: reviewRef.current.value,
          date: getStringDate(new Date()),
        })
        .then((res) => alert(res.data))
        .then(() => (reviewRef.current.value = ""))
        .catch((err) => alert(err));
    }
  };

  return (
    <div className="review w-[90%] mb-6">
      {isLoggedIn() && (
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h4 className="font-bold">이미 다녀왔다면 후기를 남겨 보세요!</h4>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((item) => {
                return (
                  <input
                    key={item}
                    type="radio"
                    name={`rating-${item}`}
                    value={item}
                    checked={rate === String(item) ? true : false}
                    onChange={rateHandler}
                    className="mask mask-star-2 bg-secondary"
                  />
                );
              })}
            </div>
            <textarea
              className="w-full textarea textarea-bordered"
              name="review"
              rows="3"
              ref={reviewRef}
            ></textarea>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary btn-sm"
                onClick={reviewSubmitHandler}
              >
                작성 완료
              </button>
            </div>
          </div>
        </div>
      )}
      {data.reviews &&
        data.reviews.map((item) => {
          return <ReviewBox key={item._id} placeId={id} {...item} />;
        })}
    </div>
  );
};

export default Reviews;
