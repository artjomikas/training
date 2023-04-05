import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, ErrorPage, Root, Login } from ".";

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
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
