import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      <Button text="Nearby"></Button>
      <Button text="Explore"></Button>
      <Background
        img={
          "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ5-2H4TeBVEPxIPsLDJe0cJrjQ0cqNxD3LVomOHg7Phbgv4I8N0-tOqN7Aohtdx82D9xY8S7LM7Rd2pfI1CGo"
        }
      ></Background>
    </div>
  );
}

export default App;
