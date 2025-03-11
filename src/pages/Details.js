import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import HeaderComponent from "../components/HeaderComponent";

export default function Details() {
  const [journal, setJournal] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    const journals = JSON.parse(localStorage.getItem("journals")) || [];
    if (journals.length > 0) {
      const journal = journals.find((journal) => journal.id === id);
      if (journal !== undefined) {
        setJournal(journal);
      }
    }
  }, [id]);

  return (
    <>
      {journal && (
        <>
          <HeaderComponent page="/" header={journal.date} />
          <div className="grid text-center">
            <textarea value={journal.journal} rows="12" readOnly></textarea>
          </div>
        </>
      )}
    </>
  );
}
