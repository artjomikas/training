import ResultBlock from "./ResultBlock";
import { resultData } from "../../data.js";

const ResultsGrid = () => {
  return (
    <div className="pt-6 grid grid-cols-3 place-content-center place-items-center gap-y-8 gap-x-4 xl:pr-14">
      {resultData.map((res, i) => (
        <ResultBlock key={i} {...res} />
      ))}
    </div>
  );
};
export default ResultsGrid;
