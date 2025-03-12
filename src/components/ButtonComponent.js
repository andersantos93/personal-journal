import icon from "../assets/icons/pencil.png";

export default function ButtonComponent({ type }) {
  return (
    <button type={type} className="btn-save mt-3 mb-3">
      <img src={icon} alt="crate new journal" />
    </button>
  );
}
