import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="background-error">
      <div className="art-work container w-[90%] xl:max-w-5xl flex flex-col justify-center items-center h-screen mx-auto">
        <img
          src={
            process.env.PUBLIC_URL + "/assets/404 Page Not Found _Isometric.svg"
          }
          alt="404-img"
        />
        <h1 className="font-bold text-2xl my-3">페이지를 찾을 수 없습니다.</h1>
        <p className="text-center">
          요청하신 페이지가 더 이상 존재하지 않거나, 찾으려는 페이지의 주소가
          잘못되었어요!
        </p>
        <button className="btn btn-warning mt-4" onClick={() => navigate("/")}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default NotFound;
