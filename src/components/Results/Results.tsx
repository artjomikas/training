import { useNavigate } from "react-router-dom";
import ResultsGrid from "./ResultsGrid";


const Results = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-14">
      <button className="px-2 py-2 my-4 bg-slate-200 rounded-md border-gray-500 border-2" onClick={() => navigate("/add-workout")}>ADD</button>

      <div className="flex items-center gap-4">
        <div className="font-extrabold text-3xl">Result Found</div>
        <div className="px-4 py-1 bg-[#F39F2D]/30 rounded-xl font-bold font-poppins text-orange text-2xl">
          4
        </div>
      </div>

      <ResultsGrid />
    </div>
  );
};
export default Results;
