import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer } from "../utils/MapContainer";

const { kakao } = window;

const PlacesMap = ({ height, data }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const map = MapContainer(7);

    data.forEach((item) => {
      // 마커에 표시할 맛집 이름과 맛집 위치
      const title = item.placeName;
      const position = new kakao.maps.LatLng(item.lat, item.lng);

      // 마커 생성
      const marker = new kakao.maps.Marker({
        map,
        position,
        title,
      });

      // 마커를 지도에 표시
      marker.setMap(map);

      // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성
      const iwContent = `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`;

      // 인포윈도우를 생성
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      // 마커에 마우스오버 이벤트를 등록
      kakao.maps.event.addListener(marker, "mouseover", () => {
        // 마커에 마우스오버 이벤트가 발생하면 인포 윈도우를 마커 위에 표시
        infowindow.open(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록
      kakao.maps.event.addListener(marker, "mouseout", () => {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거
        infowindow.close();
      });

      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", () => {
        // 클릭 시 해당 맛집 상세 페이지로 이동
        navigate(`/place/${item._id}`);
      });
    });
  }, [data]);

  return (
    <div
      className="rounded-xl mt-6 lg:mx-6"
      id="map"
      style={{ width: "auto", height: `${height}` }}
    />
  );
};

export default PlacesMap;
