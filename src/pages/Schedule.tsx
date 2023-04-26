import { useContext, useState, useEffect } from "react";
import { WorkoutUsersService } from "../services/WorkoutUsersService";
import { AuthContext } from "../context/AuthContext";
import Workout from "./Workout";
import { group } from "group-items";
import { MdAccessTimeFilled } from "react-icons/md";

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
            format(Date.parse(workout.workout.startDate), "d.MM - iiii")
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
    <>
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

      <div className="flex flex-col gap-12">
        {workouts.map((res: any, i: number) => (
          <div key={i} className="flex gap-8 border-gray-200 border-b-[3px] pb-4">
            <div className="flex w-[20%] flex-col justify-between  p-1">
              <div className="flex items-center gap-2">
                <MdAccessTimeFilled size={30} />
                <p className="text-2xl">
                  {format(Date.parse(res.workout.startDate), "HH:MM")}
                </p>
              </div>
              <div className="font-poppins text-xl font-medium">{res.workout.price} €</div>
            </div>

            <img className="h-[180px] " src={res.workout.image}></img>
            <div className="w-full text-3xl capitalize pt-2">{res.workout.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Schedule;
