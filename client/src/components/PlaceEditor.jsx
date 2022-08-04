import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { MapContainer } from "../utils/MapContainer";
import { axiosInstance } from "../axiosConfig";

const { kakao } = window;

const PlaceEditor = ({ isEdit, originData }) => {
  const placeNameRef = useRef();
  const roadAddressRef = useRef();
  const descRef = useRef();
  const imageRef = useRef();

  const [placeName, setPlaceName] = useState("");
  const [roadAddress, setRoadAddress] = useState("광주 서구 무진대로 904");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && originData) {
      setPlaceName(originData.placeName);
      setRoadAddress(originData.roadAddress);
      setDesc(originData.desc);
      setImage(originData.image);
      setLat(originData.lat);
      setLng(originData.lng);
    }
  }, [isEdit, originData]);

  useEffect(() => {
    // 지도 생성
    const map = MapContainer();

    // 주소-좌표 변환 객체를 생성
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색
    geocoder.addressSearch(roadAddress, (result, status) => {
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
  }, [roadAddress, lat, lng]);

  const submitHandler = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (placeName.length < 1) {
      placeNameRef.current.focus();
      return;
    }

    if (roadAddress.length < 1) {
      roadAddressRef.current.focus();
      return;
    }

    if (desc.length < 1) {
      descRef.current.focus();
      return;
    }

    if (image.length < 1) {
      imageRef.current.focus();
      return;
    }

    if (
      window.confirm(isEdit ? "맛집 정보를 수정할까요?" : "맛집을 등록할까요?")
    ) {
      if (isEdit && originData) {
        axios
          .put(`/api/place/${id}/edit`, {
            placeName,
            roadAddress,
            desc,
            image,
            lat,
            lng,
          })
          .then((res) => alert(res.data))
          .then(() => navigate(`/place/${id}`))
          .catch((err) => alert(err));
      } else {
        axiosInstance
          .post("/place/new", {
            placeName,
            roadAddress,
            desc,
            image,
            lat,
            lng,
          })
          .then((res) => alert(res.data))
          .then(() => navigate("/place"))
          .catch((err) => alert(err));
      }
    }
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="container xl:max-w-5xl mx-auto">
      <div className="form flex flex-col items-center mt-6">
        <h1 className="font-bold text-2xl mb-5">
          {isEdit ? "맛집 정보 수정하기" : "새로운 맛집 등록하기"}
        </h1>
        <div className="w-[90%]">
          <form className="form-control w-full">
            <label className="label" htmlFor="place-name">
              <span className="label-text">맛집 이름</span>
            </label>
            <input
              type="text"
              id="place-name"
              ref={placeNameRef}
              value={placeName}
              onChange={(e) => setPlaceName(e.target.value)}
              className="input input-bordered w-full"
            />
            <label className="label" htmlFor="road-address">
              <span className="label-text">맛집 주소</span>
            </label>
            <input
              type="text"
              id="road-address"
              ref={roadAddressRef}
              value={roadAddress}
              onChange={(e) => setRoadAddress(e.target.value)}
              className="input input-bordered w-full mr-3"
            />
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
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="input input-bordered w-full"
            />
            <label className="label" htmlFor="image">
              <span className="label-text">맛집 이미지</span>
            </label>
            <input
              type="text"
              id="image"
              ref={imageRef}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="input input-bordered w-full"
            />
            <button className="btn btn-secondary mt-5" onClick={submitHandler}>
              {isEdit ? "맛집 수정" : "맛집 등록"}
            </button>
            <button className="btn btn-neutral my-5" onClick={cancelHandler}>
              {isEdit ? "수정 취소" : "등록 취소"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceEditor;
