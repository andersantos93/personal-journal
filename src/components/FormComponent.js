import icon from "../assets/icons/pencil.png";

export default function FormComponent() {
  return (
    <form>
      <textarea name="journal" rows="12"></textarea>
      <div className="d-flex justify-content-center">
        <button type="submit" className="btn-save mt-3 mb-3">
          <img src={icon} alt="save journal" />
        </button>
      </div>
    </form>
  );
}
