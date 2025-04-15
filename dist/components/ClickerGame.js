"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickerGame = ClickerGame;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const button_1 = require("./ui/button");
const card_1 = require("./ui/card");
function ClickerGame() {
    // State to track game variables
    const [gameState, setGameState] = (0, react_1.useState)({
        score: 0,
        clickValue: 1,
        autoClickerCount: 0,
        autoClickerCost: 10,
        upgradeClickCost: 25,
    });
    // Initialize the game state from the main process
    (0, react_1.useEffect)(() => {
        const initGame = async () => {
            try {
                const initialState = await window.electronAPI.getGameState();
                setGameState(initialState);
            }
            catch (error) {
                console.error("Failed to get game state:", error);
            }
        };
        initGame();
        // Set up the score update listener
        const unsubscribe = window.electronAPI.onUpdateScore((newScore) => {
            setGameState((prevState) => ({
                ...prevState,
                score: newScore,
            }));
        });
        // Clean up the listener when component unmounts
        return () => {
            if (typeof unsubscribe === "function") {
                unsubscribe();
            }
        };
    }, []);
    // Handle clicking the cookie/button
    const handleClick = async () => {
        try {
            const newScore = await window.electronAPI.incrementScore();
            setGameState((prevState) => ({
                ...prevState,
                score: newScore,
            }));
        }
        catch (error) {
            console.error("Failed to increment score:", error);
        }
    };
    // Buy an auto clicker
    const buyAutoClicker = async () => {
        try {
            const result = (await window.electronAPI.buyAutoClicker());
            if (result.success) {
                setGameState((prevState) => ({
                    ...prevState,
                    score: result.score,
                    autoClickerCount: result.autoClickerCount,
                    autoClickerCost: result.autoClickerCost,
                }));
            }
        }
        catch (error) {
            console.error("Failed to buy auto clicker:", error);
        }
    };
    // Upgrade click value
    const upgradeClick = async () => {
        try {
            const result = (await window.electronAPI.upgradeClick());
            if (result.success) {
                setGameState((prevState) => ({
                    ...prevState,
                    score: result.score,
                    clickValue: result.clickValue,
                    upgradeClickCost: result.upgradeClickCost,
                }));
            }
        }
        catch (error) {
            console.error("Failed to upgrade click:", error);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex flex-col items-center justify-center min-h-screen bg-background p-4", children: (0, jsx_runtime_1.jsx)("div", { className: "max-w-md w-full space-y-6", children: (0, jsx_runtime_1.jsxs)(card_1.Card, { className: "w-full", children: [(0, jsx_runtime_1.jsxs)(card_1.CardHeader, { children: [(0, jsx_runtime_1.jsx)(card_1.CardTitle, { className: "text-center", children: "Clicker Game" }), (0, jsx_runtime_1.jsx)(card_1.CardDescription, { className: "text-center", children: "Click to earn points and upgrade!" })] }), (0, jsx_runtime_1.jsxs)(card_1.CardContent, { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-4xl font-bold mb-4", children: gameState.score.toLocaleString() }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "w-32 h-32 rounded-full mb-6 text-lg transition-transform hover:scale-105", onClick: handleClick, children: "Click Me!" }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm mb-2", children: ["+", gameState.clickValue, " per click"] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: ["+", gameState.autoClickerCount, " per second"] })] }), (0, jsx_runtime_1.jsx)(card_1.CardFooter, { className: "flex flex-col gap-4", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "flex-1", onClick: buyAutoClicker, disabled: gameState.score < gameState.autoClickerCost, children: ["Buy Auto Clicker", (0, jsx_runtime_1.jsxs)("span", { className: "ml-2 text-xs", children: ["(", gameState.autoClickerCost, ")"] })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "flex-1", onClick: upgradeClick, disabled: gameState.score < gameState.upgradeClickCost, children: ["Upgrade Click", (0, jsx_runtime_1.jsxs)("span", { className: "ml-2 text-xs", children: ["(", gameState.upgradeClickCost, ")"] })] })] }) })] }) }) }));
}
//# sourceMappingURL=ClickerGame.js.map