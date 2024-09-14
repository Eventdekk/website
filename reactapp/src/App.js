import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Route,
} from "react-router-dom";
import Home from "./components/pages/Home.js";
import CalendarPage from "./components/pages/CalendarPage.js";
import { AdminPage } from "./components/pages/admin/AdminPage.js";
import { LoginPage } from "./components/pages/LoginPage.js";
import Layout from "./components/pages/Layout.js";
import { ThemeProvider } from "./components/site/ThemeContext.js";
import { PopupProvider } from "./components/site/PopupContext.js";
import { UserProvider } from "./components/site/UserContext.js";

import { useUser } from "./components/site/UserContext.js";
import { AdminNavbar } from "./components/admin/AdminNavbar.js";
import { CreateEventPage } from "./components/pages/admin/CreateEventPage.js";
import {
  ManageEventsPage,
  ManageEventPage,
} from "./components/pages/admin/ManageEventPage.js";
import { IconContext } from "react-icons";

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
            {
              path: "create",
              element: <CreateEventPage />,
            },
            {
              path: "manage",
              element: <ManageEventsPage />,
            },
            {
              path: "manage/:id",
              element: <ManageEventPage />,
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
    <IconContext.Provider
      value={{
        className: "text-slate-600 dark:text-slate-300",
        style: { verticalAlign: "middle" },
      }}
    >
      <PopupProvider>
        <ThemeProvider>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </PopupProvider>
    </IconContext.Provider>
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
