import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ButtonComponent from "../components/ButtonComponent";

import "../styles/home.css";
import ListComponent from "../components/ListComponent";

export default function Home() {
  const [journals, setJournals] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedJournals = JSON.parse(localStorage.getItem("journals")) || [];
    setJournals(storedJournals);
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="menu-icon" onClick={() => setSidebarOpen(true)}>
          ☰
        </div>
        <h1>Home</h1>
        <div></div>
      </header>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="journal-list">
        {journals.length > 0 ? (
          <ListComponent journals={journals} />
        ) : (
          <div className="no-entries">
            <p>No journal entries yet.</p>
            <Link to="/new-journal" className="add-journal-btn">
              Add your first journal
            </Link>
          </div>
        )}
      </main>

      <Link to="new-journal">
        <ButtonComponent
          type="button"
          classes="btn-new-journal position-fixed bottom-0 end-0 m-4"
        />
      </Link>
    </div>
  );
}
