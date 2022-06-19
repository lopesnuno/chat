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
  };

  public authenticate = (): void => {
    this.token = process.env.testToken; // TODO: generate a valid token for authenticated methods
  };

  public logout() {
    this.token = null;
  }

  private handleResponse = ({ data }: AxiosResponse) => data;

  protected handleError = (error: any) => Promise.reject(error);
}

export default HttpClient;
