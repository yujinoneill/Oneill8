const LoginDesign = ({ form, bgColor, svgName, imgAlt }) => {
  return (
    <div className="background grid grid-cols-2">
      <section className="content flex flex-col justify-center items-center h-screen col-span-2 lg:col-span-1">
        <header className="font-bold text-center mb-5">
          <a href="/place" className="text-2xl">
            Oneill8
          </a>
        </header>
        <main className="flex justify-center w-[90%] md:w-80">{form}</main>
      </section>
      <section className={`sidebar ${bgColor} hidden lg:block`}>
        <div className="art-work flex justify-center items-center h-screen">
          <img
            src={process.env.PUBLIC_URL + `/assets/${svgName}.svg`}
            alt={imgAlt}
          />
        </div>
      </section>
    </div>
  );
};

export default LoginDesign;
