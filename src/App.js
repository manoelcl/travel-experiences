import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Nearby from "./views/Nearby";
import Explore from "./views/Explore";
import Experience from "./views/Experience";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nearby" element={<Nearby />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/experience/:id" element={<Experience />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
