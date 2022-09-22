import axios, { AxiosInstance, AxiosResponse } from 'axios';
import ApiUser from './ApiUser';

const instanceAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/api/v1/gin/'
      : 'https://fathomless-retreat-80501.herokuapp.com/api/v1/gin/',
  headers: {
    ['Content-Type']: 'application/json',
    timeout: 1000,
  },
});

instanceAxios.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = localStorage.getItem('tokenState');
      const user = localStorage.getItem('userState');

      if (token && user) {
        const tokenCurrent = JSON.parse(token).token;
        const userId = JSON.parse(user).id;

        config.headers.Authorization = tokenCurrent ? tokenCurrent : false;
        config.headers.userId = userId ? userId : false;
      }
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instanceAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (err) => {
    const config = err.config;

    if (err.response && err.response.status === 401 && !config._retry) {
      config._retry = true;
      const token = localStorage.getItem('tokenState');

      try {
        if (token) {
          let res = await ApiUser.refreshToken(JSON.parse(token).tokenRefresh);

          if (res) {
            localStorage.setItem(
              'tokenState',
              JSON.stringify({
                token: res.tokenType + ' ' + res.token,
                tokenRefresh: res.refreshToken,
              })
            );
          }

          return instanceAxios(config);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);

export class ApiClient {
  private clientApi: AxiosInstance;

  constructor() {
    this.clientApi = instanceAxios;
  }

  get(url: string): Promise<AxiosResponse['data']> {
    return this.clientApi.get(url);
  }

  post(url: string, data: any): Promise<AxiosResponse['data']> {
    return this.clientApi.post(url, data);
  }

  put(url: string, data: any): Promise<AxiosResponse['data']> {
    return this.clientApi.put(url, data);
  }

  patch(url: string, data: any): Promise<AxiosResponse['data']> {
    return this.clientApi.patch(url, data);
  }

  delete(url: string): Promise<AxiosResponse['data']> {
    return this.clientApi.delete(url);
  }
}

export default new ApiClient();
