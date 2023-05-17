import { useLocation } from "react-router-dom";
import Intensity from "../components/Intensity";
import { format } from "date-fns";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Comments from "../components/Comments";
import MapWorkout from "../components/Map/MapWorkout";
import { WorkoutUsersService } from "./../services/WorkoutUsersService";
import { WorkoutService } from "../services/WorkoutService";
import { IResult } from "../domain/IResult";

const Workout = () => {
  let { id } = useParams<{ id?: string }>();
  const { user } = useContext(AuthContext);
  const [joined, setJoined] = useState(false);
  const [workout, setWorkout] = useState({} as IResult);
  const [scheduleId, setScheduleId] = useState("");
  const [activeTab, setActiveTab] = useState("Comments");
  const workoutService = new WorkoutService();

  const addToSchedule = async () => {
    const data = {
      AppUserId: user.id,
      WorkoutId: id,
    };

    const workoutUsersService = new WorkoutUsersService();
    const res = await workoutUsersService.addToSchedule(data);

    setScheduleId(res.id);
    setJoined(true);
  };

  const removeFromSchedule = async () => {
    const workoutUsersService = new WorkoutUsersService();

    await workoutUsersService.removeFromSchedule(scheduleId);

    setJoined(false);
  };

  useEffect(() => {
    workoutService.getById(id as string).then((response) => {
      if (response) {
        setWorkout(response);
        var id = response.workoutUsers.find(
          (c: any) => c.appUserId === user.id
        )?.id;

        setScheduleId(id);
        setJoined(id !== undefined);
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="w-full">
        <div className="flex flex-row items-center gap-4 font-poppins">
          <h1 className="text-4xl font-medium capitalize font-poppins">
            {workout.name}
          </h1>

          <div>
            {joined ? (
              <div className="rounded-md relative inline-flex group items-center justify-center px-2.5 py-1 m-1 border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-[#50C878] to-[#41a763] border-[#3b9459] text-white">
                <span
                  className="relative tracking-wider font-medium text-sm"
                  onClick={() => removeFromSchedule()}
                >
                  JOINED
                </span>
              </div>
            ) : (
              <button
                className="rounded-md relative inline-flex group items-center justify-center px-2.5 py-1 m-1 cursor-pointer border-b-4 border-l-2 active:border-[#8d5f1f] active:shadow-none shadow-lg bg-gradient-to-tr from-[#F39F2D] to-[#faae44] border-[#c08026] text-white"
                onClick={() => addToSchedule()}
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
            {workout.workoutTypeName}
          </div>
          <div className="px-2 py-1 rounded-lg bg-slate-200 text-slate-500 text-sm">
            {workout.skillLevelName}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8  pt-9 ">
          <div className="flex flex-col gap-y-4 text-[#666]">
            <div className="">Participants</div>
            <div className="">Price</div>
            <div className="">Date</div>
            <div className="">Location Address</div>
            <div className="">Intensity</div>
          </div>

          {Object.values(workout).length != 0 && (
            <div className="flex flex-col gap-y-4 my-auto font-poppins">
              <div className="">-</div>

              <div className="">
                {workout.price == 0 ? "FREE" : workout.price + " €"}
              </div>
              <div className="">
                {format(Date.parse(workout.startDate), "LLLL e, kk:mm")} -
                {format(Date.parse(workout.endDate), "kk:mm")}
              </div>
              <div className="">{workout.locationName}</div>

              <div className="flex h-6">
                <Intensity name={workout.intensityName} />
              </div>
            </div>
          )}
        </div>

        <div className="pt-8 text-xl font-semibold">Description</div>
        <p className="text-[#666] font-normal pt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          libero non commodi similique magnam sequi neque, consequuntur
          distinctio ipsa modi quidem, officiis obcaecati. Maxime nostrum
          recusandae minima veritatis tempore praesentium!
        </p>

        <div className="duration-300 border-b-2 border-blue-500 w-[35%] pt-14 gap-14 flex flex-row">
          {["Comments", "Map"].map((data, index) => (
            <a
              key={index}
              className={`text-xl font-semibold cursor-pointer px-2 ${
                activeTab === data && "border-b-[3px] border-orange pb-[1px] "
              }`}
              onClick={() => setActiveTab(data)}
            >
              {data}
            </a>
          ))}
        </div>

        {activeTab === "Map" && <MapWorkout data={workout}></MapWorkout>}

        {activeTab === "Comments" && <Comments comments={workout.comments} workoutId={workout.id} />}
      </div>
    </div>
  );
};
export default Workout;
