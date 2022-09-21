import axios, { AxiosInstance, AxiosResponse } from 'axios';

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

      if (token) {
        const tokenCurrent = JSON.parse(token).token;

        config.headers.Authorization = tokenCurrent ? tokenCurrent : false;
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
  (err) => {
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
