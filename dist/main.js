"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    electron_1.app.quit();
}
let mainWindow = null;
const createWindow = () => {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
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
        mainWindow.webContents.on("did-fail-load", (_, errorCode, errorDescription) => {
            console.error(`Failed to load: ${errorCode} - ${errorDescription}`);
        });
    }
    else {
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
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed, except on macOS.
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
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
electron_1.ipcMain.handle("get-game-state", () => {
    return {
        score,
        clickValue,
        autoClickerCount,
        autoClickerCost,
        upgradeClickCost,
    };
});
electron_1.ipcMain.handle("increment-score", () => {
    score += clickValue;
    return score;
});
electron_1.ipcMain.handle("buy-auto-clicker", () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickerCount += 1;
        autoClickerCost = Math.floor(autoClickerCost * 1.15); // Increase cost
        return { success: true, score, autoClickerCount, autoClickerCost };
    }
    return { success: false };
});
electron_1.ipcMain.handle("upgrade-click", () => {
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
//# sourceMappingURL=main.js.map