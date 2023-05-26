import { useContext, useState, useEffect } from "react";
import { WorkoutUsersService } from "../services/WorkoutUsersService";
import { AuthContext } from "../context/AuthContext";
import { group } from "group-items";
import { MdLocationOn, MdDateRange } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Tooltip from "../components/Tooltip";

const Schedule = () => {
  const workoutUsersService = new WorkoutUsersService();
  const { user } = useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState("");

  const [workouts, setWorkouts] = useState([] as any[]);
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    user &&
      workoutUsersService
        .getSchedule()
        .then((response) => {
          if (response) {
            const data = group(response)
              .by((workout) => dayjs(workout.workoutStartDate).format("D.MM"))
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
    }
  }, [selectedDate]);
  return (
    <div className="font-poppins container max-w-5xl mx-auto">
      <div className="flex items-end gap-x-16 border-b-[1px] mb-8 ">
        <h3 className="text-[45px] tracking-tight font-nexa  leading-14">
          Schedule
        </h3>

        <div className="flex gap-5 flex-nowrap overflow-auto">
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
        {workouts.length > 0 ? (
          workouts.map((res: any, i: number) => (
            <div
              key={i}
              className="flex justify-between border-gray-100 border px-3 py-6 rounded-2xl shadow-lg hover:bg-gray-100/30"
            >
              <div className="text-slate-700 flex flex-col gap-5 place-content-center w-[35%]">
                <div className="flex flex-row gap-2">
                  <MdLocationOn size={25} />
                  <p>{res.workoutLocationName}</p>
                </div>

                <div className="flex flex-row gap-2">
                  <MdDateRange size={25} />
                  <p>
                    {dayjs(res.workoutStartDate).format("HH:mm")}
                    {" - "}
                    {dayjs(res.workoutEndDate).format("HH:mm")}
                  </p>
                </div>

                <div className="flex flex-row gap-2  ">
                  <BiDumbbell size={20} />
                  <p>
                    {res.workoutWorkoutTypeName} / {res.workoutSkillLevelName}
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-[35%]">
                <div className="text-3xl capitalize font-medium">
                  {res.workoutName}
                </div>

                <div className="pt-2 text-sm">{res.workoutDescription}</div>
              </div>
              <div className="flex flex-col justify-between select-none w-[30%]">
                <div className="flex -space-x-4 justify-end">
                  {res.workoutUsers.map((user: any, index: number) => (
                    <Tooltip
                      message={`${user.appUserFirstName} ${user.appUserLastName}`}
                    >
                      <Link to={`/profile/${user.appUserId}`}>
                        <img
                          key={index}
                          className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                          src={user.appUserImage}
                          alt=""
                        ></img>
                      </Link>
                    </Tooltip>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Link
                    className="p-2 border rounded-xl cursor-pointer hover:bg-gray-300"
                    to={{
                      pathname: `/workout/${res.workoutId}`,
                    }}
                  >
                    more info
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : user ? (
          <p>No schedule found :(</p>
        ) : (
          <p>You must be logged in to see schedule</p>
        )}
      </div>
    </div>
  );
};
export default Schedule;
