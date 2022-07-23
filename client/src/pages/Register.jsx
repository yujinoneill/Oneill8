import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useRef } from "react";

export default function Register() {
  const idRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("/api/register", {
      userId: idRef.current.value,
      email: emailRef.current.value,
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
            <button className="btn btn-secondary my-5" onClick={submitHandler}>
              회원가입
            </button>
            <p className="text-center">
              이미 회원이신가요?{" "}
              <a href="/login" className="text-secondary">
                로그인
              </a>
            </p>
          </form>
        </main>
      </section>
      <section className="sidebar bg-secondary hidden lg:block">
        <div className="art-work flex justify-center items-center h-screen">
          <img
            src={process.env.PUBLIC_URL + `/assets/Cake_Isometric.svg`}
            alt="Cake illust"
          />
        </div>
      </section>
    </div>
  );
}
