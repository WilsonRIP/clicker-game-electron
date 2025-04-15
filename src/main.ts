import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  console.log("Loading HTML file from:", path.join(__dirname, "../index.html"));

  // Load the index.html file
  if (process.env.NODE_ENV === "development") {
    // In development, webpack will output the HTML file to dist/index.html
    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // Open DevTools in development mode
    mainWindow.webContents.openDevTools();

    // Log any errors that occur during page load
    mainWindow.webContents.on(
      "did-fail-load",
      (_, errorCode, errorDescription) => {
        console.error(`Failed to load: ${errorCode} - ${errorDescription}`);
      }
    );
  } else {
    // In production
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
  }

  // Log when page has finished loading
  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Page loaded successfully");
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Game state management
let score = 0;
let clickValue = 1;
let autoClickerCount = 0;
let autoClickerCost = 10;
let upgradeClickCost = 25;

// IPC handlers for game logic
ipcMain.handle("get-game-state", () => {
  return {
    score,
    clickValue,
    autoClickerCount,
    autoClickerCost,
    upgradeClickCost,
  };
});

ipcMain.handle("increment-score", () => {
  score += clickValue;
  return score;
});

ipcMain.handle("buy-auto-clicker", () => {
  if (score >= autoClickerCost) {
    score -= autoClickerCost;
    autoClickerCount += 1;
    autoClickerCost = Math.floor(autoClickerCost * 1.15); // Increase cost
    return { success: true, score, autoClickerCount, autoClickerCost };
  }
  return { success: false };
});

ipcMain.handle("upgrade-click", () => {
  if (score >= upgradeClickCost) {
    score -= upgradeClickCost;
    clickValue += 1;
    upgradeClickCost = Math.floor(upgradeClickCost * 1.5); // Increase cost
    return { success: true, score, clickValue, upgradeClickCost };
  }
  return { success: false };
});

// Auto-clicker interval
setInterval(() => {
  if (autoClickerCount > 0 && mainWindow) {
    score += autoClickerCount;
    mainWindow.webContents.send("update-score", score);
  }
}, 1000);
