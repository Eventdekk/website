import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "./components/Home.js";
import CalendarPage from "./components/CalendarPage.js";
import { AdminPage } from "./components/AdminPage.js";
import { LoginPage } from "./components/LoginPage.js";
import Layout from "./components/Layout.js";
import { ThemeProvider } from "./components/site/ThemeContext.js";
import { PopupProvider } from "./components/site/PopupContext.js";
import { UserProvider } from "./components/site/UserContext.js";

import { useUser } from "./components/site/UserContext.js";
import { AdminNavbar } from "./components/admin/AdminNavbar.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <UserProvider>
          <Layout />
        </UserProvider>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "calendar",
          element: <CalendarPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "admin",
          element: (
            <PrivateRoute>
              <AdminNavbar />
            </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <AdminPage />,
            },
          ],
        },
        {
          path: "*",
          element: <NoPage />,
        },
      ],
    },
  ]);
  return (
    <PopupProvider>
      <ThemeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </PopupProvider>
  );
}
function PrivateRoute({ children }) {
  const { isLogged } = useUser();
  return isLogged ? children : <Navigate to="/login" />;
}

function NoPage() {
  return (
    <h1 class="p-4 font-semibold text-center text-xl text-black dark:text-white">
      404
    </h1>
  );
}

export default App;
