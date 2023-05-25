import { useNavigate } from "react-router-dom";
import ResultsGrid from "./ResultsGrid";
import { IoIosAdd } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const Results = ({ data }: any) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  return (
    <div className="pt-14">
      <div className="flex items-center content-center gap-4">
        <div className="font-extrabold text-3xl">Result Found</div>
        <div className="px-4 py-1 bg-[#F39F2D]/30 rounded-xl font-bold font-poppins text-orange text-2xl">
          {data.length}
        </div>

        <button
          onClick={() =>
            user
              ? navigate("/add-workout")
              : toast.error("You must be logged in!")
          }
          className="rounded-md relative inline-flex group items-center justify-center px-3 py-1.5 m-1 cursor-pointer border-b-4 border-l-2 active:border-[#8d5f1f] active:shadow-none shadow-lg bg-gradient-to-tr from-[#F39F2D] to-[#faae44] border-[#c08026] text-white"
        >
          <IoIosAdd size={20} className="mr-0.5" />
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
          <span className="relative">Add Workout</span>
        </button>
      </div>

      <ResultsGrid data={data} />
    </div>
  );
};
export default Results;
