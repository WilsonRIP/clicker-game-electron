# ShadCn Clicker Game

A desktop clicker game built with Electron, TypeScript, React, and ShadCn UI.

## Features

- Increment score by clicking
- Purchase auto-clickers that generate points automatically
- Upgrade click value to earn more points per click
- Modern UI using ShadCn components
- Dark mode support

## Tech Stack

- Electron
- TypeScript
- React
- ShadCn UI
- Tailwind CSS

## Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

## Development

```bash
# Build TypeScript files and watch for changes
npm run watch

# In a separate terminal, start the Electron app
npm run dev
```

## Build

To build the application for production:

```bash
# Build TypeScript files
npm run build

# Package the application
npm run package
```

## Project Structure

- `src/` - Source code
  - `components/` - React components
    - `ui/` - ShadCn UI components
  - `lib/` - Utility functions
  - `styles/` - CSS styles
  - `main.ts` - Electron main process
  - `preload.ts` - Preload script for IPC
  - `renderer.tsx` - React renderer

## Created by

[WilsonRIP](https://github.com/WilsonRIP)
