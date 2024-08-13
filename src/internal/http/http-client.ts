import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * HttpClient class to make HTTP requests
 * @class
 * @example
 * const httpClient = new HttpClient('https://jsonplaceholder.typicode.com');
 * httpClient.get('/posts').then((response) => {
 *  console.log(response);
 * });
 */
class HttpClient {
  private client: AxiosInstance;

  /**
   * Constructor
   * @param baseURL - The base URL for the API
   */
  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000, // Set a timeout for requests
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.initializeResponseInterceptor();
  }

  /**
   * Initialize the response interceptor
   * @private
   */
  private initializeResponseInterceptor = () => {
    this.client.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = (response: AxiosResponse) => {
    return response.data;
  };

  private handleError = (error: any) => {
    // You can customize your error handling here
    return Promise.reject(error);
  };

  /**
   * Get request
   * @param url - The URL for the request
   * @param config - The request configuration
   * @returns Promise
   */
  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config);
  }

  /**
   * Post request
   * @param url - The URL for the request
   * @param data - The data to send
   * @param config - The request configuration
   * @returns Promise
   */
  public post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config);
  }

  /**
   * Put request
   * @param url - The URL for the request
   * @param data - The data to send
   * @param config - The request configuration
   * @returns Promise
   */
  public put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config);
  }

  /**
   * Delete request
   * @param url - The URL for the request
   * @param config - The request configuration
   * @returns Promise
   */
  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config);
  }
}

