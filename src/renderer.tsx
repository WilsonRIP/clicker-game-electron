import React from "react";
import ReactDOM from "react-dom/client";
import { ClickerGame } from "./components/ClickerGame";
import "./styles/globals.css";

console.log("Renderer script loaded");

function App() {
  console.log("App component rendering");
  return (
    <div className="dark">
      <ClickerGame />
    </div>
  );
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");
  const rootElement = document.getElementById("root");
  console.log("Root element:", rootElement);

  if (rootElement) {
    try {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
      console.log("React root rendered");
    } catch (error) {
      console.error("Error rendering React app:", error);
    }
  } else {
    console.error("Root element not found");
  }
});
