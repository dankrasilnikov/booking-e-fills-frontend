import { makeAutoObservable } from 'mobx';
import { User } from '../types/api';
import { auth, user } from '@/lib/api';

type RefreshCallback = (refreshToken: string) => Promise<{
  access_token: string;
  refresh_token: string;
  user: User;
}>;

class AuthStore {
  accessToken: string | null = null;
  user: User | null = null;
  isAuthenticated: boolean = false;
  username: string | null = null;
  userrole: string | null = null;
  private refreshPromise: Promise<void> | null = null;
  private refreshCallback: RefreshCallback | null = null;
  private initialized = false;

  constructor() {
    makeAutoObservable(this);
  }

  initialize() {
    if (this.initialized) return;

    // Initialize from localStorage if available
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.isAuthenticated = true;
    }

    this.initialized = true;
  }

  setRefreshCallback(callback: RefreshCallback) {
    this.refreshCallback = callback;
    // If we have a refresh token and are authenticated, try to refresh now
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken && this.isAuthenticated) {
      this.refreshToken();
    }
  }

  setAuth(accessToken: string, user: User) {
    this.accessToken = accessToken;
    this.user = user;
    this.isAuthenticated = true;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem('refresh_token', refreshToken);
  }

  logout() {
    this.accessToken = null;
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem('refresh_token');
  }

  get userData() {
    return this.user;
  }

  async refreshToken() {
    // If there's already a refresh in progress, return that promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken || !this.refreshCallback) {
      this.logout();
      return;
    }

    // Create a new refresh promise
    this.refreshPromise = (async () => {
      try {
        const response = await this.refreshCallback(refreshToken);
        this.setAuth(response.access_token, response.user);
        this.setRefreshToken(response.refresh_token);
        const { username, role } = await user.getProfile(response.user.id);
        this.username = username;
        this.userrole = role;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.logout();
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  // Method to check if token needs refresh and handle it
  async ensureValidToken() {
    if (!this.accessToken) {
      await this.refreshToken();
    }
    return this.accessToken;
  }
}

export const authStore = new AuthStore();
