import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./views/Home";
import Nearby from "./views/Nearby";
import Explore from "./views/Explore";
import Experience from "./views/Experience";
import { User } from "./views/User/User";
import UserProvider from "./helpers/Context";
import { CreateExperience } from "./views/CreateExperience/CreateExperience";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateExperience />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/experience/:id" element={<Experience />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
