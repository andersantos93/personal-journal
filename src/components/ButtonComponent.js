import icon from "../assets/icons/pencil.png";

export default function ButtonComponent({ type, classes }) {
  return (
    <button type={type} className={classes}>
      <img src={icon} alt="crate new journal" />
    </button>
  );
}
