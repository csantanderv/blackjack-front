import { useState, useEffect } from 'react';
import { PlayerType } from '../../state/StoreTypes';
import socketIOClient from 'socket.io-client';
import ConfigApp from '../../config/Config';

interface PlayerUseSocketProps {
  id: string;
  profile: string;
  name: string;
}

export const useSocket = (
  token: string,
): [SocketIOClient.Socket | null, string, Function] => {
  const [user, setUser] = useState<PlayerUseSocketProps | null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [error, setError] = useState('');

  //TODO: falta agregar el socket para la authentiacion
  const setCurrentPlayer = (player: PlayerUseSocketProps) => {
    setUser(player);
  };

  useEffect(() => {
    if (user !== null && socket === null) {
      try {
        const socket = socketIOClient(ConfigApp.backendUrl, {
          query: { ...user },
        });
        setSocket(socket);
      } catch (error) {
        setError('Ocurrió un error al conectarse al servidor del juego');
      }
    }
  }, [user]);

  return [socket, error, setCurrentPlayer];
};
