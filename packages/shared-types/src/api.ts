export interface ApiResponse<T> {
  data: T;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: { total: number };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown[];
  };
}

export interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
}
