import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import CalendarPage from "./components/CalendarPage.js";
import { AdminPage } from "./components/AdminPage.js";
import Layout from "./components/Layout.js";
import { ThemeProvider } from "./components/site/ThemeContext.js";
import { PopupProvider } from "./components/site/PopupContext.js";

function App() {
  return (
    <PopupProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PopupProvider>
  );
}

const NoPage = () => {
  return <h1>404</h1>;
};

export default App;
