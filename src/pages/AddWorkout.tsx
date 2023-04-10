import { FaDollarSign } from "react-icons/fa";

const AddWorkout = () => {
  return (
    <div className="container mx-auto p-2 w-1/4 pt-12">
      <h1 className="mb-4 text-5xl leading-relaxed font-bold bg-gradient-to-r from-slate-800 to-violet-800 bg-clip-text  text-transparent">
        Add workout
      </h1>

      {/* {["Workout Name", "password"].map((elem, index) => (
          <div className="py-4" key={index}>
            <label
              className="block font-medium text-sm text-slate-700 capitalize"
              htmlFor={elem}
            >
              {elem}
            </label>
            <input
              className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
              id={elem}
              type={elem}
              required
              autoFocus
            />
          </div>
        ))} */}

      <div className="flex py-4">
        <div className="w-full mr-4">
          <label
            className="block font-medium text-sm text-slate-700 capitalize"
            htmlFor="workout-name"
          >
            Workout Name
          </label>
          <input
            className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
            id="workout-name"
            type="text"
            required
            autoFocus
          />
        </div>

        <div className="w-full">
          <label
            className="block font-medium text-sm text-slate-700 capitalize"
            htmlFor="workout-name"
          >
            Price
          </label>
          <input
            className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
            id="workout-name"
            type="number"
            required
            autoFocus
          />
        </div>
      </div>

      <div className="flex py-4">
        <div className="w-full mr-4">
          <label
            className="block font-medium text-sm text-slate-700 capitalize"
            htmlFor="workout-name"
          >
            Workout Type
          </label>

          <select
            className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
            id="workout-name"
            required
            autoFocus
          >
            <option value="">h</option>
          </select>
        </div>
        <div className="w-full">
          <label
            className="block font-medium text-sm text-slate-700 capitalize"
            htmlFor="workout-name"
          >
            Skill Level
          </label>
          <select
            className="outline-none py-2 px-2 border border-voilet-200
          focus:border-amber-300 focus:ring focus:ring-amber-200
          focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
            id="workout-name"
            required
            autoFocus
          >
            <option value="">h</option>
            <option value="">d</option>
          </select>
        </div>
      </div>

      <div className="py-4">
        <label
          className="block font-medium text-sm text-slate-700 capitalize"
          htmlFor="workout-name"
        >
          Maximum participants
        </label>
        <input
          className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
          id="workout-name"
          type="number"
          required
          autoFocus
        />
      </div>
    </div>
  );
};
export default AddWorkout;
