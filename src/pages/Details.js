import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const [journal, setJournal] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    console.log(window.innerHeight);
    const journals = JSON.parse(localStorage.getItem("journals")) || [];
    if (journals.length > 0) {
      const journal = journals.find((journal) => journal.id === id);
      console.log("journal", journal);
      if (journal !== undefined) {
        setJournal(journal);
      }
    }
  }, []);

  return (
    <>
      {journal && (
        <div className="grid text-center">
          <h1 className="mt-4 mb-4">{journal.date}</h1>
          <textarea value={journal.journal} rows="12" readOnly></textarea>
        </div>
      )}
    </>
  );
}
