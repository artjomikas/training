import { useContext } from "react";
import { DataContext } from "./../context/DataContext";
import { workoutTypes } from "../data/workoutTypes";

const WorkoutTypeFilter = () => {
  const { selectedWorkoutType, setSelectedWorkoutType } =
    useContext(DataContext);

  return (
    <div className="flex flex-col items-center">
      <p className="text-xl font-semibold">Workout Type</p>

      {/* <button onClick={() => console.log(selectedWorkoutType)}>CLICK</button> */}
      <div className="pt-6">
        <select
          value={selectedWorkoutType} // ...force the select's value to match the state variable...
          onChange={(e) => setSelectedWorkoutType(e.target.value)}
          className="input font-poppins w-full"
        >
          <option value={'8c090c9d-b0f4-4d83-a6c2-4bf94f4346bc'}>All</option>
          {workoutTypes.map((elem, index) => (
            <option key={index} value={elem.id}>
              {elem.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default WorkoutTypeFilter;
