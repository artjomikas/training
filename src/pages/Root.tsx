import { Outlet, useLocation } from "react-router-dom";
import { NavBar } from "../";

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && <NavBar />}

      <Outlet />
    </>
  );
};
export default Root;
