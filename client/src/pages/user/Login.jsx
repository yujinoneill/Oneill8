import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const emailRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", {
        email: emailRef.current.value,
        password: pwRef.current.value,
      })
      .then((res) => {
        alert("Oneill8에 오신 걸 환영해요!");
        const maxAge = 60 * 60 * 24 * 7; // 서버가 설정한 쿠키 만료 기간과 일치시키기
        document.cookie = `username=${res.data}; path=/; max-age=${maxAge}`; // 모든 페이지에서 쿠키에 접근할 수 있도록 path 설정, 서버와 쿠키 만료 시점 일치시키기
      })
      .then(() => {
        navigate("/place");
      })
      .catch((err) => alert("다시 시도해 보세요!"));
  };

  return (
    <div className="background grid grid-cols-2">
      <section className="content flex flex-col justify-center items-center h-screen col-span-2 lg:col-span-1">
        <header className="font-bold text-center mb-5">
          <a href="/" className="text-2xl">
            Oneill8
          </a>
        </header>
        <main className="w-80">
          <form className="form-control w-full max-w-xs">
            <label className="label" htmlFor="email">
              <span className="label-text">이메일</span>
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label" htmlFor="password">
              <span className="label-text">비밀번호</span>
            </label>
            <input
              type="password"
              id="password"
              ref={pwRef}
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-primary my-5" onClick={submitHandler}>
              로그인
            </button>
            <p className="text-center">
              아직 계정이 없나요?{" "}
              <a href="/register" className="text-primary">
                회원가입
              </a>
            </p>
          </form>
        </main>
      </section>
      <section className="sidebar bg-primary hidden lg:block">
        <div className="art-work flex justify-center items-center h-screen">
          <img
            src={process.env.PUBLIC_URL + `/assets/Noodles _Isometric.svg`}
            alt="Noodle illust"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
