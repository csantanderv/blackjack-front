import ApiClient from '../api/ApiClient';
import { useState, useEffect } from 'react';

interface SetLoginUserProps {
  email: string;
  password: string;
}

export const useLoginUser = (): [string, Function, boolean, string] => {
  const [login, setLogin] = useState<SetLoginUserProps | null>(null);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (login !== null) {
      fetchData();
    }
  }, [login]);

  const setLoginUser = (body: SetLoginUserProps) => {
    setLogin(body);
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ApiClient('').post('auth/login', login);
      setToken(res.data.token);
    } catch (e) {
      console.log(e);
      setError('Los datos ingresados no son correctos');
    } finally {
      setIsLoading(false);
    }
  };

  return [token, setLoginUser, isLoading, error];
};
