import { useEffect, useContext } from 'react';
import { PlayerType, ActionTypes } from '../../state/StoreTypes';
import { EventTypes } from '../../services/socket/EventTypes';
import { AppContext } from '../../state/Store';

const useBankMoves = (): [Function, Function, Function, Function] => {
  const { state, dispatch } = useContext(AppContext);
  const { socket } = state;

  useEffect(() => {
    if (socket !== null) {
      socket.on(EventTypes.SetPlayers, (data: any) => {
        dispatch({
          type: ActionTypes.SetPlayers,
          payload: {
            players: data,
          },
        });
        dispatch({
          type: ActionTypes.SetSelectedPlayer,
          payload: {
            selectedPlayer: null,
          },
        });
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

  const playCard = () => {
    if (socket) {
      socket.emit(EventTypes.NewGame);
    }
  };

  const hitCard = () => {
    if (socket) {
      socket.emit(EventTypes.BankHit);
    }
  };

  const giveCard = (selectedPlayer: PlayerType) => {
    if (socket) {
      socket.emit(EventTypes.GiveCard, selectedPlayer);
    }
  };

  const shuffleCards = () => {
    if (socket) {
      socket.emit(EventTypes.ResetGame);
    }
  };

  return [playCard, hitCard, giveCard, shuffleCards];
};

export default useBankMoves;
