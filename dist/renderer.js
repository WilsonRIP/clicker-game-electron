"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const ClickerGame_1 = require("./components/ClickerGame");
require("./styles/globals.css");
console.log("Renderer script loaded");
function App() {
    console.log("App component rendering");
    return ((0, jsx_runtime_1.jsx)("div", { className: "dark", children: (0, jsx_runtime_1.jsx)(ClickerGame_1.ClickerGame, {}) }));
}
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    const rootElement = document.getElementById("root");
    console.log("Root element:", rootElement);
    if (rootElement) {
        try {
            const root = client_1.default.createRoot(rootElement);
            root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(App, {}) }));
            console.log("React root rendered");
        }
        catch (error) {
            console.error("Error rendering React app:", error);
        }
    }
    else {
        console.error("Root element not found");
    }
});
//# sourceMappingURL=renderer.js.map