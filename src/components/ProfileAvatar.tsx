import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useRef } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { useOnClickOutside } from "usehooks-ts";

const ProfileAvatar = () => {
  const url = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
  const { user } = useContext(AuthContext);
  const [showDropDown, setShowDropDown] = useState(false);

  const ref = useRef(null);
  const refAvatar = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (event.toElement.id != "avatar" && event.toElement.id != "name") {
      setShowDropDown(false);
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div className="">
      <button
        ref={refAvatar}
        className="items-center gap-4 cursor-pointer float-right flex"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <h3 id="name">{`${user[url + "givenname"]} ${
          user[url + "surname"]
        }`}</h3>
        <img
          id="avatar"
          src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
          className="h-9 w-9 rounded-full ring-2 ring-white "
          alt="Profile Avatar"
        />
      </button>

      {showDropDown && (
        <div ref={ref}>
          <ProfileDropDown
            setShowDropDown={setShowDropDown}
            showDropDown={showDropDown}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileAvatar;
