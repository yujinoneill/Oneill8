import { useEffect } from "react";
import { MapContainer } from "../utils/MapContainer";

const { kakao } = window;

const DetailMap = (props) => {
  useEffect(() => {
    // 지도 생성
    const map = MapContainer();

    // 위도와 경도를 props로 받아서 저장
    const coords1 = new kakao.maps.LatLng(props.lat, props.lng);

    // 결과값으로 받은 위치를 마커로 표시
    const marker = new kakao.maps.Marker({
      map: map,
      position: coords1,
    });

    // 인포윈도우로 장소에 대한 설명을 표시
    const infowindow = new kakao.maps.InfoWindow({
      content: `<div style="width:150px;text-align:center;padding:6px 0;">${props.name}</div>`,
    });
    infowindow.open(map, marker);

    // 지도의 중심을 결과값으로 받은 위치로 이동
    map.setCenter(coords1);
  }, [props]);

  return (
    <div
      className="rounded-xl mt-6 mx-6"
      id="map"
      style={{ width: `${props.width || "auto"}`, height: `${props.height}` }}
    />
  );
};

export default DetailMap;
