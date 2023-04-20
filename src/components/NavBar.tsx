import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import ProfileAvatar from "./ProfileAvatar";

const NavBar = () => {
  const { user } = useContext(AuthContext);

  const data = [
    { title: "Home", path: "/"},
    { title: "Schedule", path: "/schedule" },
    { title: "History", path: "/history" },
  ];

  return (
    <div className="p-2 border-b-2">
      <div className="py-2 flex justify-between items-center container mx-auto">
        <Link className="text-xl font-bold cursor-pointer" to="/">
          Movz<span className="text-orange">.</span>
        </Link>

        <div className="flex gap-10 text-light hover:cursor-pointer ">
          {data.map((data, index) => (
            <Link
              className="hover:text-blue transition-all duration-200"
              key={index}
              to={data.path}
            >
              {data.title}
            </Link>
          ))}
        </div>

        {user ? (
          <ProfileAvatar />
        ) : (
          <Link
            className="bg-orange rounded-xl px-4 py-2 cursor-pointer hover:bg-[#eb8f48]"
            to="/login"
          >
            <button className="text-white drop-shadow-md">Sign in</button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default NavBar;
