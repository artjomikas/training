import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useRef } from "react";
import ProfileDropDown from "./ProfileDropDown";
import { useOnClickOutside } from "usehooks-ts";

const ProfileAvatar = () => {
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
        <h3
          id="name"
          className="font-poppins"
        >{`${user.firstName} ${user.lastName}`}</h3>
        <img
          id="avatar"
          src={user.image}
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
