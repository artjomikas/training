import { useContext, useState, useEffect } from "react";
import { WorkoutUsersService } from "../services/WorkoutUsersService";
import { AuthContext } from "../context/AuthContext";
import Workout from "./Workout";
import { group } from "group-items";
import { MdAccessTimeFilled, MdLocationOn, MdDateRange } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";

import {
  add,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";

const Schedule = () => {
  const workoutUsersService = new WorkoutUsersService();
  const { user } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState("");

  const [workouts, setWorkouts] = useState([] as any[]);
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    workoutUsersService.getSchedule({ appUserId: user.id }).then((response) => {
      if (response) {
        console.log(response);

        const data = group(response)
          .by((workout) =>
            format(Date.parse(workout.workout.startDate), "d.MM - iii")
          )
          .asEntries();

        setSelectedDate(data[0].key);
        setData(data);
      } else {
        setData([]);
      }
    });
  }, []);

  useEffect(() => {
    const workouts = data.find((x) => x.key === selectedDate);

    if (workouts != undefined) {
      setWorkouts(workouts.items);
      console.log(workouts);
    }
  }, [selectedDate]);
  return (
    <div className="font-poppins container max-w-5xl mx-auto">
      <div className="flex items-end gap-x-16 border-b-[1px] mb-8 ">
        <h3 className="text-[45px] tracking-tight font-nexa  leading-14">
          Schedule
        </h3>

        <div className="flex gap-16 flex-nowrap overflow-auto">
          {data.map((res: any, i: number) => (
            <div key={i}>
              <div
                className={`inline-block px-2 w-full whitespace-nowrap pb-2 cursor-pointer ${
                  selectedDate == res.key &&
                  "border-b-[3px] border-orange font-semibold"
                }`}
                onClick={() => setSelectedDate(res.key)}
              >
                {res.key}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {workouts.map((res: any, i: number) => (
          <div
            key={i}
            className="flex justify-between  border-gray-100 border p-6 rounded-2xl shadow-lg  hover:bg-gray-100/30 "
          >
            <div className="flex flex-col justify-between">
              <div className="w-full text-3xl capitalize font-medium">
                {res.workout.name}
              </div>

              <div className="pt-3 text-slate-700 font-light">
                <div className="flex flex-row gap-2 text-md">
                  <MdLocationOn size={20} />
                  <p>{res.workout.location.name}</p>
                </div>

                <div className="flex flex-row gap-2 ">
                  <MdDateRange size={20} />
                  <p>
                    {format(Date.parse(res.workout.startDate), "HH:MM")} -{" "}
                    {format(Date.parse(res.workout.endDate), "HH:MM")}
                  </p>
                </div>

                <div className="flex flex-row gap-2 ">
                  <BiDumbbell size={20} />
                  <p>{res.workout.workoutType.name}</p>
                </div>
              </div>
            </div>

            <div className="flex  flex-col justify-between">
              <div className="flex -space-x-4">
                <img
                  className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                  src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
                  alt=""
                ></img>{" "}
                <img
                  className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                  src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
                  alt=""
                ></img>{" "}
                <img
                  className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                  src="https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol-thumbnail.png"
                  alt=""
                ></img>
                <a
                  className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-orange border-2 border-white rounded-full"
                  href="#"
                >
                  +2
                </a>
              </div>
              <button className="p-2 border rounded-xl cursor-pointer hover:bg-gray-300">
                more info
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Schedule;
