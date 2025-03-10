import { useContext, useState } from "react";

import { AlertContext } from "../context/AlertContext";
import { formatDate } from "../utils/formatDate";
import icon from "../assets/icons/pencil.png";

export default function FormComponent() {
  const { showAlert } = useContext(AlertContext);

  const [formData, setFormData] = useState({
    journal: "",
    date: formatDate(new Date()),
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const journals = JSON.parse(localStorage.getItem("journals")) || [];
    if (journals.length === 0) {
      localStorage.setItem("journals", JSON.stringify([formData]));
    } else {
      let data = [];
      for (let journal of journals) {
        data.push(journal);
      }
      data.push(formData);
      localStorage.setItem("journals", JSON.stringify(data));
    }
    setFormData({ journal: "", date: formatDate(new Date()) });
    showAlert("Journal entry has been added!");
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
        <button type="submit" className="btn-save mt-3 mb-3">
          <img src={icon} alt="save journal" />
        </button>
      </div>
    </form>
  );
}
