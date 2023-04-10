import GoBackArrow from "../components/GoBackArrow";
import image from "../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IdentityService } from "../services/IdentityService";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BiErrorCircle } from "react-icons/bi";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { setJwtResponse } = useContext(AuthContext);
  const [validationError, setValidationError] = useState("");

  const onSubmit = async (data: any) => {
    setValidationError("");

    if (data.password !== data.confirmpassword) {
      setValidationError("Passwords must be the same!");
      return;
    }
    const identityService = new IdentityService();

    const resp = await identityService.register(data);

    if (resp?.status === 400) {
      setValidationError(resp.error);
      return;
    }

    setJwtResponse(resp?.data);
    navigate("/");
  };

  return (
    <div className="relative w-full overflow-hidden font-poppins text-gray-900 bg-white">
      <div className="w-1/3 h-full hidden absolute top-0 left-0 md:block bg-gray-900 z-1">
        <div className="h-full relative">
          <img src={image} className="object-cover h-full object-left"></img>
        </div>
      </div>

      <div className="w-full flex min-h-screen flex-col items-center p-10 sm:justify-center md:w-2/3 xl:p-0 float-right">
        <GoBackArrow />

        <div className="md:w-2/3 lg:w-1/2 pb-[15%]">
          <h1 className="mb-4 text-5xl leading-relaxed font-semibold bg-gradient-to-r from-slate-800 to-violet-600 bg-clip-text  text-transparent">
            Register
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              {["first name", "last name"].map((elem, index) => (
                <div className="py-4 w-full first:mr-4" key={index}>
                  <label
                    className="font-medium text-sm text-slate-700 capitalize"
                    htmlFor={elem}
                  >
                    {elem}
                  </label>
                  <input
                    className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full "
                    id={elem}
                    type={elem}
                    required
                    autoFocus
                    {...register(elem.replace(" ", ""))}
                  />
                </div>
              ))}
            </div>

            {["email", "password", "confirm password"].map((elem, index) => (
              <div className="py-4" key={index + 2}>
                <label
                  className="block font-medium text-sm text-slate-700 capitalize"
                  htmlFor={elem}
                >
                  {elem}
                </label>
                <input
                  className="outline-none py-2 px-2 border border-voilet-200 focus:border-amber-300 focus:ring focus:ring-amber-200 focus:ring-opacity-50 rounded shadow-sm mt-1 block w-full"
                  id={elem}
                  type={elem == "confirm password" ? "password" : elem}
                  required
                  {...register(elem.replace(" ", ""))}
                />
              </div>
            ))}

            <div className="flex justify-between pt-6 items-center">
              <div className="flex items-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 border border-transparent rounded font-semibold text-xs text-white uppercase tracking-widest hover:bg-slate-700 active:bg-slate-900 focus:outline-none focus:border-slate-900 focus:ring focus:ring-slate-300 disabled:opacity-25 transition"
                >
                  register
                </button>
              </div>

              <Link
                className="text-sm text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
                to="/login"
              >
                Already have account
              </Link>
            </div>
          </form>

          {!!validationError && (
            <div className="flex items-center gap-2 pt-4 text-red-500">
              <BiErrorCircle className="text-[20px]"/>
              <h4 className="font-medium ">{validationError}</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Register;
