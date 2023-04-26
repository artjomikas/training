import { useLocation } from "react-router-dom";
import Intensity from "../components/Intensity";
import { format } from "date-fns";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";

import { WorkoutUsersService } from './../services/WorkoutUsersService';

const Workout = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);

  const [joined, setJoined] = useState(false);

  const {
    id,
    image,
    name,
    price,
    maxParticipants,
    startDate,
    endDate,
    workoutType,
    skillLevel,
    intensity,
    currentParticipants,
    description,
    location,
    workoutUsers,
  } = state.res;

  const joinWorkout = async () => {
    const data = {
      AppUserId: user.id,
      WorkoutId: id,
    };

    const workoutUsersService = new WorkoutUsersService();

    await workoutUsersService.add(data);

    setJoined(true);
  };

  useEffect(() => {
    var joinedValue =
      workoutUsers.find((c: any) => c.appUserId === user.id) !== undefined;
    setJoined(joinedValue);
  }, []);

  return (
    <>
      <div className="flex flex-row items-center gap-4 font-poppins">
        <h1 className="text-4xl font-medium capitalize font-poppins">{name}</h1>

        <div>
          {joined ? (
            <div className="rounded-md relative inline-flex group items-center justify-center px-2.5 py-1 m-1 border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-[#50C878] to-[#41a763] border-[#3b9459] text-white">
              <span className="relative tracking-wider font-medium text-sm">
                JOINED
              </span>
            </div>
          ) : (
            <button
              className="rounded-md relative inline-flex group items-center justify-center px-2.5 py-1 m-1 cursor-pointer border-b-4 border-l-2 active:border-[#8d5f1f] active:shadow-none shadow-lg bg-gradient-to-tr from-[#F39F2D] to-[#faae44] border-[#c08026] text-white"
              onClick={() => joinWorkout()}
            >
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <span className="relative tracking-wider font-medium text-sm">
                JOIN
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        <div className="px-2 py-1 rounded-lg bg-[#FFF6E7] text-orange font-semibold text-sm">
          {workoutType.name}
        </div>
        <div className="px-2 py-1 rounded-lg bg-slate-200 text-slate-500 text-sm">
          {skillLevel.name}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 w-[25%] pt-9 ">
        <div className="flex flex-col gap-y-4 text-[#666]">
          <div className="">Participants</div>
          <div className="">Price</div>
          <div className="">Date</div>
          <div className="">Location Address</div>
          <div className="">Intensity</div>
        </div>

        <div className="flex flex-col gap-y-4 my-auto font-poppins">
          <div className="">-</div>
          <div className="">{price == 0 ? "FREE" : price + " €"}</div>
          <div className="">
            {format(Date.parse(startDate), "LLLL e, kk:mm")} -{" "}
            {format(Date.parse(endDate), "kk:mm")}
          </div>
          <div className="">{location.name}</div>

          <div className="flex h-6">
            <Intensity name={intensity.name} />
          </div>
        </div>
      </div>

      <div className="pt-8 text-xl font-semibold">Description</div>
      <p className="w-[40%] text-[#666] font-normal pt-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
        libero non commodi similique magnam sequi neque, consequuntur distinctio
        ipsa modi quidem, officiis obcaecati. Maxime nostrum recusandae minima
        veritatis tempore praesentium!
      </p>

      <div className="duration-300 border-b-2 border-blue-500 w-[40%] pt-14 gap-14 flex flex-row">
        <a className="text-xl font-semibold border-b-[3px] border-orange px-2 pb-[1px]">
          Comments
        </a>

        <a className="text-xl font-semibold">Map</a>
      </div>
    </>
  );
};
export default Workout;
