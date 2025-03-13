import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/variables.css";
import "./styles/global.css";

import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import NewJournal from "./pages/NewJournal";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

import { AlertProvider } from "./context/AlertContext";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route
            path="/"
            index
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="journal/:id"
            element={<PrivateRoute element={<Details />} />}
          />
          <Route
            path="new-journal"
            element={<PrivateRoute element={<NewJournal />} />}
          />
          <Route path="*" name="not-found" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
