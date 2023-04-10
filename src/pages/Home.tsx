import { useContext, useEffect, useState } from "react";
import { IReview } from "../domain/IReview";
import { ReviewService } from "../services/ReviewService";
import { AuthContext } from "../context/AuthContext";
import Results from "../components/Results/Results";

const Home = () => {
  const reviewService = new ReviewService();
  const { user, setJwtResponse } = useContext(AuthContext);

  const [data, setData] = useState([] as IReview[]);

  // useEffect(() => {
  //   reviewService.getAll().then((response) => {
  //     if (response) {
  //       setData(response);
  //     } else {
  //       setData([]);
  //     }
  //   });
  // }, []);

  return (
    <div className="container mx-auto p-2 grid grid-cols-2 pt-12">
      
      <Results />
      {/* <div className="">JWT: {jwtResponse.jwt}</div> */}
    </div>
  );
};
export default Home;
