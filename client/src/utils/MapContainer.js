export const MapContainer = (level) => {
  const { kakao } = window;

  // 지도를 표시할 div
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(35.18085512, 126.87727356),
    level,
  };

  // 지도 생성해서 반환
  return new kakao.maps.Map(container, options);
};
