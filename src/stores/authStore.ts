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
  isLoading: boolean = true;

  private refreshPromise: Promise<void> | null = null;
  private refreshCallback: RefreshCallback | null = null;
  private initialized = false;


  constructor() {
    makeAutoObservable(this);
  }

  initialize() {
    if (this.initialized) return;
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken && this.refreshCallback) {
      this.refreshToken();
    }
    this.initialized = true;
  }

  setRefreshCallback(callback: RefreshCallback) {
    this.refreshCallback = callback;
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      // Trigger a refresh when callback is set
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

  setUsername(username: string) {
    this.username = username;
  }

  logout() {
    this.accessToken = null;
    this.user = null;
    this.isAuthenticated = false;
    this.username = null;
    this.userrole = null;
    localStorage.removeItem('refresh_token');
  }

  get userData() {
    return this.user;
  }

  async refreshToken() {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken || !this.refreshCallback) {
      this.logout();
      return;
    }

    this.refreshPromise = (async () => {
      try {
        const response = await this.refreshCallback(refreshToken);
        this.setAuth(response.access_token, response.user);
        this.isLoading = false;
        this.setRefreshToken(response.refresh_token);

        const profile = await user.getProfile(response.user.id);
        this.username = profile.username;
        this.userrole = profile.role;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.logout();
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  async ensureValidToken() {
    if (!this.accessToken) {
      await this.refreshToken();
    }
    return this.accessToken;
  }
}

export const authStore = new AuthStore();
