import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProfileDropDown = (props: any) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="absolute rounded-md w-44 top-[70px] bg-white border-gray-200 text-sm drop-shadow-xl">
      {/* <p className="block py-2 px-4 border-b break-words mb-1 cursor-pointer">
          Signed in as <b>{user.name}</b>
        </p> */}

      <div className="cursor-pointer rounded-xl">
        <p className="block py-1"></p>

        <NavLink
          to="profile"
          onClick={() => props.setShowDropDown(!props.showDropDown)}
        >
          <p className="block py-2 px-4 hover:bg-gray-100">Profile</p>
        </NavLink>

        <NavLink to="settings">
          <p className="block py-2 px-4 hover:bg-gray-100">Settings</p>
        </NavLink>

        <NavLink
          to="/"
          className="block py-3 mb-2 px-4 hover:bg-gray-100 border-t-2"
          onClick={() => {
            props.setShowDropDown(!props.showDropDown);
            logout();

            // logout();
          }}
        >
          Sign Out
        </NavLink>
      </div>
    </div>
  );
};
export default ProfileDropDown;
