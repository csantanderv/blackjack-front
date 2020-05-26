import React, { useContext, useEffect } from 'react';
import PlayerMultiplayer from '../PlayerMultiplayer';
import { AppContext } from '../../state/Store';
import { EventTypes } from '../../services/socket/EventTypes';
import { ActionTypes } from '../../state/StoreTypes';
import '../../index.scss';
import './style.scss';

const BoardMultiplayer = () => {
  const { state, dispatch } = useContext(AppContext);
  const { socket, players } = state;

  useEffect(() => {
    if (socket !== null) {
      socket.on(EventTypes.SetPlayers, (data: any) => {
        dispatch({
          type: ActionTypes.SetPlayers,
          payload: {
            players: data,
          },
        });
      });
    }
  }, [socket]);

  return players === null || players.length === 0 ? (
    <p>Esperando jugadores</p>
  ) : (
    <div className='item-container'>
      <div className='item-container'>
        <div className='board-container'>
          {players.map((player, index) => {
            return <PlayerMultiplayer key={index} player={player} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BoardMultiplayer;
