import {
  GasStation,
  Reservation,
  StationSlot,
  RegisterRequest,
  LoginRequest,
  BookStationRequest,
  AddStationRequest,
  AuthResponse,
  ApiResponse,
  IMapObject,
  RefreshRequest,
} from '../types/api'
import { authStore } from '../stores/authStore'

const API_BASE_URL = 'http://localhost:8080/api'

// Separate function for refresh calls to avoid recursion
async function refreshApiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await authStore.ensureValidToken()
  let requestCount = 0
  const MAX_REQUEST = 2

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    if (requestCount >= MAX_REQUEST) {
      throw new Error(`API call failed: ${response.statusText}`)
    }

    if (response.status === 401) {
      requestCount += 1
      await authStore.refreshToken()
      // Retry the request with new token
      return apiCall(endpoint, options)
    }
    throw new Error(`API call failed: ${response.statusText}`)
  }

  return response.json()
}

// Auth endpoints
export const auth = {
  register: (data: RegisterRequest): Promise<AuthResponse> =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: LoginRequest): Promise<AuthResponse> =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  refresh: (data: RefreshRequest): Promise<AuthResponse> =>
    refreshApiCall('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  resetPassword: (email: string): Promise<any> =>
    apiCall('/auth/forgotpass', {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    }),
}

export const user = {
  getProfile: (userId: number): Promise<{ username: string; role: string }> =>
    apiCall(`/users/profile?supabaseId=${userId}`),

  changePassword: (password: string): Promise<any> =>
    apiCall('/users/profile/changepass', {
      method: 'POST',
      body: JSON.stringify({
        newPassword: password,
      }),
    }),
}

export const reservations = {}

export const gasStations = {
  getAvailable: (timestamp: number): Promise<IMapObject[]> =>
    apiCall(`/stations/free?timestamp=${timestamp}`),

  book: (
    data: BookStationRequest,
    startTime: string
  ): Promise<ApiResponse<void>> =>
    apiCall(`/gas-stations/book?startTime=${encodeURIComponent(startTime)}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

// Admin endpoints
export const admin = {
  getAllStations: (): Promise<GasStation[]> => apiCall('/admin/stations'),

  addStation: (data: AddStationRequest): Promise<ApiResponse<void>> =>
    apiCall('/admin/stations/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteStation: (name: string): Promise<ApiResponse<void>> =>
    apiCall(`/admin/stations/delete/${name.split(' ').join('_')}`, {
      method: 'DELETE',
    }),
}

// Initialize auth store and set up refresh callback
export function initializeAuth() {
  authStore.initialize()
  authStore.setRefreshCallback(async (refreshToken) => {
    const response = await auth.refresh({ refresh_token: refreshToken })
    return response
  })
}
