import { Link } from "react-router-dom";

export default function ListComponent({ journals }) {
  const truncateText = (text, limit = 300) =>
    text.length <= limit ? text : `${text.substring(0, limit)}...`;

  return journals.map((journal, index) => {
    return (
      <div key={index} className="date-group">
        <div className="date-header">
          <span>{journal.date}</span>
        </div>

        <div className="entries-container">
          <Link
            to={`/journal/${journal.id}`}
            key={index}
            className="journal-card"
          >
            <p>{truncateText(journal.journal)}</p>
          </Link>
        </div>
      </div>
    );
  });
}
