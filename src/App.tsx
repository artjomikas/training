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
  Workout,
} from ".";
import AuthProvider from "./context/AuthContext";
import DataProvider from "./context/DataContext";
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
      {
        path: "workout/:id",
        element: <Workout />,
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
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
