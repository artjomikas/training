import ResultBlock from "./ResultBlock";
import { resultData } from "../../data.js";
import { Link } from "react-router-dom";

const ResultsGrid = ({ data }: any) => {
  return (
    <div className="pt-6 grid grid-cols-3 place-content-center place-items-center gap-y-8 gap-x-4 xl:pr-14">
      {data.map((res: any, i: number) => (
        <Link
          key={i}
          to={{
            pathname: `/workout/${res.id}`,
          }}
        >
          <ResultBlock {...res} />
        </Link>
      ))}
    </div>
  );
};
export default ResultsGrid;
