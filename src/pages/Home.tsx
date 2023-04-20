import { useContext, useEffect, useState } from "react";
import { IReview } from "../domain/IReview";
import { WorkoutService } from "../services/WorkoutService";
import Results from "../components/Results/Results";
import Greeting from "../components/Greeting";
import MapBox from "../components/Map/MapBox";

const Home = () => {
  const workoutService = new WorkoutService();

  const [data, setData] = useState([] as IReview[]);

  useEffect(() => {
    workoutService.getAll().then((response) => {
      if (response) {
        setData(response);
      } else {
        setData([]);
      }
    });
  }, []);

  return (
    <div className="container mx-auto p-2 grid grid-cols-2 pt-12">
      <div className="">
        <Greeting />
        <Results data={data} />
      </div>

      
        <MapBox />
  
    </div>
  );
};
export default Home;
