import HomeMap from "../components/HomeMap";
import Places from "../components/Places";

const Home = () => {
  const dummyData = [
    {
      id: 0,
      name: "우동맛집",
      desc: "존맛탱",
    },
    {
      id: 1,
      name: "베이글맛집",
      desc: "존맛탱구리",
    },
    {
      id: 2,
      name: "우동맛집",
      desc: "존맛탱",
    },
    {
      id: 3,
      name: "베이글맛집",
      desc: "존맛탱구리",
    },
    {
      id: 4,
      name: "베이글맛집",
      desc: "존맛탱구리",
    },
  ];

  return (
    <div className="grid grid-cols-3 absolute top-14 bottom-0 left-0 right-0">
      <div className="places col-span-1 mt-5 mb-3 ml-5 overflow-y-scroll">
        {dummyData.map((item) => {
          return <Places key={item.id} {...item} />;
        })}
      </div>
      <div className="col-span-2">
        <HomeMap height="95%" />
      </div>
    </div>
  );
};

export default Home;
