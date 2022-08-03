import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../config";

import { isLoggedIn, loggedInUsername } from "../utils/cookies";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (window.confirm("로그아웃하시겠어요?")) {
      axiosInstance
        .get("/logout")
        .then(() => {
          document.cookie = `username=${loggedInUsername()}; max-age=0`;
        })
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <nav className="navbar bg-base-100 border-b border-b-base-200 box-border">
      <div>
        <a href="/place" className="btn btn-ghost normal-case text-xl">
          Oneill8
        </a>
      </div>
      <div className="hidden lg:block grow">
        <ul className="menu menu-horizontal p-0 float-right">
          {isLoggedIn() ? (
            <>
              {loggedInUsername() === "oneill" && (
                <li>
                  <a href="/place/new">맛집 등록</a>
                </li>
              )}
              <li>
                <a href="/mypage">마이 페이지</a>
              </li>
              <li>
                <button
                  className="btn btn-primary text-primary-content"
                  onClick={logoutHandler}
                >
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login">로그인</a>
              </li>
              <li>
                <a
                  href="/register"
                  className="btn btn-primary text-primary-content"
                >
                  회원가입
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="dropdown ml-auto lg:hidden clear-both">
        <button tabIndex="0" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
        <ul
          tabIndex="0"
          className="menu menu-compact dropdown-content mt-3 p-2 right-1 shadow bg-base-100 rounded-box w-40"
        >
          {isLoggedIn() ? (
            <>
              {loggedInUsername() === "oneill" && (
                <li>
                  <a href="/place/new">맛집 등록</a>
                </li>
              )}
              <li>
                <a href="/mypage">마이 페이지</a>
              </li>
              <li>
                <button onClick={logoutHandler}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login">로그인</a>
              </li>
              <li>
                <a href="/register">회원가입</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
