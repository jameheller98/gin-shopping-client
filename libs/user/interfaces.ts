interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: RefreshTokenReponse;
  user: UserResponse;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface MessageResponse {
  msg: string;
}

interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface RefreshTokenRequest {
  refreshToken: string;
}

interface RefreshTokenReponse {
  token: string;
  refreshToken: string;
  tokenType: string;
}

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  MessageResponse,
  UserResponse,
  RefreshTokenRequest,
  RefreshTokenReponse,
};
