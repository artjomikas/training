import { useContext, useEffect, useState } from "react";
import { IReview } from "../domain/IReview";
import { WorkoutService } from "../services/WorkoutService";
import Results from "../components/Results/Results";
import Greeting from "../components/Greeting";
import MapBox from "../components/Map/MapBox";
import Calendar from "./../components/Calendar";
import PriceFilter from "./../components/PriceFilter";
import { DataContext } from "./../context/DataContext";
import { addDays } from "date-fns";

const Home = () => {
  const workoutService = new WorkoutService();
  const { selectedDate } = useContext(DataContext);

  const [data, setData] = useState([] as IReview[]);

  useEffect(() => {
    workoutService
      .getWithDate({ startDate: addDays(selectedDate, 1) })
      .then((response) => {
        if (response) {
          setData(response);
        } else {
          setData([]);
        }
      });
  }, [selectedDate]);

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <Greeting />
        <Results data={data} />
      </div>

      <div className="flex flex-col">
        <div className="flex gap-20">
          <Calendar />
          <PriceFilter />
        </div>

        <MapBox data={data} />
      </div>
    </div>
  );
};
export default Home;
