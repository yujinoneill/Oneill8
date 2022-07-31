// 로그인하여 브라우저 쿠키에 로그인 정보가 저장되어있는지 여부 확인
export const isLoggedIn = () => {
  return document.cookie.match("username");
};

// 로그인 정보 저장된 쿠키에서 username 분리
export const loggedInUsername = () => {
  return document.cookie.match("username").input.slice(9);
};
