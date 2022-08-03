import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="background">
      <div className="container w-[90%] xl:max-w-5xl z-10 absolute inset-x-1/2 translate-x-[-50%]">
        <div className="flex flex-col justify-center items-center text-white mt-6 h-screen">
          <h1 className="font-bold text-2xl mb-5">Oneill8</h1>
          <p className="text-center leading-7">
            Oneill8에 오신 걸 환영합니다!
            <br />
            이 곳에서는 광주 토박이 개발자가 직접 가서 먹어 본 광주 맛집들을 한
            눈에 살펴 볼 수 있습니다.
            <br />
            느리지만 꾸준히 업데이트할 예정입니다.
            <br />
            피드백은 언제나 환영합니다 :)
          </p>
          <button className="btn glass mt-5" onClick={() => navigate("/place")}>
            구경하기
          </button>
        </div>
      </div>
      <ul className="fade-in-out">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Home;
