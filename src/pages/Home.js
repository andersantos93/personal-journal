import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  const [journals, setJournals] = useState([]);
  
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
  
  const truncateText = (text, limit = 50) => 
    text.length <= limit ? text : `${text.substring(0, limit)}...`;
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' }),
      weekday: date.toLocaleString('default', { weekday: 'short' })
    };
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="menu-icon">☰</div>
        <h1>Home</h1>
        <div className="search-icon">🔍</div>
      </header>
      
      <main className="journal-list">
        {journals.length > 0 ? (
          journals.map(({ date, entries }) => {
            const { day, month, weekday } = formatDate(date);
            
            return (
              <div key={date} className="date-group">
                <div className="date-header">
                  <span>{day} {month}, {weekday}</span>
                </div>
                
                <div className="entries-container">
                  {entries.map(entry => (
                    <Link to={`/journal/${entry.id}`} key={entry.id} className="journal-card">
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
            <Link to="/new-journal" className="add-journal-btn">Add your first journal</Link>
          </div>
        )}
      </main>
      
      <Link to="/new-journal" className="floating-action-btn">+</Link>
    </div>
  );
}
