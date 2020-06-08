import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import ConfigApp from '../../config/Config';

const ApiClient = (token: string): AxiosInstance => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  config.baseURL = ConfigApp.backendUrl;
  if (token !== '') {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  const instance = Axios.create(config);
  return instance;
};

export default ApiClient;
