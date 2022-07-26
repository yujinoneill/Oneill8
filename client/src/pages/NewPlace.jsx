import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { MapContainer } from "../utils/MapContainer";
import axios from "axios";

const { kakao } = window;

const NewPlace = () => {
  const placeNameRef = useRef();
  const placeAddressRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();

  const [address, setAddress] = useState("광주 서구 무진대로 904");
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // 지도 생성
    const map = MapContainer();

    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색
    geocoder.addressSearch(address, (result, status) => {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        setLat(result[0].y);
        setLng(result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시
        const infowindow = new kakao.maps.InfoWindow({
          content:
            '<div style="width:150px;text-align:center;padding:6px 0;">이 주소가 맞나요?</div>',
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동
        map.setCenter(coords);
      }
    });
  }, [address, lat, lng]);

  const searchPlaceHandler = (e) => {
    e.preventDefault();
    setAddress(placeAddressRef.current.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (placeNameRef.current.value.length < 1) {
      placeNameRef.current.focus();
      return;
    }

    if (placeAddressRef.current.value.length < 1) {
      placeAddressRef.current.focus();
      return;
    }

    if (descRef.current.value.length < 1) {
      descRef.current.focus();
      return;
    }

    if (imageRef.current.value.length < 1) {
      imageRef.current.focus();
      return;
    }

    await axios.post("/api/place/new", {
      placeName: placeNameRef.current.value,
      roadAddress: placeAddressRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value,
      lat,
      lng,
    });
    navigate("/");
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="container xl:max-w-5xl  mx-auto">
      <div className="form flex flex-col items-center mt-6">
        <h1 className="font-bold text-2xl mb-5">새로운 맛집 등록하기</h1>
        <div className="w-[90%]">
          <form className="form-control w-full">
            <label className="label" htmlFor="place-name">
              <span className="label-text">맛집 이름</span>
            </label>
            <input
              type="text"
              id="place-name"
              ref={placeNameRef}
              className="input input-bordered w-full"
            />
            <label className="label" htmlFor="address">
              <span className="label-text">맛집 주소</span>
            </label>
            <div className="flex">
              <input
                type="text"
                id="address"
                ref={placeAddressRef}
                className="input input-bordered w-full mr-3"
              />
              <button
                className="btn btn-secondary btn-outline"
                onClick={searchPlaceHandler}
              >
                주소 확인
              </button>
            </div>
            <div
              className="rounded-xl my-3"
              id="map"
              style={{ width: "100%", height: "200px" }}
            />
            <label className="label" htmlFor="desc">
              <span className="label-text">간단한 설명 및 리뷰</span>
            </label>
            <textarea
              id="desc"
              ref={descRef}
              className="input input-bordered w-full"
            />
            <label className="label" htmlFor="image">
              <span className="label-text">맛집 이미지</span>
            </label>
            <input
              type="text"
              id="image"
              ref={imageRef}
              className="input input-bordered w-full"
            />
            <button className="btn btn-secondary mt-5" onClick={submitHandler}>
              맛집 등록
            </button>
            <button className="btn btn-neutral my-5" onClick={cancelHandler}>
              등록 취소
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPlace;
