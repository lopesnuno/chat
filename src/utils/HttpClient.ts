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
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmFmYSIsInVzZXJJZCI6IjZqckhud2lIaWhSTmVXcXJLaXJXIiwicm9sZXMiOlsidXNlciJdLCJpYXQiOjE2NTIwMjE0MjAsImV4cCI6MjUxNjAyMTQyMH0.Vqt-nEOovaIiClBdJKcJMAk3WYN8-EmtCiwZ6YXU9qWjHgq0GHCEBHxnEclVG0n-gADWqN1A3lOtHk7a7F4lbNVTb5uKt4EJIaC48Rt3ePSEguaj6rmU5RyfnjRH_gkSEG1uCaff0Ox2IAuEU1lWHXenfoRtCevaSgcRRJm_-RH8J28QswQV90dGKT9a6jUYDu8tf0dTvbEoazVPebgemTsgvlg8eC6QHO9ukh3fv1r561rQtDaDs685u7F7xbmPSocXhj_4MYq4ue_OB-qiDD6K8hxtH8fdzPnjUrjC1WufgmenGTAqhOsZrgFaKYaLMyH4Cm2oAxzlfES5j3BnIQ';
  };

  public logout() {
    this.token = null;
  }

  private handleResponse = ({ data }: AxiosResponse) => data;

  protected handleError = (error: any) => Promise.reject(error);
}

export default HttpClient;
