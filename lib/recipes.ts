// Recipe types and utilities for the meal planning app
// Edit the recipes in: config/recipes.json

import recipesConfig from '@/config/recipes.json';

export interface PrepInstruction {
  when: 'night-before' | 'morning' | 'advance';
  taskEn: string;
  taskHi: string;
}

export interface Recipe {
  name: string;
  nameHi: string;
  emoji: string;
  youtubeId: string;
  protein: number;
  calories: number;
  prepTime: number;
  equipment: 'stove' | 'airfryer' | 'microwave' | 'no-cook';
  prep?: PrepInstruction;
}

export interface DayMenu {
  breakfast: Recipe;
  lunch: Recipe;
  dinner?: Recipe; // Optional - no dinner on Sundays
}

// Load recipes from config file
export const recipes: DayMenu[] = recipesConfig.days.map(day => ({
  breakfast: day.breakfast as Recipe,
  lunch: day.lunch as Recipe,
  dinner: day.dinner as Recipe | undefined
}));

// Get current day index (0-13)
export function getDayIndex(): number {
  const startDate = new Date('2024-01-01');
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays % 14;
}

// Get current meal based on IST time
export function getMealType(): 'breakfast' | 'lunch' | 'dinner' {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  const hour = istTime.getHours();
  
  if (hour >= 5 && hour < 11) {
    return 'breakfast';
  } else if (hour >= 11 && hour < 17) {
    return 'lunch';
  } else {
    return 'dinner';
  }
}

// Get IST hour
export function getISTHour(): number {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  return istTime.getHours();
}

// Get IST time string
export function getISTTime(): string {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  return istTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Check if today is Sunday
export function isSunday(): boolean {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istTime = new Date(utc + (5.5 * 60 * 60 * 1000));
  return istTime.getDay() === 0;
}

// Get next cook arrival time
export function getNextCookTime(): { time: string; isSunday: boolean } {
  const hour = getISTHour();
  const sunday = isSunday();
  
  if (sunday) {
    if (hour < 10) {
      return { time: '10:00 AM', isSunday: true };
    } else if (hour < 19) {
      return { time: '7:00 PM', isSunday: false };
    } else {
      return { time: '7:00 AM', isSunday: false };
    }
  } else {
    if (hour < 7) {
      return { time: '7:00 AM', isSunday: false };
    } else if (hour < 19) {
      return { time: '7:00 PM', isSunday: false };
    } else {
      return { time: '7:00 AM', isSunday: false };
    }
  }
}

// Get meal emoji
export function getMealEmoji(mealType: 'breakfast' | 'lunch' | 'dinner'): string {
  return { breakfast: '🌅', lunch: '☀️', dinner: '🌙' }[mealType];
}

// Get equipment emoji
export function getEquipmentEmoji(equipment: string): string {
  const emojis: Record<string, string> = {
    'stove': '🔥',
    'airfryer': '🌀',
    'microwave': '📻',
    'no-cook': '❄️'
  };
  return emojis[equipment] || '🍳';
}
