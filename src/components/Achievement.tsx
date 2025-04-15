import * as React from 'react';
import { useState, useEffect } from 'react';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

interface AchievementNotificationProps {
  achievement: Achievement;
  onHide: () => void;
}

export function AchievementNotification({ achievement, onHide }: AchievementNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onHide]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg z-50 animate-in slide-in-from-right max-w-sm">
      <div className="flex items-center">
        <div className="text-2xl mr-3">{achievement.icon}</div>
        <div>
          <div className="font-bold">Achievement Unlocked!</div>
          <div className="text-sm font-medium">{achievement.title}</div>
          <div className="text-xs">{achievement.description}</div>
        </div>
      </div>
    </div>
  );
}

interface AchievementsProps {
  achievements: Achievement[];
  onClose: () => void;
}

export function Achievements({ achievements, onClose }: AchievementsProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      <div className="bg-background p-6 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(achievement => (
            <div 
              key={achievement.id}
              className={`border rounded-lg p-4 flex items-center ${
                achievement.unlocked 
                  ? 'bg-yellow-500/10 border-yellow-500' 
                  : 'bg-gray-200/10 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-3xl mr-4">{achievement.icon}</div>
              <div>
                <div className="font-bold">{achievement.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </div>
                <div className="text-xs mt-1">
                  {achievement.unlocked 
                    ? <span className="text-green-500">Unlocked</span>
                    : <span className="text-gray-500">Locked</span>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 