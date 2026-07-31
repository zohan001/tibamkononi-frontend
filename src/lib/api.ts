const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface RequestOptions extends RequestInit {
  token?: string;
}

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token, ...fetchOptions } = options;
  const authToken = token || getToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error ${response.status}`);
  }

  const json = await response.json();

  if (Array.isArray(json)) return json as T;

  if (json && typeof json === 'object') {
    if (Array.isArray(json.data)) return json.data as T;
    if (Array.isArray(json.items)) return json.items as T;
    if (Array.isArray(json.results)) return json.results as T;

    const lastSegment = endpoint.split('/').filter(Boolean).pop() || '';
    const pluralKey = lastSegment.endsWith('s') ? lastSegment : `${lastSegment}s`;
    if (Array.isArray(json[pluralKey])) return json[pluralKey] as T;
    if (Array.isArray(json[lastSegment])) return json[lastSegment] as T;
  }

  return json as T;
}

export const api = {
  get: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: 'GET', token }),

  post: <T>(endpoint: string, data: unknown, token?: string) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(data), token }),

  put: <T>(endpoint: string, data: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PUT', body: JSON.stringify(data), token }),

  patch: <T>(endpoint: string, data: unknown, token?: string) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(data), token }),

  delete: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: 'DELETE', token }),
};
