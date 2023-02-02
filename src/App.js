import logo from "./logo.svg";
import "./App.css";
import Main from "./Components/Main";
import Progress from "./Components/Progress";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Main />} path="/"></Route>
        <Route element={<Progress />} path="/progress"></Route>
      </Routes>
    </>
  );
}

export default App;
