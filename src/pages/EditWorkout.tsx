import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IEditWorkout } from "../domain/IEditWorkout";
import DatePicker from "react-datepicker";
import { workoutTypes } from "../data/workoutTypes";
import { workoutIntensities } from "../data/workoutIntensities";
import { skillLevels } from "../data/skillLevels";
import AutofillCheckoutDemo from "../components/AutofillCheckoutDemo";
import { WorkoutService } from "../services/WorkoutService";

const EditWorkout = () => {
  const { state } = useLocation();
  const [location, setLocation] = useState<any>("");
  const navigate = useNavigate();

  const [values, setValues] = useState<IEditWorkout>({
    name: state.name,
    id: state.id,
    image: state.image,
    description: state.description,
    startDate: new Date(state.startDate),
    endDate: new Date(state.endDate),
    workoutTypeId: state.workoutTypeId,
    intensityId: state.intensityId,
    skillLevelId: state.skillLevelId,
    maxParticipants: state.maxParticipants,
    price: state.price,
    location: state.location,
  });

  const handleChange = (e: any) => {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (location) {
        const object = {
          name: location.properties.address_line1,
          latitude: location.geometry.coordinates[1],
          longitude: location.geometry.coordinates[0],
        };

        values.location = object;
      }


      const workoutService = new WorkoutService();
      const resp = await workoutService.updateWorkout(values);

      navigate(`/workout/${values.id}`)
      // setAdded(true);

      // setInterval(() => setAdded(false), 4000);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setValues({
  //     name: state.name,
  //     id: state.id,
  //     description: state.description,
  //     startDate: state.startDate,
  //     endDate: state.endDate,
  //     currentParticipants: state.currentParticipants,
  //     maxParticipants: state.maxParticipants,
  //     price: state.price,
  //     workoutTypeId: state.workoutTypeId,
  //     locationId: state.locationId,
  //     intensityId: state.intensityId,
  //     skillLevelId: state.skillLevelId,
  //     location: state.location,
  //   });
  // }, [state]);

  return (
    <div className="mx-auto font-poppins">
      <div className="w-[80%] mx-auto pb-8">
        <h1 className="text-5xl leading-relaxed font-bold bg-gradient-to-r from-slate-800 to-violet-800 bg-clip-text  text-transparent">
          Edit workout
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-16 w-[80%] mx-auto">
          <div className="flex flex-col space-y-6">
            <div className="w-full ">
              <label className="label" htmlFor="workout-name">
                Workout Name
              </label>
              <input
                className="input"
                type="text"
                required
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                autoFocus
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
                name="price"
                value={values.price.toString() || ""}
                onChange={handleChange}
              />
            </div>

            <div className="w-full">
              <label className="label" htmlFor="workout-type">
                Workout Type
              </label>

              <select
                className="input"
                id="workout-type"
                name="workoutTypeId"
                required
                onChange={handleChange}
              >
                {workoutTypes.map((elem, index) => (
                  <option
                    key={index}
                    value={elem.id}
                    defaultValue={values.workoutTypeId}
                  >
                    {elem.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex">
              <div className="w-full pr-6">
                <label className="label" htmlFor="intensityId">
                  Insensitivity
                </label>
                <select
                  className="input"
                  id="intensityId"
                  required
                  onChange={handleChange}
                >
                  {workoutIntensities.map((elem, index) => (
                    <option
                      key={index}
                      value={elem.id}
                      defaultValue={values.intensityId}
                    >
                      {elem.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label className="label" htmlFor="skillLevelId">
                  Skill Level
                </label>
                <select
                  className="input"
                  id="skillLevelId"
                  required
                  onChange={handleChange}
                >
                  {skillLevels.map((elem, index) => (
                    <option
                      key={index}
                      value={elem.id}
                      defaultValue={values.skillLevelId}
                    >
                      {elem.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full">
              <label className="label" htmlFor="maxParticipants">
                Maximum participants
              </label>
              <input
                className="input mt-1"
                name="maxParticipants"
                id="maxParticipants"
                type="number"
                value={values.maxParticipants.toString() || ""}
                onChange={handleChange}
                min={1}
                required
              />
            </div>

            <div className="flex">
              <div className="w-full pr-6">
                <label className="label" htmlFor="workout-name">
                  Start Date
                </label>

                {values.startDate && (
                  <div className="mt-2">
                    <DatePicker
                      className="cursor-pointer input"
                      selected={values.startDate}
                      onChange={(date) =>
                        setValues((oldValues) => ({
                          ...oldValues,
                          ["startDate"]: date as Date,
                        }))
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy HH:mm"
                    />
                  </div>
                )}
              </div>

              <div className="w-full">
                <label className="label" htmlFor="workout-name">
                  End Date
                </label>

                <div className="mt-2">
                  {values.endDate && (
                    <DatePicker
                      className="input cursor-pointer"
                      selected={values.endDate}
                      onChange={(date) =>
                        setValues((oldValues) => ({
                          ...oldValues,
                          ["endDate"]: date as Date,
                        }))
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy HH:mm"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              <label className="label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                value={values.description}
                onChange={handleChange}
                name="description"
                rows={4}
                className="input pb-0"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
          </div>

          <AutofillCheckoutDemo
            defLocation={values.location.name}
            setLocation={setLocation}
          />

          <div className="flex">
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-700 active:bg-slate-900 focus:outline-none focus:border-slate-900 focus:ring focus:ring-slate-300 disabled:opacity-25 transition"
            >
              edit workout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditWorkout;
