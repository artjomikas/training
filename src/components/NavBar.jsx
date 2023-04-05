

const NavBar = () => {
  const data = ["Home", "Schedule", "History"];

  return (
    <div className="p-2 border-b-2">
      <div className="py-2 flex justify-between items-center container mx-auto">
        <h1 className="text-xl font-bold cursor-pointer">
          Movz<span className="text-orange">.</span>
        </h1>

        <div className="flex gap-10 text-light hover:cursor-pointer ">
          {data.map((elem) => (
            <h2 className="hover:text-blue transition-all duration-200">
              {elem}
            </h2>
          ))}
        </div>

        <div className="bg-orange rounded-xl px-4 py-2 cursor-pointer">
          <button className="text-white drop-shadow-md">Sign in</button>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
