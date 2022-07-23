import axios, { AxiosInstance, AxiosResponse } from 'axios';


abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  protected token: string | null;

  protected constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true
    });
    this.token = null;
    this.initializeInterceptors();
  }

  private initializeInterceptors = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
    this.instance.interceptors.request.use((configFromParams) => {
      if (!this.token) {return configFromParams;}
      const axiosConfig = configFromParams;

      axiosConfig.headers.Authorization = `Bearer ${this.token}`;
      return axiosConfig;
    });
  };


  public authenticate = (token: string): void => {
    this.token = token;
  };

  public logout() {
    this.token = null;
  }

  private handleResponse = ({ data }: AxiosResponse) => data;

  protected handleError = (error: any) => Promise.reject(error);
}

export default HttpClient;
