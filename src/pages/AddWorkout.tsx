import AutofillCheckoutDemo from "../components/AutofillCheckoutDemo";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { workoutTypes } from "../data/workoutTypes";
import { workoutImages } from "../data/workoutImages";
import { skillLevels } from "../data/skillLevels";
import { workoutIntensities } from "../data/workoutIntensities";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { WorkoutService } from "../services/WorkoutService";

const AddWorkout = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [location, setLocation] = useState<any>("");

  const onSubmit = async (data: any) => {
    for (let workout of workoutImages) {
      if (workout.id == data.workoutTypeId) {
        console.log(workout.link.length);
        let rand = Math.floor(Math.random() * workout.link.length);
        data.image = workout.link[rand].link;
      }
    }

    data.location = {
      name: location.properties.address_line1,
      latitude: location.geometry.coordinates[1],
      longitude: location.geometry.coordinates[0],
    };

    data.startDate = startDate;
    data.endDate = endDate;

    data.appUserId = "378e2b3c-829c-48c6-83dc-fa2aab6b0709";
    const workoutService = new WorkoutService();

    const resp = await workoutService.add(data);
    console.log(resp);
    navigate("/");
  };

  return (
    // xl:w-1/3  2xl:w-1/4
    <div className="mx-auto font-poppins">
      <div className="w-[80%] mx-auto pb-8">
        <h1 className="text-5xl leading-relaxed font-bold bg-gradient-to-r from-slate-800 to-violet-800 bg-clip-text  text-transparent">
          Add workout
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-16 w-[80%] mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="w-full ">
              <label className="label" htmlFor="workout-name">
                Workout Name
              </label>
              <input
                className="input"
                id="workout-name"
                type="text"
                required
                autoFocus
                {...register("name")}
              />
            </div>

            <div className="w-full">
              <label className="label" htmlFor="price">
                Price €
              </label>
              <input
                className="input"
                id="price"
                type="number"
                min={0}
                required
                {...register("price")}
              />
            </div>

            <div className="w-full">
              <label className="label" htmlFor="workout-type">
                Workout Type
              </label>

              <select
                className="input"
                id="workout-type"
                required
                {...register("workoutTypeId")}
              >
                {workoutTypes.map((elem, index) => (
                  <option value={elem.id}>{elem.name}</option>
                ))}
              </select>
            </div>

            <div className="flex">
              <div className="w-full pr-6">
                <label className="label" htmlFor="workout-insensitivity">
                  Insensitivity
                </label>
                <select
                  className="input"
                  id="workout-insensitivity"
                  required
                  {...register("intensityId")}
                >
                  {workoutIntensities.map((elem, index) => (
                    <option value={elem.id}>{elem.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label className="label" htmlFor="workout-level">
                  Skill Level
                </label>
                <select
                  className="input"
                  id="workout-level"
                  required
                  {...register("skillLevelId")}
                >
                  {skillLevels.map((elem, index) => (
                    <option value={elem.id}>{elem.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="label" htmlFor="workout-name">
                Maximum participants
              </label>
              <input
                className="input mt-1"
                id="workout-name"
                type="number"
                {...register("maxParticipants")}
                min={1}
                required
              />
            </div>

            <div className="flex">
              <div className="w-full pr-6">
                <label className="label" htmlFor="workout-name">
                  Start Date
                </label>

                <div className="mt-2">
                  <DatePicker
                    className="cursor-pointer input"
                    selected={startDate}
                    minDate={new Date()}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy HH:mm"
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="label" htmlFor="workout-name">
                  End Date
                </label>

                <div className="mt-2">
                  <DatePicker
                    className="input cursor-pointer"
                    selected={endDate}
                    minDate={new Date()}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy HH:mm"
                  />
                </div>
              </div>
            </div>
          </div>

          <AutofillCheckoutDemo location={location} setLocation={setLocation} />

          <div className="flex">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-700 active:bg-slate-900 focus:outline-none focus:border-slate-900 focus:ring focus:ring-slate-300 disabled:opacity-25 transition"
            >
              add workout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default AddWorkout;
