import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Profile from "./pages/Profile";

import "./styles/variables.css";
import "./styles/global.css";
import NewJournal from "./pages/NewJournal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="detais/:id" element={<Details />} />
        <Route path="new-journal" element={<NewJournal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
