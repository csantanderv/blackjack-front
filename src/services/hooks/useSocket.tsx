import { useState, useEffect } from 'react';
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
  const setSocketPlayer = (player: PlayerUseSocketProps) => {
    setUser(player);
  };

  useEffect(() => {
    if (user && socket === null) {
      try {
        const socket = socketIOClient(ConfigApp.backendUrl + '/gameEvents', {
          query: { ...user },
          forceNew: true,
        });
        setSocket(socket);
      } catch (error) {
        setError('Ocurrió un error al conectarse al servidor del juego');
      }
    }
  }, [user, socket]);

  return [socket, error, setSocketPlayer];
};
