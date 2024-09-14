import { Outlet, Link } from "react-router-dom";
import { Text, ClickableText } from "../utils/Text.js";
import { PendingNotifications } from "../utils/Notification.js";
import { HoverBox } from "../utils/Box.js";
import { useUser } from "../site/UserContext.js";

export function AdminNavbar() {
  const { selectedGroup, setSelectedGroup } = useUser();
  const resetSelectedGroup = () => {
    setSelectedGroup(null);
  };

  if (!selectedGroup) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  const from = "https://flowbite.com/docs/components/sidebar/";
  return (
    <div>
      <aside
        id="sidebar"
        class="fixed top-15 left-0 z-20 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-slate-50 dark:bg-midnight">
          <ul class="space-y-2 font-medium">
            <li>
              <Link to="/admin">
                <HoverBox
                  style="flex items-center p-2 group"
                  onClick={resetSelectedGroup}
                >
                  <svg
                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M5.508-117.218v-125.985q0-41.917 20.827-75.153 20.827-33.236 57.232-50.398 72.159-32.942 136.167-48.608 64.007-15.667 131.2-15.667 68.164 0 131.84 15.667 63.676 15.666 135.487 48.434 36.299 16.456 57.498 49.725 21.198 33.268 21.198 75.969v126.016H5.508Zm767.058 0v-128.869q0-57.406-29.138-103.131-29.138-45.724-81.095-81.999 61.957 8.753 116.826 24.029 54.87 15.275 94.789 35.886 37.541 20.345 59.376 53.222 21.834 32.877 21.834 73.709v127.153H772.566ZM351.254-491.507q-74.122 0-122.165-48.044-48.044-48.044-48.044-121.362 0-73.883 48.06-122.26 48.06-48.377 121.739-48.377 73.112 0 121.96 48.314t48.848 121.802q0 73.839-48.679 121.883-48.68 48.044-121.719 48.044Zm422.788-169.932q0 73.279-48.548 121.605-48.548 48.327-121.419 48.327-13.843 0-30.162-2.218-16.319-2.217-30.739-7.406 26.899-31.042 40.159-71.473 13.261-40.431 13.261-88.362t-13.319-87.577q-13.319-39.646-40.101-73.433 14.137-4.784 30.279-7.179 16.141-2.395 30.48-2.395 72.791 0 121.45 48.592 48.659 48.591 48.659 121.519Z" />
                  </svg>
                  <Text style="ms-2">Change Group</Text>
                </HoverBox>
              </Link>
            </li>
            <li>
              <Link to="/admin/create">
                <HoverBox style="flex items-center p-2 group">
                  <svg
                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M440.855-271.218h82.492v-164.768h165.435v-82.492H523.347v-170.304h-82.492v170.304H271.218v82.492h169.637v164.768Zm39.069 217.073q-88.151 0-165.959-33.306-77.807-33.307-135.507-91.007T87.451-314.051q-33.306-77.892-33.306-166.23 0-88.353 33.365-166.028 33.366-77.674 91.323-135.616 57.957-57.942 135.511-91.124 77.553-33.183 165.611-33.183 88.419 0 166.365 33.144 77.945 33.143 135.702 91.032 57.757 57.889 90.983 135.827 33.227 77.937 33.227 166.441 0 88.479-33.183 165.742-33.182 77.262-91.124 135.093-57.942 57.832-135.768 91.32-77.826 33.488-166.233 33.488Z" />
                  </svg>
                  <Text style="ms-2">Create Event</Text>
                </HoverBox>
              </Link>
            </li>
            <li>
              <Link to="/admin/manage">
                <HoverBox style="flex items-center p-2 group">
                  <svg
                    class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <Text style="ms-2">Manage Events</Text>
                </HoverBox>
              </Link>
            </li>
            <li>
              <HoverBox style="flex items-center p-2 group">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <Text style="ms-2">Invitations</Text>
                <PendingNotifications>3</PendingNotifications>
              </HoverBox>
            </li>
            <li>
              <HoverBox style="flex items-center p-2 group">
                <svg
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 -960 960 960"
                  height="40"
                  width="40"
                >
                  <path d="M482.513-94.145q-158.455 0-270.083-108.241Q100.802-310.627 97.956-467.334h97.681q4.086 116.867 86.697 196.811 82.61 79.943 199.39 79.943 120.811 0 206.014-85.401 85.204-85.401 85.204-206.785 0-120.22-85.433-203.437-85.433-83.217-205.017-83.217-65.533 0-123.585 28.536-58.051 28.536-98.356 78.057h96.753v83.057H109.537v-246.346h81.362v95.231q53.84-64.347 130.097-99.847 76.256-35.5 161.496-35.5 79.787 0 150.088 30.552 70.301 30.553 122.554 82.44 52.253 51.888 82.965 121.873 30.712 69.985 30.712 150.169 0 80.183-30.712 150.7-30.712 70.517-82.965 123.071T632.58-124.509q-70.301 30.364-150.067 30.364Zm112.676-210.87L436.276-461.536v-225.478h81.927v190.333l135.188 132.898-58.202 58.768Z" />
                </svg>
                <Text style="ms-2">Event History</Text>
              </HoverBox>
            </li>
          </ul>
        </div>
      </aside>
      <div class="md:ml-52">
        <Outlet />
      </div>
    </div>
  );
}
