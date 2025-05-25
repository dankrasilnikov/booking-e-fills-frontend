export interface GasStation {
  id: number;
  stationName: string;
}

export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface Reservation {
  id: number;
  gasStation: GasStation;
  user: User;
  startTime: string;
  endTime: string;
}

export interface StationSlot {
  id: number;
  gasStation: GasStation;
  slotTime: string;
  availableSlots: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface BookStationRequest {
  gasStationId: number;
}

export interface AddStationRequest {
  title: string;
  connectorCount: number;
  latitude: number;
  longitude: number;
}

export interface AuthResponse {
  access_token: string;
  expires_at: number;
  expires_in: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface IMapObject {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  active: boolean;
}
