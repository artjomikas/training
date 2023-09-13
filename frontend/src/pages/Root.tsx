import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../";

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && <NavBar />}

      <div className={`${pathname !== "/login" && pathname !== "/register" && "container mx-auto p-2 pt-12"}`}>
        <Outlet />
      </div>
    </>
  );
};
export default Root;
