import * as React from 'react';
import { useState } from 'react';
import { Button } from './ui/button';

interface SettingsMenuProps {
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export function SettingsMenu({ onClose, soundEnabled, onToggleSound }: SettingsMenuProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-2xl max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-lg">Sound Effects</label>
            <Button
              variant={soundEnabled ? "default" : "outline"}
              onClick={onToggleSound}
              className="min-w-[100px]"
            >
              {soundEnabled ? "On" : "Off"}
            </Button>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-bold mb-2">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Clicker Game v1.0.0 - A simple cookie clicker game built with Electron, React, and TypeScript.
            </p>
          </div>
          
          <div className="pt-2">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              This game was created for educational purposes. All animations, sounds, and game mechanics 
              were implemented using web technologies.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
} 