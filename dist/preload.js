"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld("electronAPI", {
    getGameState: () => electron_1.ipcRenderer.invoke("get-game-state"),
    incrementScore: (isCritical = false) => electron_1.ipcRenderer.invoke("increment-score", isCritical),
    checkCriticalClick: () => electron_1.ipcRenderer.invoke("check-critical-click"),
    buyAutoClicker: () => electron_1.ipcRenderer.invoke("buy-auto-clicker"),
    upgradeClick: () => electron_1.ipcRenderer.invoke("upgrade-click"),
    buyMultiplier: () => electron_1.ipcRenderer.invoke("buy-multiplier"),
    buyGoldCookieUpgrade: () => electron_1.ipcRenderer.invoke("buy-gold-cookie-upgrade"),
    collectGoldCookie: (bonus) => electron_1.ipcRenderer.invoke("collect-gold-cookie", bonus),
    upgradeCriticalClick: () => electron_1.ipcRenderer.invoke("upgrade-critical-click"),
    prestige: () => electron_1.ipcRenderer.invoke("prestige"),
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