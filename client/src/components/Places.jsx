const Places = ({ name, desc }) => {
  return (
    <div className="place-container grid grid-cols-1 lg:grid-cols-4 h-1/4 rounded-lg py-3 hover:cursor-pointer">
      <div className="image lg:col-span-1 rounded-lg bg-base-200 hidden lg:block"></div>
      <div className="desc lg:col-span-3 rounded-lg lg:ml-3 bg-slate-50">
        <p className="place-name font-bold mb-1">{name}</p>
        <p className="place-desc text-xs text-base-300">{desc}</p>
      </div>
    </div>
  );
};

export default Places;
