import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./react-app/index.css";  // ← Make sure this line is here
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);