import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";
import Wardrobe from "./pages/wardrobe";
import CreateWardrobe from "./pages/wardrobe/create";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
