import { useContext } from "react";

import { AlertContext } from "../context/AlertContext";
import FormComponent from "../components/FormComponent";
import { formatDate } from "../utils/formatDate";

import "../styles/new-journal.css";

export default function NewJournal() {
  const { alert } = useContext(AlertContext);

  return (
    <>
      <div className="grid text-center overflow-x-visible">
        <h1 className="mt-4 mb-4">{formatDate(new Date())}</h1>
        {alert && <div className="d-inline p-2 alert text-white">{alert}</div>}
        <FormComponent />
      </div>
    </>
  );
}
