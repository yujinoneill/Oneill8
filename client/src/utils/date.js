export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); //padStart는 문자열에 적용가능하므로 String() 이용해서 문자열로 변환
  let day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
