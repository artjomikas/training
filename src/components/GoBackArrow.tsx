import Tooltip from "./Tooltip";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const GoBackArrow = () => {
  return (
    <Link className="absolute left-[35%] top-4 cursor-pointer" to="/">
      <div className="w-full relative">
        <Tooltip message={"Go back"}>
          <div className="w-[100px]">
            <IoMdArrowRoundBack size="25" />
          </div>
        </Tooltip>
      </div>
    </Link>
  );
};
export default GoBackArrow;
