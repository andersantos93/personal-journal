import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import ButtonComponent from "../components/ButtonComponent";

import "../styles/home.css";

export default function Home() {
  const [journals, setJournals] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedJournals = JSON.parse(localStorage.getItem("journals")) || [];

    const groupedJournals = storedJournals.reduce((groups, journal) => {
      (groups[journal.date] = groups[journal.date] || []).push(journal);
      return groups;
    }, {});

    const journalsByDate = Object.entries(groupedJournals)
      .map(([date, entries]) => ({ date, entries }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setJournals(journalsByDate);
  }, []);

  const truncateText = (text, limit = 300) =>
    text.length <= limit ? text : `${text.substring(0, limit)}...`;

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
          journals.map(({ date, entries }) => {
            return (
              <div key={date} className="date-group">
                <div className="date-header">
                  <span>{date}</span>
                </div>

                <div className="entries-container">
                  {entries.map((entry) => (
                    <Link
                      to={`/journal/${entry.id}`}
                      key={entry.id}
                      className="journal-card"
                    >
                      <p>{truncateText(entry.journal)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
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
