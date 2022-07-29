import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  // 아이디, 이메일, 비밀번호, 비밀번호 확인
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // 유효성 검사 메시지
  const [usernameMsg, setUsernameMsg] = useState();
  const [emailMsg, setEmailMsg] = useState();
  const [passwordMsg, setPasswordMsg] = useState();
  const [passwordConfirmMsg, setPasswordConfirmMsg] = useState();

  // 유효성 검사 통과 여부
  const [isUsername, setIsUsername] = useState();
  const [isEmail, setIsEmail] = useState();
  const [isPassword, setIsPassword] = useState();
  const [isPasswordConfirm, setIsPasswordConfirm] = useState();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("/api/register", {
      userId: idRef.current.value,
      email: emailRef.current.value,
      password: pwRef.current.value,
    });
    navigate("/");
  // 유효성 검사 함수
  const usernameHandler = (e) => {
    setUsername(e.target.value);

    if (e.target.value.length < 4) {
      setUsernameMsg("아이디가 너무 짧아요!");
      setIsUsername(false);
    } else if (e.target.value.length > 10) {
      setUsernameMsg("아이디가 너무 길어요!");
      setIsUsername(false);
    } else {
      setUsernameMsg("멋진 아이디예요!");
      setIsUsername(true);
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!emailRegex.test(e.target.value)) {
      setEmailMsg("올바른 이메일 형식이 아니에요!");
      setIsEmail(false);
    } else {
      setEmailMsg("멋진 이메일이네요!");
      setIsEmail(true);
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    const passwordRegex = /(?=.*\d)(?=.*[a-z]).{8,}/; // 영어 소문자, 숫자 포함 8자 이상 비밀번호

    if (!passwordRegex.test(e.target.value)) {
      setPasswordMsg("영어 소문자와 숫자 조합으로 8자리 이상 입력해야 해요!");
      setIsPassword(false);
    } else {
      setPasswordMsg("멋진 비밀번호군요!");
      setIsPassword(true);
    }
  };

  const passwordConfirmHandler = (e) => {
    setPasswordConfirm(e.target.value);

    if (e.target.value !== password) {
      setPasswordConfirmMsg("비밀번호가 일치하지 않아요!");
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMsg("비밀번호가 일치해요!");
      setIsPasswordConfirm(true);
    }
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
};

export default Register;
