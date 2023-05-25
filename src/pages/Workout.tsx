import Intensity from "../components/Intensity";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import Comments from "../components/Comments";
import MapWorkout from "../components/Map/MapWorkout";
import { WorkoutUsersService } from "./../services/WorkoutUsersService";
import { WorkoutService } from "../services/WorkoutService";
import { IResult } from "../domain/IResult";
import Tooltip from "../components/Tooltip";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Workout = () => {
  const navigate = useNavigate();
  let { id } = useParams<{ id?: string }>();
  const { user } = useContext(AuthContext);
  const [joined, setJoined] = useState(false);
  const [workout, setWorkout] = useState({} as IResult);
  const [scheduleId, setScheduleId] = useState("");
  const [activeTab, setActiveTab] = useState("Comments");
  const workoutService = new WorkoutService();

  const addToSchedule = async () => {
    if (!user) {
      return toast.error("You must be logged in!");
    }

    const data = {
      AppUserId: user.id,
      WorkoutId: id,
    };

    const workoutUsersService = new WorkoutUsersService();
    const res = await workoutUsersService.addToSchedule(data);

    if (res?.status == 200) {
      setScheduleId(res!.data.id);

      toast.success("Successfully registered!");
      setJoined(true);
    } else if (res) {
      toast.error(res.error);
      setJoined(false);
    }
  };

  const removeFromSchedule = async () => {
    const workoutUsersService = new WorkoutUsersService();

    await workoutUsersService.removeFromSchedule(scheduleId);

    setJoined(false);
    toast.success("Successfully unregistered!");
  };

  const removeWorkout = async () => {
    await workoutService.deleteById(id as string);
    // await workoutUsersService.removeFromSchedule(scheduleId);

    // setJoined(false);
    toast.success("Successfully deleted!");
  };

  const editWorkout = async () => {
    // await workoutService.deleteById(id as string);
    // await workoutUsersService.removeFromSchedule(scheduleId);

    // setJoined(false);
    // toast.success("Successfully deleted!");
    navigate("/edit-workout", { state: workout });
  };

  useEffect(() => {
    workoutService.getById(id as string).then((response) => {
      if (response) {
        setWorkout(response);
        if (user) {
          var id = response.workoutUsers.find(
            (c: any) => c.appUserId === user.id
          )?.id;

          setScheduleId(id);
          setJoined(id !== undefined);
        }
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

          <div className="flex items-center gap-2">
            {joined ? (
              <div className="cursor-pointer rounded-md relative inline-flex group items-center justify-center px-2.5 py-1 m-1 border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-[#50C878] to-[#41a763] border-[#3b9459] text-white">
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

            {/* <div className="cursor-pointer rounded-md relative inline-flex group items-center justify-center px-2.5 py-1 m-1 border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-orange to-[#f1cb20] border-[#d8952f] text-white">
              <span
                className="relative tracking-wider font-medium text-sm"
                onClick={() => removeFromSchedule()}
              >
                EDIT
              </span>
            </div> */}

            {workout.appUser?.id == user?.id && (
              <>
                <Tooltip message="delete">
                  <MdDelete
                    size={25}
                    className="cursor-pointer text-red-600"
                    onClick={() => removeWorkout()}
                  />
                </Tooltip>

                <Tooltip message="edit">
                  <MdEdit
                    size={20}
                    className="cursor-pointer text-amber-500"
                    onClick={() => editWorkout()}
                  />
                </Tooltip>
              </>
            )}

            {/* <div className="cursor-pointer rounded-md relative inline-flex group items-center justify-center px-2.5 py-1 m-1 border-b-4 border-l-2 shadow-lg bg-gradient-to-tr from-[#EE4B2B] to-[#D22B2B] border-[#C41E3A] text-white">
              <span
                className="relative tracking-wider font-medium text-sm"
                onClick={() => removeWorkout()}
              >
                DELETE
              </span>
            </div> */}
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <div className="px-2 py-1 rounded-lg bg-[#FFF6E7] text-orange font-semibold text-sm">
            {workout.workoutType?.name}
          </div>
          <div className="px-2 py-1 rounded-lg bg-slate-200 text-slate-500 text-sm">
            {workout.skillLevel?.name}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8  pt-9 ">
          <div className="flex flex-col gap-y-4 text-[#666]">
            <div className="">Organizer</div>
            <div className="">Participants</div>
            <div className="">Price</div>
            <div className="">Date</div>
            <div className="">Location Address</div>
            <div className="">Intensity</div>
          </div>

          {Object.values(workout).length != 0 && (
            <div className="flex flex-col gap-y-4 font-poppins">
              <div className="h-[24px]">
                <Link
                  className="inline-flex items-center leading-none text-sm text-gray-900"
                  to={`/profile/${workout.appUser.id}`}
                >
                  <img
                    id="avatar"
                    src={workout.appUser.image}
                    className="mr-2 w-7 h-7 rounded-full "
                    alt="Profile Avatar"
                  />
                  <p className="text-sm">
                    {workout.appUser.firstName} {workout.appUser.lastName}
                  </p>
                </Link>
              </div>

              <div className="flex gap-2 h-[24px]">
                {workout.workoutUsers.map((element, i) => (
                  <Tooltip
                    key={i}
                    message={`${element.appUserFirstName} ${element.appUserLastName}`}
                  >
                    <Link to={`/profile/${element.appUserId}`}>
                      <img
                        className="w-7 h-7 border-2 border-white rounded-full dark:border-gray-800"
                        src={element.appUserImage}
                        alt="Profile image"
                      ></img>
                    </Link>
                  </Tooltip>
                ))}
              </div>

              <div>{workout.price == 0 ? "FREE" : workout.price + " €"}</div>
              <div>
                {dayjs(workout.startDate).format("MMM D, HH:mm")}
                {" - "}
                {dayjs(workout.endDate).format("HH:mm")}
              </div>
              <div>{workout.location?.name}</div>

              <div className="flex h-6">
                <Intensity name={workout.intensity?.name} />
              </div>
            </div>
          )}
        </div>

        <div className="pt-8 text-xl font-semibold">Description</div>
        <p className="text-[#666] font-normal pt-2">{workout.description}</p>

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

        {activeTab === "Comments" && (
          <Comments comments={workout.comments} workoutId={workout.id} />
        )}
      </div>
    </div>
  );
};
export default Workout;
