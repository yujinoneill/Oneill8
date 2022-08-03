import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../../config";
import LoginDesign from "../../components/LoginDesign";

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

  // 회원가입
  const submitHandler = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/register", {
        username,
        email,
        password: passwordConfirm,
      })
      .then((res) => {
        alert("회원가입 성공!");
      })
      .then(() => navigate("/login"))
      .catch((err) => alert(err));
  };

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
    <LoginDesign
      form={
        <form className="form-control w-full max-w-xs">
          <label className="label" htmlFor="username">
            <span className="label-text">아이디</span>
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={usernameHandler}
            className="input input-bordered w-full max-w-xs"
          />
          {username.length > 0 && (
            <span
              className={`mt-2 text-sm text-${
                isUsername ? "primary" : "base-300"
              }`}
            >
              {usernameMsg}
            </span>
          )}
          <label className="label" htmlFor="email">
            <span className="label-text">이메일</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailHandler}
            className="input input-bordered w-full max-w-xs"
          />
          {email.length > 0 && (
            <span
              className={`mt-2 text-sm text-${
                isEmail ? "primary" : "base-300"
              }`}
            >
              {emailMsg}
            </span>
          )}
          <label className="label" htmlFor="password">
            <span className="label-text">비밀번호</span>
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={passwordHandler}
            className="input input-bordered w-full max-w-xs"
          />
          {password.length > 0 && (
            <span
              className={`mt-2 text-sm text-${
                isPassword ? "primary" : "base-300"
              }`}
            >
              {passwordMsg}
            </span>
          )}
          <label className="label" htmlFor="passwordConfirm">
            <span className="label-text">비밀번호 확인</span>
          </label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={passwordConfirmHandler}
            className="input input-bordered w-full max-w-xs"
          />
          {passwordConfirm.length > 0 && (
            <span
              className={`mt-2 text-sm text-${
                isPasswordConfirm ? "primary" : "base-300"
              }`}
            >
              {passwordConfirmMsg}
            </span>
          )}
          <button
            className="btn btn-secondary my-5"
            onClick={submitHandler}
            disabled={
              !(isUsername && isEmail && isPassword && isPasswordConfirm)
            }
          >
            회원가입
          </button>
          <p className="text-center">
            이미 회원이신가요?{" "}
            <a href="/login" className="text-secondary">
              로그인
            </a>
          </p>
        </form>
      }
      bgColor="bg-secondary"
      svgName="Cake_Isometric"
      imgAlt="Cake illust"
    />
  );
};

export default Register;
