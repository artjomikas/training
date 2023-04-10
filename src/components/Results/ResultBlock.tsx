import { IResult } from "../../domain/IResult";
import { MdLocationOn, MdAccessTimeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";
const ResultBlock = ({
  image,
  name,
  address,
  startTime,
  endTime,
  price,
  currentPersonsNumber,
}: IResult) => {
  return (
    <div className="rounded-2xl flex flex-col p-3 max-w-[210px] max-h-[300px] w-full border-[0.5px] border-solid border-[#E8ECF2] hover:border-[#b8c4da] cursor-pointer">
      <img src={image} className="h-[125px]"></img>

      <div className="pt-3 font-bold font-poppins text-[16px] break-words line-clamp-2 pb-3">
        {name}
      </div>

      <div className="flex items-center gap-1">
        <MdLocationOn />
        {/* <img src={MdLocationOn} className="pb-[1px]"></img> */}
        <p className="text-[14px]">{address}</p>
      </div>

      <div className="flex items-center gap-1">
        <MdAccessTimeFilled />
        {/* <img src={time} className="pb-[1px]"></img> */}
        <p className="text-[14px]">
          {startTime} - {endTime}
        </p>
      </div>

      <div className="border-b-2 mx-2 pt-3"></div>

      <div className="flex justify-between font-poppins font-bold text-[16px] pt-2">
        <p>{price == "free" ? "FREE" : price + "€"}</p>

        <div className="flex items-center">
          <FaUser />
          {/* <img src={user} className="pb-[1px]"></img> */}
          <p>{currentPersonsNumber}</p>
        </div>
      </div>
    </div>
  );
};
export default ResultBlock;
