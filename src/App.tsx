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
  Profile,
  Settings,
  EditWorkout,
} from ".";
import AuthProvider from "./context/AuthContext";
import DataProvider from "./context/DataContext";

import { Toaster } from "react-hot-toast";

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
        path: "edit-workout",
        element: <EditWorkout />,
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
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "workout/:id",
        element: <Workout />,
      },
      {
        path: "settings",
        element: <Settings />,
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
        <Toaster position="bottom-center" />
        <RouterProvider router={router} />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
