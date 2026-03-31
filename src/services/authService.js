import { api } from "./api";

export const AuthErrorTypes = {
  NETWORK_ERROR: "NETWORK_ERROR",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  SERVER_ERROR: "SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
};

export class AuthService {
  handleError(error) {
    if (error.code === "ERR_NETWORK") {
      return {
        type: AuthErrorTypes.NETWORK_ERROR,
        message: "Erro de conexão com o servidor.",
      };
    }

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message;

      if (status === 401) {
        return {
          type: AuthErrorTypes.INVALID_CREDENTIALS,
          message: message || "Credenciais inválidas.",
        };
      }

      if (status === 500) {
        return {
          type: AuthErrorTypes.SERVER_ERROR,
          message: "Erro interno do servidor.",
        };
      }
    }

    return {
      type: AuthErrorTypes.UNKNOWN_ERROR,
      message: "Erro inesperado.",
    };
  }

  async login(credentials) {
    try {
      const response = await api.post("/auth/signin", credentials);

      const token = response.data?.token;
      if (!token) throw new Error("Token não recebido");

     
      localStorage.setItem("token", token);

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: this.handleError(error),
      };
    }
  }

  logout() {
    localStorage.removeItem("token");
  }
}
