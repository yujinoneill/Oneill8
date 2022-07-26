import { useNavigate } from "react-router";

const Places = ({ _id, placeName, desc, image }) => {
  const navigate = useNavigate();

  return (
    <div
      className="place-container grid grid-cols-1 lg:grid-cols-4 h-1/5 rounded-lg py-3 hover:cursor-pointer"
      onClick={() => navigate(`/place/${_id}`)}
    >
      <div className="image lg:col-span-1 rounded-lg bg-base-200 hidden lg:block overflow-hidden">
        <img src={image} alt={`${placeName} 대표 사진`} />
      </div>
      <div className="desc lg:col-span-3 rounded-lg lg:ml-3 bg-slate-50">
        <p className="place-name font-bold mb-1">{placeName}</p>
        <p className="place-desc text-xs text-base-300">{desc}</p>
      </div>
    </div>
  );
};

export default Places;
