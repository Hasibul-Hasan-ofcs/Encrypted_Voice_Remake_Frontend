import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import ContextProvider from "./Context/ContextProvider";

function App() {
  return (
    <>
      <ContextProvider>
        <Outlet />
      </ContextProvider>
    </>
  );
}

export default App;
