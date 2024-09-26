import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
