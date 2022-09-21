interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  jwt: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface RegisterResponse {
  msg: string;
}

interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UserResponse,
};
