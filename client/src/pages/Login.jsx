import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useRef } from "react";

export default function Login() {
  const idRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("/api/login", {
      userId: idRef.current.value,
      password: pwRef.current.value,
    });
    navigate("/");
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
            <label className="label" htmlFor="id">
              <span className="label-text">아이디</span>
            </label>
            <input
              type="text"
              id="id"
              ref={idRef}
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
}
