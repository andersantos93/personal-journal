import FormComponent from "../components/FormComponent";
import { formatDate } from "../utils/formatDate";
import "../styles/new-journal.css";

export default function NewJournal() {
  return (
    <>
      <div className="grid text-center overflow-x-visible">
        <h1 className="mt-4 mb-5">{formatDate()}</h1>
        <FormComponent />
      </div>
    </>
  );
}
