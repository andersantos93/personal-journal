import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1>Page not found.</h1>
        <button
          style={{
            fontFamily: "var(--gambarino-font)",
            backgroundColor: "var(--main-btn-background-color)",
            color: "white",
            border: "none",
            borderRadius: "40px",
            padding: "15px",
            marginTop: "10px",
          }}
          onClick={() => navigate("/")}
        >
          Go to home page
        </button>
      </div>
    </>
  );
}
