import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.js";
import Buttons from "./components/Buttons.js";
import Layout from "./components/Layout.js";
import { ThemeProvider } from "./components/site/ThemeContext.js";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const NoPage = () => {
  return <h1>404</h1>;
};

export default App;
