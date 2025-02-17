interface ApiRequestParams {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  options?: RequestInit;
}

const API_URL: string = import.meta.env.VITE_API_URL;

async function apiRequest<T>({ endpoint, method, options = {} }: ApiRequestParams): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error('Fetch API Error:', error);
    throw error;
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>({
      endpoint,
      method: 'GET',
      options,
    }),
  post: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>({
      endpoint,
      method: 'POST',
      options,
    }),
  put: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>({
      endpoint,
      method: 'PUT',
      options,
    }),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>({ endpoint, method: 'DELETE', options }),
};
