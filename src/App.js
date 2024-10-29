import "./App.css";
import Read from "./components/read/Read";
import Create from "./components/create/create";
import Update from "./components/update/Update";
import LoginPage from "./components/LoginPage";
import LibraryPage from "./components/LibraryPage"; // Add this import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <div>
        <Router>
          <Routes>
            <Route path="/create" element={<Create />} />
            <Route path="/read" element={<Read />} />
            <Route path="/update" element={<Update />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
