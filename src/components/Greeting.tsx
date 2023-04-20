import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Greeting = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col">
      <h3 className="text-[35px] tracking-tight font-nexa leading-none">
        Hello{user ? `, ${user.firstName}` : ""}! 👋
      </h3>
      <h4 className="text-[26px] text-light font-light">
        let’s make some workout today.
      </h4>
    </div>
  );
};
export default Greeting;
