import { AxiosResponse } from 'axios';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../user/interfaces';
import apiClient from './ApiClient';

class ApiUser {
  private static apiClient = apiClient;

  static getUser(): Promise<AxiosResponse<RegisterResponse>['data']> {
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
}

export default ApiUser;
