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
  IMapObject
} from '../types/api';

const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to handle API calls
async function apiCall<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('auth_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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
};

// Gas Station endpoints
export const gasStations = {
  getAvailable: (timestamp: number): Promise<IMapObject[]> =>
    apiCall(`/stations/free?timestamp=${timestamp}`),

  book: (data: BookStationRequest, startTime: string): Promise<ApiResponse<void>> =>
    apiCall(`/gas-stations/book?startTime=${encodeURIComponent(startTime)}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Admin endpoints
export const admin = {
  getAllStations: (): Promise<GasStation[]> =>
    apiCall('/admin/stations'),

  addStation: (data: AddStationRequest): Promise<ApiResponse<void>> =>
    apiCall('/admin/stations/add', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  deleteStation: (id: number): Promise<ApiResponse<void>> =>
    apiCall(`/admin/stations/delete/${id}`, {
      method: 'DELETE',
    }),
}; 