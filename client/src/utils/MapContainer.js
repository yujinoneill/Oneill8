export const MapContainer = () => {
  const { kakao } = window;

  // 지도를 표시할 div
  const container = document.getElementById("map");
  const options = {
    center: new kakao.maps.LatLng(35.16041198630581, 126.87917859023372),
    level: 3,
  };

  // 지도 생성해서 반환
  return new kakao.maps.Map(container, options);
};
