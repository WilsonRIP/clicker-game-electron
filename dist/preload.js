"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    getGameState: () => electron_1.ipcRenderer.invoke("get-game-state"),
    incrementScore: () => electron_1.ipcRenderer.invoke("increment-score"),
    buyAutoClicker: () => electron_1.ipcRenderer.invoke("buy-auto-clicker"),
    upgradeClick: () => electron_1.ipcRenderer.invoke("upgrade-click"),
    onUpdateScore: (callback) => {
        // Add a listener for the score updates sent from the main process
        electron_1.ipcRenderer.on("update-score", (_event, value) => callback(value));
        // Return a function to remove the event listener
        return () => {
            electron_1.ipcRenderer.removeAllListeners("update-score");
        };
    },
});
//# sourceMappingURL=preload.js.map