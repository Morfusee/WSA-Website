import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import Wardrobe from "./pages/wardrobe";
import CreateWardrobe from "./pages/wardrobe/create";
import Details from "./pages/wardrobe/details";
import Laundry from "./pages/laundry";
import Contents from "./pages/laundry/contents";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "wardrobe",
          element: <Wardrobe />,
        },
        {
          path: "wardrobe/add",
          element: <CreateWardrobe />,
        },
        {
          path: "wardrobe/:id",
          element: <Details />,
        },
        {
          path: "laundry",
          element: <Laundry />,
        },
        {
          path: "laundry/:id",
          element: <Contents />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
