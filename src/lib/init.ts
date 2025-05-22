import { initializeAuth } from './api';

// Initialize all required services
export function initializeApp() {
  // Initialize auth store and set up refresh callback
  initializeAuth();
} 