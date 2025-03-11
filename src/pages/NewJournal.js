import { useContext } from "react";

import { AlertContext } from "../context/AlertContext";
import { formatDate } from "../utils/formatDate";

import HeaderComponent from "../components/HeaderComponent";
import FormComponent from "../components/FormComponent";

import "../styles/new-journal.css";

export default function NewJournal() {
  const { alert } = useContext(AlertContext);

  return (
    <>
      <HeaderComponent page="/" header={formatDate(new Date())} />
      <div className="text-center overflow-x-visible">
        {alert && (
          <div className="d-inline align-self-center p-2 alert text-white">
            {alert}
          </div>
        )}
        <FormComponent />
      </div>
    </>
  );
}
