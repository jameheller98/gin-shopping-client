import { AxiosResponse } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenReponse,
  RefreshTokenRequest,
  RegisterRequest,
  RegisterResponse,
  UserResponse,
} from '../user/interfaces';
import apiClient from './ApiClient';

class ApiUser {
  private static apiClient = apiClient;

  static getUser(): Promise<AxiosResponse<UserResponse>['data']> {
    return ApiUser.apiClient.get('/user/info');
  }

  static loginUser(
    data: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>['data']> {
    return ApiUser.apiClient.post('/auth/login', data);
  }

  static registerUser(
    data: RegisterRequest
  ): Promise<AxiosResponse<RegisterResponse>['data']> {
    return ApiUser.apiClient.post('/auth/register', data);
  }

  static refreshToken(
    data: RefreshTokenRequest
  ): Promise<AxiosResponse<RefreshTokenReponse>['data']> {
    return ApiUser.apiClient.post('/auth/refresh-token', data);
  }
  static logout(): Promise<AxiosResponse<RegisterResponse>['data']> {
    return ApiUser.apiClient.post('/auth/logout', {});
  }
}

export default ApiUser;
