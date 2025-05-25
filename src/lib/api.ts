import {
    AddStationRequest,
    ApiResponse,
    AuthResponse,
    BookStationRequest,
    GasStation,
    IMapObject,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
} from '../types/api';
import {authStore} from '../stores/authStore';

const API_BASE_URL = 'http://localhost:8080/api';

async function refreshApiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const accessToken = await authStore.ensureValidToken();
  let requestCount = 0;
  const MAX_REQUEST = 2;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (requestCount >= MAX_REQUEST) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    if (response.status === 401) {
      requestCount += 1;
      await authStore.refreshToken();

      return apiCall(endpoint, options);
    }
    throw new Error(`API call failed: ${response.statusText}`);
  }
  const text = await response.text();

  return text ? JSON.parse(text) : null;
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
};

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

  changeUsername: (username: string): Promise<any> =>
    apiCall('/users/profile/changeusername', {
      method: 'POST',
      body: JSON.stringify({
        newUsername: username,
      }),
    }),

  createReservation: (
    seqNum: number,
    start: number,
    title: string,
    duration: string
  ): Promise<any> =>
    apiCall('/reservations/book', {
      method: 'POST',
      body: JSON.stringify({
        seqNum,
        title,
        start,
        duration,
      }),
    }),

  getReservations: (): Promise<any> => apiCall('/reservations/getall'),

  cancelReservation: (uuid: string): Promise<any> =>
    apiCall(`/reservations/cancel/${uuid}`, {
      method: 'DELETE',
    }),
};

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
};

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
};

export function initializeAuth() {
  authStore.initialize();
  authStore.setRefreshCallback(async (refreshToken) => {
    const response = await auth.refresh({ refresh_token: refreshToken });
    return response;
  });
}
