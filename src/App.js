import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/variables.css";
import "./styles/global.css";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import Profile from "./pages/Profile";
import NewJournal from "./pages/NewJournal";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { AlertProvider } from "./context/AlertContext";
import MainLayout from "./layouts/MainLayout"; 
import PrivateRoute from "./components/PrivateRoute"; 

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
        
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

         
          <Route element={<MainLayout />}>
            <Route index element={<PrivateRoute element={<Home />} />} />
            <Route path="dashboard" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="journal/:id" element={<PrivateRoute element={<Details />} />} />
            <Route path="new-journal" element={<PrivateRoute element={<NewJournal />} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AlertProvider>
  );
}

export default App;
