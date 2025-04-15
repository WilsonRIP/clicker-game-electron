import { contextBridge, ipcRenderer } from "electron";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  getGameState: () => ipcRenderer.invoke("get-game-state"),
  incrementScore: (isCritical = false) => ipcRenderer.invoke("increment-score", isCritical),
  checkCriticalClick: () => ipcRenderer.invoke("check-critical-click"),
  buyAutoClicker: () => ipcRenderer.invoke("buy-auto-clicker"),
  upgradeClick: () => ipcRenderer.invoke("upgrade-click"),
  buyMultiplier: () => ipcRenderer.invoke("buy-multiplier"),
  buyGoldCookieUpgrade: () => ipcRenderer.invoke("buy-gold-cookie-upgrade"),
  collectGoldCookie: (bonus: number) => ipcRenderer.invoke("collect-gold-cookie", bonus),
  upgradeCriticalClick: () => ipcRenderer.invoke("upgrade-critical-click"),
  prestige: () => ipcRenderer.invoke("prestige"),
  onUpdateScore: (callback: (score: number) => void) => {
    // Add a listener for the score updates sent from the main process
    ipcRenderer.on("update-score", (_event, value) => callback(value));

    // Return a function to remove the event listener
    return () => {
      ipcRenderer.removeAllListeners("update-score");
    };
  },
});
