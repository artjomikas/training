import { useContext, useEffect, useState } from "react";
import { IReview } from "../domain/IReview";
import { WorkoutService } from "../services/WorkoutService";
import Results from "../components/Results/Results";
import Greeting from "../components/Greeting";
import MapBox from "../components/Map/MapBox";
import Calendar from "./../components/Calendar";
import PriceFilter from "./../components/PriceFilter";
import WorkoutTypeFilter from "./../components/WorkoutTypeFilter";
import { DataContext } from "./../context/DataContext";

const Home = () => {
  const workoutService = new WorkoutService();
  const { selectedDate, selectedWorkoutType } = useContext(DataContext);
  const [data, setData] = useState([] as IReview[]);

  useEffect(() => {
    workoutService
      .getWithDate({
        startDate: selectedDate,
        workoutTypeId: selectedWorkoutType,
      })
      .then((response) => {
        if (response) {
          setData(response);
        } else {
          setData([]);
        }
      });
  }, [selectedDate, selectedWorkoutType]);

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <Greeting />
        <Results data={data} />
      </div>

      <div className="flex flex-col">
        <div className="flex gap-16">
          <Calendar />
          <WorkoutTypeFilter />
        </div>

        <MapBox data={data} />
      </div>
    </div>
  );
};
export default Home;
