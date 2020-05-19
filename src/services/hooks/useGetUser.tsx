import ApiClient from '../api/ApiClient';
import { useState, useEffect } from 'react';
import { PlayerType } from '../../state/StoreTypes';

export const useGetUser = (
  token: string,
): [PlayerType | null, boolean, any] => {
  const [user, setUser] = useState<PlayerType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const resp = await ApiClient(token).get('auth');
      setUser(resp.data);
    } catch (e) {
      console.log(e);
      setError('Ocurrió un error al obtener el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return [user, isLoading, error];
};
