import { AxiosResponse } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  MessageResponse,
  RefreshTokenReponse,
  RefreshTokenRequest,
  RegisterRequest,
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
  ): Promise<AxiosResponse<MessageResponse>['data']> {
    return ApiUser.apiClient.post('/auth/register', data);
  }

  static refreshToken(
    data: RefreshTokenRequest
  ): Promise<AxiosResponse<RefreshTokenReponse>['data']> {
    return ApiUser.apiClient.post('/auth/refresh-token', data);
  }
  static logout(): Promise<AxiosResponse<MessageResponse>['data']> {
    return ApiUser.apiClient.post('/auth/logout', null);
  }
}

export default ApiUser;
