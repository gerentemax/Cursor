export interface Cliente {
  id: number;
  nome: string;
  razaoSocial?: string;
  documento?: string;
  email?: string;
  telefone?: string;
  ativo: boolean;
}

export interface SistemaResponse {
  success: boolean;
  message?: string;
  data?: {
    clientes: Cliente[];
  };
}

export interface LoginRequest {
  email: string;
  senha: string;
  id_aplicativo?: number | null;
  id_sistema?: number;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    user: {
      id: number;
      nome: string;
      email: string;
    };
  };
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}