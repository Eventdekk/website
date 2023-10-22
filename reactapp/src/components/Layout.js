import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div class="w-full block flex-grow flex items-center w-auto">
          <ul class="flex-grow">
            <li class="block inline-block lmt-0 text-teal-200 hover:text-white mr-4">
              <Link to="/">Home</Link>
            </li>
            <li class="block inline-block mt-0 text-teal-200 hover:text-white">
              <Link to="/buttons">Buttons</Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
