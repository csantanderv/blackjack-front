import { useEffect, useContext } from 'react';
import { PlayerType, ActionTypes } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';
import { AppContext } from '../../state/Store';

const usePlayerMoves = (): [Function, Function, Function] => {
  const { state, dispatch } = useContext(AppContext);
  const { socket } = state;

  useEffect(() => {
    if (socket) {
      socket.on(EventTypes.SetPlayers, (data: any) => {
        if (data) {
          dispatch({
            type: ActionTypes.SetPlayers,
            payload: {
              players: data,
            },
          });
        }
      });
      socket.on(EventTypes.SetBank, (data: any) => {
        dispatch({
          type: ActionTypes.SetBank,
          payload: {
            bank: data,
          },
        });
      });
      socket.on(EventTypes.GameStarted, (data: any) => {
        dispatch({
          type: ActionTypes.SetStarted,
          payload: {
            started: true,
          },
        });
      });
      socket.on(EventTypes.GameFinished, (data: any) => {
        dispatch({
          type: ActionTypes.SetStarted,
          payload: {
            started: false,
          },
        });
      });
    }
  }, [socket, dispatch]);

  const stand = (currentPlayer: PlayerType) => {
    if (socket) {
      socket.emit(EventTypes.PlayerStand, currentPlayer);
    }
  };

  const bet = (currentPlayer: PlayerType) => {
    if (socket) {
      socket.emit(EventTypes.PlayerBet, currentPlayer);
    }
  };

  const hit = (currentPlayer: PlayerType) => {
    if (currentPlayer && socket) {
      socket.emit(EventTypes.PlayerHit, currentPlayer);
    }
  };

  return [stand, bet, hit];
};

export default usePlayerMoves;
