import { useState } from "react";
import ResultBlock from "../components/Results/ResultBlock";
import { useParams, Link } from "react-router-dom";

const ProfileWorkouts = ({ workouts }: { workouts: any }) => {
  const [index, setIndex] = useState(6);

  return (
    <>
      <div className="text-2xl font-medium pt-8">Added workouts:</div>
      <div className="pt-6 grid grid-cols-6 place-content-start place-items-start gap-y-2 gap-x-6 xl:pr-10 justify-items-start">
        {workouts.slice(0, index).map((res: any, i: number) => (
          <div className="">
            <Link
              key={i}
              to={{
                pathname: `/workout/${res.id}`,
              }}
            >
              <ResultBlock {...res} />
            </Link>
          </div>
        ))}
      </div>

      <div className="flex w-full content-center pt-3">
        <button
          onClick={() => setIndex(index + 6)}
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
        >
          load more
        </button>
      </div>
    </>
  );
};
export default ProfileWorkouts;
