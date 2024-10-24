import "./App.css";
import Create from "./components/create/create";
// import Read from "./components/read/read";
// import Update from "./components/update/update";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <div>
        <h3>React Crud Operations</h3>

        <Create />
      </div>
    </div>
  );
}

export default App;
