import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  ErrorPage,
  Root,
  Login,
  Register,
  AddWorkout,
  History,
  Schedule,
} from ".";
import AuthProvider from "./context/AuthContext";
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "info/",
//         element: <Info />,
//       },
//       {
//         path: "login/",
//         element: <Login />,
//       },
//       {
//         path: "register/",
//         element: <Register />,
//       },
//       {
//         path: "privacy/:id",
//         element: <Privacy />,
//       },
//       {
//         path: "trainingplans/:id?",
//         element: <TrainingPlans />,
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "add-workout",
        element: <AddWorkout />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
