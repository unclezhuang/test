import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
}

class HttpClient {
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private handleRequest = (config: RequestConfig): RequestConfig => {
    if (config.showLoading) {
      // 显示加载状态
    }

    // 设置请求头部信息等
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    return config;
  }

  private handleError = (error: AxiosError): Promise<AxiosResponse> => {
    // 隐藏加载状态
    // 处理错误

    return Promise.reject(error);
  }

  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    if (response.config.showLoading) {
      // 隐藏加载状态
    }

    return response;
  }

  public request = (config: RequestConfig): Promise<AxiosResponse> => {
    // 合并请求配置和默认配置
    const finalConfig = { baseURL: this.baseURL, ...config };

    // 处理请求前的逻辑
    finalConfig.showLoading && console.log('显示加载状态');

    // 发起请求
    return axios.request(this.handleRequest(finalConfig))
      .then(this.handleResponse)
      .catch(this.handleError)
      .finally(() => {
        // 隐藏加载状态
      });
  }

  public get = (url: string, config: RequestConfig = {}): Promise<AxiosResponse> => {
    return this.request({
      ...config,
      method: 'get',
      url,
    });
  }

  public post = (url: string, data: any = {}, config: RequestConfig = {}): Promise<AxiosResponse> => {
    return this.request({
      ...config,
      method: 'post',
      url,
      data,
    });
  }

  // 支持其它 HTTP 方法
}

export default HttpClient;