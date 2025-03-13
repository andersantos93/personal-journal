import { Link } from "react-router-dom";

export default function ListComponent({ journals }) {
  const truncateText = (text, limit = 400) =>
    text.length <= limit ? text : `${text.substring(0, limit)}...`;

  return journals.map((journal, index) => {
    return (
      <Link to={`/journal/${journal.id}`} key={index} className="journal-card">
        <div key={index} className="date-group">
          <div className="date-header">
            <span>{journal.date}</span>
          </div>

          <div className="entries-container">
            <p>{truncateText(journal.journal)}</p>
          </div>
        </div>
      </Link>
    );
  });
}
