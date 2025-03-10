import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { AlertContext } from "../context/AlertContext";
import FormComponent from "../components/FormComponent";
import { formatDate } from "../utils/formatDate";

import "../styles/new-journal.css";
import icon from "../assets/icons/left.png";

export default function NewJournal() {
  const { alert } = useContext(AlertContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column text-center overflow-x-visible">
        <div className="d-flex justify-content-center">
          {/* <button className="mt-3 mb-3" onClick={() => navigate("/")}>
            <img
              src={icon}
              alt="go to previous page"
              className="align-self-center"
            />
          </button> */}
          <h1 className="mt-4 mb-4 flex-shrink-1">{formatDate(new Date())}</h1>
          <div></div>
        </div>

        {alert && <div className="d-inline p-2 alert text-white">{alert}</div>}
        <FormComponent />
      </div>
    </>
  );
}
