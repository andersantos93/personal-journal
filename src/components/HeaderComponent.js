import { useNavigate } from "react-router-dom";

import icon from "../assets/icons/left.png";

export default function HeaderComponent({ page, header }) {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <div className="text-center align-self-center" style={{ flex: "0.22" }}>
          <button className="mt-3 mb-3 back-btn" onClick={() => navigate(page)}>
            <img src={icon} alt={`Go to ${page} page.`} />
          </button>
        </div>
        <h1 className="text-center mt-4 mb-4" style={{ flex: "0.54" }}>
          {header}
        </h1>
      </div>
    </div>
  );
}
