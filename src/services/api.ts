import { LoginRequest, SistemaResponse, LoginResponse } from '@/types/auth';

const API_BASE_URL = 'https://gerentemax-dev2.azurewebsites.net';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  async getSistemas(email: string, senha: string): Promise<SistemaResponse> {
    return this.request<SistemaResponse>('/api/v1/Auth/Sistema', {
      method: 'POST',
      body: JSON.stringify({
        email,
        senha,
        id_aplicativo: null,
      }),
    });
  }

  async login(loginData: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/api/v1/Auth/Login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
  }
}

export const apiService = new ApiService();