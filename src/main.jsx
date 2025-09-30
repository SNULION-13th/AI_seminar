import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DesignerPortfolio from "./components/DesignerPortfolio.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DesignerPortfolio />
  </StrictMode>
);
