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

  const setSocketPlayer = (player: PlayerUseSocketProps) => {
    setUser(player);
  };

  useEffect(() => {
    if (user && socket === null) {
      try {
        console.log('se conecto al socket');
        const so = socketIOClient(ConfigApp.backendUrl, {
          query: { ...user },
          transports: ['websocket'],
        });
        setSocket(so);
      } catch (error) {
        setError('Ocurrió un error al conectarse al servidor del juego');
      }
    }
  }, [user, socket]);

  return [socket, error, setSocketPlayer];
};
