import { useContext, useState } from "react";

import { AlertContext } from "../context/AlertContext";
import { formatDate } from "../utils/formatDate";

import ButtonComponent from "./ButtonComponent";

export default function FormComponent() {
  const { showAlert } = useContext(AlertContext);

  const [formData, setFormData] = useState({
    journal: "",
    date: formatDate(new Date()),
    id: crypto.randomUUID(),
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const journals = JSON.parse(localStorage.getItem("journals")) || [];
    const userId = JSON.parse(localStorage.getItem("user"));
    const journalData = formData;
    journalData.userId = userId.id;
    if (journals.length === 0) {
      localStorage.setItem("journals", JSON.stringify([journalData]));
    } else {
      let data = [];
      for (let journal of journals) {
        data.push(journal);
      }
      data.unshift(journalData);
      localStorage.setItem("journals", JSON.stringify(data));
    }
    resetForm();
    showAlert("Journal entry has been added!");
  }

  function resetForm() {
    setFormData({
      journal: "",
      date: formatDate(new Date()),
      id: crypto.randomUUID(),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="journal"
        rows="12"
        value={formData.journal}
        onChange={handleChange}
        required="required"
      ></textarea>
      <div className="d-flex justify-content-center">
        <ButtonComponent type="submit" classes="btn-new-journal mt-3 mb-3" />
      </div>
    </form>
  );
}
