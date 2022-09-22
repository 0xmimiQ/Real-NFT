import React from "react";
import logo from "./logo.png";
import "./App.css";
import InputModal from "./components/InputModal";

const App = () => {
  return (
    <div className="App">
      <div className="w-full h-screen bg-black/90 flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="w-[50%]">
            <img className="p-2" src={logo} />
          </div>
          <div>
            <InputModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
