import React, { useContext } from 'react';
import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import ConfigApp from '../../config/Config';
import { AppContext } from '../../state/Store';

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
