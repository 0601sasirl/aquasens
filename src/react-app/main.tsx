import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";  // ← CHANGE THIS LINE (remove "react-app/")
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);