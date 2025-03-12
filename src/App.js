import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/variables.css";
import "./styles/global.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import NewJournal from "./pages/NewJournal";
import NotFound from "./pages/NotFound";

import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="journal/:id" element={<Details />} />
          <Route path="new-journal" element={<NewJournal />} />
          <Route path="*" name="not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
