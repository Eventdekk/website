import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js'
import Buttons from './components/Buttons.js'
import Layout from './components/Layout.js'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="buttons" element={<Buttons />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
